import Sidebar from '@/components/ui-kit/Sidebar';
import MobileSidebar from '@/components/ui-kit/MobileSidebar';
import Navbar from '@/components/ui-kit/Navbar';
import { getUserAndProfileIds } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NavBarsShell from '@/components/ui-kit/NavBarShell';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserAndProfileIds();

  if (!user) return redirect('/login');

  return (
    <NavBarsShell>
      <div className='flex h-screen bg-background text-foreground'>
        <Sidebar />
        <MobileSidebar />
        <div className='flex-1 flex flex-col'>
          <Navbar user={user} />
          <main className='flex-1 p-6 py-0 overflow-y-auto'>{children}</main>
        </div>
      </div>
    </NavBarsShell>
  );
}
