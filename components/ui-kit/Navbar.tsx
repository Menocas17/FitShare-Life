import { Menu } from 'lucide-react';
import Image from 'next/image';
import { NavbarProps } from '@/types/types';
import Link from 'next/link';

const Navbar = ({ setOpen, user, handleLogout }: NavbarProps) => {
  return (
    <header className='h-12 flex items-center justify-between border-b border-border px-6'>
      <button
        onClick={() => setOpen(true)}
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
              alt={user.name}
              width={32}
              height={32}
              className='w-8 h-8 rounded-full'
            />
          ) : (
            <div className='w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white'>
              {user.name[0]}
            </div>
          )}
        </Link>

        <button
          onClick={handleLogout}
          className='px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700'
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
