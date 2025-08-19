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
    text: '1. Which JVM component is responsible for memory management?',
    correct: 'Garbage Collector',
    options: [
      { value: 'ClassLoader', label: 'ClassLoader' },
      { value: 'Garbage Collector', label: 'Garbage Collector' },
      { value: 'JIT Compiler', label: 'JIT Compiler' },
      { value: 'Thread Scheduler', label: 'Thread Scheduler' }
    ]
  },
  {
    text: '2. Which method is used to load a class dynamically?',
    correct: 'Class.forName()',
    options: [
      { value: 'Class.load()', label: 'Class.load()' },
      { value: 'Class.forName()', label: 'Class.forName()' },
      { value: 'Class.get()', label: 'Class.get()' },
      { value: 'Class.create()', label: 'Class.create()' }
    ]
  },
  {
    text: '3. Which package provides Reflection API?',
    correct: 'java.lang.reflect',
    options: [
      { value: 'java.lang.reflect', label: 'java.lang.reflect' },
      { value: 'java.util.reflect', label: 'java.util.reflect' },
      { value: 'java.reflect', label: 'java.reflect' },
      { value: 'java.reflection', label: 'java.reflection' }
    ]
  },
  {
    text: '4. Which type of ClassLoader loads core Java classes?',
    correct: 'Bootstrap ClassLoader',
    options: [
      { value: 'Bootstrap ClassLoader', label: 'Bootstrap ClassLoader' },
      { value: 'System ClassLoader', label: 'System ClassLoader' },
      { value: 'Application ClassLoader', label: 'Application ClassLoader' },
      { value: 'Extension ClassLoader', label: 'Extension ClassLoader' }
    ]
  },
  {
    text: '5. Which JVM memory area stores class metadata?',
    correct: 'Metaspace',
    options: [
      { value: 'Heap', label: 'Heap' },
      { value: 'Stack', label: 'Stack' },
      { value: 'Metaspace', label: 'Metaspace' },
      { value: 'PermGen', label: 'PermGen' }
    ]
  },
  {
    text: '6. Which Garbage Collector is default in Java 11?',
    correct: 'G1 Garbage Collector',
    options: [
      { value: 'Serial GC', label: 'Serial GC' },
      { value: 'Parallel GC', label: 'Parallel GC' },
      { value: 'G1 Garbage Collector', label: 'G1 Garbage Collector' },
      { value: 'ZGC', label: 'ZGC' }
    ]
  },
  {
    text: '7. Which module system was introduced in Java 9?',
    correct: 'Java Platform Module System (JPMS)',
    options: [
      { value: 'Java Platform Module System (JPMS)', label: 'Java Platform Module System (JPMS)' },
      { value: 'Java Package Manager', label: 'Java Package Manager' },
      { value: 'Java Modular API', label: 'Java Modular API' },
      { value: 'JDK Module Loader', label: 'JDK Module Loader' }
    ]
  },
  {
    text: '8. Which keyword is used to export packages in module-info.java?',
    correct: 'exports',
    options: [
      { value: 'provides', label: 'provides' },
      { value: 'requires', label: 'requires' },
      { value: 'exports', label: 'exports' },
      { value: 'uses', label: 'uses' }
    ]
  },
  {
    text: '9. Which Reflection method allows invoking a private method?',
    correct: 'setAccessible(true)',
    options: [
      { value: 'allowAccess()', label: 'allowAccess()' },
      { value: 'enableAccess()', label: 'enableAccess()' },
      { value: 'setAccessible(true)', label: 'setAccessible(true)' },
      { value: 'openAccess()', label: 'openAccess()' }
    ]
  }
]

export default function LevelSevenJava() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>Java Quiz - Level 7</h1>
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