import { Fragment } from 'react';
import { Card, CardBody } from '@heroui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function LevelFive() {
  return (
    <Fragment>
      <section>
        <main className='my-10 w-full flex justify-center items-center'>
          <h1 className='text-po text-center text-6xl text-extrabold text-lime-400 font-extrabold'>SELECT A LANGUAGE</h1>
        </main>
        <div className='w-full flex justify-evenly '>
          <Link href={'/Levels/LevelFive/LevelFiveJavascript'}>
            <Card isPressable>
              <CardBody>
                <Image alt={''} className='rounded-lg' height={100} src={'/javascript-logo.png'} width={200} />
              </CardBody>
            </Card>
          </Link>
          <Link href={'/Levels/LevelFive/LevelFiveJava'}>
            <Card isPressable>
              <CardBody>
                <Image alt={''} height={100} src={'/java-logo.png'} width={200}  />
              </CardBody>
            </Card>
          </Link>
          <Link href={'/Levels/LevelFive/LevelFivePython'}>
            <Card isPressable>
              <CardBody>
                <Image alt={''} height={100} src={'/python-logo.png'} width={200} />
              </CardBody>
            </Card>
          </Link>
        </div>
      </section>
    </Fragment>
  );
}