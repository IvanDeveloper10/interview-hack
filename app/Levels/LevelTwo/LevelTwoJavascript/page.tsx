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
    text: '1. Which method is used to join two or more arrays in JavaScript?',
    correct: 'concat',
    options: [
      { value: 'concat', label: 'concat()' },
      { value: 'join', label: 'join()' },
      { value: 'merge', label: 'merge()' },
      { value: 'push', label: 'push()' }
    ]
  },
  {
    text: '2. What will "typeof null" return in JavaScript?',
    correct: 'object',
    options: [
      { value: 'null', label: 'null' },
      { value: 'undefined', label: 'undefined' },
      { value: 'object', label: 'object' },
      { value: 'string', label: 'string' }
    ]
  },
  {
    text: '3. Which method removes the last element from an array?',
    correct: 'pop',
    options: [
      { value: 'pop', label: 'pop()' },
      { value: 'shift', label: 'shift()' },
      { value: 'slice', label: 'slice()' },
      { value: 'remove', label: 'remove()' }
    ]
  },
  {
    text: '4. How do you write an arrow function that returns the square of x?',
    correct: '(x) => x * x',
    options: [
      { value: '(x) => x * x', label: '(x) => x * x' },
      { value: '(x) => return x * x', label: '(x) => return x * x' },
      { value: 'x => {x * x}', label: 'x => {x * x}' },
      { value: 'square(x)', label: 'square(x)' }
    ]
  },
  {
    text: '5. What does the "===" operator check for?',
    correct: 'value and type equality',
    options: [
      { value: 'value-only', label: 'Only value equality' },
      { value: 'value-and-type', label: 'Value and type equality' },
      { value: 'type-only', label: 'Only type equality' },
      { value: 'assignment', label: 'Assignment' }
    ]
  },
  {
    text: '6. Which method converts a JSON string to a JavaScript object?',
    correct: 'JSON.parse',
    options: [
      { value: 'JSON.stringify', label: 'JSON.stringify()' },
      { value: 'JSON.parse', label: 'JSON.parse()' },
      { value: 'JSON.toObject', label: 'JSON.toObject()' },
      { value: 'JSON.convert', label: 'JSON.convert()' }
    ]
  },
  {
    text: '7. What will the following output: console.log(2 + "2")?',
    correct: '22',
    options: [
      { value: '22', label: '22' },
      { value: '4', label: '4' },
      { value: '"4"', label: '"4"' },
      { value: 'NaN', label: 'NaN' }
    ]
  },
  {
    text: '8. How do you create a JavaScript object?',
    correct: '{}',
    options: [
      { value: '{}', label: '{ key: "value" }' },
      { value: '[]', label: '[ key: "value" ]' },
      { value: '<>', label: '< key: "value" >' },
      { value: '()', label: '( key: "value" )' }
    ]
  },
  {
    text: '9. Which array method creates a new array with elements that pass a test?',
    correct: 'filter',
    options: [
      { value: 'map', label: 'map()' },
      { value: 'filter', label: 'filter()' },
      { value: 'forEach', label: 'forEach()' },
      { value: 'reduce', label: 'reduce()' }
    ]
  }
]

export default function LevelTwoJavascript() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-cyan-400'>JavaScript Quiz - Level 2</h1>
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