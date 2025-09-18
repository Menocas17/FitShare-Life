import React from "react";
import Header from "./page-components/Header";
import HeroSection from "./page-components/HeroSection";
import StatsSection from "./page-components/StatsSection";
import FeaturesSection from "./page-components/FeaturesSection";
import WorkoutTypesSection from "./page-components/WorkoutTypesSection";
import CommunitySection from "./page-components/CommunitySection";
import CTASection from "./page-components/CTASection";
import Footer from "./page-components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WorkoutTypesSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
