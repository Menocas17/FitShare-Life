import type { Tables } from '@/types/supabase';
import { SetType, Json } from '@/types/supabase';

export type User = {
  id: string;
  name: string | null;
  email: string;
<<<<<<< HEAD
  avatar_url: string | null;
  password_hash?: string | null;
  session_token?: string | null;
  session_expiry?: string | null;
  reset_token?: string | null;
  reset_expiry?: string | null;
=======
  avatar: string | null;
>>>>>>> a237486153cdf4c235eedbe5c2d18b4508dd1558
  created_at: string;
  updated_at?: string | null;
};

// ✅ UI props
export interface SidebarProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

export interface NavbarProps {
  setOpen: (open: boolean) => void;
  user: User;
  handleLogout: () => void;
}

// ✅ Workouts & Training
export type WorkoutSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectWorkout: (workoutType: string) => void;
};

export type WorkoutDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  workoutId: string;
};

<<<<<<< HEAD
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface WorkoutData {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  targetMuscles: string[];
  exercises: Exercise[];
}

// ✅ Workout Exercises
type WorkoutExercise = Tables<"workout_excercises">;
=======
//These Exercise and WorkoutData interfaces Might change when the API is set up

/// special types for the training log page

type WorkoutExercise = Tables<'workout_excercises'>;
>>>>>>> a237486153cdf4c235eedbe5c2d18b4508dd1558

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

// ✅ Workout History
export interface WorkoutHystory {
  totalWeight: number;
  totalSets: number;
}

// ✅ Dashboard
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

// ✅ Social Features
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
