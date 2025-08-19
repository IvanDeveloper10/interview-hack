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
    text: '1. What is the prototype chain used for in JavaScript?',
    correct: 'Inheritance of properties and methods',
    options: [
      { value: 'memory-optimization', label: 'Memory optimization' },
      { value: 'inheritance', label: 'Inheritance of properties and methods' },
      { value: 'data-binding', label: 'Data binding between objects' },
      { value: 'event-listening', label: 'Automatic event listening' }
    ]
  },
  {
    text: '2. What is the output of: console.log([] == ![])',
    correct: 'true',
    options: [
      { value: 'true', label: 'true' },
      { value: 'false', label: 'false' },
      { value: 'undefined', label: 'undefined' },
      { value: 'error', label: 'Error' }
    ]
  },
  {
    text: '3. Which statement about the event loop is correct?',
    correct: 'It handles asynchronous callbacks after the main call stack is empty',
    options: [
      { value: 'async-first', label: 'It executes asynchronous callbacks before synchronous code' },
      { value: 'callstack-priority', label: 'It handles asynchronous callbacks after the main call stack is empty' },
      { value: 'sync-only', label: 'It only runs synchronous code' },
      { value: 'multi-thread', label: 'It runs JavaScript on multiple threads' }
    ]
  },
  {
    text: '4. What is the purpose of the Symbol type in JavaScript?',
    correct: 'To create unique property keys',
    options: [
      { value: 'unique-keys', label: 'To create unique property keys' },
      { value: 'private-variables', label: 'To create private variables' },
      { value: 'debugging', label: 'To store debugging information' },
      { value: 'performance', label: 'To improve performance' }
    ]
  },
  {
    text: '5. How can you make an object iterable?',
    correct: 'Implement the [Symbol.iterator]() method',
    options: [
      { value: 'iterator-method', label: 'Implement the [Symbol.iterator]() method' },
      { value: 'for-loop', label: 'Use a for loop on the object' },
      { value: 'map-method', label: 'Add a map() method to the object' },
      { value: 'spread-object', label: 'Spread the object into an array' }
    ]
  },
  {
    text: '6. What will this output? console.log(Promise.resolve(5).then(console.log));',
    correct: 'Logs 5 and returns a Promise',
    options: [
      { value: '5-promise', label: 'Logs 5 and returns a Promise' },
      { value: '5-undefined', label: 'Logs 5 and returns undefined' },
      { value: 'promise-only', label: 'Returns a Promise without logging' },
      { value: 'error', label: 'Throws an error' }
    ]
  },
  {
    text: '7. What does the "super" keyword do in a JavaScript class?',
    correct: 'Calls the constructor or methods of the parent class',
    options: [
      { value: 'parent-call', label: 'Calls the constructor or methods of the parent class' },
      { value: 'super-scope', label: 'Accesses the global scope' },
      { value: 'bind-parent', label: 'Binds "this" to the parent object' },
      { value: 'extends-only', label: 'Only works with extends keyword but not for method calls' }
    ]
  },
  {
    text: '8. What will this output? console.log([..."hello"]);',
    correct: "['h','e','l','l','o']",
    options: [
      { value: 'chars-array', label: "['h','e','l','l','o']" },
      { value: 'string', label: "'hello'" },
      { value: 'error', label: 'Error' },
      { value: 'undefined', label: 'undefined' }
    ]
  },
  {
    text: '9. What is a generator function?',
    correct: 'A function that can pause execution and resume later',
    options: [
      { value: 'async-function', label: 'A function that runs asynchronously' },
      { value: 'pause-resume', label: 'A function that can pause execution and resume later' },
      { value: 'factory', label: 'A function that creates other functions' },
      { value: 'recursion', label: 'A recursive function' }
    ]
  }
]

export default function LevelFourJavascript() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-fuchsia-400'>JavaScript Quiz - Level 4</h1>
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