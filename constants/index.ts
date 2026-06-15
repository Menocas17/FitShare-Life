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
      'Access hundreds of workout programs from strength training heavy training to resistence training.',
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
    features: ['Instagram Integration', 'Facebook Sharing', 'Twitter Updates'],
  },
];

export const ExercisePlaceholder = '/img/ExercisePlaceholder.svg';

// Workout Types Data
export const workoutTypes = [
  {
    name: 'Upper / Lower',
    image: '/img/upperLower.avif',
    users: '25k+',
  },
  {
    name: 'Shoulder / Back',
    image: '/img/back.avif',
    users: '18k+',
  },
  {
    name: 'Full Body',
    image: '/img/fullBody.webp',
    users: '22k+',
  },
  {
    name: 'Full Legs',
    image: '/img/legs.jpg',
    users: '15k+',
  },
  {
    name: 'Push day',
    image: '/img/push.jpeg',
    users: '12k+',
  },
  {
    name: 'Pull day',
    image: '/img/pull.jpg',
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
  { href: '/setting', label: 'Settings', icon: Settings },
];

export const homeLinks = [
  { href: '/home', icon: BarChart3, label: 'My Stats' },
  { href: '/home/explore', icon: Users, label: 'Explore' },

  { href: '/home/leaderboards', icon: Trophy, label: 'Leaderboards' },
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
