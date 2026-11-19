import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaGraduationCap, 
  FaPlaneDeparture, 
  FaPlane,
  FaGlobeEurope, 
  FaPassport, 
  FaUniversity, 
  FaAward, 
  FaCompass,
  FaQuoteLeft,
  FaUserTie,
  FaHandshake,
  FaFileAlt,
  FaHome
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

// =========================================================
// DIRECTOR PHOTO URL (Yahan Deependra Sir ki photo URL dal dena)
// =========================================================
const DIRECTOR_IMAGE = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=85&w=800";

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
  size: (i % 3) * 5 + 24,
  duration: (i % 4) * 2 + 7,
  delay: (i % 5) * 0.4,
  driftX: i % 2 === 0 ? 30 : -30,
}));

// Smooth Atmospheric Wind Streaks
const windStreaks = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  top: `${(i * 8 + 10) % 88}%`,
  width: `${(i % 3) * 90 + 140}px`,
  duration: (i % 3) * 0.7 + 1.8,
  delay: (i % 5) * 0.35,
}));

// 6 Pillars from SEO Word File
const whyChoosePoints = [
  {
    num: "01",
    title: "Personalised Study Abroad Counselling",
    desc: "We understand your qualifications, academic interests, budget and future plans before suggesting suitable study destinations and programmes.",
    Icon: FaUserTie
  },
  {
    num: "02",
    title: "Malta-Focused Education Guidance",
    desc: "Explore study opportunities in Malta with guidance on institutions, courses, admission requirements, tuition fees and student visa documentation.",
    Icon: FaUniversity
  },
  {
    num: "03",
    title: "European Study Destination Guidance",
    desc: "Discover higher education opportunities in selected European countries and understand the differences in courses, institutions, costs and admission requirements.",
    Icon: FaGlobeEurope
  },
  {
    num: "04",
    title: "University & Course Selection",
    desc: "Get assistance in comparing institutions and identifying programmes that align with your academic background and career objectives.",
    Icon: FaGraduationCap
  },
  {
    num: "05",
    title: "Student Visa & Documentation Assistance",
    desc: "Understand destination-specific visa requirements and get guidance on organising the documents needed for your application.",
    Icon: FaPassport
  },
  {
    num: "06",
    title: "Continued Student Support",
    desc: "Our guidance extends beyond initial counselling, helping you understand the next steps in your admission and pre-departure journey.",
    Icon: FaHandshake
  }
];

// 5-Step Journey from SEO Word File
const journeySteps = [
  {
    step: "Step 01",
    title: "Course & Destination Counselling",
    desc: "Explore suitable courses, academic pathways and study destinations based on your qualifications, interests and budget.",
    Icon: FaCompass
  },
  {
    step: "Step 02",
    title: "University & College Selection",
    desc: "Compare relevant international institutions, programme structures, entry criteria and tuition fees.",
    Icon: FaUniversity
  },
  {
    step: "Step 03",
    title: "Admission Consultation",
    desc: "Understand admission requirements, prepare supporting documents and receive guidance throughout the university application process.",
    Icon: FaFileAlt
  },
  {
    step: "Step 04",
    title: "Student Visa Assistance",
    desc: "Get guidance on student visa requirements, application documentation and the relevant procedures for your chosen destination.",
    Icon: FaPassport
  },
  {
    step: "Step 05",
    title: "Accommodation & Pre-Departure Guidance",
    desc: "Understand accommodation options, travel preparation and essential documents before beginning your international education journey.",
    Icon: FaHome
  }
];

