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
    text: '1. ETH states?',
    correct: '3-SAT not solvable in sub-exp time',
    options: [
      { value: 'P=NP', label: 'P=NP' },
      { value: '3-SAT not sub-exp', label: '3-SAT not sub-exp' },
      { value: 'NP-complete poly algo', label: 'NP-complete poly algo' },
      { value: 'Space=Time', label: 'Space=Time' }
    ]
  },
  {
    text: '2. FLP result?',
    correct: 'No consensus in async sys w/1 faulty proc',
    options: [
      { value: 'Consensus retries', label: 'Consensus w/ retries' },
      { value: 'No consensus async+fault', label: 'No consensus async+fault' },
      { value: 'Async < sync speed', label: 'Async slower than sync' },
      { value: 'Need N procs', label: 'Need N procs' }
    ]
  },
  {
    text: '3. Shor’s algo factors?',
    correct: 'Large integers',
    options: [
      { value: 'Polynomials', label: 'Polynomials' },
      { value: 'Large ints', label: 'Large integers' },
      { value: 'Graphs', label: 'Random graphs' },
      { value: 'Bool formulas', label: 'Boolean formulas' }
    ]
  },
  {
    text: '4. CAP theorem?',
    correct: 'No system has C+A+P all at once',
    options: [
      { value: 'Sacrifice avail', label: 'Sacrifice availability' },
      { value: 'Always consistent', label: 'Always consistent' },
      { value: 'No C+A+P', label: 'No C+A+P together' },
      { value: 'Partition optional', label: 'Partition optional' }
    ]
  },
  {
    text: '5. Lattice crypto relies on?',
    correct: 'Shortest Vector Problem (SVP)',
    options: [
      { value: 'Factorization', label: 'Integer factorization' },
      { value: 'Discrete log', label: 'Discrete log' },
      { value: 'SVP', label: 'Shortest Vector Problem' },
      { value: 'Graph iso', label: 'Graph isomorphism' }
    ]
  },
  {
    text: '6. Raft leader election?',
    correct: 'Ensure single log source',
    options: [
      { value: 'Byzantine tol', label: 'Byzantine tolerance' },
      { value: 'Single log src', label: 'Single log source' },
      { value: 'Replace Paxos', label: 'Replace Paxos' },
      { value: 'Sync clocks', label: 'Sync clocks' }
    ]
  },
  {
    text: '7. Monad in CS?',
    correct: 'Pattern for computations w/ context',
    options: [
      { value: 'Loop struct', label: 'Loop structure' },
      { value: 'Context pattern', label: 'Comp. w/ context' },
      { value: 'Opt recursion', label: 'Optimize recursion' },
      { value: 'Immutable DS', label: 'Immutable DS' }
    ]
  },
  {
    text: '8. Sorting lower bound?',
    correct: 'Ω(n log n)',
    options: [
      { value: 'Ω(n)', label: 'Ω(n)' },
      { value: 'Ω(n log n)', label: 'Ω(n log n)' },
      { value: 'Ω(n^2)', label: 'Ω(n^2)' },
      { value: 'Ω(log n)', label: 'Ω(log n)' }
    ]
  },
  {
    text: '9. MVCC allows?',
    correct: 'Readers get snapshot w/o block',
    options: [
      { value: 'Writers overwrite', label: 'Writers overwrite' },
      { value: 'Readers snapshot', label: 'Readers snapshot' },
      { value: 'No logging', label: 'No logging' },
      { value: 'Auto opt', label: 'Auto optimize' }
    ]
  }
]

export default function LevelNinePython() {
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
        Python Quiz - Level 9
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
