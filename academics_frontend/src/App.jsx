import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Pages & Global Components
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Institutions from './pages/Institutions';
import ContactUs from './pages/ContactUs';
import FreeCounselling from './pages/FreeCounselling';
import CursorTrail from './components/CursorTrail';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

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
    };
  }, []);

  return (
    <Router>
      <div className="w-full min-h-screen bg-gray-50 text-gray-900 font-sans cursor-default">
        {/* Custom Magnetic Cursor + Mix-Blend-Difference + Particle Trail */}
        <CursorTrail />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/free-counselling" element={<FreeCounselling />} />

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