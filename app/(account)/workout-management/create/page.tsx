'use client';
import FinderModal from '@/components/exercises/FinderModal';
import { Button } from '@/components/ui/button';
import { Dumbbell, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExercisePlaceholder } from '@/constants';
import {
  createWorkout,
  addExercisesToWorkout,
} from '@/lib/server_actions/workouts';
import { useRouter } from 'next/navigation';
import { getProfileInfo } from '@/lib/server_actions/social';

interface Exercise {
  description: string;
  id: string;
  image_url: null;
  muscle_group: string | null;
  name: string;
  video_url: string | null;
}

interface Profile {
  id: string;
  user_id: string;
  user_name: string | null;
}

export default function CreateWorkoutPage() {
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [workoutName, setWorkoutName] = useState(
    () => sessionStorage.getItem('workoutName') || ''
  );

  const router = useRouter();

  useEffect(() => {
    const storedExercises = JSON.parse(
      sessionStorage.getItem('exercises') || '[]'
    );
    setExercises(storedExercises);

    const fetchDashboardData = async () => {
      // Get user session
      const res = await fetch('/api/sessions');
      const data = await res.json();
      if (!data.user) {
        router.push('/login');
        return;
      }

      //fetch prfile info
      const Profile = await getProfileInfo(data.user.id);
      setUserProfile(Profile);
    };

    fetchDashboardData();
  }, [router]);

  const handleDeleteExercise = (id: string) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
    sessionStorage.setItem('exercises', JSON.stringify(updatedExercises));
  };

  const handleSaveWorkout = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = document.getElementById('workoutForm') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);

    formData.append('profile_id', userProfile!.id);

    // Create the workout
    const workoutResponse = await createWorkout(formData);
    if (!workoutResponse) {
      alert('Error creating workout');
      return;
    }
    const workout_id = workoutResponse;

    // add the exercises
    formData.append('exercises', JSON.stringify(exercises));
    await addExercisesToWorkout(workout_id, formData);

    // Redirect and delete the local session storage
    sessionStorage.removeItem('exercises');
    sessionStorage.removeItem('workoutName');
    router.push('/workout-management');
  };

  const handleWorkoutNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutName(e.target.value);
    sessionStorage.setItem('workoutName', e.target.value);
  };

  const handleDiscardWorkout = () => {
    sessionStorage.removeItem('workoutName');
    sessionStorage.removeItem('exercises');
    router.push('/workout-management');
  };

  return (
    <>
      <h1 className='text-xl sm:text-xl font-semibold mb-4'>
        Create your own Workout
      </h1>
      <form id='workoutForm'>
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-2'>Workout Name</label>
          <input
            type='text'
            placeholder='Your Workout Name'
            className='w-full lg:w-3/5  p-2 border border-border rounded-md bg-background'
            name='name'
            required
            autoComplete='on'
            value={workoutName}
            onChange={handleWorkoutNameChange}
          />
        </div>

        <div className='flex gap-10 items-center mb-5 mt-8'>
          <div className='flex items-center gap-2'>
            <h2 className='text-md sm:text-xl font-semibold'>Add Exercises</h2>
            <Dumbbell className='w-5 h-5 text-primary' />
          </div>

          <Button onClick={() => setIsExerciseModalOpen(true)} type='button'>
            {' '}
            <Plus className='w-4 h-4' />
          </Button>
        </div>

        <div id='exercisesContainer' className='space-y-3 mb-6'>
          {exercises.length > 0 ? (
            exercises.map((exercise) => (
              <div
                key={exercise.id}
                className='flex items-center gap-4 border-b border-border py-4 w-full md:w-4/5 lg:w-3/5'
              >
                <div className='border rounded-full p-4'>
                  <Image
                    src={exercise.image_url || ExercisePlaceholder}
                    alt={exercise.name}
                    width={50}
                    height={50}
                    className='object-cover rounded-full'
                  />
                </div>
                <div className='w-2/3'>
                  <input
                    value={exercise.name}
                    readOnly
                    className='block w-full font-medium'
                  />
                  <span className='px-2 py-1 text-xs bg-primary/10 text-primary rounded-full w-fit'>
                    {exercise.muscle_group}
                  </span>
                </div>

                <div className='flex justify-center'>
                  <Button
                    variant='ghost'
                    onClick={() => handleDeleteExercise(exercise.id)}
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
            ))
          ) : (
            <div className='py-8 sm:py-12 px-4'>
              <Dumbbell className='w-10 h-10 sm:w-12 sm:h-12 text-gray-400  mb-4' />
              <h3 className='text-base sm:text-lg font-semibold text-gray-600 mb-2'>
                No exercises yet
              </h3>
              <p className='text-sm sm:text-base text-gray-500 mb-4'>
                Add your first exercise to get started
              </p>
            </div>
          )}
        </div>

        <div className='flex gap-4 justify-center mt-10 md:justify-start md:ml-5'>
          <Button
            variant='destructive'
            className='bg-[#96150c]'
            onClick={handleDiscardWorkout}
            type='button'
          >
            Discard Workout
          </Button>
          <Button onClick={handleSaveWorkout}>Save Workout</Button>
        </div>
      </form>

      <FinderModal
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
      />
    </>
  );
}
