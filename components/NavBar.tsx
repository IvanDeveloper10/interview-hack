import { Fragment } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@heroui/navbar';
import Link from 'next/link';

export default function NavBar() {
  return (
    <Fragment>
      <Navbar>
        <NavbarBrand>
          <h1>Interview Hack</h1>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>
            <Link className='text-po' href={'/'}>Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-po' href={'/about'}>About</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </Fragment>
  );
}