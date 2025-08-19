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
    text: '1. Which JVM component compiles bytecode into native code at runtime?',
    correct: 'JIT Compiler',
    options: [
      { value: 'ClassLoader', label: 'ClassLoader' },
      { value: 'JIT Compiler', label: 'JIT Compiler' },
      { value: 'Garbage Collector', label: 'Garbage Collector' },
      { value: 'Interpreter', label: 'Interpreter' }
    ]
  },
  {
    text: '2. Which Garbage Collector provides low-latency and was introduced in Java 11?',
    correct: 'ZGC',
    options: [
      { value: 'ZGC', label: 'ZGC' },
      { value: 'G1 GC', label: 'G1 GC' },
      { value: 'Shenandoah GC', label: 'Shenandoah GC' },
      { value: 'Parallel GC', label: 'Parallel GC' }
    ]
  },
  {
    text: '3. Which tool is used to record profiling and diagnostics in the JVM?',
    correct: 'Java Flight Recorder',
    options: [
      { value: 'Java Flight Recorder', label: 'Java Flight Recorder' },
      { value: 'JConsole', label: 'JConsole' },
      { value: 'VisualVM', label: 'VisualVM' },
      { value: 'Mission Control', label: 'Mission Control' }
    ]
  },
  {
    text: '4. Which project introduces lightweight virtual threads in Java?',
    correct: 'Project Loom',
    options: [
      { value: 'Project Loom', label: 'Project Loom' },
      { value: 'Project Valhalla', label: 'Project Valhalla' },
      { value: 'Project Panama', label: 'Project Panama' },
      { value: 'Project Amber', label: 'Project Amber' }
    ]
  },
  {
    text: '5. Which JVM option enables Just-In-Time (JIT) compilation logging?',
    correct: '-XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation',
    options: [
      { value: '-verbose:jit', label: '-verbose:jit' },
      { value: '-XX:+PrintGCDetails', label: '-XX:+PrintGCDetails' },
      { value: '-XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation', label: '-XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation' },
      { value: '-XX:+EnableJITLog', label: '-XX:+EnableJITLog' }
    ]
  },
  {
    text: '6. Which technology allows Java to interoperate with native libraries more easily?',
    correct: 'Project Panama',
    options: [
      { value: 'Project Panama', label: 'Project Panama' },
      { value: 'JNI', label: 'JNI' },
      { value: 'Project Amber', label: 'Project Amber' },
      { value: 'Project Loom', label: 'Project Loom' }
    ]
  },
  {
    text: '7. Which JVM optimization removes unused code paths at runtime?',
    correct: 'Dead Code Elimination',
    options: [
      { value: 'Escape Analysis', label: 'Escape Analysis' },
      { value: 'Dead Code Elimination', label: 'Dead Code Elimination' },
      { value: 'Inlining', label: 'Inlining' },
      { value: 'Tiered Compilation', label: 'Tiered Compilation' }
    ]
  },
  {
    text: '8. Which VM is designed for polyglot programming (Java + other languages)?',
    correct: 'GraalVM',
    options: [
      { value: 'GraalVM', label: 'GraalVM' },
      { value: 'HotSpot', label: 'HotSpot' },
      { value: 'Dalvik', label: 'Dalvik' },
      { value: 'OpenJ9', label: 'OpenJ9' }
    ]
  },
  {
    text: '9. Which analysis detects if objects can be allocated on the stack instead of heap?',
    correct: 'Escape Analysis',
    options: [
      { value: 'Dead Code Elimination', label: 'Dead Code Elimination' },
      { value: 'Escape Analysis', label: 'Escape Analysis' },
      { value: 'Inlining', label: 'Inlining' },
      { value: 'Garbage Collection', label: 'Garbage Collection' }
    ]
  }

]

export default function LevelEightJava() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>Java Quiz - Level 8</h1>
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
        <Button onPress={handleSubmit} className='w-96 text-po' size='lg' color='success' variant='ghost'>
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