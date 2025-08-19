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
    text: '1. Which scheduling algorithm is used by most modern operating systems for CPU scheduling?',
    correct: 'Completely Fair Scheduler (CFS)',
    options: [
      { value: 'Round Robin', label: 'Round Robin' },
      { value: 'First Come First Serve', label: 'First Come First Serve' },
      { value: 'Completely Fair Scheduler (CFS)', label: 'Completely Fair Scheduler (CFS)' },
      { value: 'Shortest Job Next', label: 'Shortest Job Next' }
    ]
  },
  {
    text: '2. In machine learning, what problem does the vanishing gradient mainly affect?',
    correct: 'Training deep neural networks',
    options: [
      { value: 'Clustering algorithms', label: 'Clustering algorithms' },
      { value: 'Training shallow neural networks', label: 'Training shallow neural networks' },
      { value: 'Training deep neural networks', label: 'Training deep neural networks' },
      { value: 'Decision tree construction', label: 'Decision tree construction' }
    ]
  },
  {
    text: '3. What is the time complexity of matrix multiplication using Strassen’s algorithm?',
    correct: 'O(n^2.81)',
    options: [
      { value: 'O(n^2)', label: 'O(n^2)' },
      { value: 'O(n^2.81)', label: 'O(n^2.81)' },
      { value: 'O(n^3)', label: 'O(n^3)' },
      { value: 'O(n log n)', label: 'O(n log n)' }
    ]
  },
  {
    text: '4. In Python, what does the "asyncio" library primarily provide?',
    correct: 'Asynchronous I/O and event loop support',
    options: [
      { value: 'Low-level threading support', label: 'Low-level threading support' },
      { value: 'GPU acceleration for math operations', label: 'GPU acceleration for math operations' },
      { value: 'Asynchronous I/O and event loop support', label: 'Asynchronous I/O and event loop support' },
      { value: 'Automatic memory optimization', label: 'Automatic memory optimization' }
    ]
  },
  {
    text: '5. Main goal of two-phase commit?',
    correct: 'Ensure atomic transactions across distributed systems',
    options: [
      { value: 'Improve query performance', label: 'Improve query performance' },
      { value: 'Prevent phantom reads', label: 'Prevent phantom reads' },
      { value: 'Ensure atomic transactions across distributed systems', label: 'Ensure atomic transactions across distributed systems' },
      { value: 'Simplify schema design', label: 'Simplify schema design' }
    ]
  },
  {
    text: '6. Which consensus algorithm is widely used in blockchain technologies like Bitcoin?',
    correct: 'Proof of Work',
    options: [
      { value: 'Proof of Work', label: 'Proof of Work' },
      { value: 'Raft', label: 'Raft' },
      { value: 'Paxos', label: 'Paxos' },
      { value: 'Proof of Stake', label: 'Proof of Stake' }
    ]
  },
  {
    text: '7. In compiler design, what does SSA (Static Single Assignment) form help optimize?',
    correct: 'Data flow analysis and register allocation',
    options: [
      { value: 'Syntax parsing', label: 'Syntax parsing' },
      { value: 'Tokenization', label: 'Tokenization' },
      { value: 'Data flow analysis and register allocation', label: 'Data flow analysis and register allocation' },
      { value: 'Garbage collection', label: 'Garbage collection' }
    ]
  },
  {
    text: '8. In distributed systems, which protocol solves the consensus problem under crash failures?',
    correct: 'Paxos',
    options: [
      { value: 'Raft', label: 'Raft' },
      { value: 'Byzantine Fault Tolerance', label: 'Byzantine Fault Tolerance' },
      { value: 'Paxos', label: 'Paxos' },
      { value: 'Two-phase commit', label: 'Two-phase commit' }
    ]
  },
  {
    text: '9. In cryptography, which algorithm is used for zero-knowledge proofs in modern blockchain systems?',
    correct: 'zk-SNARKs',
    options: [
      { value: 'RSA', label: 'RSA' },
      { value: 'Elliptic Curve Diffie-Hellman', label: 'Elliptic Curve Diffie-Hellman' },
      { value: 'zk-SNARKs', label: 'zk-SNARKs' },
      { value: 'SHA-3', label: 'SHA-3' }
    ]
  } 
]

export default function LevelEightPython() {
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
        Python Quiz - Level 8
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
