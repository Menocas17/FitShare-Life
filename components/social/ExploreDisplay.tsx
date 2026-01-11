'use client';

export default function ExploreDisplay({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <input
        type='text'
        placeholder='Search by username...'
        className='w-full sm:w-4/5 xl:w-3/5 block m-auto pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base mb-4'
      />
      {children}
    </>
  );
}
