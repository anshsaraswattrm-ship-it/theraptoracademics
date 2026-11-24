import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Pages & Global Components
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Institutions from './pages/Institutions';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import ContactUs from './pages/ContactUs';
import FreeCounselling from './pages/FreeCounselling';
import StudentCareProcess from './pages/StudentCareProcess';
import Disclaimer from './pages/Disclaimer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CursorTrail from './components/CursorTrail';
import RaptorChatWidget from './components/RaptorChatWidget';
import Courses from './pages/Courses';
import MaltaUpdates from './pages/MaltaUpdates';
import BackToTop from './components/BackToTop';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Lock Lenis internal math directly to GSAP's 60+ FPS Ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  return (
    <Router>
      <BackToTop lenisRef={lenisRef} />
      <div className="w-full min-h-screen bg-gray-50 text-gray-900 font-sans cursor-default">
        {/* Custom Magnetic Cursor + Mix-Blend-Difference + Particle Trail */}
        <CursorTrail />

        {/* Option-Driven 2027 Assistant & Call Back Widget */}
        <RaptorChatWidget />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/malta-updates" element={<MaltaUpdates />} />
          <Route path="/malta-updates/:slug" element={<MaltaUpdates />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/free-counselling" element={<FreeCounselling />} />

          {/* Student Care & Legal Pages */}
          <Route path="/student-care-process" element={<StudentCareProcess />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">
                404 | Page Not Found
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;