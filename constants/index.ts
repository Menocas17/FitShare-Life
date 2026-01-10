import {
  Dumbbell,
  User,
  Share2,
  Home,
  Settings,
  Shield,
  BarChart3,
  Users,
  MessageSquare,
  Trophy,
} from 'lucide-react';
import { getCurrentYear } from '@/lib/utils';

// Navigation Links
export const navigationLinks = [
  { href: '#features', label: 'Features' },
  { href: '#workouts', label: 'Workouts' },
  { href: '#community', label: 'Community' },
  { href: '#pricing', label: 'Pricing' },
];

// Stats Data
export const statsData = [
  {
    value: '50k+',
    label: 'Active Users',
    desc: 'Growing community',
  },
  {
    value: '200+',
    label: 'Workout Types',
    desc: 'Diverse programs',
  },
  {
    value: '1M+',
    label: 'Posts Shared',
    desc: 'Community engagement',
  },
  {
    value: '4.9★',
    label: 'App Rating',
    desc: 'User satisfaction',
  },
];

// Features List
export const appFeatures = [
  'Personalized workout tracking',
  'Progress analytics and insights',
  'Social community features',
  'Seamless cross-platform sync',
];

// Feature Cards Data
export const featureCards = [
  {
    icon: Dumbbell,
    title: 'Diverse Workouts',
    description:
      'Access hundreds of workout programs from strength training to yoga, HIIT to pilates.',
    features: [
      'Strength Training',
      'Cardio Workouts',
      'Yoga & Flexibility',
      'HIIT Programs',
    ],
  },
  {
    icon: User,
    title: 'Fitness Community',
    description:
      'Connect with like-minded individuals, share progress, and stay motivated together.',
    features: [
      'Progress Sharing',
      'Group Challenges',
      'Expert Guidance',
      'Peer Support',
    ],
  },
  {
    icon: Share2,
    title: 'Social Integration',
    description:
      'Seamlessly connect with your favorite social platforms and share your achievements.',
    features: [
      'Instagram Integration',
      'Facebook Sharing',
      'Twitter Updates',
      'LinkedIn Posts',
    ],
  },
];

export const ExercisePlaceholder = '/img/ExercisePlaceholder.svg';

// Workout Types Data
export const workoutTypes = [
  {
    name: 'Strength Training',
    image: 'strength training gym equipment',
    users: '25k+',
  },
  {
    name: 'Cardio Blast',
    image: 'cardio workout running',
    users: '18k+',
  },
  {
    name: 'Yoga Flow',
    image: 'yoga meditation peaceful',
    users: '22k+',
  },
  {
    name: 'HIIT Workouts',
    image: 'high intensity interval training',
    users: '15k+',
  },
  {
    name: 'Pilates Core',
    image: 'pilates core strengthening',
    users: '12k+',
  },
  {
    name: 'Dance Fitness',
    image: 'dance fitness fun workout',
    users: '20k+',
  },
];

// Community Features
export const communityFeatures = [
  'Share workout photos and videos',
  'Comment and encourage others',
  'Join fitness challenges',
  'Connect with workout buddies',
];

// Community Posts Data
export const communityPosts = [
  {
    user: 'Sarah M.',
    content:
      'Just completed my first 5K! Thanks to this amazing community for the support! 🏃‍♀️',
    likes: 24,
  },
  {
    user: 'Mike R.',
    content:
      'Week 3 of strength training program. Feeling stronger every day! 💪',
    likes: 18,
  },
  {
    user: 'Emma L.',
    content: 'Yoga session this morning was exactly what I needed. Namaste! 🧘‍♀️',
    likes: 31,
  },
];

// Footer Links
export const footerLinks = {
  product: [
    { href: '#', label: 'Features' },
    { href: '#', label: 'Workouts' },
    { href: '#', label: 'Community' },
    { href: '#', label: 'Pricing' },
  ],
  support: [
    { href: '#', label: 'Help Center' },
    { href: '#', label: 'Contact Us' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
  ],
};

// App Info
export const appInfo = {
  name: 'FitShare-Life',
  description:
    'Your complete fitness platform for workouts, community, and progress tracking.',
  footerName: 'FitShare-Life',
  currentYear: getCurrentYear(),
};

// Sidebar Links - These routes are automatically protected by middleware
// Any new links added here will be automatically protected for authenticated users only
export const sidebarLinks = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/myprofile', label: 'My Profile', icon: User },
  { href: '/workout-management', label: 'Workouts', icon: Shield },
  { href: '/exercises', label: 'Exercises', icon: Dumbbell },
  { href: '/setting', label: 'Settings', icon: Settings },
];

export const homeLinks = [
  { href: '/home', icon: BarChart3, label: 'My Stats' },
  { href: 'home/explore', icon: Users, label: 'Explore' },
  { href: 'home/myPosts', icon: MessageSquare, label: 'My Posts' },
  { href: 'home/leaderboards', icon: Trophy, label: 'Leaderboards' },
];

