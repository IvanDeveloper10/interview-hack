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
    text: '1. Purpose of FinalizationRegistry?',
    correct: 'Run cleanup after GC',
    options: [
      { value: 'cleanup', label: 'Run cleanup after GC' },
      { value: 'timer', label: 'Schedule cleanup' },
      { value: 'manual', label: 'Manual dispose' },
      { value: 'weakref', label: 'Create WeakRefs' }
    ]
  },
  {
    text: '2. What is event loop tick?',
    correct: 'Next micro/macro task execution',
    options: [
      { value: 'tick', label: 'Next micro/macro task execution' },
      { value: 'frame', label: 'Next render frame' },
      { value: 'clock', label: '1 second interval' },
      { value: 'cycle', label: 'Main loop restart' }
    ]
  },
  {
    text: '3. Purpose of SharedArrayBuffer?',
    correct: 'Share memory between threads',
    options: [
      { value: 'share', label: 'Share memory between threads' },
      { value: 'copy', label: 'Copy memory to threads' },
      { value: 'local', label: 'Local memory only' },
      { value: 'cache', label: 'Cache in worker' }
    ]
  },
  {
    text: '4. What is tail call optimization?',
    correct: 'Reuse stack for final call',
    options: [
      { value: 'reuse', label: 'Reuse stack for final call' },
      { value: 'parallel', label: 'Call in parallel' },
      { value: 'inline', label: 'Inline last function' },
      { value: 'cache', label: 'Cache function result' }
    ]
  },
  {
    text: '5. Purpose of Atomics.wait()?',
    correct: 'Block worker until notified',
    options: [
      { value: 'wait', label: 'Block worker until notified' },
      { value: 'sleep', label: 'Pause thread' },
      { value: 'stop', label: 'Stop execution' },
      { value: 'idle', label: 'Idle until CPU free' }
    ]
  },
  {
    text: '6. What is speculative optimization?',
    correct: 'Optimize assuming stable types',
    options: [
      { value: 'types', label: 'Optimize assuming stable types' },
      { value: 'cache', label: 'Cache optimized code' },
      { value: 'guess', label: 'Guess missing variables' },
      { value: 'inline', label: 'Inline most calls' }
    ]
  },
  {
    text: '7. Purpose of ArrayBuffer.transfer()?',
    correct: 'Move memory to new buffer',
    options: [
      { value: 'move', label: 'Move memory to new buffer' },
      { value: 'copy', label: 'Copy memory to new buffer' },
      { value: 'clone', label: 'Clone memory' },
      { value: 'split', label: 'Split buffer' }
    ]
  },
  {
    text: '8. Meaning of JIT deopt?',
    correct: 'Revert to slower interpreter',
    options: [
      { value: 'revert', label: 'Revert to slower interpreter' },
      { value: 'stop', label: 'Stop optimized code' },
      { value: 'inline', label: 'Remove inlined calls' },
      { value: 'gc', label: 'Trigger GC' }
    ]
  },
  {
    text: '9. Purpose of postMessage() with Transferable?',
    correct: 'Move data without copying',
    options: [
      { value: 'move', label: 'Move data without copying' },
      { value: 'copy', label: 'Copy data to worker' },
      { value: 'share', label: 'Share buffer reference' },
      { value: 'clone', label: 'Deep clone data' }
    ]
  }
]

export default function LevelNineJavascript() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-pink-400'>JavaScript Quiz - Level 9</h1>
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