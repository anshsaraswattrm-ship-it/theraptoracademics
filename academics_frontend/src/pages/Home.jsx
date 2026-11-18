import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

// Sections
import HeroSection from '../components/HomeSections/HeroSection';
import MarqueeSection from '../components/HomeSections/MarqueeSection';
import StepsSection from '../components/HomeSections/StepsSection';
import CaseStudiesSection from '../components/HomeSections/CaseStudiesSection';
import PartnersSection from '../components/HomeSections/PartnersSection';
import TrendingCoursesSection from '../components/HomeSections/TrendingCoursesSection';
import ReelsSection from '../components/HomeSections/ReelsSection';
import FaqSection from '../components/HomeSections/FaqSection';
import CtaSection from '../components/HomeSections/CtaSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-clip">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <StepsSection />
      <CaseStudiesSection />
      <PartnersSection />
      <TrendingCoursesSection />
      <ReelsSection />
      <FaqSection />
      <CtaSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;