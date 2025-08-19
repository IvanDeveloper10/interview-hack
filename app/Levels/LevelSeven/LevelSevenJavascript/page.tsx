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
    text: '1. Purpose of ShadowRealm API?',
    correct: 'Isolated env to run untrusted code',
    options: [
      { value: 'shadow-isolation', label: 'Isolated env for untrusted code' },
      { value: 'shadow-ui', label: 'Shadow DOM elements' },
      { value: 'shadow-cache', label: 'Cache computations' },
      { value: 'shadow-thread', label: 'Run in OS threads' }
    ]
  },
  {
    text: '2. WASM & JS memory interaction?',
    correct: 'Share ArrayBuffer/SharedArrayBuffer',
    options: [
      { value: 'wasm-share', label: 'Share ArrayBuffer/SharedArrayBuffer' },
      { value: 'wasm-copy', label: 'Copy memory each call' },
      { value: 'wasm-own', label: 'Isolated memory space' },
      { value: 'wasm-readonly', label: 'Read-only access' }
    ]
  },
  {
    text: '3. V8 hidden class optimization?',
    correct: 'Assigns hidden shape for fast props',
    options: [
      { value: 'hidden-optimize', label: 'Hidden shape → fast access' },
      { value: 'hidden-encrypt', label: 'Encrypts props' },
      { value: 'hidden-cache', label: 'Caches objects' },
      { value: 'hidden-move', label: 'Moves to faster memory' }
    ]
  },
  {
    text: '4. Downside of proxies?',
    correct: 'Block JS engine optimizations',
    options: [
      { value: 'proxy-performance', label: 'Prevent optimizations' },
      { value: 'proxy-memory', label: 'Double memory' },
      { value: 'proxy-block', label: 'Block async funcs' },
      { value: 'proxy-only', label: 'Only in Node.js' }
    ]
  },
  {
    text: '5. Realm in JS?',
    correct: 'Set of built-ins + global object',
    options: [
      { value: 'realm-global', label: 'Built-ins + global' },
      { value: 'realm-scope', label: 'Func scope' },
      { value: 'realm-thread', label: 'JS thread' },
      { value: 'realm-module', label: 'Module namespace' }
    ]
  },
  {
    text: '6. Detect optimization in V8?',
    correct: '%GetOptimizationStatus / %OptimizeFunctionOnNextCall',
    options: [
      { value: 'v8-opt', label: '%GetOptimizationStatus / %Optimize...' },
      { value: 'v8-profile', label: 'CPU profile (DevTools)' },
      { value: 'v8-speed', label: 'Execution speed' },
      { value: 'v8-log', label: '--trace-opt logs' }
    ]
  },
  {
    text: '7. FinalizationRegistry purpose?',
    correct: 'Cleanup after GC',
    options: [
      { value: 'finalization-cleanup', label: 'Cleanup after GC' },
      { value: 'finalization-delete', label: 'Delete before GC' },
      { value: 'finalization-force', label: 'Force GC' },
      { value: 'finalization-scope', label: 'Limit scope' }
    ]
  },
  {
    text: '8. Security of Compartments (SES)?',
    correct: 'Freeze/isolate intrinsics',
    options: [
      { value: 'compartment-freeze', label: 'Freeze/isolate intrinsics' },
      { value: 'compartment-cache', label: 'Cache modules' },
      { value: 'compartment-encrypt', label: 'Encrypt vars' },
      { value: 'compartment-thread', label: 'Run in OS threads' }
    ]
  },
  {
    text: '9. WASM table use?',
    correct: 'Store refs to funcs for indirect calls',
    options: [
      { value: 'wasm-table', label: 'Refs to funcs (indirect)' },
      { value: 'wasm-memory', label: 'Raw memory' },
      { value: 'wasm-stack', label: 'Call stack' },
      { value: 'wasm-heap', label: 'Heap objects' }
    ]
  }
]

export default function LevelSevenJavascript() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-pink-400'>JavaScript Quiz - Level 7</h1>
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