// =========================================================
// 12 PARTNER INSTITUTIONS LOGOS + DIRECT INSTITUTION SLUGS
// =========================================================
const partnerLogos = [
  {
    name: "La Vallette Institute (LVI)",
    slug: "la-vallette-institute-lvi",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/La-Vallette-institute-PNG-08-360x312-1-1.png"
  },
  {
    name: "Avanza Training Academy",
    slug: "avanza-training-academy",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/gabriel-bajada-malta-avanza-training-academy-logo-primary-jpg.webp"
  },
  {
    name: "Uniplural Academy",
    slug: "uniplural-academy",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079937/OIP.webp"
  },
  {
    name: "Malita International College (MIC)",
    slug: "malita-international-college-mic",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/malita-logo-dark-scaled.png"
  },
  {
    name: "Learn Key Training Institute",
    slug: "learn-key-training-institute",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079939/Learnkey-malta-logo.png"
  },
  {
    name: "21 Academy Malta",
    slug: "21-academy",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/4-removebg-preview.webp"
  },
  {
    name: "Think Talent (OTHM)",
    slug: "think-talent",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/ThinkTalent.webp"
  },
  {
    name: "EEC-ITIS Tourism Institute",
    slug: "eec-itis",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795080664/eec_itis_logo.webp"
  },
  {
    name: "Swiss School of Management (SSM)",
    slug: "swiss-school-of-management",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/logo.png"
  },
  {
    name: "BESC Graduate College",
    slug: "besc-graduate-college",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079939/Logo_Malta_DEFINITIVO.png"
  },
  {
    name: "Global College Malta",
    slug: "global-college-malta",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079937/Logo-transparent-GCM-01-300x63-1.png"
  },
  {
    name: "GBS Malta",
    slug: "gbs-malta",
    logo: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079937/gbs_social_profile_gbs-malta_twitter-400-x-400-svg.png"
  }
];

