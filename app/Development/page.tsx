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
            <Image alt={'NextJS Logo'} height={200} src={'/next-js-logo.svg'} width={200} />
          </Tooltip>
          <Tooltip className='text-po' content={'Typescript'}>
            <Image alt={'Typescript Logo'} className='rounded-3xl' height={200} src={'/typescript-logo.svg'} width={200} />
          </Tooltip>
          <Tooltip className='text-po' content={'Firebase'}>
            <Image alt={'Firebase Logo'} className='rounded-3xl' height={200} src={'/firebase-logo.png'} width={200} />
          </Tooltip>
          <Tooltip className='text-po' content={'HeroUI'}>
            <Image alt={'HeroUI Logo'} height={200} src={'/hero-ui-logo.png'} width={200} />
          </Tooltip>

        </div>
      </section>
    </Fragment>
  );
}