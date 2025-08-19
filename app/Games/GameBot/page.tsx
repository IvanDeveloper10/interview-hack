'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@heroui/button';

type Question = {
  id: number
  text: string
  options: string[]
  correctIndex: number
  explanation?: string
}

type Phase = 'idle' | 'playing' | 'finished'

type AnswerState = 'idle' | 'locked' | 'revealed'

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What does the following JavaScript code print? console.log(typeof NaN)',
    options: ['number', 'NaN', 'undefined', 'object'],
    correctIndex: 0,
    explanation: 'NaN is a special numeric value; typeof NaN === "number".'
  },
  {
    id: 2,
    text: 'In HTTP, what does the status code 201 mean?',
    options: ['Successful request', 'Crete', 'Unauthorized', 'No content'],
    correctIndex: 1,
    explanation: '201 Created indicates that a new resource was created as a result of the request.'
  },
  {
    id: 3,
    text: 'In Git, what command creates a new branch and switches to it?',
    options: ['git switch -c name', 'git branch name', 'git checkout', 'git init -b name'],
    correctIndex: 0,
    explanation: 'Since Git 2.23, git switch -c <name> creates and switches in one step.'
  },
  {
    id: 4,
    text: 'Which of these is NOT a primitive type in TypeScript?',
    options: ['string', 'tuple', 'boolean', 'symbol'],
    correctIndex: 1,
    explanation: 'tuple is a composite type (structure), not a primitive one.'
  },
  {
    id: 5,
    text: 'In CSS, what does flex: 1 do?',
    options: [
      'flex-grow: 1; flex-shrink: 0; flex-basis: 100%',
      'flex-grow: 1; flex-shrink: 1; flex-basis: 0%',
      'flex-grow: 0; flex-shrink: 1; flex-basis: auto',
      'flex-grow: 1; flex-shrink: 1; flex-basis: auto'
    ],
    correctIndex: 1,
    explanation: 'The shorthand flex: 1 is equivalent to 1 1 0% in most browsers.'
  },
  {
    id: 6,
    text: 'In SQL, what clause is used to filter results after a GROUP BY?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
    correctIndex: 1,
    explanation: 'HAVING filters aggregates; WHERE filters rows before grouping.'
  },
  {
    id: 7,
    text: 'Which data structure has average complexity O(1) for search?',
    options: ['Balanced binary search tree', 'Hash table', 'linked list', 'Heap'],
    correctIndex: 1,
    explanation: 'Hash tables offer average O(1) access with good hash function.'
  },
  {
    id: 8,
    text: 'In Node.js, which module is used to work with file paths?',
    options: ['fs', 'path', 'url', 'os'],
    correctIndex: 1,
    explanation: 'The "path" module handles paths; fs is for the file system.'
  },
  {
    id: 9,
    text: 'Which keyword in Java prevents a class from being inherited?',
    options: ['final', 'static', 'sealed', 'const'],
    correctIndex: 0,
    explanation: 'In Java, final prevents class inheritance and method overrides.'
  },
  {
    id: 10,
    text: 'In networking, what protocol resolves IP addresses to MAC addresses on a LAN?',
    options: ['DNS', 'ARP', 'ICMP', 'DHCP'],
    correctIndex: 1,
    explanation: 'ARP (Address Resolution Protocol) resolves IP -> MAC on the local network.'
  }
]

function msToSeconds(ms: number) {
  return Math.max(0, Math.ceil(ms / 1000))
}

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

function computeBotAnswer(
  question: Question,
  accuracy: number,
  questionMs: number,
  rng: () => number
) {
  const willAnswerCorrect = rng() < accuracy
  const answerIndex = willAnswerCorrect
    ? question.correctIndex
    : (() => {
      const others = question.options.map((_, i) => i).filter(i => i !== question.correctIndex)
      return others[Math.floor(rng() * others.length)]
    })()

  const whenMs = Math.floor(questionMs * (0.2 + 0.6 * rng()))
  return { answerIndex, whenMs }
}

function makeSeededRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) / 0xffffffff)
  }
}
export default function GameBot(): JSX.Element {
  const [phase, setPhase] = useState<Phase>('idle')
  const [current, setCurrent] = useState(0)
  const [userScore, setUserScore] = useState(0)
  const [botScore, setBotScore] = useState(0)
  const [countdownMs, setCountdownMs] = useState(0)
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [userPick, setUserPick] = useState<number | null>(null)
  const [botPick, setBotPick] = useState<number | null>(null)
  const [history, setHistory] = useState(
    [] as Array<{
      qId: number
      userPick: number | null
      botPick: number | null
      correctIndex: number
      timeSpentMs: number
    }>
  )

  const timePerQuestionMs = 20_000
  const botAccuracy = 0.68
  const seededRng = useMemo(() => makeSeededRng(20250817), [])
  const startRef = useRef<number>(0)
  const timerRef = useRef<number | null>(null)
  const botTimerRef = useRef<number | null>(null)

  const question = QUESTIONS[current]
  const startGame = () => {
    setPhase('playing')
    setCurrent(0)
    setUserScore(0)
    setBotScore(0)
    setHistory([])
    setUserPick(null)
    setBotPick(null)
    setAnswerState('idle')
    setupTimers(0)
  }

  const setupTimers = (index: number) => {
    clearTimers()
    startRef.current = performance.now()
    setCountdownMs(timePerQuestionMs)
    setAnswerState('idle')
    setUserPick(null)
    setBotPick(null)
    const plan = computeBotAnswer(QUESTIONS[index], botAccuracy, timePerQuestionMs, seededRng)
    botTimerRef.current = window.setTimeout(() => {
      setBotPick(plan.answerIndex)
    }, plan.whenMs)
    const tick = () => {
      const elapsed = performance.now() - startRef.current
      const left = timePerQuestionMs - elapsed
      setCountdownMs(Math.max(0, left))
      if (left <= 0) {
        revealAndScore()
        return
      }
      timerRef.current = window.setTimeout(tick, 100)
    }
    tick()
  }

  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (botTimerRef.current) {
      clearTimeout(botTimerRef.current)
      botTimerRef.current = null
    }
  }

  const onUserPick = (idx: number) => {
    if (answerState !== 'idle') return
    setUserPick(idx)
    setAnswerState('locked')
  }

  const revealAndScore = () => {
    clearTimers()
    setAnswerState('revealed')

    const end = performance.now()
    const spent = end - startRef.current

    const uPick = userPick
    const bPick = botPick

    const isUserRight = uPick !== null && uPick === question.correctIndex
    const isBotRight = bPick !== null && bPick === question.correctIndex

    if (isUserRight) setUserScore(s => s + 1)
    if (isBotRight) setBotScore(s => s + 1)

    setHistory(h => [
      ...h,
      {
        qId: question.id,
        userPick: uPick,
        botPick: bPick,
        correctIndex: question.correctIndex,
        timeSpentMs: spent
      }
    ])
  }

  const next = () => {
    if (current + 1 >= QUESTIONS.length) {
      setPhase('finished')
      clearTimers()
      return
    }
    const nextIndex = current + 1
    setCurrent(nextIndex)
    setupTimers(nextIndex)
  }

  useEffect(() => {
    if (answerState === 'idle' && userPick !== null && botPick !== null) {
      revealAndScore()
    }
  }, [userPick, botPick])

  useEffect(() => {
    return () => clearTimers()

  }, [])

  const timeLeftSec = msToSeconds(countdownMs)
  const progressPct = Math.max(0, Math.min(100, (countdownMs / timePerQuestionMs) * 100))

  const champion = useMemo(() => {
    if (phase !== 'finished') return null
    if (userScore > botScore) return 'USER'
    if (botScore > userScore) return 'BOT'
    return '🤝 DEAD HEAT'
  }, [phase, userScore, botScore])

  if (phase === 'idle') {
    return (
      <main className='min-h-screen w-full bg-gradient-to-b bg-white flex items-center justify-center p-6'>
        <section className='w-full max-w-3xl'>
          <div className='backdrop-blur-lg rounded-2xl p-8 shadow-xl'>
            <h1 className='text-3xl text-po font-bold text-black'>PROGRAMMING TRIVIA: <a className='bg-emerald-400 text-white rounded-xl px-5'>User vs Bot</a></h1>
            <p className='mt-3 text-black text-po text-lg'>10 questions, 20 seconds per question. The bot has ~68% accuracy and answers in a random time. Whoever answers the most correctly wins!</p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <Button onPress={startGame} className='text-po w-96' variant='shadow' color='secondary' size='lg'>
                START GAME
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (phase === 'finished') {
    return (
      <main className='min-h-screen w-full flex items-center justify-center p-6 text-po'>
        <section className='w-full max-w-3xl'>
          <div className='rounded-2xl p-8 shadow-xl'>
            <h2 className='text-3xl font-bold flex items-center gap-3'>
              Winner: <span className='inline-block px-3 py-1 rounded-xl bg-amber-300 text-slate-900'>{champion}</span>
            </h2>

            <div className='mt-4 grid grid-cols-2 gap-4'>
              <div className='rounded-xl border border-slate-700 p-4 bg-slate-900/40'>
                <div className='text-sm text-slate-400'>User Score</div>
                <div className='text-3xl font-extrabold'>{userScore}</div>
              </div>
              <div className='rounded-xl border border-slate-700 p-4 bg-slate-900/40'>
                <div className='text-sm text-slate-400'>Bot Score</div>
                <div className='text-3xl font-extrabold'>{botScore}</div>
              </div>
            </div>

            <h3 className='mt-6 mb-2 text-lg font-semibold'>Abstract</h3>
            <ul className='space-y-2 max-h-72 overflow-auto pr-2'>
              {history.map((h, i) => {
                const q = QUESTIONS.find(q => q.id === h.qId)!
                const uRight = h.userPick !== null && h.userPick === h.correctIndex
                const bRight = h.botPick !== null && h.botPick === h.correctIndex
                return (
                  <li key={i} className='rounded-lg border border-slate-700 p-3 bg-slate-900/30'>
                    <div className='text-sm font-medium'>{i + 1}. {q.text}</div>
                    <div className='mt-1 text-xs text-slate-300'>Tiempo: {Math.round(h.timeSpentMs / 1000)}s</div>
                    <div className='mt-2 flex flex-wrap gap-2 text-sm'>
                      <span className={classNames('px-2 py-1 rounded-lg', uRight ? 'bg-emerald-500 text-slate-900' : 'bg-rose-500 text-slate-900')}>
                        User: {h.userPick !== null ? q.options[h.userPick] : '—'}
                      </span>
                      <span className={classNames('px-2 py-1 rounded-lg', bRight ? 'bg-emerald-500 text-slate-900' : 'bg-rose-500 text-slate-900')}>
                        Bot: {h.botPick !== null ? q.options[h.botPick] : '—'}
                      </span>
                      <span className='px-2 py-1 rounded-lg bg-amber-300 text-slate-900'>Correct: {q.options[h.correctIndex]}</span>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className='mt-6 flex gap-3'>
              <Button onPress={startGame} className='w-96' variant='shadow' color='secondary'>
                Play Again
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className='min-h-screen w-full bg-white text-black flex items-center justify-center p-6'>
      <section className='w-full max-w-3xl'>
        <div className='bg-white rounded-2xl p-6 md:p-8 shadow-xl'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <h2 className='text-2xl font-bold text-po'>Question {current + 1} / {QUESTIONS.length}</h2>
              <p className='text-sm text-po'>Points — USER: {userScore} | BOT: {botScore}</p>
            </div>
            <div className='flex flex-col items-end'>
              <div className='text-xs text-po'>Remaining time</div>
              <div className='text-3xl font-extrabold tabular-nums text-po tracking-tight'>{timeLeftSec}s</div>
            </div>
          </div>
          <div className='mt-4 h-3 w-full bg-slate-900/50 rounded-full overflow-hidden'>
            <div
              className='h-full bg-blue-500 transition-[width] duration-100 ease-linear'
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className='mt-6 text-lg text-po'>{question.text}</div>
          <div className='mt-4 grid grid-cols-1 gap-3 text-po'>
            {question.options.map((opt, idx) => {
              const isPicked = userPick === idx
              const showReveal = answerState === 'revealed'
              const isCorrect = idx === question.correctIndex

              const base = 'w-full text-left px-4 py-3 rounded-xl border transition select-none'
              let color = 'border-slate-700 bg-slate-900/40 hover:bg-slate-900/60'

              if (answerState === 'locked' && isPicked) {
                color = 'border-emerald-500 bg-emerald-500/10'
              }

              if (showReveal) {
                if (isCorrect) color = 'border-emerald-500 bg-emerald-500/20'
                else if (isPicked) color = 'border-rose-500 bg-rose-500/20'
              }

              return (
                <button
                  key={idx}
                  onClick={() => onUserPick(idx)}
                  disabled={answerState !== 'idle'}
                  className={classNames(base, color, answerState !== 'idle' && 'opacity-90 cursor-not-allowed')}
                >
                  <span className='font-semibold'>{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              )
            })}
          </div>
          <div className='mt-6 flex items-center justify-between gap-4'>
            <div className='text-sm text-po'>
              Bot: {botPick === null ? 'Thinking...' : `Chose ${String.fromCharCode(65 + botPick)}`}
            </div>
            <div className='flex gap-2'>
              {answerState !== 'revealed' ? (
                <>
                  <Button
                    onPress={() => revealAndScore()}
                    className='w-96 text-po'
                    variant='shadow'
                    color='danger'
                  >
                    Reveal Now
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onPress={next}
                    className='w-96 text-po'
                    variant='shadow'
                    color='success'
                  >
                    Next
                  </Button>
                </>
              )}
            </div>
          </div>
          {answerState === 'revealed' && (
            <div className='mt-4 rounded-xl border bg-blue-500 text-po text-white p-4'>
              <div className='text-sm'>
                <span className='px-2 py-1 mr-2 rounded-lg bg-white text-po text-slate-900 font-bold'>Correct Answer:</span>
                {question.options[question.correctIndex]}
              </div>
              {question.explanation && (
                <p className='mt-2 text-slate-300 text-sm text-po'>{question.explanation}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
