import type { Tables } from '@/types/supabase';
import { SetType } from '@/types/supabase';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
};

export interface SidebarProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

export interface NavbarProps {
  setOpen: (open: boolean) => void;
  user: User;
  handleLogout: () => void;
}

export type WorkoutSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectWorkout: (workoutType: string) => void;
};

export type WorkoutDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  workoutType: string;
};

//These Exercise and WorkoutData interfaces Might change when the API is set up

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface WorkoutData {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  targetMuscles: string[];
  exercises: Exercise[];
}

/// special types for the training log page

type WorkoutExercise = Tables<'workout_excercises'>;

export type WorkoutExerciseWithDetails = WorkoutExercise & {
  excercises: {
    name: string;
    image_url: string | null;
  } | null;
  workouts: {
    name: string;
  } | null;
};

export interface SetsProps {
  sets: SetType[] | null;
}
