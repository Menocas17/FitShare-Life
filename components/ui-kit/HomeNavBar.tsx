'use client';
import Link from 'next/link';
import { homeLinks } from '@/constants';
import { usePathname } from 'next/navigation';

export default function HomeNavBar() {
  const pathname = usePathname();
  return (
    <div className='border-b border-border'>
      <nav className='flex space-x-2 sm:space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide px-1'>
        {homeLinks.map((link) => {
          const isActive = pathname.includes(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2 px-2 sm:px-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              <div className='flex items-center gap-1 sm:gap-2'>
                <link.icon className='w-5 h-5' />
                <span className='hidden sm:inline'>{link.label}</span>
                {link.href === 'home/explore' ? (
                  <span className='text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full hidden lg:inline'>
                    Find Users
                  </span>
                ) : null}
                {/* <span className='sm:hidden'>Stats</span> */}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
