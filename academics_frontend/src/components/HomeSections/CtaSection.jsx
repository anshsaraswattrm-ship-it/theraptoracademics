import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPhoneVolume, FaArrowRight } from 'react-icons/fa';

const CtaSection = () => {
  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden flex items-center justify-center px-4 md:px-12 border-y border-gray-900">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-10 w-120 h-96 bg-red-600 rounded-full blur-[120px] z-0 pointer-events-none"
      />
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
        <div className="space-y-6">
          <p className="text-red-500 font-bold tracking-[0.2em] text-sm uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            START YOUR INTERNATIONAL EDUCATION JOURNEY
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Confused About Which <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Foreign Country</span> to Choose?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
          Choosing between Malta, Germany, France, Italy, Ireland and other European destinations can feel overwhelming. Speak with our counselling team to explore suitable courses, institutions, admission requirements and study options based on your academic profile and budget.
          </p>
        </div>

        <div className="relative">
          <div className="bg-[#111] border border-gray-800 p-8 md:p-12 rounded-3xl relative z-10 flex flex-col items-center text-center shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 border border-red-600/30 mb-6">
              <FaPhoneVolume size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Book Your Free Session</h3>
            <p className="text-gray-400 mb-8 max-w-sm text-sm">
              Secure your slot today and take the first step toward studying in Malta. Limited slots available this week!
            </p>
            <Link to="/free-counselling" className="w-full sm:w-auto">
              <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 w-full transition-all">
                Get Free Counselling <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;