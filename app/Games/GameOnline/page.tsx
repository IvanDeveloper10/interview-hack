'use client'

import type { Room } from '@/lib/types'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Card, CardBody } from '@heroui/card'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { Chip } from '@heroui/chip';

import { db, ensureAnonAuth } from '@/lib/firebase'
import { QUESTIONS } from '@/lib/questions'
import { classNames, msToSeconds, nowMs } from '@/lib/utils'
import { createRoom, hostRevealOrAdvance, hostStart, joinRoom, submitPick, toggleReady } from '@/lib/game-logic'

type Phase = 'lobby' | 'playing' | 'finished'
type AnswerState = 'idle' | 'locked' | 'revealed'

const timePerQuestionMs = 20_000

export default function GameOnline(): JSX.Element {
  const [uid, setUid] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('Player')
  const [roomId, setRoomId] = useState<string>('')
  const [room, setRoom] = useState<Room | null>(null)
  const [creatingId, setCreatingId] = useState<string>('')
  const [joinId, setJoinId] = useState<string>('')
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [userPick, setUserPick] = useState<number | null>(null)

  useEffect(() => {
    ensureAnonAuth().then(u => {
      setUid(u.uid)
      setDisplayName(`Player-${u.uid.slice(0, 5)}`)
    })
  }, [])

  useEffect(() => {
    if (!roomId) return
    const ref = doc(db, 'rooms', roomId)
    const unsub = onSnapshot(ref, snap => {
      if (snap.exists()) {
        const data = snap.data() as Room

        setRoom(data)
      } else {
        setRoom(null)
      }
    })

    return () => unsub()
  }, [roomId])

  // Heartbeat presencia simple
  useEffect(() => {
    if (!room || !uid) return
    const ref = doc(db, 'rooms', room.id)
    const iv = setInterval(() => {
      updateDoc(ref, { [`players.${uid}.lastSeen`]: nowMs() }).catch(() => { })
    }, 10_000)

    return () => clearInterval(iv)
  }, [room, uid])

  const phase: Phase = useMemo(() => {
    if (!room) return 'lobby'
    if (room.status === 'waiting') return 'lobby'
    if (room.status === 'playing') return 'playing'

    return 'finished'
  }, [room])

  const isHost = room?.hostUid === uid

  const current = room?.currentIndex ?? 0
  const question = room?.questions[current]
  const startedAt = room?.questionStartedAt ?? 0
  const serverElapsed = Math.max(0, nowMs() - startedAt)
  const countdownMs = room?.status === 'playing'
    ? Math.max(0, (room.timePerQuestionMs ?? timePerQuestionMs) - serverElapsed)
    : 0
  const timeLeftSec = msToSeconds(countdownMs)
  const progressPct = room?.status === 'playing'
    ? Math.max(0, Math.min(100, (countdownMs / (room.timePerQuestionMs ?? timePerQuestionMs)) * 100))
    : 0

  useEffect(() => {
    if (!room || room.status !== 'playing') return
    if (!isHost) return
    if (countdownMs > 0) return

    hostRevealOrAdvance(room.id, uid).catch(() => { })
  }, [room, countdownMs, isHost, uid])


  useEffect(() => {
    setAnswerState('idle')
    setUserPick(null)
  }, [room?.currentIndex, room?.status])

 
  useEffect(() => {
    if (!room || room.status !== 'playing') return
  }, [room?.questionStartedAt])

  const handleCreate = async () => {
    if (!uid) return
    const id = creatingId.trim() || Math.random().toString(36).slice(2, 8).toUpperCase()

    await createRoom(id, uid, displayName, QUESTIONS, timePerQuestionMs)
    setRoomId(id)
  }

  const handleJoin = async () => {
    if (!uid) return
    const id = joinId.trim().toUpperCase()

    if (!id) return
    await joinRoom(id, uid, displayName)
    setRoomId(id)
  }

  const handleReady = async (ready: boolean) => {
    if (!room) return
    await toggleReady(room.id, uid, ready)
  }

  const handleStart = async () => {
    if (!room) return
    await hostStart(room.id, uid).catch(err => {
      alert(err.message)
    })
  }

  const onUserPick = async (idx: number) => {
    if (!room || room.status !== 'playing') return
    if (answerState !== 'idle') return
    setUserPick(idx)
    setAnswerState('locked')
    await submitPick(room.id, uid, room.currentIndex, idx)
  }

  const forceReveal = async () => {
    if (!room || !isHost) return
    await hostRevealOrAdvance(room.id, uid)
  }


  if (!room || phase === 'lobby') {
    return (
      <main className='min-h-screen w-full bg-white flex items-center justify-center p-6 text-po'>
        <section className='w-full max-w-4xl'>
          <div className='rounded-2xl p-8 shadow-xl bg-white'>
            <Chip className='flex justify-center items-center mb-10' color='danger' size='lg' variant='shadow'>
              <p className='flex justify-center items-center'><i className='fi fi-rr-info flex justify-center items-center mr-5' /> This section is closed until further notice. I need to pay Firebase.</p>
            </Chip>
            <h1 className='text-3xl text-po font-bold text-black'>
              PROGRAMMING TRIVIA: <span className='bg-emerald-400 text-white rounded-xl px-5'>Player vs Player</span>
            </h1>
            <p className='mt-3 text-black text-po text-lg'>
              10 questions, 20 seconds per question. Whoever has the most correct answers wins.
            </p>

            <div className='mt-6 grid md:grid-cols-2 gap-6'>
              <Card>
                <CardBody className='space-y-3'>
                  <div className='font-semibold'>Name</div>
                  <Input value={displayName} onChange={e => setDisplayName(e.target.value)} />
                  <div className='font-semibold'>Create Room</div>
                  <Input placeholder='Optional ID (e.g. ABC123)'
                    value={creatingId}
                    onChange={e => setCreatingId(e.target.value.toUpperCase())} />
                  <Button className='w-full text-po' color='secondary' size='lg' variant='shadow' onPress={handleCreate}>
                    Create And Entry
                  </Button>
                </CardBody>
              </Card>

              <Card>
                <CardBody className='flex flex-col justify-between'>
                  <div className='font-semibold'>Join the room</div>
                  <Input placeholder='ROOM ID' value={joinId} onChange={e => setJoinId(e.target.value.toUpperCase())} />
                  <Button className='w-full text-po' color='primary' size='lg' variant='shadow' onPress={handleJoin}>
                    Join
                  </Button>
                </CardBody>
              </Card>
            </div>

            {room && (
              <div className='mt-8 rounded-xl border p-4'>
                <div className='text-sm'>Connected To The Room: <span className='font-bold'>{room.id}</span></div>
              </div>
            )}
          </div>
        </section>
      </main>
    )
  }

  if (phase === 'finished' && room) {
    const players = Object.values(room.players)
    const top = [...players].sort((a, b) => b.score - a.score)
    const first = top[0]
    const second = top[1]
    const champion = top.length > 1 && first.score === second.score ? '🤝 DEAD HEAT' : first?.name ?? '—'

    return (
      <main className='min-h-screen w-full flex items-center justify-center p-6 text-po'>
        <section className='w-full max-w-3xl'>
          <div className='rounded-2xl p-8 shadow-xl bg-white'>
            <h2 className='text-3xl font-bold flex items-center gap-3'>
              Winner: <span className='inline-block px-3 py-1 rounded-xl bg-amber-300 text-slate-900'>{champion}</span>
            </h2>

            <div className='mt-4 grid grid-cols-2 gap-4'>
              {players.map(p => (
                <div key={p.uid} className='rounded-xl border p-4 bg-slate-900/5'>
                  <div className='text-sm text-slate-600'>{p.name}</div>
                  <div className='text-3xl font-extrabold'>{p.score}</div>
                </div>
              ))}
            </div>

            <div className='mt-6 flex gap-3'>
              <Button className='w-96' color='secondary' variant='shadow' onPress={() => window.location.reload()}>
                Volver al Lobby
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const players = Object.values(room!.players)
  const myPlayer = room!.players[uid]
  const picksForQuestion = room!.picks?.[String(room!.currentIndex)] || {}
  const otherPlayers = players.filter(p => p.uid !== uid)

  return (
    <main className='min-h-screen w-full bg-white text-black flex items-center justify-center p-6'>
      <section className='w-full max-w-4xl'>
        {room!.status === 'waiting' ? (
          <div className='bg-white rounded-2xl p-6 md:p-8 shadow-xl'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <h2 className='text-2xl font-bold text-po'>Sala {room!.id}</h2>
                <p className='text-sm text-po'>Jugadores: {players.length}</p>
              </div>
              <div className='flex items-end flex-col'>
                <div className='text-xs text-po'>Host</div>
                <div className='text-lg font-bold'>{players.find(p => p.uid === room!.hostUid)?.name}</div>
              </div>
            </div>

            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-3'>
              {players.map(p => (
                <div key={p.uid} className='rounded-xl border p-4 bg-slate-900/5 flex items-center justify-between'>
                  <div className='font-semibold'>{p.name}</div>
                  <div className={classNames('px-2 py-1 rounded-lg text-xs',
                    p.ready ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-900')}>
                    {p.ready ? 'Ready' : 'Not ready'}
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-6 flex flex-wrap gap-3'>
              <Button className='text-po' color='primary' size='lg' variant='shadow' onPress={() => handleReady(!myPlayer?.ready)}>
                {myPlayer?.ready ? 'Unready' : 'Ready'}
              </Button>
              {isHost && (
                <Button className='text-po' color='secondary' size='lg' variant='shadow' onPress={handleStart}>
                  Start Game
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className='bg-white rounded-2xl p-6 md:p-8 shadow-xl'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <h2 className='text-2xl font-bold text-po'>Question {room!.currentIndex + 1} / {room!.questions.length}</h2>
                <p className='text-sm text-po'>Points — {players.map(p => `${p.name}: ${p.score}`).join(' | ')}</p>
              </div>
              <div className='flex flex-col items-end'>
                <div className='text-xs text-po'>Remaining time</div>
                <div className='text-3xl font-extrabold tabular-nums text-po tracking-tight'>{timeLeftSec}s</div>
              </div>
            </div>

            <div className='mt-4 h-3 w-full bg-slate-900/10 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-500 transition-[width] duration-200 ease-linear'
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className='mt-6 text-lg text-po'>{question?.text}</div>

            <div className='mt-4 grid grid-cols-1 gap-3 text-po'>
              {question?.options.map((opt, idx) => {
                const isPicked = userPick === idx
                const showReveal = answerState === 'revealed'
                const isCorrect = idx === question.correctIndex

                const base = 'w-full text-left px-4 py-3 rounded-xl border transition select-none'
                let color = 'border-slate-300 bg-slate-50 hover:bg-slate-100'

                if (answerState === 'locked' && isPicked) {
                  color = 'border-emerald-500 bg-emerald-50'
                }
                if (showReveal) {
                  if (isCorrect) color = 'border-emerald-500 bg-emerald-100'
                  else if (isPicked) color = 'border-rose-500 bg-rose-100'
                }

                return (
                  <button
                    key={idx}
                    className={classNames(base, color, answerState !== 'idle' && 'opacity-90 cursor-not-allowed')}
                    disabled={answerState !== 'idle'}
                    onClick={() => onUserPick(idx)}
                  >
                    <span className='font-semibold'>{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                )
              })}
            </div>

            <div className='mt-6 flex items-center justify-between gap-4'>
              <div className='text-sm text-po'>
                {otherPlayers.length ? (
                  otherPlayers.map(p => {
                    const hasPicked = typeof picksForQuestion[p.uid] === 'number'

                    return (
                      <span key={p.uid} className={classNames('px-2 py-1 mr-2 rounded-lg',
                        hasPicked ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-900')}>
                        {p.name}: {hasPicked ? 'Locked' : 'Thinking...'}
                      </span>
                    )
                  })
                ) : (
                  <span>No opponents</span>
                )}
              </div>
              <div className='flex gap-2'>
                {isHost && (
                  <Button className='w-40 text-po' color='danger' variant='shadow' onPress={forceReveal}>
                    Reveal / Next
                  </Button>
                )}
              </div>
            </div>

            {false && (
              <div className='mt-4 rounded-xl border bg-blue-500 text-po text-white p-4'>
                <div className='text-sm'>
                  <span className='px-2 py-1 mr-2 rounded-lg bg-white text-po text-slate-900 font-bold'>Correct Answer:</span>
                  {question?.options[question!.correctIndex]}
                </div>
                {question?.explanation && (
                  <p className='mt-2 text-slate-200 text-sm text-po'>{question?.explanation}</p>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
