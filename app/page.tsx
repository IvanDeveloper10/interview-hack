import { Fragment } from 'react';
import { Button } from '@heroui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Fragment>
      <section className='bg-white rounded-3xl w-full h-screen flex  flex-col'>
        <main className='flex justify-center items-center text-purple-500'>
          <h1 className='text-center text-po text-9xl font-bold my-20 animate-bounce'>INTERVIEW HACK</h1>
        </main>
        <div className='flex justify-center items-center'>
          <p className='text-po text-center text-black w-96'>The place where you can take programming exams, whether for work or to test your programming knowledge.</p>
        </div>
        <div className='w-full flex justify-center items-center gap-20 mt-10'>
          <Link href={'/QuizBasic'}>
            <Button variant='flat' color='warning' radius='sm' size='lg' className='text-po text-xl'>START</Button>
          </Link>
          <Link href={'/Levels'}>
            <Button variant='shadow' color='danger' radius='sm' size='lg' className='text-po text-xl'>CHOOSE LEVEL</Button>
          </Link>
        </div>
      </section>
    </Fragment>
  );
}