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
    text: '1. What is the time complexity of quicksort in the average case?',
    correct: 'O(n log n)',
    options: [
      { value: 'O(n^2)', label: 'O(n^2)' },
      { value: 'O(n log n)', label: 'O(n log n)' },
      { value: 'O(log n)', label: 'O(log n)' },
      { value: 'O(n)', label: 'O(n)' }
    ]
  },
  {
    text: '2. In Python, what is the difference between "is" and "=="?',
    correct: '"is" checks identity, "==" checks value equality',
    options: [
      { value: '"is" checks value equality, "==" checks identity', label: '"is" checks value equality, "==" checks identity' },
      { value: 'Both check identity', label: 'Both check identity' },
      { value: 'Both check value equality', label: 'Both check value equality' },
      { value: '"is" checks identity, "==" checks value equality', label: '"is" checks identity, "==" checks value equality' }
    ]
  },
  {
    text: '3. Which data structure provides O(1) average time complexity for search, insert, and delete operations?',
    correct: 'Hash Table',
    options: [
      { value: 'Array', label: 'Array' },
      { value: 'Linked List', label: 'Linked List' },
      { value: 'Hash Table', label: 'Hash Table' },
      { value: 'Binary Search Tree', label: 'Binary Search Tree' }
    ]
  },
  {
    text: '4. What does the "yield" keyword do in Python?',
    correct: 'Turns a function into a generator',
    options: [
      { value: 'Ends the function immediately', label: 'Ends the function immediately' },
      { value: 'Turns a function into a generator', label: 'Turns a function into a generator' },
      { value: 'Pauses the loop', label: 'Pauses the loop' },
      { value: 'Creates an anonymous function', label: 'Creates an anonymous function' }
    ]
  },
  {
    text: '5. Which algorithm is commonly used to find the shortest path in a weighted graph?',
    correct: "Dijkstra's Algorithm",
    options: [
      { value: "Dijkstra's Algorithm", label: "Dijkstra's Algorithm" },
      { value: "Prim's Algorithm", label: "Prim's Algorithm" },
      { value: "Kruskal's Algorithm", label: "Kruskal's Algorithm" },
      { value: "Depth-First Search", label: "Depth-First Search" }
    ]
  },
  {
    text: '6. What is the time complexity of inserting an element in a balanced binary search tree (like AVL)?',
    correct: 'O(log n)',
    options: [
      { value: 'O(1)', label: 'O(1)' },
      { value: 'O(n)', label: 'O(n)' },
      { value: 'O(log n)', label: 'O(log n)' },
      { value: 'O(n log n)', label: 'O(n log n)' }
    ]
  },
  {
    text: '7. In Python, what is the main difference between a list and a tuple?',
    correct: 'Lists are mutable, tuples are immutable',
    options: [
      { value: 'Lists are immutable, tuples are mutable', label: 'Lists are immutable, tuples are mutable' },
      { value: 'Both are mutable', label: 'Both are mutable' },
      { value: 'Both are immutable', label: 'Both are immutable' },
      { value: 'Lists are mutable, tuples are immutable', label: 'Lists are mutable, tuples are immutable' }
    ]
  },
  {
    text: '8. Which of the following sorting algorithms is stable?',
    correct: 'Merge Sort',
    options: [
      { value: 'Quick Sort', label: 'Quick Sort' },
      { value: 'Heap Sort', label: 'Heap Sort' },
      { value: 'Merge Sort', label: 'Merge Sort' },
      { value: 'Selection Sort', label: 'Selection Sort' }
    ]
  },
  {
    text: '9. In Big-O notation, what does O(1) represent?',
    correct: 'Constant time complexity',
    options: [
      { value: 'Linear time complexity', label: 'Linear time complexity' },
      { value: 'Constant time complexity', label: 'Constant time complexity' },
      { value: 'Exponential time complexity', label: 'Exponential time complexity' },
      { value: 'Logarithmic time complexity', label: 'Logarithmic time complexity' }
    ]
  }

]

export default function LevelFourPython() {
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
        Python Quiz - Level 4
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
