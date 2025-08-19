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
    text: '1. What is the worst-case time complexity of Quick Sort?',
    correct: 'O(n^2)',
    options: [
      { value: 'O(n log n)', label: 'O(n log n)' },
      { value: 'O(n^2)', label: 'O(n^2)' },
      { value: 'O(log n)', label: 'O(log n)' },
      { value: 'O(n)', label: 'O(n)' }
    ]
  },
  {
    text: '2. In Python, what does the "with" statement ensure?',
    correct: 'Proper acquisition and release of resources',
    options: [
      { value: 'Code runs faster', label: 'Code runs faster' },
      { value: 'Variables are global', label: 'Variables are global' },
      { value: 'Proper acquisition and release of resources', label: 'Proper acquisition and release of resources' },
      { value: 'Automatic parallel execution', label: 'Automatic parallel execution' }
    ]
  },
  {
    text: '3. Which algorithm is typically used for finding strongly connected components in a graph?',
    correct: "Kosaraju's Algorithm",
    options: [
      { value: "Prim's Algorithm", label: "Prim's Algorithm" },
      { value: "Kruskal's Algorithm", label: "Kruskal's Algorithm" },
      { value: "Kosaraju's Algorithm", label: "Kosaraju's Algorithm" },
      { value: "Dijkstra's Algorithm", label: "Dijkstra's Algorithm" }
    ]
  },
  {
    text: '4. What does GIL stand for in Python?',
    correct: 'Global Interpreter Lock',
    options: [
      { value: 'General Input Library', label: 'General Input Library' },
      { value: 'Global Interpreter Lock', label: 'Global Interpreter Lock' },
      { value: 'Graph Integration Layer', label: 'Graph Integration Layer' },
      { value: 'Global Integer Limit', label: 'Global Integer Limit' }
    ]
  },
  {
    text: '5. In database normalization, what does 3NF (Third Normal Form) eliminate?',
    correct: 'Transitive dependencies',
    options: [
      { value: 'Duplicate rows', label: 'Duplicate rows' },
      { value: 'Multivalued attributes', label: 'Multivalued attributes' },
      { value: 'Transitive dependencies', label: 'Transitive dependencies' },
      { value: 'Partial dependencies', label: 'Partial dependencies' }
    ]
  },
  {
    text: '6. Which Python module is commonly used for asynchronous I/O?',
    correct: 'asyncio',
    options: [
      { value: 'threading', label: 'threading' },
      { value: 'multiprocessing', label: 'multiprocessing' },
      { value: 'asyncio', label: 'asyncio' },
      { value: 'concurrent', label: 'concurrent' }
    ]
  },
  {
    text: '7. In Big-O notation, what is the time complexity of matrix multiplication (naive approach)?',
    correct: 'O(n^3)',
    options: [
      { value: 'O(n^2)', label: 'O(n^2)' },
      { value: 'O(n^3)', label: 'O(n^3)' },
      { value: 'O(n log n)', label: 'O(n log n)' },
      { value: 'O(n^4)', label: 'O(n^4)' }
    ]
  },
  {
    text: '8. Which concurrency model does Node.js use?',
    correct: 'Event loop with non-blocking I/O',
    options: [
      { value: 'Preemptive multithreading', label: 'Preemptive multithreading' },
      { value: 'Event loop with non-blocking I/O', label: 'Event loop with non-blocking I/O' },
      { value: 'Message passing with actors', label: 'Message passing with actors' },
      { value: 'Multi-core parallelism', label: 'Multi-core parallelism' }
    ]
  },
  {
    text: '9. DFS recursion space complexity?',
    correct: 'O(h), h = height/depth',
    options: [
      { value: 'O(1)', label: 'O(1)' },
      { value: 'O(n)', label: 'O(n)' },
      { value: 'O(h)', label: 'O(h), h = height/depth' },
      { value: 'O(log n)', label: 'O(log n)' }
    ]
  }
]

export default function LevelFivePython() {
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
        Python Quiz - Level 5
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
          className='w-96 text-po'
          color='success'
          size='lg'
          variant='ghost'
          onPress={handleSubmit}
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
