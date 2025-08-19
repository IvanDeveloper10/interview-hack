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
    text: '1. What is WeakMap for?',
    correct: 'Store object keys that are GC-safe',
    options: [
      { value: 'weakmap-memory', label: 'Object keys, GC-safe' },
      { value: 'weakmap-string', label: 'Only string keys' },
      { value: 'weakmap-performance', label: 'Faster iteration' },
      { value: 'weakmap-persistent', label: 'Persist in localStorage' }
    ]
  },
  {
    text: '2. What’s true about WeakSet?',
    correct: 'Only objects, GC-safe',
    options: [
      { value: 'weakset-any', label: 'Any value' },
      { value: 'weakset-obj', label: 'Only objects, GC-safe' },
      { value: 'weakset-iterate', label: 'Iterable with for...of' },
      { value: 'weakset-size', label: 'Has size property' }
    ]
  },
  {
    text: '3. console.log(null ?? "default") → ?',
    correct: '"default"',
    options: [
      { value: 'default', label: '"default"' },
      { value: 'null', label: 'null' },
      { value: 'undefined', label: 'undefined' },
      { value: 'error', label: 'Error' }
    ]
  },
  {
    text: '4. What does ?. do?',
    correct: 'Stops if left side is null/undefined',
    options: [
      { value: 'optional-default', label: 'Assigns default' },
      { value: 'optional-stop', label: 'Stops if null/undefined' },
      { value: 'optional-throw', label: 'Throws error' },
      { value: 'optional-all', label: 'Works on any type' }
    ]
  },
  {
    text: '5. Proxy trap get() does what?',
    correct: 'Intercepts property access',
    options: [
      { value: 'proxy-access', label: 'Intercepts access' },
      { value: 'proxy-set', label: 'Intercepts assignment' },
      { value: 'proxy-delete', label: 'Intercepts deletion' },
      { value: 'proxy-construct', label: 'Intercepts new' }
    ]
  },
  {
    text: '6. Reflect.set() returns?',
    correct: 'Boolean for success',
    options: [
      { value: 'reflect-boolean', label: 'Boolean success' },
      { value: 'reflect-value', label: 'Assigned value' },
      { value: 'reflect-target', label: 'Updated object' },
      { value: 'reflect-undefined', label: 'Always undefined' }
    ]
  },
  {
    text: '7. Dynamic import() returns...',
    correct: 'Promise resolving to module',
    options: [
      { value: 'import-promise', label: 'Promise with module' },
      { value: 'import-blocking', label: 'Blocks execution' },
      { value: 'import-sync', label: 'Loads sync' },
      { value: 'import-global', label: 'Makes module global' }
    ]
  },
  {
    text: '8. Top-level await allows?',
    correct: 'Await outside async in ES modules',
    options: [
      { value: 'topawait-async', label: 'Only inside async' },
      { value: 'topawait-global', label: 'Anywhere in script' },
      { value: 'topawait-esm', label: 'Outside async in ES modules' },
      { value: 'topawait-callback', label: 'In callbacks w/o async' }
    ]
  },
  {
    text: '9. What hurts performance?',
    correct: 'Too many closures in loop',
    options: [
      { value: 'perf-closures', label: 'Closures in loop' },
      { value: 'perf-const', label: 'Using const' },
      { value: 'perf-default', label: 'Default params' },
      { value: 'perf-template', label: 'Template literals' }
    ]
  }
]

export default function LevelFiveJavascript() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-cyan-400'>JavaScript Quiz - Level 5</h1>
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
        <Button onPress={handleSubmit} className='w-96 text-po' size='lg' color='success' variant='ghost'>
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
                <Button color='primary' onPress={onClose} className='text-po'>
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