import { Fragment } from 'react';
import { Card, CardBody, } from '@heroui/card';
import Link from 'next/link';
import Image from 'next/image';

export default function Games() {
  return (
    <Fragment>
      <section className='bg-white rounded-3xl w-full h-screen flex  flex-col'>
        <main className='mt-16'>
          <h1 className='text-po text-center font-extrabold text-8xl text-black animate-pulse'>EXAM <a className='bg-green-400 text-white rounded-xl px-5'>COMPETITION</a></h1>
        </main>
        <div className='w-full mt-16 flex justify-evenly items-center '>
          <Link href={'/Games/GameBot'}>
            <Card className='w-96 h-72 flex justify-center items-center' isPressable>
              <CardBody>
                <div>
                  <h2 className='text-center text-po text-lg'>PLAY WITH BOT</h2>
                </div>
                <div className='flex justify-center items-center mt-2'>
                  <Image src={'/bot-image.svg'} alt={'Bot Image'} width={250} height={250} />
                </div>
              </CardBody>
            </Card>
          </Link>
          <Link href={'/Games/GameOnline'}>
            <Card className='w-96 h-72 flex justify-center items-center' isPressable>
              <CardBody>
                <div>
                  <h2 className='text-center text-po text-lg'>PLAY ONLINE</h2>
                </div>
                <div className='flex justify-center items-center mt-2'>
                  <Image src={'/online-image.svg'} alt={'Online Image'} width={250} height={250} />
                </div>
              </CardBody>
            </Card>
          </Link>
        </div>
      </section>
    </Fragment>
  );
}