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
      { value: 'implements', label: 'implements' },
      { value: 'extends', label: 'extends' },
      { value: 'inherit', label: 'inherit' },
      { value: 'super', label: 'super' }
    ]
  },
  {
    text: '2. Keyword to implement an interface?',
    correct: 'implements',
    options: [
      { value: 'extends', label: 'extends' },
      { value: 'interface', label: 'interface' },
      { value: 'implements', label: 'implements' },
      { value: 'import', label: 'import' }
    ]
  },
  {
    text: '3. Default value of int in Java?',
    correct: '0',
    options: [
      { value: 'null', label: 'null' },
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: 'undefined', label: 'undefined' }
    ]
  },
  {
    text: '4. Which collection does not allow duplicates?',
    correct: 'Set',
    options: [
      { value: 'List', label: 'List' },
      { value: 'Set', label: 'Set' },
      { value: 'Map', label: 'Map' },
      { value: 'Queue', label: 'Queue' }
    ]
  },
  {
    text: '5. Root of all classes in Java?',
    correct: 'Object',
    options: [
      { value: 'Class', label: 'Class' },
      { value: 'Super', label: 'Super' },
      { value: 'Object', label: 'Object' },
      { value: 'Base', label: 'Base' }
    ]
  },
  {
    text: '6. Method that runs before garbage collection?',
    correct: 'finalize()',
    options: [
      { value: 'destroy()', label: 'destroy()' },
      { value: 'close()', label: 'close()' },
      { value: 'finalize()', label: 'finalize()' },
      { value: 'end()', label: 'end()' }
    ]
  },
  {
    text: '7. Which collection maintains insertion order?',
    correct: 'LinkedHashMap',
    options: [
      { value: 'HashMap', label: 'HashMap' },
      { value: 'TreeMap', label: 'TreeMap' },
      { value: 'LinkedHashMap', label: 'LinkedHashMap' },
      { value: 'HashSet', label: 'HashSet' }
    ]
  },
  {
    text: '8. Which keyword is used for package import?',
    correct: 'import',
    options: [
      { value: 'include', label: 'include' },
      { value: 'import', label: 'import' },
      { value: 'package', label: 'package' },
      { value: 'use', label: 'use' }
    ]
  },
  {
    text: '9. Which access modifier makes a member visible only in the same package?',
    correct: 'default',
    options: [
      { value: 'private', label: 'private' },
      { value: 'protected', label: 'protected' },
      { value: 'default', label: 'default (no modifier)' },
      { value: 'public', label: 'public' }
    ]
  }
]

export default function LevelFiveJava() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>Java Quiz - Level 5</h1>
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