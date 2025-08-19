'use client';

import { Fragment, useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { RadioGroup, Radio } from '@heroui/radio';
import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@heroui/modal';
import { Button } from '@heroui/button';
import { Code } from '@heroui/code';
import Link from 'next/link';

type Option = {
  value: string;
  label: string;
};

type Question = {
  text: string;
  correct: string;
  options: Option[];
};

const questions: Question[] = [
  {
    text: '1. What is a variable in programming?',
    correct: 'a-memory-space-used-to-store-data',
    options: [
      { value: 'a-type-of-error', label: 'A type of error' },
      { value: 'a-constant-value', label: 'A constant value' },
      { value: 'a-memory-space-used-to-store-data', label: 'A memory space used to store data' },
      { value: 'an-infinite-loop', label: 'An infinite loop' }
    ]
  },
  {
    text: '2. What kind of structure is an if statement in most language?',
    correct: 'conditional',
    options: [
      { value: 'loop', label: 'Loop' },
      { value: 'conditional', label: 'Conditional' },
      { value: 'function', label: 'Function' },
      { value: 'variable-declaration', label: 'Variable declaration' }
    ]
  },
  {
    text: '3. What is the most common symbol for comparing equality in languages like JavaScript or Python?',
    correct: '==',
    options: [
      { value: '=', label: '=' },
      { value: '==', label: '==' },
      { value: ':=', label: ':=' },
      { value: '!==', label: '!==' }
    ]
  },
  {
    text: '4. What does a for loop do?',
    correct: 'repeats-a-block-of-code',
    options: [
      { value: 'execute-a-function-one', label: 'Executes a function one' },
      { value: 'repeats-a-block-of-code', label: 'Repeats a block of code' },
      { value: 'calls-another-function', label: 'Calls another function' },
      { value: 'stops-the-program', label: 'Stops the program' }
    ]
  },
  {
    text: '5. What is a function?',
    correct: 'a-reusable-set-of-instructions',
    options: [
      { value: 'a-loop-inside-another-loop', label: 'A loop inside another loop' },
      { value: 'a-reusable-set-of-instructions', label: 'A reusable set of instructions' },
      { value: 'a-variable', label: 'A variable' },
      { value: 'a-code-error', label: 'A code error' }
    ]
  },
  {
    text: '6. What does console.log() do in JavaScript?',
    correct: 'print-data-to-the-console',
    options: [
      { value: 'save-data', label: 'Save data' },
      { value: 'print-data-to-the-console', label: 'Print data to the console' },
      { value: 'run-a-loop', label: 'Run a loop' },
      { value: 'compare-values', label: 'Compare values' }
    ]
  },
  {
    text: '7. Which data type is used to store text?',
    correct: 'string',
    options: [
      { value: 'integer', label: 'Integer' },
      { value: 'string', label: 'String' },
      { value: 'boolean', label: 'Boolean' },
      { value: 'float', label: 'Float' }
    ]
  },
  {
    text: '8. What does a function return if there\'s no explicit return statement?',
    correct: 'undefined-or-none',
    options: [
      { value: 'error', label: 'Error' },
      { value: 'the-last-used-value', label: 'The last used value' },
      { value: 'undefined-or-none', label: 'Undefined or None' },
      { value: '0', label: '0' }
    ]
  },
  {
    text: '9. What does && mean in many programming languages?',
    correct: 'logical-and',
    options: [
      { value: 'logical-or', label: 'Logical OR' },
      { value: 'logical-and', label: 'Logical AND' },
      { value: 'equality-check', label: 'Equality check' },
      { value: 'end-of-instructions', label: 'End of instructions' }
    ]
  }
];

export default function QuizBasic() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) correctCount++;
    });
    setScore(correctCount);
    setIsModalOpen(true);
  };

  return (
    <Fragment>
      <h1 className='text-8xl text-center my-20 text-po font-bold text-purple-400'>Quiz Basic</h1>
      <div className='w-full grid grid-cols-3 place-content-center place-items-center gap-5'>
        {questions.map((q, i) => (
          <Card key={i} className='w-96 h-72 p-2'>
            <CardHeader>
              <h1 className='text-lg text-po text-pink-300'>{q.text}</h1>
            </CardHeader>
            <CardBody className='flex justify-end text-po'>
              <RadioGroup value={answers[i] || ''} onValueChange={(val) => handleSelect(i, val)}>
                {q.options.map((opt, idx) => (
                  <Radio key={idx} value={opt.value}>{opt.label}</Radio>
                ))}
              </RadioGroup>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className='my-10 flex w-full justify-center items-center'>
        <Button onPress={handleSubmit} className='text-po w-96' size='lg' color='success' variant='ghost'>
          SUBMIT EXAM
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='text-xl font-bold text-po'>Exam Result</ModalHeader>
              <ModalBody className='text-po'>
                <p>Total Questions: {questions.length}</p>
                <p>Correct Answers: {score}</p>
                <p>Incorrect Answers: {questions.length - score}</p>
                <p>Score: {((score / questions.length) * 100).toFixed(2)}%</p>
              </ModalBody>
              <ModalFooter>
                <Link href={'/Levels'}>
                  <Button color='primary' className='text-po' size='md' variant='shadow' onPress={onClose}>
                    Go To Levels
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
