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
    text: '1. What will the following code log? console.log([] + [])',
    correct: '""',
    options: [
      { value: '""', label: '"" (empty string)' },
      { value: '[]', label: '[]' },
      { value: 'undefined', label: 'undefined' },
      { value: 'NaN', label: 'NaN' }
    ]
  },
  {
    text: '2. In JavaScript, what is a closure?',
    correct: 'A function with access to its outer scope even after the outer function has finished executing',
    options: [
      { value: 'block-scope', label: 'A block-level scope' },
      { value: 'private-function', label: 'A private function' },
      { value: 'function-with-scope', label: 'A function with access to its outer scope even after the outer function has finished executing' },
      { value: 'self-invoking', label: 'A self-invoking function' }
    ]
  },
  {
    text: '3. What does "this" refer to inside a regular function (not strict mode) when called in the global scope?',
    correct: 'global object',
    options: [
      { value: 'undefined', label: 'undefined' },
      { value: 'global-object', label: 'The global object (window in browsers)' },
      { value: 'null', label: 'null' },
      { value: 'itself', label: 'The function itself' }
    ]
  },
  {
    text: '4. How do you correctly use async/await?',
    correct: 'Await can only be used inside an async function',
    options: [
      { value: 'anywhere', label: 'Await can be used anywhere' },
      { value: 'async-only', label: 'Await can only be used inside an async function' },
      { value: 'no-await', label: 'Await works without async' },
      { value: 'promise-only', label: 'Await can only be used with Promises' }
    ]
  },
  {
    text: '5. What will the following log? console.log(0.1 + 0.2 === 0.3)',
    correct: 'false',
    options: [
      { value: 'true', label: 'true' },
      { value: 'false', label: 'false' },
      { value: 'undefined', label: 'undefined' },
      { value: 'NaN', label: 'NaN' }
    ]
  },
  {
    text: '6. How can you copy all properties from one object to another?',
    correct: 'Object.assign(target, source)',
    options: [
      { value: 'Object.assign', label: 'Object.assign(target, source)' },
      { value: 'Object.copy', label: 'Object.copy(target, source)' },
      { value: 'spread', label: '{ ...source }' },
      { value: 'clone', label: 'clone(source)' }
    ]
  },
  {
    text: '7. What does the "bind()" method do?',
    correct: 'Creates a new function with a specified "this" value',
    options: [
      { value: 'bind-this', label: 'Creates a new function with a specified "this" value' },
      { value: 'bind-args', label: 'Binds only the arguments of a function' },
      { value: 'bind-exec', label: 'Immediately calls the function with bound arguments' },
      { value: 'bind-loop', label: 'Binds the function to a loop' }
    ]
  },
  {
    text: '8. Which statement is true about destructuring?',
    correct: 'You can assign default values while destructuring',
    options: [
      { value: 'default-values', label: 'You can assign default values while destructuring' },
      { value: 'only-arrays', label: 'It only works with arrays' },
      { value: 'no-defaults', label: 'Default values are not allowed' },
      { value: 'only-objects', label: 'It only works with objects' }
    ]
  },
  {
    text: '9. What will this output? console.log(typeof NaN)',
    correct: 'number',
    options: [
      { value: 'NaN', label: 'NaN' },
      { value: 'number', label: 'number' },
      { value: 'undefined', label: 'undefined' },
      { value: 'string', label: 'string' }
    ]
  }
]

export default function LevelThreeJavascript() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-fuchsia-400'>JavaScript Quiz - Level 3</h1>
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