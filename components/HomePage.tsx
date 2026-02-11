import React from 'react';
import Header from './page-components/Header';
import HeroSection from './page-components/HeroSection';
import FeaturesSection from './page-components/FeaturesSection';
import WorkoutTypesSection from './page-components/WorkoutTypesSection';
import CommunitySection from './page-components/CommunitySection';
import CTASection from './page-components/CTASection';
import Footer from './page-components/Footer';

// TODO change this entire page to actually refelect what the app looks like and to be more honest in stadistics and reviews
const HomePage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <HeroSection />

      <FeaturesSection />
      <WorkoutTypesSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
