import { Button } from '../ui/button';
import { Clock, Target, Trash2, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getWorkoutExercises } from '@/lib/server_actions/workouts';
import DiscardWorkout from './deleteWorkout-Modal';
import Link from 'next/link';

export interface Workout {
  exercise_id: string;
  id: string;
  rest_time: number | null;
}

export default function WorkoutCard({
  workoutId,
  lastPerformedWorkout,
  name,
}: {
  workoutId: string;
  lastPerformedWorkout: string;
  name: string;
}) {
  //States for the data
  const [workout, setWorkout] = useState<Workout[]>([]);

  const [openDiscard, setOpenDiscard] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      const workoutData = await getWorkoutExercises(workoutId);
      setWorkout(workoutData);
    };

    fetchWorkout();
  }, [workoutId]);

  const Duration =
    workout.reduce((acc, exercise) => {
      return acc + (exercise.rest_time || 0);
    }, 0) / 60;

  function handleOpenDiscard() {
    setOpenDiscard(!openDiscard);
  }

  return (
    <div className='p-4 sm:p-6 bg-card border border-border rounded-lg'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4'>
        <div className='flex-1'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3'>
            <h4 className='text-base sm:text-lg font-semibold'>{name}</h4>
            <span className='px-2 py-1 text-xs bg-primary/10 text-primary rounded-full w-fit'>
              {/* {workout.type} */}
            </span>
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              {Duration} min
            </div>
            <div className='flex items-center gap-1'>
              <Target className='w-4 h-4' />
              {workout.length} exercises
            </div>
            <div className='text-xs sm:text-sm'>
              Last performed: {lastPerformedWorkout}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0'>
          <div className='flex items-center gap-2'>
            <button
              className='p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md'
              onClick={() => {}}
            >
              <Edit className='w-4 h-4' />
            </button>
            <button
              className='p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md'
              onClick={() => setOpenDiscard(true)}
            >
              <Trash2 className='w-4 h-4' />
            </button>
          </div>
          <Link href={`/workout-management/log/${workoutId}`}>
            <Button className='px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm cursor-pointer'>
              Start Workout
            </Button>
          </Link>
        </div>
      </div>

      {openDiscard && (
        <DiscardWorkout
          handleClose={handleOpenDiscard}
          setWorkouts={setWorkout}
          workout_id={workoutId}
        />
      )}
    </div>
  );
}
