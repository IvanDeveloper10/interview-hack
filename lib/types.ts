export type Question = {
  id: number
  text: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export type RoomStatus = 'waiting' | 'playing' | 'finished'

export type Player = {
  uid: string
  name: string
  ready: boolean
  score: number
  lastSeen: number // Date.now()
}

export type PicksMap = {
  // questionIndex -> { uid: pickIndex }
  [qIndex: string]: { [uid: string]: number }
}

export type Room = {
  id: string
  createdAt: number
  status: RoomStatus
  hostUid: string
  timePerQuestionMs: number
  currentIndex: number
  questionStartedAt: number // server time in ms
  players: { [uid: string]: Player }
  questions: Question[]
  picks: PicksMap
}
