import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaGraduationCap, 
  FaPlaneDeparture, 
  FaPlane,
  FaGlobeEurope, 
  FaPassport, 
  FaUniversity, 
  FaAward, 
  FaCompass 
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

// Balanced Global Education Icons for the Cinematic Intro
const eduIconList = [
  FaGraduationCap,
  FaGlobeEurope,
  FaPassport,
  FaUniversity,
  FaAward,
  FaCompass,
];

const floatingEduElements = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  Icon: eduIconList[i % eduIconList.length],
  left: `${(i * 7 + (i % 3) * 3) % 92}%`,
  size: (i % 3) * 5 + 24, // Balanced size: 24px, 29px, 34px
  duration: (i % 4) * 2 + 7, // Slower, graceful upward float (7s to 13s)
  delay: (i % 5) * 0.4,
  driftX: i % 2 === 0 ? 30 : -30,
}));

// Smooth Atmospheric Wind Streaks
const windStreaks = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  top: `${(i * 8 + 10) % 88}%`,
  width: `${(i % 3) * 90 + 140}px`,
  duration: (i % 3) * 0.7 + 1.8, // Smoother wind speed
  delay: (i % 5) * 0.35,
}));

const AboutUs = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Extended Intro Timeline: 7.2 seconds so the slow airplane completes its full journey
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 7200);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for smooth scrolling effects
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      
      {/* =========================================================
          SLOW-GLIDING AIRPLANE & GLOBAL EDUCATION INTRO (7.2s)
      ========================================================= */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="global-edu-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(12px)' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#06080e] select-none"
          >
            {/* Blurred Slow-Zoom European University Backdrop */}
            <motion.div
              initial={{ scale: 1.16, filter: 'blur(6px)' }}
              animate={{ scale: 1.02, filter: 'blur(3px)' }}
              transition={{ duration: 7.2, ease: 'easeOut' }}
              className="absolute inset-0 z-0"
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=85&w=1600"
                alt="Global Education Intro"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0a0f1d]/70 to-black/90" />
            </motion.div>

            {/* Ambient Wind Streaks Flowing Left to Right */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
              {windStreaks.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ x: '-25vw', opacity: 0 }}
                  animate={{ x: '115vw', opacity: [0, 0.4, 0] }}
                  transition={{
                    duration: w.duration,
                    delay: w.delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ top: w.top, width: w.width }}
                  className="absolute h-[1.5px] bg-gradient-to-r from-transparent via-white/35 to-transparent rounded-full -rotate-6"
                />
              ))}
            </div>

            {/* SLOW, MAJESTIC AIRPLANE GLIDING LEFT TO RIGHT WITH WIND SLIPSTREAM */}
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center overflow-hidden">
              <motion.div
                initial={{ x: '-35vw', y: '14vh', scale: 0.9, opacity: 0 }}
                animate={{ 
                  x: '110vw', 
                  y: '-14vh', 
                  scale: 1.05, 
                  opacity: [0, 0.45, 0.45, 0.45, 0] 
                }}
                transition={{
                  duration: 6.6, // Full 6.6 seconds steady glide across the screen
                  ease: 'linear', // Linear keeps speed smooth and constant (no sudden 1-second rush)
                }}
                className="relative flex items-center -rotate-6"
              >
                {/* Trailing Wind Slipstream & Contrails Behind the Plane */}
                <div className="flex flex-col gap-2.5 items-end -mr-4">
                  {/* Top Wingtip Wind Stream */}
                  <motion.div
                    animate={{ scaleX: [0.85, 1.15, 0.9], opacity: [0.25, 0.65, 0.25] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-56 md:w-[360px] h-[2px] bg-gradient-to-l from-white/80 via-red-400/50 to-transparent rounded-full blur-[0.5px]"
                  />
                  {/* Center Main Jet Engine Contrail */}
                  <motion.div
                    animate={{ scaleX: [0.95, 1.25, 1], opacity: [0.4, 0.85, 0.4] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-72 md:w-[500px] h-[4px] bg-gradient-to-l from-red-500 via-amber-400/60 to-transparent rounded-full blur-[1.5px]"
                  />
                  {/* Bottom Wingtip Wind Stream */}
                  <motion.div
                    animate={{ scaleX: [0.8, 1.1, 0.85], opacity: [0.25, 0.6, 0.25] }}
                    transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-52 md:w-[320px] h-[2px] bg-gradient-to-l from-white/80 via-white/40 to-transparent rounded-full blur-[0.5px]"
                  />
                  {/* Rippling Wind Wake Waves */}
                  <motion.div
                    animate={{ x: [0, -70], opacity: [0.6, 0], scale: [0.85, 1.35] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }}
                    className="w-16 h-5 border-l-2 border-t border-b border-white/35 rounded-full -mt-6 mr-8"
                  />
                </div>

                {/* Subtle Jet Engine Warm Glow */}
                <div className="w-10 h-10 rounded-full bg-red-600/50 blur-lg -mr-4" />

                {/* Balanced Classy Airplane Silhouette */}
                <FaPlane className="text-white/90 text-[95px] md:text-[140px] drop-shadow-[0_0_35px_rgba(220,38,38,0.75)]" />
              </motion.div>
            </div>

            {/* Balanced Floating Global Education Icons */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {floatingEduElements.map(({ id, Icon, left, size, duration, delay, driftX }) => (
                <motion.div
                  key={id}
                  initial={{ y: '105vh', opacity: 0, scale: 0.8 }}
                  animate={{
                    y: '-15vh',
                    opacity: [0, 0.4, 0.4, 0],
                    scale: [0.85, 1.05, 0.9],
                    x: [0, driftX, 0],
                  }}
                  transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ left }}
                  className="absolute text-white/75 drop-shadow-[0_0_12px_rgba(220,38,38,0.45)]"
                >
                  <Icon size={size} />
                </motion.div>
              ))}
            </div>

            {/* Top-Right "SKIP INTRO" Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={() => setShowIntro(false)}
              className="absolute top-7 right-7 z-30 px-5 py-2.5 border border-white/30 hover:border-red-500 bg-white/5 hover:bg-red-600 backdrop-blur-md text-white text-xs tracking-[0.25em] uppercase font-bold rounded-lg transition-all duration-300 cursor-pointer"
            >
              SKIP INTRO
            </motion.button>

            {/* Center Global Education Typography Reveal */}
            <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
              {/* Top Pill Badge: India to Europe */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 px-5 py-2 rounded-full text-xs text-gray-200 uppercase tracking-[0.25em] font-semibold mb-6 shadow-lg"
              >
                <span>INDIA</span>
                <FaPlaneDeparture className="text-red-500 animate-pulse" size={14} />
                <span>MALTA • EUROPE</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1.0 }}
                className="text-red-500 font-serif italic text-3xl md:text-4xl tracking-wide mb-1 drop-shadow-md"
              >
                The Raptor
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 1.1, ease: 'easeOut' }}
                className="text-5xl sm:text-7xl md:text-8xl font-serif italic font-bold text-white tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
              >
                Academics
              </motion.h1>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '200px', opacity: 1 }}
                transition={{ delay: 1.7, duration: 1.0 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto my-6"
              />

              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.32em' }}
                transition={{ delay: 2.0, duration: 1.2 }}
                className="text-gray-200 text-[11px] sm:text-xs md:text-sm uppercase font-semibold"
              >
                BRIDGING AMBITION TO EUROPEAN UNIVERSITIES
              </motion.p>
            </div>

            {/* Bottom Loading Progress Line (Synced to 7.0s) */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 7.0, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-white origin-left z-30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          YOUR EXISTING ABOUT US PAGE (100% UNCHANGED)
      ========================================================= */}
      <Navbar />

      {/* Hero Section with Background Overlay */}
      <section className="relative pt-40 pb-32 px-4 md:px-12 flex items-center justify-center min-h-[60vh]">
        {/* Background Image Placeholder with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" 
            alt="Students collaborating" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="relative z-10 text-center max-w-4xl mx-auto space-y-6"
        >
          <p className="text-red-500 font-bold uppercase tracking-[0.3em] text-sm">
            ★ About Us - The Raptor Academics ★
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Trusted Study Abroad Consultants
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Study Abroad Consultant in Jaipur — The Raptor Academics (TRA) was founded in 2016 with a vision to simplify the journey of students aspiring to pursue higher education overseas. As a trusted name in overseas education and visa consultancy, TRA is dedicated to turning global education dreams into reality through expert guidance, transparent processes, and personalized support.
          </p>
        </motion.div>
      </section>

      {/* Section 1: Committed To Your Success */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Committed To Your <span className="text-gray-400">Success</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At The Raptor Academics, we believe that every student deserves the opportunity to study in their dream destination without being held back by financial, procedural, or emotional barriers. Our mission is to make the entire process of studying abroad seamless, enriching, and goal-oriented, empowering students to achieve their academic and career aspirations across the globe.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full h-[400px] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80" alt="Consultation" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Why Choose TRA? (Stats Banner) */}
      <section className="bg-gray-50 py-20 px-4 md:px-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TRA?</h2>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">Proven Success, Real Results</p>
        </div>
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
        >
          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="text-6xl font-light text-gray-900">11K<span className="text-red-600">+</span></h3>
            <div className="w-12 h-1 bg-red-600 mx-auto rounded"></div>
            <p className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Helped Students & Clients</p>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="text-6xl font-light text-gray-900">95<span className="text-red-600">%</span></h3>
            <div className="w-12 h-1 bg-red-600 mx-auto rounded"></div>
            <p className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Visa Approval Success Rate</p>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="text-6xl font-light text-gray-900">24<span className="text-red-600">Hr</span></h3>
            <div className="w-12 h-1 bg-red-600 mx-auto rounded"></div>
            <p className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Application Processing Time</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 3: Our Mission (Image Left, Text Right) */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full h-[500px] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1"
          >
            <img src="https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&q=80" alt="Travel" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="order-1 lg:order-2"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-2">Our Mission</h3>
            <h4 className="text-3xl text-gray-400 mb-6">Guiding Your Path To Success</h4>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              At TRA, we simplify the complexities of studying abroad by focusing on what matters most <span className="text-red-600 font-bold">your dreams, aspirations, and future.</span> Our mission is to:
            </p>
            <ul className="space-y-4 text-gray-700 font-medium">
              <li className="flex items-center gap-3"><FaCheckCircle className="text-red-600" /> Unite students with global opportunities.</li>
              <li className="flex items-center gap-3"><FaCheckCircle className="text-red-600" /> Open pathways to top universities worldwide.</li>
              <li className="flex items-center gap-3"><FaCheckCircle className="text-red-600" /> Make the process enriching, seamless, and goal-oriented.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Our Story (Text Left, Image Right) */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-2">Our Story</h3>
            <h4 className="text-3xl text-gray-400 mb-6">Empowering Dreams</h4>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our core philosophy <span className="font-bold text-gray-900">"Your dreams are our dreams"</span> reflects our deep commitment to every student we serve. We don't just provide consultancy; we walk beside you at every step, ensuring your transition to an international education is smooth, affordable, and successful.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full h-[400px] bg-gray-200 rounded-3xl overflow-hidden shadow-xl"
          >
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Team Support" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Section 5: Team & Institutions */}
      <section className="bg-gray-50 py-20 px-4 md:px-12 text-center">
        <div className="max-w-4xl mx-auto mb-20">
           <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">★ TRA TEAM ★</p>
           <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Experts</h2>
           <p className="text-gray-600 text-lg">
             For trusted guidance and a personalized approach to your overseas education goals, connect with <span className="font-bold text-gray-900">The Raptor Academics</span>, your reliable Study Abroad Consultant in Jaipur.
           </p>
           <p className="text-gray-500 mt-4 italic">Our team is more than just consultants; they are partners in your journey.</p>
        </div>

        {/* Institutions Grid Placeholder */}
        <div className="max-w-6xl mx-auto">
           <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-12">★ TOP INSTITUTIONS ★</p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white h-32 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition duration-300">
                  <span className="text-gray-400 font-bold tracking-widest text-sm">PARTNER LOGO</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      <Footer />
    </div>
  );
};

export default AboutUs;