const AboutUs = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 7200);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* =========================================================
          SEO META TAGS
      ========================================================= */}
      <SEO
        title="About The Raptor Academics | Study Abroad Consultants Jaipur"
        description="Get to know The Raptor Academics, a Jaipur-based overseas education consultancy helping Indian students explore Malta and European study opportunities."
        keywords="About The Raptor Academics, Study Abroad Consultants Jaipur, Malta Education Consultants Jaipur, Overseas Education Consultancy Mansarovar Jaipur, Deependra Singh Rathore"
      />

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
                  duration: 6.6,
                  ease: 'linear',
                }}
                className="relative flex items-center -rotate-6"
              >
                <div className="flex flex-col gap-2.5 items-end -mr-4">
                  <motion.div
                    animate={{ scaleX: [0.85, 1.15, 0.9], opacity: [0.25, 0.65, 0.25] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-56 md:w-[360px] h-[2px] bg-gradient-to-l from-white/80 via-red-400/50 to-transparent rounded-full blur-[0.5px]"
                  />
                  <motion.div
                    animate={{ scaleX: [0.95, 1.25, 1], opacity: [0.4, 0.85, 0.4] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-72 md:w-[500px] h-[4px] bg-gradient-to-l from-red-500 via-amber-400/60 to-transparent rounded-full blur-[1.5px]"
                  />
                  <motion.div
                    animate={{ scaleX: [0.8, 1.1, 0.85], opacity: [0.25, 0.6, 0.25] }}
                    transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-52 md:w-[320px] h-[2px] bg-gradient-to-l from-white/80 via-white/40 to-transparent rounded-full blur-[0.5px]"
                  />
                  <motion.div
                    animate={{ x: [0, -70], opacity: [0.6, 0], scale: [0.85, 1.35] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }}
                    className="w-16 h-5 border-l-2 border-t border-b border-white/35 rounded-full -mt-6 mr-8"
                  />
                </div>

                <div className="w-10 h-10 rounded-full bg-red-600/50 blur-lg -mr-4" />
                <FaPlane className="text-white/90 text-[95px] md:text-[140px] drop-shadow-[0_0_35px_rgba(220,38,38,0.75)]" />
              </motion.div>
            </div>

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

            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={() => setShowIntro(false)}
              className="absolute top-7 right-7 z-30 px-5 py-2.5 border border-white/30 hover:border-red-500 bg-white/5 hover:bg-red-600 backdrop-blur-md text-white text-xs tracking-[0.25em] uppercase font-bold rounded-lg transition-all duration-300 cursor-pointer"
            >
              SKIP INTRO
            </motion.button>

            <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
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
          NAVBAR
      ========================================================= */}
      <Navbar />

      {/* =========================================================
          1. HERO SECTION
      ========================================================= */}
      <section className="relative pt-40 pb-32 px-4 md:px-12 flex items-center justify-center min-h-[62vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" 
            alt="Students collaborating at The Raptor Academics Jaipur" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="relative z-10 text-center max-w-4xl mx-auto space-y-6"
        >
          <p className="text-red-500 font-bold uppercase tracking-[0.25em] text-xs md:text-sm">
            ★ ABOUT US – THE RAPTOR ACADEMICS ★
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Your Trusted Study Abroad Consultants in Jaipur
          </h1>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto">
            The Raptor Academics (since 2016) is a Jaipur-based overseas education consultancy helping Indian students explore higher education opportunities in Malta and selected European destinations. We provide personalised guidance for university selection, admissions, student visas and application documentation, making the study abroad journey simpler and more transparent.
          </p>
        </motion.div>
      </section>

      {/* =========================================================
          2. COMMITTED TO YOUR SUCCESS
      ========================================================= */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f2547] leading-tight">
              Committed To Your <span className="text-red-600">Success</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Choosing to study abroad requires the right course, university and financial planning. At The Raptor Academics (since 2016), we understand your academic background, career goals and budget to help you explore suitable opportunities in Malta and selected European destinations.
            </p>
            <div className="pt-2">
              <h3 className="text-lg font-extrabold text-[#0f2547] uppercase tracking-wider mb-4">
                Our Commitment:
              </h3>
              <ul className="space-y-3.5 text-gray-800 font-semibold text-base">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-red-600 shrink-0" />
                  <span>Personalised academic and career guidance.</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-red-600 shrink-0" />
                  <span>University and course selection.</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-red-600 shrink-0" />
                  <span>Admission and documentation assistance.</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-red-600 shrink-0" />
                  <span>Student visa and pre-departure support.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7 }}
            className="w-full h-[430px] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-50"
          >
            <img src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80" alt="Student Consultation Jaipur" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          3. WHY CHOOSE THE RAPTOR ACADEMICS?
      ========================================================= */}
      <section className="bg-[#f8fafc] py-20 md:py-24 px-4 md:px-12 border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <p className="text-red-600 font-extrabold uppercase tracking-widest text-xs">
              ★ PROVEN SUCCESS, REAL RESULTS ★
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f2547]">
              Why Choose The Raptor Academics?
            </h2>
            <p className="text-xl font-bold text-gray-700">
              Your Study Abroad Journey Deserves the Right Guidance
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Finding the right overseas education consultant is about more than submitting university applications. It is about having access to relevant information, understanding your options and receiving guidance that considers your individual circumstances.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center mb-14">
            <div className="bg-white p-7 md:p-8 rounded-3xl shadow-sm border border-gray-200/80 space-y-3">
              <h3 className="text-5xl md:text-6xl font-extrabold text-[#0f2547]">
                4K<span className="text-red-600">+</span>
              </h3>
              <div className="w-12 h-1 bg-red-600 mx-auto rounded"></div>
              <p className="text-gray-600 font-bold uppercase tracking-wider text-xs">
                Helped Students & Clients
              </p>
            </div>

            <div className="bg-white p-7 md:p-8 rounded-3xl shadow-sm border border-gray-200/80 space-y-3">
              <h3 className="text-5xl md:text-6xl font-extrabold text-[#0f2547]">
                95<span className="text-red-600">%</span>
              </h3>
              <div className="w-12 h-1 bg-red-600 mx-auto rounded"></div>
              <p className="text-gray-600 font-bold uppercase tracking-wider text-xs">
                Visa Approval Success Rate
              </p>
            </div>

            <div className="bg-white p-7 md:p-8 rounded-3xl shadow-sm border border-gray-200/80 space-y-3">
              <h3 className="text-5xl md:text-6xl font-extrabold text-[#0f2547]">
                24 <span className="text-red-600">Hrs</span>
              </h3>
              <div className="w-12 h-1 bg-red-600 mx-auto rounded"></div>
              <p className="text-gray-600 font-bold uppercase tracking-wider text-xs">
                Application Processing Time
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {whyChoosePoints.map((item) => {
              const IconComp = item.Icon;
              return (
                <div
                  key={item.num}
                  className="bg-white rounded-3xl p-7 border border-gray-200/90 hover:border-red-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0f2547] text-white flex items-center justify-center shadow-md">
                      <IconComp size={20} className="text-red-400" />
                    </div>
                    <span className="text-2xl font-black text-gray-200">{item.num}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-[#0f2547] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. OUR STORY
      ========================================================= */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}
            className="space-y-5"
          >
            <p className="text-red-600 font-extrabold uppercase tracking-widest text-xs">
              ★ SINCE 2016 • JAIPUR TO EUROPE ★
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f2547] leading-tight">
              Our Story <br />
              <span className="text-gray-400 font-bold text-3xl md:text-4xl">Empowering Dreams</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              The Raptor Academics was founded with a vision to make international education more accessible through clear and personalised guidance. Based in Jaipur, we help students explore suitable universities, courses and study opportunities in Malta and selected European destinations.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Since 2016, our focus has been on understanding student aspirations and supporting them through admissions, documentation and visa guidance.
            </p>
            <div className="bg-red-50/80 border-l-4 border-red-600 p-4 rounded-r-2xl">
              <p className="text-[#0f2547] font-extrabold text-base md:text-lg italic">
                “Your dreams, our guidance, your global journey.”
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7 }}
            className="w-full h-[420px] bg-gray-200 rounded-3xl overflow-hidden shadow-xl"
          >
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="The Raptor Academics Team Support" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          5. OUR MISSION & OUR VISION
      ========================================================= */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7 }}
            className="w-full h-[520px] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1"
          >
            <img src="https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&q=80" alt="European Architecture & Pathways" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}
            className="order-1 lg:order-2 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2547]">
                Our Mission
              </h2>
              <h3 className="text-xl md:text-2xl font-bold text-red-600">
                Making International Education More Accessible
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Our mission is to simplify overseas education through personalised counselling, reliable information and structured admission and visa guidance.
              </p>
              <div className="pt-1">
                <p className="text-sm font-extrabold uppercase tracking-wider text-[#0f2547] mb-3">
                  Our Mission Includes:
                </p>
                <ul className="space-y-3 text-gray-800 font-semibold text-base">
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-red-600 shrink-0" />
                    <span>Connecting students with suitable global education opportunities.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-red-600 shrink-0" />
                    <span>Guiding course and university selection.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-red-600 shrink-0" />
                    <span>Simplifying admission and visa documentation.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-red-600 shrink-0" />
                    <span>Supporting students throughout their study abroad journey.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#f8fafc] border border-gray-200 rounded-3xl p-6 md:p-7 space-y-2.5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 block">
                Our Vision
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0f2547]">
                Creating Pathways to Global Education
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                We aim to become a trusted study abroad consultancy in Jaipur and across India, helping students explore international education opportunities through transparent guidance, meaningful institutional relationships and student-focused support.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          6. HOW WE SUPPORT YOUR STUDY ABROAD JOURNEY
      ========================================================= */}
      <section className="py-24 px-4 md:px-12 bg-[#0f2547] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-red-400 font-extrabold uppercase tracking-widest text-xs">
              ★ END-TO-END GUIDANCE ★
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              How We Support Your Study Abroad Journey
            </h2>
            <p className="text-blue-100/80 text-base md:text-lg">
              From Your First Counselling Session to Pre-Departure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {journeySteps.map((item, idx) => {
              const IconComp = item.Icon;
              return (
                <div
                  key={idx}
                  className="bg-[#1b365d]/80 border border-white/15 rounded-3xl p-6 flex flex-col justify-between space-y-5 hover:border-red-500/60 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                        <IconComp size={18} />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200/70">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-blue-100/80 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          7. DIRECTOR'S STORY: FROM JAIPUR TO MALTA (With Director Portrait Side-by-Side)
      ========================================================= */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            className="bg-gradient-to-br from-[#f8fafc] to-white border-2 border-gray-200/90 rounded-[2.5rem] p-8 md:p-12 lg:p-14 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-6 right-8 text-red-600/10 pointer-events-none">
              <FaQuoteLeft size={120} />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Side: Leadership Message */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block bg-red-50 border border-red-100 text-red-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  ★ Leadership Message ★
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f2547] leading-tight">
                  Director’s Story: From Jaipur to Malta
                </h2>

                <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
                  <p>
                    When I founded The Raptor Academics in Mansarovar, Jaipur, in 2016, my vision was to provide students with honest, transparent and personalised study abroad guidance.
                  </p>
                  <p>
                    Over the years, we have developed a strong focus on Malta student admissions and visa guidance, while expanding our support to selected European destinations. I believe our responsibility goes beyond securing admission or a visa. We also support students with accommodation guidance and settling into their new environment.
                  </p>
                  <p>
                    For us, every student is more than an application number. We believe in building lasting relationships and supporting them throughout their international education journey.
                  </p>
                  <p>
                    Today, I remain committed to helping students turn their global education aspirations into informed opportunities.
                  </p>
                  <p className="font-bold text-[#0f2547]">
                    If you are planning your future abroad, we welcome you to The Raptor Academics.
                  </p>
                </div>

                <div className="pt-5 border-t border-gray-200">
                  <p className="text-xl md:text-2xl font-extrabold text-[#0f2547]">
                    — Deependra Singh Rathore
                  </p>
                  <p className="text-sm font-bold text-red-600 mt-0.5">
                    Founder & Director, The Raptor Academics
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">
                    Mansarovar, Jaipur • Est. 2016
                  </p>
                </div>
              </div>

              {/* Right Side: Director Portrait Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#0f2547] group">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={DIRECTOR_IMAGE}
                      alt="Deependra Singh Rathore - Founder & Director, The Raptor Academics"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2547] via-[#0f2547]/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="inline-block bg-red-600 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                      Founder & Director
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold leading-tight">
                      Deependra Singh Rathore
                    </h3>
                    <p className="text-blue-100/85 text-xs font-medium mt-0.5">
                      The Raptor Academics • Mansarovar, Jaipur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          8. MEET OUR EXPERTS & 12 LARGE CLICKABLE PARTNER LOGOS
      ========================================================= */}
      <section className="bg-gray-50 py-20 px-4 md:px-12 text-center border-t border-gray-200/70">
        <div className="max-w-4xl mx-auto mb-20 space-y-4">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm">★ TRA TEAM ★</p>
          <h2 className="text-4xl font-extrabold text-[#0f2547]">Meet Our Experts</h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Connect with <span className="font-bold text-[#0f2547]">The Raptor Academics</span> for personalised guidance and support throughout your study abroad journey. Your goals, our guidance, and a team committed to helping you move forward.
          </p>
          <p className="text-red-600 font-bold italic text-base">
            More than consultants, we are your partners in your global education journey.
          </p>
        </div>

        {/* 12 Large Clickable Partner Institutions Logos Grid */}
        <div className="max-w-7xl mx-auto">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3">
            ★ TOP INSTITUTIONS ★
          </p>
          <h3 className="text-2xl md:text-4xl font-extrabold text-[#0f2547] mb-3">
            Our Partner Institutions in Malta & Europe
          </h3>
          <p className="text-gray-500 text-sm md:text-base mb-12">
            Click any institution logo below to explore its 2027 courses, tuition fees & eligibility details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7">
            {partnerLogos.map((partner, idx) => (
              <Link
                key={idx}
                to={`/institutions#${partner.slug}`}
                className="bg-white rounded-3xl shadow-sm border border-gray-200/90 hover:border-red-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6 md:p-7 flex flex-col items-center justify-between gap-4 group cursor-pointer"
              >
                <div className="h-32 md:h-36 w-full flex items-center justify-center overflow-hidden p-2">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-sm font-extrabold text-[#0f2547] group-hover:text-red-600 transition-colors text-center leading-snug">
                  {partner.name}
                </span>
              </Link>
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