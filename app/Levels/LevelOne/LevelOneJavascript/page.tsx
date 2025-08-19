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
    text: '1. Which keyword is used to declare a variable in JavaScript?',
    correct: 'let',
    options: [
      { value: 'var', label: 'var' },
      { value: 'let', label: 'let' },
      { value: 'const', label: 'const' },
      { value: 'define', label: 'define' }
    ]
  },
  {
    text: '2. How do you write a comment in JavaScript?',
    correct: '//',
    options: [
      { value: '//', label: '// This is a comment' },
      { value: '<!--', label: '<!-- This is a comment -->' },
      { value: '#', label: '# This is a comment' },
      { value: '/*', label: '/* This is a comment */' }
    ]
  },
  {
    text: '3. What does console.log() do?',
    correct: 'prints to console',
    options: [
      { value: 'prints-to-console', label: 'Prints a message to the console' },
      { value: 'saves-to-file', label: 'Saves data to a file' },
      { value: 'runs-a-loop', label: 'Runs a loop' },
      { value: 'compares-value', label: 'Compares values' }
    ]
  },
  {
    text: '4. Which of these is a correct string in JavaScript?',
    correct: '"Hello"',
    options: [
      { value: 'hello', label: 'Hello' },
      { value: '"hello"', label: '"Hello"' },
      { value: '<hello>', label: '<Hello>' },
      { value: '{hello}', label: '{Hello}' }
    ]
  },
  {
    text: '5. How do you create an array in JavaScript?',
    correct: '[]',
    options: [
      { value: '()', label: '(1, 2, 3)' },
      { value: '[]', label: '[1, 2, 3]' },
      { value: '{}', label: '{1, 2, 3}' },
      { value: '<>', label: '<1, 2, 3>' }
    ]
  },
  {
    text: '6. Which operator is used to assign a value to a variable?',
    correct: '=',
    options: [
      { value: '=', label: '=' },
      { value: '==', label: '==' },
      { value: '===', label: '===' },
      { value: ':=', label: ':=' }
    ]
  }, 
  {
    text: '7. Which of these is a Boolean value in JavaScript?',
    correct: 'true',
    options: [
      { value: 'yes', label: 'yes' },
      { value: 'true', label: 'true' },
      { value: '1', label: '1' },
      { value: '"false"', label: '"false"' }
    ]
  },
  {
    text: '8. How do you start a for loop in JavaScript?',
    correct: 'for',
    options:  [
      { value: 'for', label: 'for (let i = 0; i < 5; i++)' },
      { value: 'loop', label: 'loop (i in range(5))' },
      { value: 'foreach', label: 'foreach (i in 5)' },
      { value: 'repeat', label: 'repeat (5 times)' }
    ]
  }, 
  {
    text: '9. How do you check if two values are equal in both value and type?',
    correct: '===',
    options: [
      { value: '==', label: '==' },
      { value: '===', label: '===' },
      { value: '=', label: '=' },
      { value: '!=', label: '!=' }
    ]
  }
]

export default function LevelOneJavascript() {

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value}));
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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-red-400'>JavaScript Quiz - Level 1</h1>
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