//All these below are placeholders for workout, exercise and details
export const workouts = [
  {
    id: 1,
    name: 'Morning Cardio',
    type: 'Cardio',
    duration: 30,
    exercises: 5,
    lastPerformed: '2 days ago',
  },
  {
    id: 2,
    name: 'Strength Training',
    type: 'Strength',
    duration: 45,
    exercises: 8,
    lastPerformed: 'Yesterday',
  },
  {
    id: 3,
    name: 'Yoga Flow',
    type: 'Flexibility',
    duration: 60,
    exercises: 12,
    lastPerformed: '1 week ago',
  },
];

//placehold data for workouttypes, remove later when endoint is ready

export const workoutOptions = [
  {
    id: 'leg-day',
    title: 'Leg Day',
    description: 'Build stronger legs with squats, lunges, and more',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
    color: 'bg-blue-500',
  },
  {
    id: 'back-day',
    title: 'Back Day',
    description: 'Strengthen your back with pulls, rows, and deadlifts',
    image:
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop&crop=center',
    color: 'bg-green-500',
  },
  {
    id: 'chest-day',
    title: 'Chest Day',
    description: 'Build chest strength with presses and flies',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&crop=center',
    color: 'bg-red-500',
  },
];

//This data is a placehold for now until the data is ready

// export const workoutData: Record<string, WorkoutData> = {
//   'leg-day': {
//     title: 'Leg Day Workout',
//     description: 'Complete lower body strength training session',
//     duration: '45-60 minutes',
//     difficulty: 'Intermediate',
//     targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
//     exercises: [
//       {
//         id: '1',
//         name: 'Barbell Squats',
//         sets: 4,
//         reps: '8-12',
//         rest: '2-3 min',
//         difficulty: 'Intermediate',
//       },
//       {
//         id: '2',
//         name: 'Romanian Deadlifts',
//         sets: 3,
//         reps: '10-12',
//         rest: '90 sec',
//         difficulty: 'Intermediate',
//       },
//       {
//         id: '3',
//         name: 'Walking Lunges',
//         sets: 3,
//         reps: '12 each leg',
//         rest: '60 sec',
//         difficulty: 'Beginner',
//       },
//       {
//         id: '4',
//         name: 'Leg Press',
//         sets: 4,
//         reps: '12-15',
//         rest: '90 sec',
//         difficulty: 'Beginner',
//       },
//       {
//         id: '5',
//         name: 'Calf Raises',
//         sets: 4,
//         reps: '15-20',
//         rest: '45 sec',
//         difficulty: 'Beginner',
//       },
//     ],
//   },
//   'back-day': {
//     title: 'Back Day Workout',
//     description: 'Complete upper back and posterior chain training',
//     duration: '50-65 minutes',
//     difficulty: 'Intermediate',
//     targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Trapezius', 'Rear Delts'],
//     exercises: [
//       {
//         id: '1',
//         name: 'Pull-ups/Chin-ups',
//         sets: 4,
//         reps: '6-10',
//         rest: '2-3 min',
//         difficulty: 'Advanced',
//       },
//       {
//         id: '2',
//         name: 'Barbell Rows',
//         sets: 4,
//         reps: '8-10',
//         rest: '2 min',
//         difficulty: 'Intermediate',
//       },
//       {
//         id: '3',
//         name: 'Lat Pulldowns',
//         sets: 3,
//         reps: '10-12',
//         rest: '90 sec',
//         difficulty: 'Beginner',
//       },
//       {
//         id: '4',
//         name: 'Seated Cable Rows',
//         sets: 3,
//         reps: '12-15',
//         rest: '60 sec',
//         difficulty: 'Beginner',
//       },
//       {
//         id: '5',
//         name: 'Face Pulls',
//         sets: 3,
//         reps: '15-20',
//         rest: '45 sec',
//         difficulty: 'Beginner',
//       },
//     ],
//   },
//   'chest-day': {
//     title: 'Chest Day Workout',
//     description: 'Complete chest and pushing muscles training',
//     duration: '40-55 minutes',
//     difficulty: 'Intermediate',
//     targetMuscles: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
//     exercises: [
//       {
//         id: '1',
//         name: 'Barbell Bench Press',
//         sets: 4,
//         reps: '6-8',
//         rest: '3 min',
//         difficulty: 'Intermediate',
//       },
//       {
//         id: '2',
//         name: 'Incline Dumbbell Press',
//         sets: 3,
//         reps: '8-10',
//         rest: '2 min',
//         difficulty: 'Intermediate',
//       },
//       {
//         id: '3',
//         name: 'Chest Flyes',
//         sets: 3,
//         reps: '10-12',
//         rest: '90 sec',
//         difficulty: 'Beginner',
//       },
//       {
//         id: '4',
//         name: 'Push-ups',
//         sets: 3,
//         reps: '12-15',
//         rest: '60 sec',
//         difficulty: 'Beginner',
//       },
//       {
//         id: '5',
//         name: 'Chest Dips',
//         sets: 3,
//         reps: '8-12',
//         rest: '90 sec',
//         difficulty: 'Advanced',
//       },
//     ],
//   },
// };
