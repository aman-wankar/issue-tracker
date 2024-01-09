'use client';

import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const currentPathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
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
          </ul>
        </Flex>
        <Box>
          {status === 'authenticated' && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  fallback='?'
                  src={session.user!.image!}
                  size='2'
                  className='cursor-pointer'
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size='2'>{session.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href='api/auth/signout'>Logout</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === 'unauthenticated' && (
            <Link href='api/auth/signin'>Login</Link>
          )}
        </Box>{' '}
      </Flex>
    </nav>
  );
};

export default NavBar;
