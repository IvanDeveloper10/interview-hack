import { Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import Link from 'next/link';

export default function Levels() {
  return (
    <Fragment>
      <div className='stars-background'>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className='star'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      <main className='w-full flex justify-center items-center mt-10'>
        <h1 className='text-po text-8xl text-center font-extrabold'><i className='text-purple-300'>LE</i>VE<i className='text-pink-300'>LS</i></h1>
      </main>
      <section className='grid grid-cols-3 gap-10 place-content-center px-5 my-10'>
        <Card>
          <CardHeader className='flex justify-center items-center'>
            <h2 className='text-po font-bold text-center'>LEVEL ONE</h2>
          </CardHeader>
          <CardBody />
          <CardFooter className='flex justify-center items-center'>
            <Link href={'/Levels/LevelOne'}>
              <Button className='text-po w-48' color='secondary' size='md' variant='shadow'>Go To Level One 1</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className='flex justify-center items-center'>
            <h2 className='text-po text-center font-bold'>LEVEL TWO</h2>
          </CardHeader>
          <CardBody />
          <CardFooter className='flex justify-center items-center'>
            <Link href={'/Levels/LevelTwo'}>
              <Button className='text-po w-48' color='secondary' size='md' variant='shadow'>Go To Level Two 2</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className='flex justify-center items-center'>
            <h2 className='text-po text-center font-extrabold'>LEVEL THREE</h2>
          </CardHeader>
          <CardBody />
          <CardFooter className='flex justify-center items-center'>
            <Link href={'/Levels/LevelThree'}>
              <Button className='text-po w-48' color='secondary' size='md' variant='shadow'>Go To Level Three 3</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className='flex justify-center items-center'>
            <h2 className='text-po text-center font-bold'>LEVEL FOUR</h2>
          </CardHeader>
          <CardBody />
          <CardFooter className='flex justify-center items-center'>
            <Link href={'/Levels/LevelFour'}>
              <Button className='text-po w-48' color='danger' size='md' variant='shadow'>Go To Level Four 4</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className='flex justify-center items-center'>
            <h2 className='text-po text-center font-bold'>LEVEL FIVE</h2>
          </CardHeader>
          <CardBody />
          <CardFooter className='flex justify-center items-center'>
            <Link href={'/Levels/LevelFive'}>
              <Button className='text-po w-48' color='danger' size='md' variant='shadow'>Go To Level Five 5</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className='flex justify-center items-center'>
            <h2 className='text-po text-center font-bold'>LEVEL SIX</h2>
          </CardHeader>
          <CardBody />
          <CardFooter className='flex justify-center items-center'>
            <Link href={'/Levels/LevelSix'}>
              <Button className='text-po w-48' color='danger' size='md' variant='shadow'>Go To Level Six 6</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className='flex justify-center items-center'>
            <h2 className='text-po text-center font-bold'>LEVEL SEVEN</h2>
          </CardHeader>
          <CardBody />
          <CardFooter className='flex justify-center items-center'>
            <Link href={'/Levels/LevelSeven'}>
              <Button className='text-po w-48' color='success' size='md' variant='shadow'>Go To Level Seven 7</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className='flex justify-center items-center'>
            <h2 className='text-po text-center font-bold'>LEVEL EIGHT</h2>
          </CardHeader>
          <CardBody />
          <CardFooter className='flex justify-center items-center'>
            <Link href={'/Levels/LevelEight'}>
              <Button className='text-po w-48' color='success' size='md' variant='shadow'>Go To Level Eight 8</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className='flex justify-center items-center'>
            <h2 className='text-po text-center font-bold'>LEVEL NINE</h2>
          </CardHeader>
          <CardBody />
          <CardFooter className='flex justify-center items-center'>
            <Link href={'/Levels/LevelNine'}>
              <Button className='text-po w-48' color='success' size='md' variant='shadow'>Go To Level Nine 9</Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </Fragment>
  );
}