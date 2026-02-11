'use client';
import { appInfo, sidebarLinks } from '@/constants';

import { Dumbbell, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSidebar, SidebarProvider } from '@/Context/SideBarContext';

export default function MobileSidebar() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <SidebarProvider>
      {/* Mobile Sidebar */}
      {open && (
        <div className='fixed inset-0 z-[100] bg-black/50 md:hidden'>
          <aside className='absolute left-0 top-0 bottom-0 w-64 bg-background border-r border-border'>
            <div className='flex items-center justify-between p-4'>
              <Link href='/home'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                    <Dumbbell className='w-5 h-5 text-primary-foreground' />
                  </div>
                  <span className='text-xl font-bold'>{appInfo.name}</span>
                </div>
              </Link>
              <button
                className='p-2 cursor-pointer bg-lightgreen rounded-md'
                onClick={toggleSidebar}
              >
                <X className='w-5 h-5' />
              </button>
            </div>
            <nav className='px-4 space-y-2'>
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='flex items-center gap-3 p-2 rounded-md hover:bg-accent'
                  onClick={toggleSidebar}
                >
                  <link.icon className='w-5 h-5' />
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </SidebarProvider>
  );
}
