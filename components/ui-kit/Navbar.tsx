'use client';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { type UserSession } from '@/types/types';
import Link from 'next/link';
import { useSidebar } from '@/Context/SideBarContext';
import { logoutAction } from '@/lib/server_actions/logout';

const Navbar = ({ user }: { user: UserSession }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <header className='h-12 flex items-center justify-between border-b border-border px-6'>
        <button
          onClick={toggleSidebar}
          className='md:hidden p-2'
          aria-label='Open Menu'
        >
          <Menu className='w-6 h-6' />
        </button>

        <h1 className='text-xl font-bold hidden sm:block'></h1>

        <div className='flex items-center gap-3'>
          <Link href={'/myprofile'}>
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name ?? 'User Photo'}
                width={32}
                height={32}
                className='w-8 h-8 rounded-full'
              />
            ) : (
              <div className='w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white'>
                {user.name}
              </div>
            )}
          </Link>

          <button
            onClick={logoutAction}
            className='px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700'
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
