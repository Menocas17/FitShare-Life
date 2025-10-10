'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { usePathname } from 'next/navigation';

type Exercise = {
  id: string;
  name: string;
  description: string;
  muscle_group: string;
  image_url?: string;
  url_link?: string;
};

export default function ExerciseFinder() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState('');

  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes('log') || pathname.includes('edit')) {
      const workout_id = pathname.split('/').pop();
      sessionStorage.setItem('workout_id', workout_id ?? '');
      sessionStorage.setItem('edit/log', 'true');
    }

    if (pathname.includes('edit')) {
      sessionStorage.setItem('edit', 'true');
      sessionStorage.setItem('log', 'false');
    }

    if (pathname.includes('log')) {
      sessionStorage.setItem('log', 'true');
      sessionStorage.setItem('edit', 'false');
    }

    const showButton =
      pathname.includes('create') ||
      pathname.includes('edit') ||
      pathname.includes('log');

    sessionStorage.setItem('showButton', showButton ? 'true' : 'false');
  }, [pathname]);

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase.from('excercises').select('*');
      if (!error && data) {
        setExercises(data as Exercise[]);
      } else {
        console.error(error);
      }
    };
    fetchExercises();
  }, []);

  const filtered = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Exercises</h1>
      <input
        type='text'
        placeholder='Search exercise...'
        className='border p-2 rounded w-full mb-6'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className='space-y-3'>
        {filtered.map((ex) => (
          <li key={ex.id}>
            <Link
              href={`/exercises/${ex.id}`}
              className='block p-4 bg-gray-100 rounded-lg hover:bg-gray-200'
            >
              <h2 className='font-semibold'>{ex.name}</h2>
              <p className='text-sm text-gray-600'>{ex.muscle_group}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
