'use client';

import { Fragment, useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { RadioGroup, Radio } from '@heroui/radio';
import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@heroui/modal';
import { Button } from '@heroui/button';

type Option = {
  value: string;
  label: string;
}

type Question = {
  text: string;
  correct: string;
  options: Option[];
}

const questions: Question[] = [
  {
    text: '1. When does process.nextTick() run?',
    correct: 'Before any phase, after current op',
    options: [
      { value: 'nexttick-priority', label: 'Before any phase, after current op' },
      { value: 'nexttick-timers', label: 'In timers phase' },
      { value: 'nexttick-check', label: 'In check phase' },
      { value: 'nexttick-idle', label: 'In idle/prepare phase' }
    ]
  },
  {
    text: '2. Microtasks vs macrotasks?',
    correct: 'Micro run before next render/macrotask',
    options: [
      { value: 'micro-priority', label: 'Micro run before next render/macrotask' },
      { value: 'micro-slower', label: 'Micro are slower' },
      { value: 'micro-after', label: 'Micro run after all macros' },
      { value: 'micro-random', label: 'Random order' }
    ]
  },
  {
    text: '3. Cause of JS memory leak?',
    correct: 'Unintentional globals',
    options: [
      { value: 'leak-global', label: 'Unintentional globals' },
      { value: 'leak-const', label: 'Too much const' },
      { value: 'leak-arrow', label: 'Arrow functions' },
      { value: 'leak-default', label: 'Default params' }
    ]
  },
  {
    text: '4. Tail call optimization?',
    correct: 'Reuses current stack frame',
    options: [
      { value: 'tail-memory', label: 'Reuses stack frame' },
      { value: 'tail-sort', label: 'Optimizes sorting' },
      { value: 'tail-loop', label: 'Optimizes loops' },
      { value: 'tail-event', label: 'Optimizes events' }
    ]
  },
  {
    text: '5. Async iterator creation?',
    correct: 'Define Symbol.asyncIterator → next() Promise',
    options: [
      { value: 'asynciterator-symbol', label: 'Symbol.asyncIterator with next() Promise' },
      { value: 'asynciterator-loop', label: 'for...in with async' },
      { value: 'asynciterator-await', label: 'Await in any iterator' },
      { value: 'asynciterator-map', label: 'Map over Promises' }
    ]
  },
  {
    text: '6. yield* in generators?',
    correct: 'Delegates to another iterable',
    options: [
      { value: 'yield-delegate', label: 'Delegates to another iterable' },
      { value: 'yield-return', label: 'Return and end' },
      { value: 'yield-loop', label: 'Repeat last yield' },
      { value: 'yield-all', label: 'Yield all at once' }
    ]
  },
  {
    text: '7. Decorators are...',
    correct: 'Funcs that modify classes/methods at def time',
    options: [
      { value: 'decorator-modify', label: 'Funcs that modify at def time' },
      { value: 'decorator-run', label: 'Run once at start' },
      { value: 'decorator-only-class', label: 'Only on classes' },
      { value: 'decorator-compile', label: 'Compile to machine code' }
    ]
  },
  {
    text: '8. Purpose of Atomics?',
    correct: 'Atomic ops on shared memory',
    options: [
      { value: 'atomics-shared', label: 'Atomic ops on shared memory' },
      { value: 'atomics-encrypt', label: 'Encrypt memory' },
      { value: 'atomics-parallel', label: 'Parallel w/o lock' },
      { value: 'atomics-sort', label: 'Faster sorting' }
    ]
  },
  {
    text: '9. SharedArrayBuffer does?',
    correct: 'Threads share same memory buffer',
    options: [
      { value: 'sab-shared', label: 'Threads share memory buffer' },
      { value: 'sab-copy', label: 'Copies data between threads' },
      { value: 'sab-async', label: 'Only with async' },
      { value: 'sab-private', label: 'Private per thread' }
    ]
  }
]

export default function LevelSixJavascript() {

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions before submitting.');

      return;
    }

    let correctCount = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.correct) correctCount++;
    });
    setScore(correctCount);
    setIsModalOpen(true);
  }

  return (
    <Fragment>
      <h1 className='text-po text-6xl text-center my-20 font-bold text-cyan-400'>JavaScript Quiz - Level 6</h1>
      <div className='text-po w-full grid grid-cols-3 gap-5 place-content-center place-items-center'>
        {questions.map((q, i) => (
          <Card key={i} className='w-96 h-72 p-2'>
            <CardHeader>
              <h1 className='text-lg text-pink-300'>{q.text}</h1>
            </CardHeader>
            <CardBody className='flex justify-end'>
              <RadioGroup
                value={answers[i] || ''}
                onValueChange={(val) => handleSelect(i, val)}
              >
                {q.options.map((opt, idx) => (
                  <Radio key={idx} value={opt.value}>{opt.label}</Radio>
                ))}
              </RadioGroup>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className='my-10 flex w-full justify-center items-center'>
        <Button className='w-96 text-po' color='success' size='lg' variant='ghost' onPress={handleSubmit}>
          SUBMIT EXAM
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='text-po text-xl font-bold'>
                <h1>Exam Result</h1>
              </ModalHeader>
              <ModalBody className='text-po'>
                <p>Total Questions: {questions.length}</p>
                <p>Correct Answers: {score}</p>
                <p>Incorrect Answers: {questions.length - score}</p>
                <p>Score: {((score / questions.length) * 100).toFixed(2)}%</p>
              </ModalBody>
              <ModalFooter>
                <Button className='text-po' color='primary' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}