import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer(): JSX.Element {
  return (
    <Fragment>
      <footer className='text-po mt-10 bg-white text-black p-16 rounded-3xl flex gap-16'>
        <div className='space-y-5'>
          <h1 className='font-bold'>CONTACT</h1>
          <Link href={'https://x.com/ivandevelo76579'} className='flex items-center gap-1'>
            <Image src={'/x-icon-image.png'} alt={''} width={20} height={20} /> X
          </Link>

          <Link href={'https://www.linkedin.com/in/ivan-david-perez-ospino-51ba40301/'} className='flex items-center gap-1'>
            <Image src={'/linkedin-icon-image.png'} alt={''} width={20} height={20} /> LinkedIn
          </Link>

          <Link href={'mailto:ivandeveloper99@gmail.com'} className='flex items-center gap-1'>
            <Image src={'/mail-icon-image.png'} alt={''} width={20} height={20} /> Mail
          </Link>
        </div>
        <div className='space-y-5'>
          <h1 className='font-bold'>INFORMATION</h1>
          <Link href={'/About'} className='flex items-center gap-1'>
            <i className='fi fi-rr-search-alt flex justify-center items-center'></i> About
          </Link>

          <Link href={'/Development'} className='flex items-center gap-1'>
            <i className='fi fi-rr-square-code flex justify-center items-center'></i> Development
          </Link>
        </div>
        <Image src={'/flag-standalone.svg'} alt={'Hack Club Flag'} width={300} height={300} />
        <Image src={'/orpheus-image-three.png'} alt={'Orpheus Image'} width={300} height={300} />
      </footer>
    </Fragment>
  );
}