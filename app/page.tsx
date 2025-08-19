import { Fragment } from 'react';
import { Button } from '@heroui/button';
import Link from 'next/link';
import Image from 'next/image';

import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <Fragment>
      <section className='bg-white rounded-3xl w-full h-screen flex  flex-col'>
        <main className='flex justify-center items-center'>
          <h1 className='text-center text-po text-9xl font-bold my-20 animate-bounce text-purple-500 rounded-xl'>INTERVIEW <a className='bg-blue-500 rounded-xl text-white px-5'>HACK</a></h1>
        </main>
        <div className='flex justify-center items-center'>
          <p className='text-po text-center text-black w-96'>The place where you can take programming exams, whether for work or to test your programming knowledge.</p>
        </div>
        <div className='w-full flex justify-center items-center gap-20 mt-10'>
          <Link className='hover:scale-110 transition' href={'/QuizBasic'}>
            <Button className='text-po text-xl flex justify-center items-center' color='warning' radius='sm' size='lg' variant='flat'>START <i className='fi fi-rr-arrow-right flex justify-center items-center' /></Button>
          </Link>
          <Link className='hover:scale-110 transition' href={'/Levels'}>
            <Button className='text-po text-xl flex justify-center items-center' color='danger' radius='sm' size='lg' variant='shadow'>CHOOSE LEVEL <i className='fi fi-rr-angle-right flex justify-center items-center' /></Button>
          </Link>
        </div>
        <Image alt={'Question Image'} className='absolute top-96 right-28' height={250} src={'/question-image.svg'} width={250} />
        <Image alt={'Question Image'} className='absolute top-96 left-28' height={250} src={'/interview-image.svg'} width={250} />
      </section>
      <section className='my-20'>
        <div>
          <h1 className='text-po text-5xl text-center'>You can choose between 3 technologies</h1>
        </div>
        <div className='flex justify-evenly items-center mt-10'>
          <Image alt={'Java Logo'} className='' height={100} src={'/java-logo.png'} width={200} />
          <Image alt={'Javascript Logo'} className='rounded-xl drop-shadow-lg' height={100} src={'/javascript-logo.png'} width={200} />
          <Image alt={'Python Logo'} className='drop-shadow-lg' height={100} src={'/python-logo.png'} width={200} />
        </div>
      </section>
      <section className='bg-white rounded-3xl w-full h-screen flex  flex-col p-10'>
        <h1 className='text-center text-po text-5xl text-black'><a className='text-red-500'>There's</a> a game session, check it <a className='text-purple-500'>out!</a></h1>
        <div className='flex justify-evenly items-center my-10'>
          <Image alt={'Game Image One'} height={400} src={'/game-image-one.svg'} width={400} />
          <Image alt={'Game Image Two'} height={400} src={'/game-image-two.svg'} width={400} />
        </div>
        <div className='w-full flex justify-evenly items-center my-5'>
          <Link href={'/Games/GameBot'}>
            <Button className='w-96 text-po flex justify-center items-center' color='warning' variant='shadow'>Go To Play With Bot <i className='fi fi-rr-user-robot flex justify-center items-center' /></Button>
          </Link>
          <Link href={'/Games/GameOnline'}>
            <Button className='w-96 text-po flex justify-center items-center' color='success' variant='shadow'>Go to Play Online <i className='fi fi-rr-globe flex justify-center items-center' /></Button>
          </Link>
        </div>
      </section>
      <section className='my-20'>
        <main>
          <h1 className='text-po text-5xl text-center'>You Can Select The Difficult Level</h1>
        </main>
        <div className='flex justify-evenly items-center mt-10'>
          <Image alt={'Levels Progress Image'} height={500} src={'/levels-progress-image.svg'} width={500} />
          <Image alt={'Levels Image'} height={500} src={'/levels-image.png'} width={500}  />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}