import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Clock, Briefcase, Plane, Zap, ShieldCheck, DollarSign } from 'lucide-react';
import { FaArrowRight, FaUniversity } from 'react-icons/fa';

// THREE.JS / R3F / DREI 3D FLUID METALLIC ORB
const MorphingRaptorOrb = () => {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.25;
      meshRef.current.rotation.y = t * 0.35;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.2;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.4;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={3} color="#dc2626" />
      <Environment preset="city" />
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.2}>
        <mesh ref={meshRef} scale={1.55}>
          <icosahedronGeometry args={[1, 64]} />
          <MeshDistortMaterial
            color="#dc2626"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.85}
            roughness={0.15}
            distort={0.42}
            speed={2.5}
          />
        </mesh>
      </Float>
    </group>
  );
};

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 xl:pt-44 xl:pb-24 px-4 sm:px-8 md:px-12 bg-white overflow-hidden">
      <div className="absolute top-16 left-0 w-96 h-96 bg-red-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#1b365d]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 sm:gap-10 xl:gap-12 items-center relative z-10">
        {/* CENTERED ON MOBILE & ALL TABLETS (< 1280px), LEFT-ALIGNED ON DESKTOP (1280px+) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="xl:col-span-7 flex flex-col items-center text-center xl:items-start xl:text-left space-y-4 sm:space-y-6 z-10"
        >
          <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-red-50 border border-red-100 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full max-w-full">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
            <span className="text-red-600 font-extrabold text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-widest truncate">
              YOUR GLOBAL EDUCATION JOURNEY STARTS HERE
            </span>
          </div>

          <h1 className="text-[28px] sm:text-5xl xl:text-[62px] font-extrabold text-[#0f2547] leading-[1.15] sm:leading-[1.12] tracking-tight max-w-3xl xl:max-w-none">
            Study in Europe &amp; <br className="hidden sm:inline" />
            Malta with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-600 to-red-800 drop-shadow-sm">
              The Raptor Academics
            </span>
          </h1>

          <p className="text-[13.5px] sm:text-base md:text-lg text-gray-600 max-w-2xl xl:max-w-xl leading-relaxed px-1 sm:px-0">
            The Raptor Academics helps Indian students explore higher education opportunities across Europe, with specialised guidance for Malta and support for other selected European destinations.{' '}
            <strong className="text-[#1b365d]">
              From choosing the right course and institution to admission applications, student visa documentation and pre-departure preparation.
            </strong>
          </p>

          <div className="w-full p-3.5 sm:p-5 border-l-4 sm:border-l-0 sm:border-t-4 xl:border-t-0 xl:border-l-4 border-red-600 bg-gradient-to-r from-red-50/90 to-red-50/30 text-[#0f2547] rounded-xl sm:rounded-2xl xl:rounded-l-none xl:rounded-r-2xl max-w-2xl xl:max-w-lg shadow-sm text-left sm:text-center xl:text-left">
            <p className="font-extrabold text-[13px] sm:text-base md:text-lg leading-snug">
              From Course Selection to Visa Guidance —{' '}
              <br className="hidden sm:inline" />
              <span className="text-red-600">We&apos;re Here to Help You Move Forward.</span>
            </p>
          </div>

          <div className="w-full sm:w-auto flex flex-wrap items-center justify-center xl:justify-start gap-2 sm:gap-3 pt-0.5 sm:pt-1">
            <span className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#1b365d] bg-[#1b365d]/5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border border-[#1b365d]/15">
              <CheckCircle2 size={14} className="text-red-600 shrink-0" /> Without IELTS / PTE
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#1b365d] bg-[#1b365d]/5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border border-[#1b365d]/15">
              <CheckCircle2 size={14} className="text-red-600 shrink-0" /> Pay Fee AFTER Visa
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#1b365d] bg-[#1b365d]/5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border border-[#1b365d]/15">
              <CheckCircle2 size={14} className="text-red-600 shrink-0" /> 10th Pass &amp; Gap Accepted
            </span>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
            <Link to="/free-counselling" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2.5 sm:gap-3 transition-all cursor-pointer"
              >
                Book Free Counselling <FaArrowRight size={13} />
              </motion.button>
            </Link>
            <Link to="/institutions" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-[#1b365d] hover:bg-[#122644] text-white font-bold text-sm sm:text-base px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer"
              >
                <FaUniversity className="text-red-400" /> Explore Partner Colleges
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT HERO VISUAL + NON-CLIPPING BADGES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="xl:col-span-5 relative w-full max-w-2xl mx-auto xl:max-w-none"
        >
          <div className="relative xl:h-[600px] w-full flex flex-col gap-3 sm:gap-4 xl:block">
            <div className="w-full h-[260px] sm:h-[460px] xl:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white relative z-10 group">
              <img
                src="https://res.cloudinary.com/ppkvzeli/image/upload/v1794896190/hero-img.jpg"
                alt="Study in Malta Valletta"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b33]/90 via-[#0b1b33]/25 to-transparent" />

              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-[#1b365d]/85 backdrop-blur-md border border-white/20 text-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5">
                <MapPin size={12} className="text-red-400 shrink-0" /> Valletta &amp; Birkirkara, Malta
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <span className="bg-red-600 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                  Schengen Zone • EU
                </span>
                <h3 className="text-lg sm:text-2xl font-extrabold mt-1.5 sm:mt-2 leading-tight">
                  European Degree + Work Permit
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-200 mt-0.5 sm:mt-1">
                  70% Tuition Fee Refund under Malta Govt. Get Qualified Scheme.
                </p>
              </div>
            </div>

            {/* MOBILE & ALL TABLETS (< 1280px): CLEAN 2-COLUMN NON-OVERLAPPING CARDS */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 xl:hidden z-20">
              <div className="bg-[#1b365d] text-white px-3 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg border border-[#2a4d80] flex items-center gap-2.5 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
                  <Clock size={17} className="sm:w-[21px] sm:h-[21px]" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-red-300 truncate">
                    Express Offer
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold leading-tight">In 24–48 Hours</p>
                </div>
              </div>

              <div className="bg-[#1b365d] text-white px-3 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg border border-[#2a4d80] flex items-center gap-2.5 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
                  <Briefcase size={17} className="sm:w-[21px] sm:h-[21px]" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-red-300 truncate">
                    Legal Work Permit
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold leading-tight">20 Hrs/Week + PSW</p>
                </div>
              </div>
            </div>

            {/* DESKTOP (1280px+): FLOATING OVERLAPPING CARDS */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden xl:flex absolute bottom-6 left-0 bg-[#1b365d] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#2a4d80] items-center gap-3.5 z-30"
            >
              <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-300">Express Offer</p>
                <p className="text-sm font-extrabold">In 24–48 Hours</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden xl:flex absolute bottom-6 right-0 bg-[#1b365d] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#2a4d80] items-center gap-3.5 z-30"
            >
              <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-300">Legal Work Permit</p>
                <p className="text-sm font-extrabold">20 Hrs/Week + PSW</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM 4 FEATURE HIGHLIGHTS */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 xl:mt-16 bg-white shadow-xl sm:shadow-2xl shadow-gray-200/80 border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:px-12 md:py-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8 relative z-20">
        <div className="flex items-center gap-3.5 sm:gap-4 text-[#0f2547] hover:text-red-600 transition group cursor-default">
          <div className="text-red-600 bg-red-50 group-hover:bg-[#1b365d] group-hover:text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shrink-0 transition-colors shadow-sm">
            <Plane size={22} className="sm:w-7 sm:h-7" />
          </div>
          <div>
            <span className="block text-base sm:text-lg md:text-xl font-extrabold leading-tight">Hassle-Free Visa</span>
            <span className="block text-xs md:text-sm text-gray-500 font-semibold mt-0.5 sm:mt-1">Daily VFS Slot Support</span>
          </div>
        </div>
        <div className="flex items-center gap-3.5 sm:gap-4 text-[#0f2547] hover:text-red-600 transition group cursor-default">
          <div className="text-red-600 bg-red-50 group-hover:bg-[#1b365d] group-hover:text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shrink-0 transition-colors shadow-sm">
            <Zap size={22} className="sm:w-7 sm:h-7" />
          </div>
          <div>
            <span className="block text-base sm:text-lg md:text-xl font-extrabold leading-tight">Faster Processing</span>
            <span className="block text-xs md:text-sm text-gray-500 font-semibold mt-0.5 sm:mt-1">48-Hour Offer Letters</span>
          </div>
        </div>
        <div className="flex items-center gap-3.5 sm:gap-4 text-[#0f2547] hover:text-red-600 transition group cursor-default">
          <div className="text-red-600 bg-red-50 group-hover:bg-[#1b365d] group-hover:text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shrink-0 transition-colors shadow-sm">
            <ShieldCheck size={22} className="sm:w-7 sm:h-7" />
          </div>
          <div>
            <span className="block text-base sm:text-lg md:text-xl font-extrabold leading-tight">Reliable Info</span>
            <span className="block text-xs md:text-sm text-gray-500 font-semibold mt-0.5 sm:mt-1">12+ MFHEA Licensed Colleges</span>
          </div>
        </div>
        <div className="flex items-center gap-3.5 sm:gap-4 text-[#0f2547] hover:text-red-600 transition group cursor-default">
          <div className="text-red-600 bg-red-50 group-hover:bg-[#1b365d] group-hover:text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shrink-0 transition-colors shadow-sm">
            <DollarSign size={22} className="sm:w-7 sm:h-7" />
          </div>
          <div>
            <span className="block text-base sm:text-lg md:text-xl font-extrabold leading-tight">Affordable Services</span>
            <span className="block text-xs md:text-sm text-gray-500 font-semibold mt-0.5 sm:mt-1">Pay Tuition After Visa</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;