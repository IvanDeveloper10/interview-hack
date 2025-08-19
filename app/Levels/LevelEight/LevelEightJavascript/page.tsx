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
    text: '1. Purpose of WeakRef?',
    correct: 'Weak reference without preventing GC',
    options: [
      { value: 'weak', label: 'Weak reference without preventing GC' },
      { value: 'strong', label: 'Strong reference' },
      { value: 'cache', label: 'Permanent cache' },
      { value: 'encrypt', label: 'Encrypted reference' }
    ]
  },
  {
    text: '2. Capture heap snapshot in Node.js?',
    correct: 'Using DevTools or inspector protocol',
    options: [
      { value: 'devtools', label: 'Using DevTools or inspector protocol' },
      { value: 'trace', label: '--trace-gc flag' },
      { value: 'gc', label: 'global.gc()' },
      { value: 'json', label: 'JSON.stringify(global)' }
    ]
  },
  {
    text: '3. Inline caching meaning?',
    correct: 'Caches property lookup location',
    options: [
      { value: 'prop-cache', label: 'Caches property lookup location' },
      { value: 'embed', label: 'Embed constants in code' },
      { value: 'pipeline', label: 'Inline functions in build' },
      { value: 'stack', label: 'Inline variables in stack' }
    ]
  },
  {
    text: '4. LdaSmi in V8 bytecode?',
    correct: 'Load small int to accumulator',
    options: [
      { value: 'smi', label: 'Load small int to accumulator' },
      { value: 'string', label: 'Load string' },
      { value: 'snapshot', label: 'Load heap snapshot' },
      { value: 'symbol', label: 'Load symbol' }
    ]
  },
  {
    text: '5. Backpressure in streams?',
    correct: 'Signal to slow producer',
    options: [
      { value: 'signal', label: 'Signal to slow producer' },
      { value: 'speed', label: 'Speed up processing' },
      { value: 'cache', label: 'Temporary buffer' },
      { value: 'pause', label: 'Pause manually' }
    ]
  },
  {
    text: '6. Role of PreParser in V8?',
    correct: 'Collects scope info before parsing',
    options: [
      { value: 'scope', label: 'Collects scope info before parsing' },
      { value: 'minify', label: 'Minifies code' },
      { value: 'cache', label: 'Caches AST' },
      { value: 'thread', label: 'Runs on separate thread' }
    ]
  },
  {
    text: '7. WeakMap for private data?',
    correct: 'Store hidden data tied to object',
    options: [
      { value: 'private', label: 'Store hidden data tied to object' },
      { value: 'cache', label: 'Permanent storage' },
      { value: 'encrypt', label: 'Encrypt properties' },
      { value: 'delete', label: 'Auto delete keys' }
    ]
  },
  {
    text: '8. Graph rewriting in bundlers?',
    correct: 'Optimize and relink dependencies',
    options: [
      { value: 'optimize', label: 'Optimize and relink dependencies' },
      { value: 'draw', label: 'Draw dependency graphs' },
      { value: 'cache', label: 'Cache dependencies' },
      { value: 'inline', label: 'Inline small modules' }
    ]
  },
  {
    text: '9. WeakRef after GC?',
    correct: 'Returns undefined',
    options: [
      { value: 'undefined', label: 'Returns undefined' },
      { value: 'null', label: 'Returns null' },
      { value: 'error', label: 'Throws error' },
      { value: 'empty', label: 'Empty object' }
    ]
  }
]

export default function LevelEightJavascript() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-pink-400'>JavaScript Quiz - Level 8</h1>
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