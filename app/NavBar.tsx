'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';
const NavBar = () => {
  const currentPathname = usePathname();
  const { status, data } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={classNames({
                'text-zinc-900': currentPathname === link.href,
                'text-zinc-500': currentPathname !== link.href,
                'hover:text-zinc-800 transition-colors': true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <Box>
          {status === 'authenticated' && (
            <Link href='api/auth/signout'>Logout</Link>
          )}
          {status === 'unauthenticated' && (
            <Link href='api/auth/signin'>Login</Link>
          )}
        </Box>
      </ul>
    </nav>
  );
};

export default NavBar;
