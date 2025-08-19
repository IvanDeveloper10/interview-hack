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
    text: '1. Keyword to inherit a class?',
    correct: 'extends',
    options: [
      { value: 'inherits', label: 'inherits' },
      { value: 'extends', label: 'extends' },
      { value: 'implements', label: 'implements' },
      { value: 'super', label: 'super' }
    ]
  },
  {
    text: '2. Keyword for interface?',
    correct: 'implements',
    options: [
      { value: 'extends', label: 'extends' },
      { value: 'interface', label: 'interface' },
      { value: 'implements', label: 'implements' },
      { value: 'inherit', label: 'inherit' }
    ]
  },
  {
    text: '3. Not an access modifier?',
    correct: 'friend',
    options: [
      { value: 'public', label: 'public' },
      { value: 'private', label: 'private' },
      { value: 'protected', label: 'protected' },
      { value: 'friend', label: 'friend' }
    ]
  },
  {
    text: '4. Method overloading?',
    correct: 'same name, diff params',
    options: [
      { value: 'same name, same params', label: 'same name, same params' },
      { value: 'same name, diff params', label: 'same name, diff params' },
      { value: 'method inside method', label: 'method inside method' },
      { value: 'method in many classes', label: 'method in many classes' }
    ]
  },
  {
    text: '5. Parent of all classes?',
    correct: 'Object',
    options: [
      { value: 'Main', label: 'Main' },
      { value: 'Base', label: 'Base' },
      { value: 'Object', label: 'Object' },
      { value: 'Root', label: 'Root' }
    ]
  },
  {
    text: '6. Divide by zero exception?',
    correct: 'ArithmeticException',
    options: [
      { value: 'NullPointerException', label: 'NullPointerException' },
      { value: 'IOException', label: 'IOException' },
      { value: 'ArithmeticException', label: 'ArithmeticException' },
      { value: 'IndexOutOfBounds', label: 'IndexOutOfBounds' }
    ]
  },
  {
    text: '7. No duplicates allowed?',
    correct: 'HashSet',
    options: [
      { value: 'ArrayList', label: 'ArrayList' },
      { value: 'HashMap', label: 'HashMap' },
      { value: 'HashSet', label: 'HashSet' },
      { value: 'LinkedList', label: 'LinkedList' }
    ]
  },
  {
    text: '8. Polymorphism?',
    correct: 'many forms',
    options: [
      { value: 'many forms', label: 'many forms' },
      { value: 'many objects', label: 'many objects' },
      { value: 'reuse code', label: 'reuse code' },
      { value: 'many vars', label: 'many vars' }
    ]
  },
  {
    text: '9. Abstract class?',
    correct: 'abstract + normal methods',
    options: [
      { value: 'only abstract methods', label: 'only abstract methods' },
      { value: 'no constructors', label: 'no constructors' },
      { value: 'abstract + normal methods', label: 'abstract + normal methods' },
      { value: 'cannot extend', label: 'cannot extend' }
    ]
  }

]

export default function LevelTwoJava() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>Java Quiz - Level 2</h1>
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