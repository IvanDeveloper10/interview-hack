import { Fragment } from 'react';
import { Image } from '@heroui/image';

export default function AboutPage(): JSX.Element {
  return (
    <Fragment>
      <main className='bg-white rounded-3xl w-full h-screen flex p-10 text-black text-po justify-evenly items-start'>
        <div className='mt-5'>
          <h1 className='text-7xl font-extrabold'>Hi!, I'm <i className='bg-blue-500 px-5 rounded-xl text-white'>Ivan</i></h1>
          <h1 className='text-5xl font-bold mt-10'>Dev <a className='bg-fuchsia-500 px-5 rounded-xl text-white'>FULL-STACK</a> And </h1>
          <h1 className='text-3xl mt-10'><a className='bg-green-500 px-5 rounded-xl text-white'>AI</a> programmer</h1>
          <div className='flex'>
            <Image src={'/orpheus-image-two.png'} alt={'Orpheus Image Two'} width={300} height={250} ></Image>
            <Image src={'/orpheus-image-one.png'} alt={'Orpheus Image One'} width={320} height={250} ></Image>
          </div>
        </div>
        <div>
          <Image src={'/ivan-image.png'} alt={'Ivan Image'} width={400} height={400} isZoomed radius='lg' />
        </div>
      </main>
      <section className='text-po text-white flex justify-evenly my-20 px-10 gap-10'>
        <div className='w-2/4'>
          <h1 className='font-bold text-4xl text-center'>INTERVIEW <a className='bg-green-400 text-white px-5 rounded-xl'>HACK</a></h1>
          <p className='mt-10'>is a web application designed to help you practice and sharpen your programming skills through coding and theoretical interview questions. It features multiple difficulty levels and a modern UI built with Next.js, TypeScript, TailwindCSS, and HeroUI.</p>
          <p className='mt-2'>Interview Hack started as a project idea for the TerminalCraft event and I eventually brought the idea to the web.</p>
        </div>
        <div className='bg-white w-2/4 flex justify-center items-center rounded-xl'>
          <Image src={'/som-logo-image.png'} alt={'Summer Of Making Logo Image'} width={500} radius='lg' />
        </div>
      </section>
    </Fragment>
  );
}