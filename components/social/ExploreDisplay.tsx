'use client';
import { searchUsersByUsername } from '@/lib/server_actions/user_search';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useTransition } from 'react';
import LoadingSpinnerSm from '../ui-kit/SmallLoadingSpinner';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ResultList from './ResultsList';

export type UserSearchResults = {
  id: string;
  user_id: string;
  user_name: string | null;
  users: {
    avatar: string | null;
    name: string | null;
  };
};

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
    300,
  );

  const showNoResults =
    !isPending && term.length > 0 && userResults.length === 0;

  const showResults = !isPending && userResults.length > 0;

  return (
    <>
      <div className='relative w-full sm:w-4/5 xl:w-3/5 m-auto mb-0'>
        <input
          type='text'
          placeholder='Search by username...'
          className={`w-full pl-4 pr-10 py-2.5 sm:py-3 border border-black  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base rounded-lg ${
            showResults || showNoResults || isPending ? 'rounded-b-none' : ''
          } `}
          name='user-search'
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
          <MagnifyingGlassIcon className='w-5 h-5' />
        </div>
        {isPending && (
          <div className='bg-white shadow-2xl ring-1 ring-black/5 rounded-b-xl  overflow-hidden z-50 absolute w-full flex justify-center items-center py-5'>
            <LoadingSpinnerSm text='searching users' />
          </div>
        )}

        {showResults && <ResultList userResults={userResults} />}
        {showNoResults && (
          <div className='bg-white shadow-2xl ring-1 ring-black/5 rounded-b-xl py-2 overflow-hidden z-50 absolute w-full flex items-center justify-center min-h-20'>
            <p>No users were found with that user name</p>
          </div>
        )}
      </div>
      {children}
    </>
  );
}
