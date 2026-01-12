'use client';
import { searchUsersByUsername } from '@/lib/server_actions/user_search';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useTransition } from 'react';
import LoadingSpinnerSm from '../ui-kit/SmallLoadingSpinner';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface UserSearchResults {
  id: string;
  user_id: string;
  user_name: string | null;
  users: {
    avatar: string | null;
  };
}

export default function ExploreDisplay({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userResults, setUsersResult] = useState<UserSearchResults[]>([]);
  const [isPending, startTransition] = useTransition();
  const [term, setTerm] = useState('');

  // this functions debounde the call to the server action 300ms
  const handleSearch = useDebouncedCallback(
    async (term: string) => {
      setTerm(term);
      if (!term) return setUsersResult([]);

      startTransition(async () => {
        const results = await searchUsersByUsername(term);
        setUsersResult(results);
      });
    },
    // the debounce time
    300
  );

  const showNoResults =
    !isPending && term.length > 0 && userResults.length === 0;

  return (
    <>
      <div className='relative w-full sm:w-4/5 xl:w-3/5 m-auto mb-0'>
        <input
          type='text'
          placeholder='Search by username...'
          className='w-full pl-4 pr-10 py-2.5 sm:py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base'
          name='user-search'
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
          <MagnifyingGlassIcon className='w-5 h-5' />
        </div>
      </div>
      {isPending && (
        <div className='min-h-40 flex items-center justify-center'>
          <LoadingSpinnerSm text='searching users' />
        </div>
      )}
      {!isPending && userResults.length > 0 && (
        <div className='w-full sm:w-4/5 xl:w-3/5 m-auto mt-0 border border-[#989494] flex justify-center items-center border-t-0 min-h-40 rounded-b-lg '>
          <p>here the results</p>
        </div>
      )}
      {showNoResults && (
        <div className='w-full sm:w-4/5 xl:w-3/5 m-auto mt-0 border border-[#989494] flex justify-center items-center border-t-0 min-h-20 rounded-b-lg '>
          No users were found with that user name
        </div>
      )}

      {children}
    </>
  );
}
