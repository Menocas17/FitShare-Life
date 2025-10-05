import type { Tables } from '@/types/supabase';
import { SetType, Json } from '@/types/supabase';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
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
  id: string;
}

// interface for the data that will be saved in the workout hystory

export interface WorkoutHystory {
  totalWeight: number;
  totalSets: number;
}

// Dashboard specific types

export interface DashboardStats {
  workoutsCompleted: number;
  averageHoursTrained: number;
  totalWorkouts: number;
  totalWeight: number;
  totalSets: number;
  averageWeight: number;
}

export interface UserProfile {
  id: string;
  user_id: string | null;
  user_name: string | null;
  weight: number | null;
  weight_goal: number | null;
  height: number | null;
  bio: string | null;
  body_measurements: Json | null;
  created_at: string;
  users?: {
    avatar: string | null;
  };
}

export interface BodyMeasurements {
  chest?: number;
  waist?: number;
  hips?: number;
  bicep?: number;
  thigh?: number;
}

export interface RecentWorkout {
  id: string;
  created_at: string;
  total_sets: number;
  total_weight: number;
  workouts: {
    name: string;
  } | null;
}

export interface DashboardData {
  profile: UserProfile | null;
  stats: DashboardStats;
  recentWorkout: RecentWorkout | null;
}

// Social Media Types
export interface SocialPost {
  id: string;
  content: string;
  media_url: string | null;
  created_at: string;
  profile_id: string;
  profiles?: {
    id: string;
    user_id: string | null;
    user_name: string | null;
  };
}

export interface CreatePostData {
  content: string;
  media_url?: string;
}
