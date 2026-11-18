import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Torus } from '@react-three/drei';
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
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 px-4 md:px-12 bg-white overflow-hidden">
      <div className="absolute top-16 left-0 w-96 h-96 bg-red-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#1b365d]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 z-10"
        >
          <div className="inline-flex items-center gap-2.5 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest">
            YOUR GLOBAL EDUCATION JOURNEY STARTS HERE
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-[#0f2547] leading-[1.1] tracking-tight">
          Study in Europe & <br />
          Malta with  {' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-600 to-red-800 drop-shadow-sm">
            The Raptor Academics
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
          The Raptor Academics helps Indian students explore higher education opportunities across Europe, with specialised guidance for Malta and support for other selected European destinations. <strong className="text-[#1b365d]">From choosing the right course and institution to admission applications, student visa documentation and pre-departure preparation.</strong>
          </p>

          <div className="p-5 border-l-4 border-red-600 bg-gradient-to-r from-red-50/90 to-red-50/20 text-[#0f2547] rounded-r-2xl max-w-lg shadow-sm">
            <p className="font-extrabold text-base md:text-lg leading-snug">
            From Course Selection to Visa Guidance  — <br />
              <span className="text-red-600">We're Here to Help You Move Forward.</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <span className="flex items-center gap-2 text-xs font-bold text-[#1b365d] bg-[#1b365d]/5 px-3.5 py-2 rounded-xl border border-[#1b365d]/15">
              <CheckCircle2 size={15} className="text-red-600 shrink-0" /> Without IELTS / PTE
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-[#1b365d] bg-[#1b365d]/5 px-3.5 py-2 rounded-xl border border-[#1b365d]/15">
              <CheckCircle2 size={15} className="text-red-600 shrink-0" /> Pay Fee AFTER Visa
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-[#1b365d] bg-[#1b365d]/5 px-3.5 py-2 rounded-xl border border-[#1b365d]/15">
              <CheckCircle2 size={15} className="text-red-600 shrink-0" /> 10th Pass & Gap Accepted
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-3">
            <Link to="/free-counselling">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 transition-all"
              >
                Book Free Counselling <FaArrowRight size={14} />
              </motion.button>
            </Link>
            <Link to="/institutions">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-[#1b365d] hover:bg-[#122644] text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md"
              >
                <FaUniversity className="text-red-400" /> Explore Partner Colleges
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative h-[560px] sm:h-[600px] w-full">
            <div className="w-full h-[480px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative z-10 group">
              <img 
                src="https://res.cloudinary.com/ppkvzeli/image/upload/v1794896190/hero-img.jpg" 
                alt="Study in Malta Valletta" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b33]/90 via-[#0b1b33]/25 to-transparent" />
              
              <div className="absolute top-5 right-5 bg-[#1b365d]/80 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                <MapPin size={13} className="text-red-400" /> Valletta & Birkirkara, Malta
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-red-600 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  Schengen Zone • EU
                </span>
                <h3 className="text-2xl font-extrabold mt-2 leading-tight">
                  European Degree + Work Permit
                </h3>
                <p className="text-xs text-gray-200 mt-1">
                  70% Tuition Fee Refund under Malta Govt. Get Qualified Scheme.
                </p>
              </div>
            </div>

            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 left-0 bg-[#1b365d] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#2a4d80] flex items-center gap-3.5 z-30"
            >
              <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-300">Express Offer</p>
                <p className="text-sm font-extrabold">In 24–48 Hours</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 right-0 bg-[#1b365d] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#2a4d80] flex items-center gap-3.5 z-30"
            >
              <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
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

      <div className="max-w-7xl mx-auto mt-16 bg-white shadow-2xl shadow-gray-200/80 border border-gray-100 rounded-3xl p-8 md:px-12 md:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
        <div className="flex items-center gap-4 text-[#0f2547] hover:text-red-600 transition group cursor-default">
          <div className="text-red-600 bg-red-50 group-hover:bg-[#1b365d] group-hover:text-white p-4 rounded-2xl shrink-0 transition-colors shadow-sm">
            <Plane size={28} />
          </div>
          <div>
            <span className="block text-lg md:text-xl font-extrabold leading-tight">Hassle-Free Visa</span>
            <span className="block text-xs md:text-sm text-gray-500 font-semibold mt-1">Daily VFS Slot Support</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#0f2547] hover:text-red-600 transition group cursor-default">
          <div className="text-red-600 bg-red-50 group-hover:bg-[#1b365d] group-hover:text-white p-4 rounded-2xl shrink-0 transition-colors shadow-sm">
            <Zap size={28} />
          </div>
          <div>
            <span className="block text-lg md:text-xl font-extrabold leading-tight">Faster Processing</span>
            <span className="block text-xs md:text-sm text-gray-500 font-semibold mt-1">48-Hour Offer Letters</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#0f2547] hover:text-red-600 transition group cursor-default">
          <div className="text-red-600 bg-red-50 group-hover:bg-[#1b365d] group-hover:text-white p-4 rounded-2xl shrink-0 transition-colors shadow-sm">
            <ShieldCheck size={28} />
          </div>
          <div>
            <span className="block text-lg md:text-xl font-extrabold leading-tight">Reliable Info</span>
            <span className="block text-xs md:text-sm text-gray-500 font-semibold mt-1">12+ MFHEA Licensed Colleges</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#0f2547] hover:text-red-600 transition group cursor-default">
          <div className="text-red-600 bg-red-50 group-hover:bg-[#1b365d] group-hover:text-white p-4 rounded-2xl shrink-0 transition-colors shadow-sm">
            <DollarSign size={28} />
          </div>
          <div>
            <span className="block text-lg md:text-xl font-extrabold leading-tight">Affordable Services</span>
            <span className="block text-xs md:text-sm text-gray-500 font-semibold mt-1">Pay Tuition After Visa</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;