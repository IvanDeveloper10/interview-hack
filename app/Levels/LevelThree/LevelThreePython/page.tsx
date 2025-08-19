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
    text: '1. What is the time complexity of binary search?',
    correct: 'O(log n)',
    options: [
      { value: 'O(n)', label: 'O(n)' },
      { value: 'O(log n)', label: 'O(log n)' },
      { value: 'O(n log n)', label: 'O(n log n)' },
      { value: 'O(1)', label: 'O(1)' }
    ]
  },
  {
    text: '2. Which keyword is used to define a function in Python?',
    correct: 'def',
    options: [
      { value: 'func', label: 'func' },
      { value: 'define', label: 'define' },
      { value: 'def', label: 'def' },
      { value: 'function', label: 'function' }
    ]
  },
  {
    text: '3. What does the "break" statement do in a loop?',
    correct: 'Ends the loop immediately',
    options: [
      { value: 'Ends the loop immediately', label: 'Ends the loop immediately' },
      { value: 'Skips one iteration', label: 'Skips one iteration' },
      { value: 'Pauses the loop', label: 'Pauses the loop' },
      { value: 'Restarts the loop', label: 'Restarts the loop' }
    ]
  },
  {
    text: '4. Which data structure uses FIFO?',
    correct: 'Queue',
    options: [
      { value: 'Stack', label: 'Stack' },
      { value: 'Queue', label: 'Queue' },
      { value: 'Tree', label: 'Tree' },
      { value: 'Graph', label: 'Graph' }
    ]
  },
  {
    text: '5. What does SQL stand for?',
    correct: 'Structured Query Language',
    options: [
      { value: 'Structured Question Language', label: 'Structured Question Language' },
      { value: 'Simple Query Language', label: 'Simple Query Language' },
      { value: 'Structured Query Language', label: 'Structured Query Language' },
      { value: 'Sequential Query Language', label: 'Sequential Query Language' }
    ]
  },
  {
    text: '6. Which operator is used for floor division in Python?',
    correct: '//',
    options: [
      { value: '/', label: '/' },
      { value: '//', label: '//' },
      { value: '%', label: '%' },
      { value: '**', label: '**' }
    ]
  },
  {
    text: '7. Which keyword is used to define an anonymous function in Python?',
    correct: 'lambda',
    options: [
      { value: 'def', label: 'def' },
      { value: 'lambda', label: 'lambda' },
      { value: 'function', label: 'function' },
      { value: 'anon', label: 'anon' }
    ]
  },
  {
    text: '8. What is the output of len("Programming")?',
    correct: '11',
    options: [
      { value: '9', label: '9' },
      { value: '10', label: '10' },
      { value: '11', label: '11' },
      { value: '12', label: '12' }
    ]
  },
  {
    text: '9. Which keyword is used to exit a loop in Python?',
    correct: 'break',
    options: [
      { value: 'stop', label: 'stop' },
      { value: 'exit', label: 'exit' },
      { value: 'break', label: 'break' },
      { value: 'quit', label: 'quit' }
    ]
  }
]

export default function LevelThreePython() {
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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>
        Python Quiz - Level 3
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
