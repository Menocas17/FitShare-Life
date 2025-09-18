import { Dumbbell, Users, Share2 } from "lucide-react";
import { getCurrentYear } from "@/lib/utils";

// Navigation Links
export const navigationLinks = [
  { href: "#features", label: "Features" },
  { href: "#workouts", label: "Workouts" },
  { href: "#community", label: "Community" },
  { href: "#pricing", label: "Pricing" },
];

// Stats Data
export const statsData = [
  {
    value: "50k+",
    label: "Active Users",
    desc: "Growing community",
  },
  {
    value: "200+",
    label: "Workout Types",
    desc: "Diverse programs",
  },
  {
    value: "1M+",
    label: "Posts Shared",
    desc: "Community engagement",
  },
  {
    value: "4.9★",
    label: "App Rating",
    desc: "User satisfaction",
  },
];

// Features List
export const appFeatures = [
  "Personalized workout tracking",
  "Progress analytics and insights",
  "Social community features",
  "Seamless cross-platform sync",
];

// Feature Cards Data
export const featureCards = [
  {
    icon: Dumbbell,
    title: "Diverse Workouts",
    description:
      "Access hundreds of workout programs from strength training to yoga, HIIT to pilates.",
    features: [
      "Strength Training",
      "Cardio Workouts",
      "Yoga & Flexibility",
      "HIIT Programs",
    ],
  },
  {
    icon: Users,
    title: "Fitness Community",
    description:
      "Connect with like-minded individuals, share progress, and stay motivated together.",
    features: [
      "Progress Sharing",
      "Group Challenges",
      "Expert Guidance",
      "Peer Support",
    ],
  },
  {
    icon: Share2,
    title: "Social Integration",
    description:
      "Seamlessly connect with your favorite social platforms and share your achievements.",
    features: [
      "Instagram Integration",
      "Facebook Sharing",
      "Twitter Updates",
      "LinkedIn Posts",
    ],
  },
];

// Workout Types Data
export const workoutTypes = [
  {
    name: "Strength Training",
    image: "strength training gym equipment",
    users: "25k+",
  },
  {
    name: "Cardio Blast",
    image: "cardio workout running",
    users: "18k+",
  },
  {
    name: "Yoga Flow",
    image: "yoga meditation peaceful",
    users: "22k+",
  },
  {
    name: "HIIT Workouts",
    image: "high intensity interval training",
    users: "15k+",
  },
  {
    name: "Pilates Core",
    image: "pilates core strengthening",
    users: "12k+",
  },
  {
    name: "Dance Fitness",
    image: "dance fitness fun workout",
    users: "20k+",
  },
];

// Community Features
export const communityFeatures = [
  "Share workout photos and videos",
  "Comment and encourage others",
  "Join fitness challenges",
  "Connect with workout buddies",
];

// Community Posts Data
export const communityPosts = [
  {
    user: "Sarah M.",
    content:
      "Just completed my first 5K! Thanks to this amazing community for the support! 🏃‍♀️",
    likes: 24,
  },
  {
    user: "Mike R.",
    content:
      "Week 3 of strength training program. Feeling stronger every day! 💪",
    likes: 18,
  },
  {
    user: "Emma L.",
    content: "Yoga session this morning was exactly what I needed. Namaste! 🧘‍♀️",
    likes: 31,
  },
];

// Footer Links
export const footerLinks = {
  product: [
    { href: "#", label: "Features" },
    { href: "#", label: "Workouts" },
    { href: "#", label: "Community" },
    { href: "#", label: "Pricing" },
  ],
  support: [
    { href: "#", label: "Help Center" },
    { href: "#", label: "Contact Us" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
};

// App Info
export const appInfo = {
  name: "FitShare-Life",
  description:
    "Your complete fitness platform for workouts, community, and progress tracking.",
  footerName: "FitShare-Life",
  currentYear: getCurrentYear(),
};
