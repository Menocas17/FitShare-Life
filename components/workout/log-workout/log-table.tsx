'use client';
import LogButton from '@/components/workout/log-workout/log-button';
import { Button } from '@/components/ui/button';
import { SetsProps } from '@/types/types';
import { useState, useEffect } from 'react';
import { SetType } from '@/types/supabase';
import Image from 'next/image';

interface RowLog {
  completed: boolean;
  weight: number | string;
  reps: number | string;
}

export default function LogTable({ sets, id }: SetsProps) {
  const [excerciseLog, setExcerciseLog] = useState<RowLog[]>(() => {
    const saved = localStorage.getItem(id);
    if (saved) return JSON.parse(saved);
    return sets!.map((set) => ({ ...set, completed: false }));
  });

  //this will temporary save the excersice log in the local storage
  useEffect(() => {
    if (excerciseLog) {
      const sanitized = excerciseLog.map((set) => ({
        ...set,
        weight: Number(set.weight),
        reps: Number(set.reps),
      }));
      localStorage.setItem(id, JSON.stringify(sanitized));
    }
  }, [excerciseLog, id]);

  //function to record if a set is completed or not

  function handleToggleSet(index: number) {
    setExcerciseLog((prev) =>
      prev!.map((set, i) =>
        i === index ? { ...set, completed: !set.completed } : set
      )
    );
  }

  //function to add a new set
  function handleAddSet() {
    const previousWeight = excerciseLog[excerciseLog.length - 1]?.weight ?? 0;
    setExcerciseLog((prev) => [
      ...prev,
      { reps: 0, weight: previousWeight, completed: false },
    ]);
  }

  //function to delete a set

  function handleDeleteSet(index: number) {
    setExcerciseLog((prev) => prev.filter((_, i) => i !== index));
  }
  //function to hanlde the input change
  const handleInputChange = (
    index: number,
    field: 'weight' | 'reps',
    value: string
  ) => {
    setExcerciseLog((prev) =>
      prev.map((set, i) => (i === index ? { ...set, [field]: value } : set))
    );
  };

  return (
    <div className='w-full md:w-5/6 xl:w-4/6 2xl:w-3/6'>
      {/* Header */}
      <div className='grid grid-cols-6 gap-2 text-center font-bold border-b pb-1 text-sm md:text-lg'>
        <div>Set</div>
        <div>Previous</div>
        <div>Weight</div>
        <div>Reps</div>
        <div>Done</div>
        <div>Delete</div>
      </div>

      {/* Rows */}
      {excerciseLog.map((set, index) => (
        <div
          key={index}
          className='grid grid-cols-6 gap-2 items-center border-b py-1 text-center'
        >
          <div>{index + 1}</div>
          <div className='text-xs'>
            {set.weight} X {set.reps}
          </div>
          <div>
            <input
              type='number'
              className='w-full max-w-[60px] text-center border rounded px-1 py-0.5 no-spinners'
              value={set.weight}
              onChange={(e) =>
                handleInputChange(index, 'weight', e.target.value)
              }
              onBlur={() =>
                handleInputChange(index, 'weight', String(Number(set.weight)))
              }
            />
          </div>
          <div>
            <input
              type='number'
              className='w-full max-w-[60px] text-center border rounded px-1 py-0.5 no-spinners'
              value={set.reps}
              onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
              onBlur={() =>
                handleInputChange(index, 'reps', String(Number(set.reps)))
              }
            />
          </div>
          <div className='flex justify-center'>
            <LogButton
              clicked={set.completed}
              handleToggleSet={() => handleToggleSet(index)}
            />
          </div>

          <div className='flex justify-center'>
            <Button
              variant='ghost'
              onClick={() => handleDeleteSet(index)}
              className='text-2xl'
            >
              <Image
                src='/Delete.svg'
                alt='trash can icon'
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      ))}

      {/* Add set button */}
      <div className='flex justify-center my-5'>
        <Button
          onClick={handleAddSet}
          variant='secondary'
          className='bg-[#334155] hover:bg-[#11b981]  text-white w-40'
        >
          Add set
        </Button>
      </div>
    </div>
  );
}
