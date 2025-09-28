'use client';
import LogButton from '@/components/workout/log-workout/log-button';
import { Button } from '@/components/ui/button';
import { SetsProps } from '@/types/types';
import { useState, useEffect } from 'react';
import { SetType } from '@/types/supabase';
import { Trash2 } from 'lucide-react';

interface RowLog extends SetType {
  completed: boolean;
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
      localStorage.setItem(id, JSON.stringify(excerciseLog));
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

  function handleDeleteSet() {
    setExcerciseLog((prev) => prev.filter((_, i) => i !== prev.length - 1));
  }

  //function to hanlde the input change
  const handleInputChange = (
    index: number,
    field: keyof SetType,
    value: number
  ) => {
    setExcerciseLog((prev) =>
      prev.map((set, i) => (i === index ? { ...set, [field]: value } : set))
    );
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Set</th>
            <th>Previous</th>
            <th>Weight</th>
            <th>Reps</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {excerciseLog.map((set, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {set.weight} X {set.reps}
              </td>
              <td>
                <input
                  type='number'
                  defaultValue={set.weight}
                  onChange={(e) =>
                    handleInputChange(index, 'weight', Number(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type='number'
                  defaultValue={set.reps}
                  onChange={(e) =>
                    handleInputChange(index, 'reps', Number(e.target.value))
                  }
                />
              </td>
              <td>
                <LogButton
                  clicked={set.completed}
                  handleToggleSet={() => handleToggleSet(index)}
                />
              </td>
              <td>
                <Button variant='ghost' onClick={handleDeleteSet}>
                  <Trash2 color='#991E00' />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        onClick={handleAddSet}
        variant='secondary'
        className='bg-[#11b981] text-white'
      >
        Add set
      </Button>
    </>
  );
}
