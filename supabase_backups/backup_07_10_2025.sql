-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.excercises (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  muscle_group character varying NOT NULL,
  description text NOT NULL,
  video_url character varying,
  image_url text,
  CONSTRAINT excercises_pkey PRIMARY KEY (id)
);
CREATE TABLE public.nutrition_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL,
  date date NOT NULL,
  meal_name character varying NOT NULL,
  calories numeric NOT NULL,
  macros jsonb,
  CONSTRAINT nutrition_logs_pkey PRIMARY KEY (id),
  CONSTRAINT nutrition_logs_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  weight numeric,
  height numeric,
  body_measurements jsonb,
  bio text,
  user_id uuid NOT NULL,
  user_name text,
  weight_goal numeric,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.progress_photos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  profile_id uuid NOT NULL,
  date_taken date NOT NULL,
  photo_url character varying NOT NULL,
  CONSTRAINT progress_photos_pkey PRIMARY KEY (id),
  CONSTRAINT progress_photos_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.social_connections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  follower_id uuid,
  followed_id uuid,
  CONSTRAINT social_connections_pkey PRIMARY KEY (id),
  CONSTRAINT social_connections_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.profiles(id),
  CONSTRAINT social_connections_followed_id_fkey FOREIGN KEY (followed_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.social_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  profile_id uuid NOT NULL,
  content text NOT NULL,
  media_url character varying,
  CONSTRAINT social_posts_pkey PRIMARY KEY (id),
  CONSTRAINT social_posts_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text,
  email text NOT NULL UNIQUE,
  password_hash text,
  created_at timestamp with time zone DEFAULT now(),
  avatar text,
  updated_at timestamp with time zone DEFAULT now(),
  session_token text,
  session_expiry timestamp without time zone,
  google_id text UNIQUE,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.workout_excercises (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  workout_id uuid NOT NULL,
  exercise_id uuid NOT NULL,
  sets jsonb NOT NULL DEFAULT '[{"reps": 0, "weight": 0}]'::jsonb,
  rest_time numeric NOT NULL DEFAULT '120'::numeric,
  CONSTRAINT workout_excercises_pkey PRIMARY KEY (id),
  CONSTRAINT workout_excercises_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES public.workouts(id),
  CONSTRAINT workout_excercises_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.excercises(id)
);
CREATE TABLE public.workout_history (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  workout_id uuid NOT NULL,
  total_weight numeric NOT NULL,
  total_sets numeric NOT NULL,
  profile_id uuid NOT NULL,
  CONSTRAINT workout_history_pkey PRIMARY KEY (id),
  CONSTRAINT workout_history_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES public.workouts(id),
  CONSTRAINT workout_history_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.workouts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name character varying NOT NULL,
  profile_id uuid,
  CONSTRAINT workouts_pkey PRIMARY KEY (id),
  CONSTRAINT workouts_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);