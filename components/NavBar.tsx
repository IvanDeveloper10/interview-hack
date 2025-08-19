import { Fragment } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import Link from 'next/link';
import { Tooltip } from '@heroui/tooltip';

export default function NavBar() {
  return (
    <Fragment>
      <Navbar>
        <NavbarBrand>
          <h1 className='text-po'>Interview Hack</h1>
        </NavbarBrand>
        <NavbarContent className='flex justify-center items-center gap-8'>
          <NavbarItem>
            <Link className='text-po flex justify-center items-center gap-1' href={'/'}><i className='fi fi-rr-home flex justify-center items-center' /> Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-po flex justify-center items-center gap-1' href={'/About'}><i className='fi fi-rr-search-alt flex justify-center items-center' /> About</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-po flex justify-center items-center gap-1' href={'/Games'}><i className='fi fi-rr-game-console-crank-handheld flex justify-center items-center' /> Games</Link>
          </NavbarItem>
          <Tooltip className='p-5' content={
            <div className='grid grid-cols-3 gap-4 text-po'>
              <Link href={'/Levels/LevelOne'}>Level One</Link>
              <Link href={'/Levels/LevelTwo'}>Level Two</Link>
              <Link href={'/Levels/LevelThree'}>Level Three</Link>
              <Link href={'/Levels/LevelFour'}>Level Four</Link>
              <Link href={'/Levels/LevelFive'}>Level Five</Link>
              <Link href={'/Levels/LevelSix'}>Level Six</Link>
              <Link href={'/Levels/LevelSeven'}>Level Seven</Link>
              <Link href={'/Levels/LevelEight'}>Level Eight</Link>
              <Link href={'/Levels/LevelNine'}>Level Nine</Link>
            </div>
          }>
            <Link className='text-po' href={'/Levels'}>Levels</Link>
          </Tooltip>
        </NavbarContent>
      </Navbar>
    </Fragment>
  );
}