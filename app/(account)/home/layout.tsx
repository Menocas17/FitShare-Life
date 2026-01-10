import HomeNavBar from '@/components/ui-kit/HomeNavBar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HomeNavBar />
      <main className='mt-5'>{children}</main>
    </div>
  );
}
