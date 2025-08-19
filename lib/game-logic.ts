import { doc, serverTimestamp, updateDoc, getDoc, runTransaction, setDoc } from 'firebase/firestore'
import { db } from './firebase';
import type { Room, Player } from './types';
import { nowMs } from './utils';

export async function createRoom(roomId: string, hostUid: string, name: string, questions: Room['questions'], timePerQuestionMs: number) {
  const ref = doc(db, 'rooms', roomId)
  const room: Room = {
    id: roomId,
    createdAt: nowMs(),
    status: 'waiting',
    hostUid,
    timePerQuestionMs,
    currentIndex: 0,
    questionStartedAt: 0,
    players: {
      [hostUid]: {
        uid: hostUid,
        name,
        ready: false,
        score: 0,
        lastSeen: nowMs()
      }
    },
    questions,
    picks: {}
  }
  await setDoc(ref, room)
  return roomId
}

export async function joinRoom(roomId: string, uid: string, name: string) {
  const ref = doc(db, 'rooms', roomId)
  await runTransaction(db, async tx => {
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('Room not found')
    const data = snap.data() as Room
    if (data.status !== 'waiting') throw new Error('Room already started')
    if (!data.players[uid]) {
      const newPlayer: Player = { uid, name, ready: false, score: 0, lastSeen: nowMs() }
      tx.update(ref, { [`players.${uid}`]: newPlayer })
    } else {
      tx.update(ref, { [`players.${uid}.lastSeen`]: nowMs() })
    }
  })
}

export async function toggleReady(roomId: string, uid: string, ready: boolean) {
  const ref = doc(db, 'rooms', roomId)
  await updateDoc(ref, { [`players.${uid}.ready`]: ready, [`players.${uid}.lastSeen`]: nowMs() })
}

export async function hostStart(roomId: string, uid: string) {
  const ref = doc(db, 'rooms', roomId)
  await runTransaction(db, async tx => {
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('Room not found')
    const data = snap.data() as Room
    if (data.hostUid !== uid) throw new Error('Only host can start')
    const players = Object.values(data.players)
    if (players.length < 2) throw new Error('Need at least 2 players')
    const allReady = players.every(p => p.ready)
    if (!allReady) throw new Error('All players must be ready')

    tx.update(ref, {
      status: 'playing',
      currentIndex: 0,
      questionStartedAt: nowMs()
    })
  })
}

export async function submitPick(roomId: string, uid: string, qIndex: number, pickIndex: number) {
  const ref = doc(db, 'rooms', roomId)
  // idempotente: última escritura gana para ese usuario
  await updateDoc(ref, {
    [`picks.${qIndex}.${uid}`]: pickIndex,
    [`players.${uid}.lastSeen`]: nowMs()
  })
}

export async function hostRevealOrAdvance(roomId: string, hostUid: string) {
  const ref = doc(db, 'rooms', roomId)
  await runTransaction(db, async tx => {
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('Room not found')
    const data = snap.data() as Room
    if (data.hostUid !== hostUid) throw new Error('Only host can control')
    if (data.status !== 'playing') return

    const qIndex = data.currentIndex
    const q = data.questions[qIndex]
    const picks = (data.picks?.[qIndex] || {})
    const playerIds = Object.keys(data.players)

    // score
    const updates: Record<string, any> = {}
    for (const pid of playerIds) {
      const pick = picks[pid]
      const currentScore = data.players[pid]?.score || 0
      const inc = pick === q.correctIndex ? 1 : 0
      if (inc) updates[`players.${pid}.score`] = currentScore + 1
    }

    const isLast = qIndex + 1 >= data.questions.length
    if (isLast) {
      updates['status'] = 'finished'
    } else {
      updates['currentIndex'] = qIndex + 1
      updates['questionStartedAt'] = nowMs()
    }

    tx.update(ref, updates)
  })
}
