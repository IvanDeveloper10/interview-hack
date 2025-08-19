import { Fragment } from 'react';
import { Card, CardBody } from '@heroui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function LevelSeven() {
  return (
    <Fragment>
      <section>
        <main className='my-10 w-full flex justify-center items-center'>
          <h1 className='text-po text-center text-6xl text-extrabold text-purple-400 font-extrabold'>SELECT A LANGUAGE</h1>
        </main>
        <div className='w-full flex justify-evenly '>
          <Link href={'/Levels/LevelSeven/LevelSevenJavascript'}>
            <Card isPressable>
              <CardBody>
                <Image src={'/javascript-logo.png'} alt={''} width={200} height={100} className='rounded-lg'></Image>
              </CardBody>
            </Card>
          </Link>
          <Link href={'/Levels/LevelSeven/LevelSevenJava'}>
            <Card isPressable>
              <CardBody>
                <Image src={'/java-logo.png'} alt={''} width={200} height={100} ></Image>
              </CardBody>
            </Card>
          </Link>
          <Link href={'/Levels/LevelSeven/LevelSevenPython'}>
            <Card isPressable>
              <CardBody>
                <Image src={'/python-logo.png'} alt={''} width={200} height={100}></Image>
              </CardBody>
            </Card>
          </Link>
        </div>
      </section>
    </Fragment>
  );
}