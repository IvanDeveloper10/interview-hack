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
    text: '1. Keyword to start a thread?',
    correct: 'start()',
    options: [
      { value: 'run()', label: 'run()' },
      { value: 'start()', label: 'start()' },
      { value: 'execute()', label: 'execute()' },
      { value: 'thread()', label: 'thread()' }
    ]
  },
  {
    text: '2. Generic type symbol?',
    correct: '<T>',
    options: [
      { value: '<T>', label: '<T>' },
      { value: '<G>', label: '<G>' },
      { value: '<Type>', label: '<Type>' },
      { value: '<E>', label: '<E>' }
    ]
  },
  {
    text: '3. Checked exception example?',
    correct: 'IOException',
    options: [
      { value: 'NullPointerException', label: 'NullPointerException' },
      { value: 'IOException', label: 'IOException' },
      { value: 'ArithmeticException', label: 'ArithmeticException' },
      { value: 'IndexOutOfBounds', label: 'IndexOutOfBounds' }
    ]
  },
  {
    text: '4. Unchecked exception example?',
    correct: 'NullPointerException',
    options: [
      { value: 'SQLException', label: 'SQLException' },
      { value: 'IOException', label: 'IOException' },
      { value: 'NullPointerException', label: 'NullPointerException' },
      { value: 'ClassNotFoundException', label: 'ClassNotFoundException' }
    ]
  },
  {
    text: '5. JDBC stands for?',
    correct: 'Java Database Connectivity',
    options: [
      { value: 'Java Data Connect', label: 'Java Data Connect' },
      { value: 'Java Database Connectivity', label: 'Java Database Connectivity' },
      { value: 'Java DB Control', label: 'Java DB Control' },
      { value: 'Java Data Code', label: 'Java Data Code' }
    ]
  },
  {
    text: '6. Interface of List?',
    correct: 'java.util.List',
    options: [
      { value: 'java.sql.List', label: 'java.sql.List' },
      { value: 'java.util.List', label: 'java.util.List' },
      { value: 'java.lang.List', label: 'java.lang.List' },
      { value: 'java.io.List', label: 'java.io.List' }
    ]
  },
  {
    text: '7. Which is synchronized?',
    correct: 'Vector',
    options: [
      { value: 'ArrayList', label: 'ArrayList' },
      { value: 'LinkedList', label: 'LinkedList' },
      { value: 'Vector', label: 'Vector' },
      { value: 'HashSet', label: 'HashSet' }
    ]
  },
  {
    text: '8. Thread-safe map?',
    correct: 'ConcurrentHashMap',
    options: [
      { value: 'HashMap', label: 'HashMap' },
      { value: 'TreeMap', label: 'TreeMap' },
      { value: 'ConcurrentHashMap', label: 'ConcurrentHashMap' },
      { value: 'LinkedHashMap', label: 'LinkedHashMap' }
    ]
  },
  {
    text: '9. Keyword to prevent inheritance?',
    correct: 'final',
    options: [
      { value: 'static', label: 'static' },
      { value: 'const', label: 'const' },
      { value: 'final', label: 'final' },
      { value: 'sealed', label: 'sealed' }
    ]
  }
]

export default function LevelThreeJava() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>Java Quiz - Level 3</h1>
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