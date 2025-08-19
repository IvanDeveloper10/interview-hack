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
    text: '1. Which function is used to display output in python?',
    correct: 'print',
    options: [
      { value: 'echo', label: 'echo()' },
      { value: 'print', label: 'print()' },
      { value: 'log', label: 'log()' },
      { value: 'console', label: 'console()' }
    ]
  },
  {
    text: '2. How do you write a comment in Python?',
    correct: '#',
    options: [
      { value: '#', label: '# This is a comment' },
      { value: '//', label: '// This is a comment' },
      { value: '<!--', label: '<!-- comment -->' },
      { value: '/*', label: '/* comment */' }
    ]
  },
  {
    text: '3. Which data type is used to store text?',
    correct: 'str',
    options: [
      { value: 'int', label: 'int' },
      { value: 'float', label: 'float' },
      { value: 'str', label: 'str' },
      { value: 'bool', label: 'bool' }
    ]
  },
  {
    text: '4. How do you create a list in python?',
    correct: '[]',
    options: [
      { value: '()', label: '(1, 2, 3)' },
      { value: '[]', label: '[1, 2, 3]' },
      { value: '{}', label: '{1, 2, 3}' },
      { value: '<>', label: '<1, 2, 3>' }
    ]
  },
  {
    text: '5. What is the correct way to define a function?',
    correct: 'def',
    options: [
      { value: 'func', label: 'func myFunction():' },
      { value: 'def', label: 'def my_function():' },
      { value: 'function', label: 'function myFunction()' },
      { value: 'lambda', label: 'lambda myFunction()' }
    ]
  },
  {
    text: '6. Which operator is used for exponentiation?',
    correct: '**',
    options: [
      { value: '^', label: '^' },
      { value: '**', label: '**' },
      { value: 'exp', label: 'exp()' },
      { value: '^^', label: '^^'}
    ]
  },
  {
    text: '7. What is the boolean value for true in Python?',
    correct: 'True',
    options: [
      { value: 'true', label: 'true' },
      { value: 'TRUE', label: 'TRUE' },
      { value: 'True', label: 'True' },
      { value: '1', label: '1' }
    ]
  },
  {
    text: '8. Which keyword is used to start a loop?',
    correct: 'for',
    options: [
      { value: 'for', label: 'for' },
      { value: 'loop', label: 'loop' },
      { value: 'repeat', label: 'repeat' },
      { value: 'iterate', label: 'iterate' }
    ]
  },
  {
    text: '9. How do you check equality between two values?',
    correct: '==',
    options: [
      { value: '=', label: '=' },
      { value: '==', label: '==' },
      { value: '===', label: '===' },
      { value: 'eq', label: 'eq' }
    ]
  }
]

export default function LevelOnePython() {

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value}));
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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>
        Python Quiz - Level 1
      </h1>
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