import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer(): JSX.Element {
  return (
    <Fragment>
      <footer className='text-po mt-10 bg-white text-black p-16 rounded-3xl flex gap-16'>
        <div className='space-y-5'>
          <h1 className='font-bold'>CONTACT</h1>
          <Link className='flex items-center gap-1' href={'https://x.com/ivandevelo76579'}>
            <Image alt={''} height={20} src={'/x-icon-image.png'} width={20} /> X
          </Link>

          <Link className='flex items-center gap-1' href={'https://www.linkedin.com/in/ivan-david-perez-ospino-51ba40301/'}>
            <Image alt={''} height={20} src={'/linkedin-icon-image.png'} width={20} /> LinkedIn
          </Link>

          <Link className='flex items-center gap-1' href={'mailto:ivandeveloper99@gmail.com'}>
            <Image alt={''} height={20} src={'/mail-icon-image.png'} width={20} /> Mail
          </Link>
        </div>
        <div className='space-y-5'>
          <h1 className='font-bold'>INFORMATION</h1>
          <Link className='flex items-center gap-1' href={'/About'}>
            <i className='fi fi-rr-search-alt flex justify-center items-center' /> About
          </Link>

          <Link className='flex items-center gap-1' href={'/Development'}>
            <i className='fi fi-rr-square-code flex justify-center items-center' /> Development
          </Link>
        </div>
        <Image alt={'Hack Club Flag'} height={300} src={'/flag-standalone.svg'} width={300} />
        <Image alt={'Orpheus Image'} height={300} src={'/orpheus-image-three.png'} width={300} />
      </footer>
    </Fragment>
  );
}