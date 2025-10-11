import { Button } from '@/components/ui/button';
import { deleteWorkout } from '@/lib/server_actions/workouts';
import { Workout } from './workoutCard';
import Image from 'next/image';
import Link from 'next/link';

export default function DiscardWorkout({
  handleClose,
  setWorkouts,
  workout_id,
}: {
  handleClose: () => void;
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  workout_id: string;
}) {
  //function to discard the training
  const handleDeleteWorkout = async (workout_id: string) => {
    try {
      const success = await deleteWorkout(workout_id);
      if (!success) throw new Error('Failed to delete workout');

      // Remove from local state
      setWorkouts((prev) => prev.filter((w) => w.id !== workout_id));

      window.location.reload();
    } catch (err) {
      console.error('Error deleting workout:', err);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-background rounded-lg max-w-4xl w-full md:w-3/5 lg:w-2/5 max-h-[90vh] overflow-y-auto p-5'>
        <div className='flex justify-center'>
          <Image src={'/Sad.svg'} alt='Sad emoticon' height={70} width={70} />
        </div>
        <h3 className='text-2xl font-semibold text-center mt-4'>
          You are about to delete this workout
        </h3>

        <p className='text-center mt-4 text-lg'>
          Are you sure you want to discard it? This cannot be undone
        </p>

        <div className='flex justify-center mt-8 gap-5'>
          <Link href={'/workout-management'}>
            <Button
              variant='destructive'
              onClick={() => handleDeleteWorkout(workout_id)}
            >
              Discard Workout
            </Button>
          </Link>
          <Button onClick={handleClose}>Keep Workout</Button>
        </div>
      </div>
    </div>
  );
}
