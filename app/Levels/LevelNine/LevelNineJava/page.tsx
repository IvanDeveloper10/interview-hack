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
    text: '1. Which Java API allows remote method invocation between JVMs?',
    correct: 'RMI',
    options: [
      { value: 'RMI', label: 'RMI' },
      { value: 'JNDI', label: 'JNDI' },
      { value: 'JDBC', label: 'JDBC' },
      { value: 'JMS', label: 'JMS' }
    ]
  },
  {
    text: '2. Which protocol is commonly used with gRPC in Java?',
    correct: 'HTTP/2',
    options: [
      { value: 'HTTP/1.1', label: 'HTTP/1.1' },
      { value: 'HTTP/2', label: 'HTTP/2' },
      { value: 'WebSocket', label: 'WebSocket' },
      { value: 'RMI-IIOP', label: 'RMI-IIOP' }
    ]
  },
  {
    text: '3. Which library provides reactive streams in Java?',
    correct: 'Project Reactor',
    options: [
      { value: 'Project Reactor', label: 'Project Reactor' },
      { value: 'Hibernate', label: 'Hibernate' },
      { value: 'Spring Boot', label: 'Spring Boot' },
      { value: 'Apache Kafka', label: 'Apache Kafka' }
    ]
  },
  {
    text: '4. Which Spring Cloud component handles service discovery?',
    correct: 'Eureka',
    options: [
      { value: 'Eureka', label: 'Eureka' },
      { value: 'Ribbon', label: 'Ribbon' },
      { value: 'Hystrix', label: 'Hystrix' },
      { value: 'Zuul', label: 'Zuul' }
    ]
  },
  {
    text: '5. Which resilience pattern is implemented by Hystrix?',
    correct: 'Circuit Breaker',
    options: [
      { value: 'Retry', label: 'Retry' },
      { value: 'Rate Limiter', label: 'Rate Limiter' },
      { value: 'Circuit Breaker', label: 'Circuit Breaker' },
      { value: 'Bulkhead', label: 'Bulkhead' }
    ]
  },
  {
    text: '6. Which messaging system is often integrated with Java for event-driven microservices?',
    correct: 'Apache Kafka',
    options: [
      { value: 'Apache Kafka', label: 'Apache Kafka' },
      { value: 'JDBC', label: 'JDBC' },
      { value: 'JMS', label: 'JMS' },
      { value: 'RMI', label: 'RMI' }
    ]
  },
  {
    text: '7. Which reactive programming API was standardized in Java 9?',
    correct: 'Flow API',
    options: [
      { value: 'Flow API', label: 'Flow API' },
      { value: 'Stream API', label: 'Stream API' },
      { value: 'CompletableFuture', label: 'CompletableFuture' },
      { value: 'ExecutorService', label: 'ExecutorService' }
    ]
  },
  {
    text: '8. Which tool is commonly used for monitoring Java microservices in production?',
    correct: 'Prometheus',
    options: [
      { value: 'Prometheus', label: 'Prometheus' },
      { value: 'JUnit', label: 'JUnit' },
      { value: 'Maven', label: 'Maven' },
      { value: 'JProfiler', label: 'JProfiler' }
    ]
  },
  {
    text: '9. Which Java feature helps achieve backpressure handling in reactive systems?',
    correct: 'Reactive Streams',
    options: [
      { value: 'Reactive Streams', label: 'Reactive Streams' },
      { value: 'Thread Pools', label: 'Thread Pools' },
      { value: 'Parallel Streams', label: 'Parallel Streams' },
      { value: 'ForkJoinPool', label: 'ForkJoinPool' }
    ]
  }
]

export default function LevelNineJava() {

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
      <h1 className='text-po text-6xl text-center my-20 font-bold text-blue-400'>Java Quiz - Level 9</h1>
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