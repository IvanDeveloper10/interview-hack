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
    text: '1. Algo for articulation points?',
    correct: "Tarjan's Algorithm",
    options: [
      { value: 'Dijkstra', label: 'Dijkstra' },
      { value: 'Kruskal', label: 'Kruskal' },
      { value: 'Tarjan', label: 'Tarjan' },
      { value: 'Prim', label: 'Prim' }
    ]
  },
  {
    text: '2. Deep vs shallow copy in Python?',
    correct: 'Deep copies nested objs, shallow refs them',
    options: [
      { value: 'both-ref', label: 'Both only refs' },
      { value: 'deep-shallow', label: 'Deep copies nested, shallow refs' },
      { value: 'shallow-slow', label: 'Shallow slower' },
      { value: 'same', label: 'Same' }
    ]
  },
  {
    text: '3. Heap build time complexity?',
    correct: 'O(n)',
    options: [
      { value: 'logn', label: 'O(log n)' },
      { value: 'nlogn', label: 'O(n log n)' },
      { value: 'n', label: 'O(n)' },
      { value: 'n2', label: 'O(n^2)' }
    ]
  },
  {
    text: '4. NOT true about Python decorators?',
    correct: 'Only for classes',
    options: [
      { value: 'modify-func', label: 'Modify funcs' },
      { value: 'only-class', label: 'Only for classes' },
      { value: 'at-symbol', label: '@ symbol' },
      { value: 'hof', label: 'Higher-order funcs' }
    ]
  },
  {
    text: '5. OLTP vs OLAP?',
    correct: 'OLTP = transactional, OLAP = analytical',
    options: [
      { value: 'reverse', label: 'OLTP = analytical, OLAP = transactional' },
      { value: 'both-trans', label: 'Both transactional' },
      { value: 'correct', label: 'OLTP = transactional, OLAP = analytical' },
      { value: 'both-analytical', label: 'Both analytical' }
    ]
  },
  {
    text: '6. Purpose of __slots__ in Python?',
    correct: 'Restricts attrs, saves memory',
    options: [
      { value: 'private', label: 'Private vars' },
      { value: 'restrict', label: 'Restricts attrs, saves memory' },
      { value: 'static', label: 'All static' },
      { value: 'no-inherit', label: 'Disables inheritance' }
    ]
  },
  {
    text: '7. Public-key crypto algo?',
    correct: 'RSA',
    options: [
      { value: 'rsa', label: 'RSA' },
      { value: 'aes', label: 'AES' },
      { value: 'sha', label: 'SHA-256' },
      { value: 'md5', label: 'MD5' }
    ]
  },
  {
    text: '8. Amortized push/pop in dynamic array stack?',
    correct: 'O(1)',
    options: [
      { value: '1', label: 'O(1)' },
      { value: 'n', label: 'O(n)' },
      { value: 'logn', label: 'O(log n)' },
      { value: 'nlogn', label: 'O(n log n)' }
    ]
  },
  {
    text: '9. CAP theorem trade-off?',
    correct: 'Consistency, Availability, Partition tolerance',
    options: [
      { value: 'cap1', label: 'Cost, Accuracy, Performance' },
      { value: 'cap2', label: 'Consistency, Availability, Partition tolerance' },
      { value: 'cap3', label: 'Capacity, Allocation, Performance' },
      { value: 'cap4', label: 'Concurrency, Atomicity, Persistence' }
    ]
  }
]

export default function LevelSixPython() {
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
        Python Quiz - Level 6
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
