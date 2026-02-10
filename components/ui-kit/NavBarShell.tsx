'use client';
import { SidebarProvider } from '@/Context/SideBarContext';

export default function NavBarsShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
