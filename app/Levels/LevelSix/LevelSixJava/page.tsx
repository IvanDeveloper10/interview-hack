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
    text: '1. Which package contains Stream API?',
    correct: 'java.util.stream',
    options: [
      { value: 'java.io.stream', label: 'java.io.stream' },
      { value: 'java.util.stream', label: 'java.util.stream' },
      { value: 'java.stream', label: 'java.stream' },
      { value: 'java.lang.stream', label: 'java.lang.stream' }
    ]
  },
  {
    text: '2. Which annotation marks a method as deprecated?',
    correct: '@Deprecated',
    options: [
      { value: '@Override', label: '@Override' },
      { value: '@Deprecated', label: '@Deprecated' },
      { value: '@SuppressWarnings', label: '@SuppressWarnings' },
      { value: '@SafeVarargs', label: '@SafeVarargs' }
    ]
  },
  {
    text: '3. Which functional interface is used in lambda expressions?',
    correct: 'FunctionalInterface',
    options: [
      { value: 'Serializable', label: 'Serializable' },
      { value: 'FunctionalInterface', label: 'FunctionalInterface' },
      { value: 'Comparable', label: 'Comparable' },
      { value: 'Cloneable', label: 'Cloneable' }
    ]
  },
  {
    text: '4. Which method is used to start a Stream pipeline?',
    correct: 'stream()',
    options: [
      { value: 'start()', label: 'start()' },
      { value: 'stream()', label: 'stream()' },
      { value: 'open()', label: 'open()' },
      { value: 'run()', label: 'run()' }
    ]
  },
  {
    text: '5. Which method executes terminal operation on Stream?',
    correct: 'collect()',
    options: [
      { value: 'map()', label: 'map()' },
      { value: 'filter()', label: 'filter()' },
      { value: 'collect()', label: 'collect()' },
      { value: 'peek()', label: 'peek()' }
    ]
  },
  {
    text: '6. Which keyword is used to create an immutable variable?',
    correct: 'final',
    options: [
      { value: 'final', label: 'final' },
      { value: 'const', label: 'const' },
      { value: 'static', label: 'static' },
      { value: 'immutable', label: 'immutable' }
    ]
  },
  {
    text: '7. Which class is used for atomic operations?',
    correct: 'AtomicInteger',
    options: [
      { value: 'Integer', label: 'Integer' },
      { value: 'AtomicInteger', label: 'AtomicInteger' },
      { value: 'BigInteger', label: 'BigInteger' },
      { value: 'SafeInteger', label: 'SafeInteger' }
    ]
  },
  {
    text: '8. Which executor is used for managing a pool of threads?',
    correct: 'ExecutorService',
    options: [
      { value: 'ThreadPool', label: 'ThreadPool' },
      { value: 'ExecutorService', label: 'ExecutorService' },
      { value: 'ThreadManager', label: 'ThreadManager' },
      { value: 'ServiceExecutor', label: 'ServiceExecutor' }
    ]
  },
  {
    text: '9. Which method stops a thread immediately (not recommended)?',
    correct: 'stop()',
    options: [
      { value: 'stop()', label: 'stop()' },
      { value: 'destroy()', label: 'destroy()' },
      { value: 'terminate()', label: 'terminate()' },
      { value: 'kill()', label: 'kill()' }
    ]
  },
]

export default function LevelSixJava() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>Java Quiz - Level 6</h1>
      <div className='text-po w-full grid grid-cols-3 gap-5 place-content-center place-items-center'>
        {questions.map((q, i) => (
          <Card key={i} className='w-96 h-72 p-2'>
            <CardHeader>
              <h1 className='text-lg text-indigo-300'>{q.text}</h1>
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