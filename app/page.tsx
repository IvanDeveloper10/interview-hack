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
          <Link href={'/QuizBasic'} className='hover:scale-110 transition'>
            <Button variant='flat' color='warning' radius='sm' size='lg' className='text-po text-xl flex justify-center items-center'>START <i className='fi fi-rr-arrow-right flex justify-center items-center'></i></Button>
          </Link>
          <Link href={'/Levels'} className='hover:scale-110 transition'>
            <Button variant='shadow' color='danger' radius='sm' size='lg' className='text-po text-xl flex justify-center items-center'>CHOOSE LEVEL <i className='fi fi-rr-angle-right flex justify-center items-center'></i></Button>
          </Link>
        </div>
        <Image src={'/question-image.svg'} className='absolute top-96 right-28' alt={'Question Image'} width={250} height={250} />
        <Image src={'/interview-image.svg'} className='absolute top-96 left-28' alt={'Question Image'} width={250} height={250} />
      </section>
      <section className='my-20'>
        <div>
          <h1 className='text-po text-5xl text-center'>You can choose between 3 technologies</h1>
        </div>
        <div className='flex justify-evenly items-center mt-10'>
          <Image src={'/java-logo.png'} alt={'Java Logo'} width={200} height={100} className='' />
          <Image src={'/javascript-logo.png'} alt={'Javascript Logo'} width={200} height={100} className='rounded-xl drop-shadow-lg' />
          <Image src={'/python-logo.png'} alt={'Python Logo'} width={200} height={100} className='drop-shadow-lg' />
        </div>
      </section>
      <section className='bg-white rounded-3xl w-full h-screen flex  flex-col p-10'>
        <h1 className='text-center text-po text-5xl text-black'><a className='text-red-500'>There's</a> a game session, check it <a className='text-purple-500'>out!</a></h1>
        <div className='flex justify-evenly items-center my-10'>
          <Image src={'/game-image-one.svg'} alt={'Game Image One'} width={400} height={400} />
          <Image src={'/game-image-two.svg'} alt={'Game Image Two'} width={400} height={400} />
        </div>
        <div className='w-full flex justify-evenly items-center my-5'>
          <Link href={'/Games/GameBot'}>
            <Button className='w-96 text-po flex justify-center items-center' variant='shadow' color='warning'>Go To Play With Bot <i className='fi fi-rr-user-robot flex justify-center items-center'></i></Button>
          </Link>
          <Link href={'/Games/GameOnline'}>
            <Button className='w-96 text-po flex justify-center items-center' variant='shadow' color='success'>Go to Play Online <i className='fi fi-rr-globe flex justify-center items-center'></i></Button>
          </Link>
        </div>
      </section>
      <section className='my-20'>
        <main>
          <h1 className='text-po text-5xl text-center'>You Can Select The Difficult Level</h1>
        </main>
        <div className='flex justify-evenly items-center mt-10'>
          <Image src={'/levels-progress-image.svg'} alt={'Levels Progress Image'} width={500} height={500} />
          <Image src={'/levels-image.png'} alt={'Levels Image'} width={500} height={500}  />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}