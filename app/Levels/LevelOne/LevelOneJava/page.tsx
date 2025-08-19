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
    text: '1. Which keyword is used to define a class in Java?',
    correct: 'class',
    options: [
      { value: 'struct', label: 'struct' },
      { value: 'class', label: 'class' },
      { value: 'object', label: 'object' },
      { value: 'define',  label: 'define' }
    ]
  },
  {
    text: '2. What is the correct method to print text in Java?',
    correct: 'System.out.println',
    options: [
      { value: 'print()', label: 'label()' },
      { value: 'echo()', label: 'echo()' },
      { value: 'System.out.println', label: 'System.out.println("Hello")' },
      { value: 'console.log', label: 'console.log("Hello")'}
    ]
  },
  {
    text: '3. Which keyword is used to create an object in Java?',
    correct: 'new',
    options: [
      { value: 'create', label: 'create' },
      { value: 'object', label: 'object' },
      { value: 'new', label: 'new' },
      { value: 'make', label: 'make' }
    ]
  },
  {
    text: '4.  Which of the following is a correct String declaration?',
    correct: 'String name = "John";',
    options: [
      { value: 'string name = John;', label: 'string name = John;' },
      { value: 'String name = "John";', label: 'String name = "John";' },
      { value: 'String = John;', label: 'String = John;' },
      { value: 'char name = "John;"', label: 'char name = "John";' }
    ]
  },
  {
    text: '5. Which symbol is used to end a statement in Java?',
    correct: ';',
    options: [
      { value: '.', label: '.' },
      { value: ';', label: ';' },
      { value: ':', label: ':' },
      { value: ',', label: ',' }
    ]
  },
  {
    text: '6. What is the entry point of a Java program?',
    correct: 'main method',
    options: [
      { value: 'start()', label: 'start() method' },
      { value: 'run()', label: 'run() method' },
      { value: 'main method', label: 'public static void main(String[] args)' },
      { value: 'execute()', label: 'execute() method' }
    ]
  },
  {
    text: '7. Which of these is a valid data type in Java?',
    correct: 'int',
    options: [
      { value: 'number', label: 'number' },
      { value: 'int', label: 'int' },
      { value: 'integer', label: 'integer' },
      { value: 'num', label: 'num' }
    ]
  },
  {
    text: '8. How do you declare a constant value in Java?',
    correct: 'final',
    options: [
      { value: 'static', label: 'static' },
      { value: 'const', label: 'const' },
      { value: 'final', label: 'final' },
      { value: 'constant', label: 'constant' }
    ]
  },
  {
    text: '9. Which operator is used to compare two values in Java?',
    correct: '==',
    options: [
      { value: '=', label: '=' },
      { value: '==', label: '==' },
      { value: 'equals', label: 'equals' },
      { value: '===', label: '===' }
    ]
  }
]

export default function LevelOneJava() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>Java Quiz - Level 1</h1>
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