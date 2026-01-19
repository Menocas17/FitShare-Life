import { UserSearchResults } from './ExploreDisplay';
import Link from 'next/link';
import Image from 'next/image';

export default function ResultList({
  userResults,
  loggedProfile,
}: {
  userResults: UserSearchResults[];
  loggedProfile: string;
}) {
  return (
    <div className='bg-white shadow-2xl ring-1 ring-black/5 rounded-b-xl py-2 overflow-hidden z-10 absolute w-full '>
      <div>
        {userResults.map((result) => {
          const ownProfile = result.id === loggedProfile;
          return (
            <Link
              key={result.id}
              href={ownProfile ? '/myprofile' : `explore/user/${result.id}`}
              className='flex items-start gap-4  hover:bg-gray-100 p-3 rounded-lg hover:scale-[1.01] transition-all duration-200'
            >
              {result.users.avatar ? (
                <Image
                  src={result.users.avatar}
                  alt={`${result.user_name}'s photo`}
                  width={50}
                  height={50}
                  className='w-10 h-10 rounded-full'
                />
              ) : (
                <div className='w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl'>
                  {result.user_name![0]}
                </div>
              )}
              <div>
                <p className='text-base leading-tight'>{result.user_name}</p>
                <p className='text-xs text-muted-foreground leading-tight'>
                  {result.users.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
