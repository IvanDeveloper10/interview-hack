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
    text: '1. Algo for strongly connected comps?',
    correct: "Kosaraju's Algorithm",
    options: [
      { value: "Dijkstra", label: "Dijkstra" },
      { value: "Kruskal", label: "Kruskal" },
      { value: "Kosaraju", label: "Kosaraju" },
      { value: "Prim", label: "Prim" }
    ]
  },
  {
    text: '2. Python GIL prevents?',
    correct: 'Multiple threads exec bytecode at once',
    options: [
      { value: 'Memory leaks', label: 'Memory leaks' },
      { value: 'Multi-proc', label: 'Multiple processes' },
      { value: 'Threads-bytecode', label: 'Threads exec bytecode at once' },
      { value: 'Recursion', label: 'Block recursion' }
    ]
  },
  {
    text: '3. Median of Medians complexity?',
    correct: 'O(n)',
    options: [
      { value: 'O(n log n)', label: 'O(n log n)' },
      { value: 'O(log n)', label: 'O(log n)' },
      { value: 'O(n)', label: 'O(n)' },
      { value: 'O(n^2)', label: 'O(n^2)' }
    ]
  },
  {
    text: '4. Python metaclasses?',
    correct: 'Define class behavior, modify creation',
    options: [
      { value: 'Only attrs', label: 'Only attrs' },
      { value: 'No modify', label: 'No modify creation' },
      { value: 'C-ext', label: 'Only C-ext' },
      { value: 'Define-modify', label: 'Define behavior + modify creation' }
    ]
  },
  {
    text: '5. Phantom read in DB?',
    correct: 'New rows from another txn insert',
    options: [
      { value: 'Delete row', label: 'Row deleted' },
      { value: 'Dup rows', label: 'Duplicate rows' },
      { value: 'New rows', label: 'New rows by insert' },
      { value: 'Locked row', label: 'Row locked' }
    ]
  },
  {
    text: '6. Copy-on-write purpose?',
    correct: 'Delay copy until modified',
    options: [
      { value: 'Prevent leaks', label: 'Prevent leaks' },
      { value: 'Shared mem', label: 'Shared mem safely' },
      { value: 'Delay copy', label: 'Delay copy until mod' },
      { value: 'Auto free', label: 'Auto free mem' }
    ]
  },
  {
    text: '7. Post-quantum secure scheme?',
    correct: 'Lattice-based crypto',
    options: [
      { value: 'RSA', label: 'RSA' },
      { value: 'ECC', label: 'ECC' },
      { value: 'Lattice', label: 'Lattice-based' },
      { value: 'DH', label: 'Diffie-Hellman' }
    ]
  },
  {
    text: '8. NP-complete class?',
    correct: 'In NP + as hard as any NP',
    options: [
      { value: 'O(1)', label: 'O(1) solvable' },
      { value: 'P', label: 'Poly-time solvable' },
      { value: 'NP-hard', label: 'In NP & hardest' },
      { value: 'Quantum', label: 'Quantum only' }
    ]
  },
  {
    text: '9. Lamport Timestamps idea?',
    correct: 'Logical order w/o physical clocks',
    options: [
      { value: 'Sync clocks', label: 'Sync real clocks' },
      { value: 'Simul exec', label: 'Simultaneous exec' },
      { value: 'Logical order', label: 'Logical order no real clocks' },
      { value: 'No consensus', label: 'Skip consensus' }
    ]
  }
]

export default function LevelSevenPython() {
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
        Python Quiz - Level 7
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
