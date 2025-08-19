'use client'

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
    text: '1. Which keyword is used to create a class in Python?',
    correct: 'class',
    options: [
      { value: 'class', label: 'class' },
      { value: 'def', label: 'def' },
      { value: 'struct', label: 'struct' },
      { value: 'function', label: 'function' }
    ]
  },
  {
    text: '2. How do you import a module in Python?',
    correct: 'import',
    options: [
      { value: 'using', label: 'using math' },
      { value: 'require', label: 'require math' },
      { value: 'import', label: 'import math' },
      { value: 'include', label: 'include math' }
    ]
  },
  {
    text: '3. Which method adds an item to a list?',
    correct: 'append',
    options: [
      { value: 'push', label: 'list.push()' },
      { value: 'append', label: 'list.append()' },
      { value: 'add', label: 'list.add()' },
      { value: 'insert', label: 'list.insert()' }
    ]
  },
  {
    text: '4. Which statement is used to handle exceptions?',
    correct: 'try-except',
    options: [
      { value: 'try-catch', label: 'try-catch' },
      { value: 'try-except', label: 'try-except' },
      { value: 'throw', label: 'throw' },
      { value: 'error', label: 'error' }
    ]
  },
  {
    text: '5. What is the output of len("hello")?',
    correct: '5',
    options: [
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: 'Error', label: 'Error' }
    ]
  },
  {
    text: '6. Which operator is used for floor division?',
    correct: '//',
    options: [
      { value: '/', label: '/' },
      { value: '//', label: '//' },
      { value: '%', label: '%' },
      { value: 'div', label: 'div' }
    ]
  },
  {
    text: '7. Which keyword is used to define an anonymous function?',
    correct: 'lambda',
    options: [
      { value: 'def', label: 'def' },
      { value: 'function', label: 'function' },
      { value: 'lambda', label: 'lambda' },
      { value: 'anon', label: 'anon' }
    ]
  },
  {
    text: '8. What is the output of bool("")?',
    correct: 'False',
    options: [
      { value: 'True', label: 'True' },
      { value: 'False', label: 'False' },
      { value: 'None', label: 'None' },
      { value: 'Error', label: 'Error' }
    ]
  },
  {
    text: '9. Which keyword is used to exit a loop?',
    correct: 'break',
    options: [
      { value: 'stop', label: 'stop' },
      { value: 'exit', label: 'exit' },
      { value: 'break', label: 'break' },
      { value: 'quit', label: 'quit' }
    ]
  }
]

export default function LevelTwoPython() {

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>Python Quiz - Level 2</h1>
      <div className='text-po w-full grid grid-cols-3 gap-5 place-content-center place-items-center'>
        {questions.map((q, i) => (
          <Card key={i} className='w-96 h-72 p-2'>
            <CardHeader>
              <h1 className='text-lg text-blue-300'>{q.text}</h1>
            </CardHeader>
            <CardBody className='flex justify-end'>
              <RadioGroup
                value={answers[i] || ''}
                onValueChange={(val) => handleSelect(i, val)}
              >
                {q.options.map((opt, idx) => (
                  <Radio key={idx} value={opt.value}>
                    {opt.label}
                  </Radio>
                ))}
              </RadioGroup>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className='my-10 flex w-full justify-center items-center'>
        <Button
          onPress={handleSubmit}
          className='w-96 text-po'
          size='lg'
          color='success'
          variant='ghost'
        >
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