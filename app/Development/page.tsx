import { Fragment } from 'react';
import Image from 'next/image';
import { Tooltip } from '@heroui/tooltip';

export default function Development(): JSX.Element {
  return (
    <Fragment>
      <section className='bg-white rounded-xl w-full h-screen p-10'>
        <main>
          <h1 className='text-center text-po text-black text-4xl'>I <a className='bg-green-400 text-white px-5 rounded-xl'>developed</a> This Project With These <a className='bg-purple-500 text-white px-5 rounded-xl'>Technologies:</a></h1>
        </main>
        <div className='flex justify-evenly items-center my-20'>
          <Tooltip className='text-po' content={'Next Js'}> 
            <Image src={'/next-js-logo.svg'} alt={'NextJS Logo'} width={200} height={200} />
          </Tooltip>
          <Tooltip className='text-po' content={'Typescript'}>
            <Image src={'/typescript-logo.svg'} alt={'Typescript Logo'} width={200} height={200} className='rounded-3xl' />
          </Tooltip>
          <Tooltip className='text-po' content={'Firebase'}>
            <Image src={'/firebase-logo.png'} alt={'Firebase Logo'} width={200} height={200} className='rounded-3xl' />
          </Tooltip>
          <Tooltip className='text-po' content={'HeroUI'}>
            <Image src={'/hero-ui-logo.png'} alt={'HeroUI Logo'} width={200} height={200} />
          </Tooltip>

        </div>
      </section>
    </Fragment>
  );
}