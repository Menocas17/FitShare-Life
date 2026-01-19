'use client';

//TODO -  change this layout to a server component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/ui-kit/Sidebar';
import MobileSidebar from '@/components/ui-kit/MobileSidebar';
import Navbar from '@/components/ui-kit/Navbar';
import LoadingSpinner from '@/components/ui-kit/LoadingSpinner';
import { User } from '@/types/types';

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/sessions');
        const data = await res.json();
        if (!data.user) {
          router.push('/login');
        } else {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch session', err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return <LoadingSpinner text='Loading your Space' />;
  }

  if (!user) return null;

  return (
    <div className='flex h-screen bg-background text-foreground'>
      <Sidebar />
      <MobileSidebar open={open} setOpen={setOpen} />
      <div className='flex-1 flex flex-col'>
        <Navbar setOpen={setOpen} user={user} handleLogout={handleLogout} />
        <main className='flex-1 p-6 py-0 overflow-y-auto'>{children}</main>
      </div>
    </div>
  );
};

export default UserLayout;
