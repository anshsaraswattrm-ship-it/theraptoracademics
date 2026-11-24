import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { RedUnderline } from './Shared';

const stepsData = [
  {
    num: "01",
    title: "Profile Assessment & Counselling",
    desc: "Share your academic background, career interests, preferred destination and budget. Our counsellors help you explore suitable courses and institutions in Malta and other selected European countries based on your profile.",
    badge: "Get Your Profile Assessed",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795176282/4_Steps_01_1254_x_1254.webp"
  },
  {
    num: "02",
    title: "Course Selection & University Applications",
    desc: "Explore relevant undergraduate, postgraduate and professional programmes. Get guidance on comparing institutions, understanding entry requirements and preparing your admission application.",
    badge: "Explore Study Options",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795176282/4_Steps_02_1254_x_1254.webp"
  },
  {
    num: "03",
    title: "Documentation & Student Visa Guidance",
    desc: "Understand the supporting documents required for your chosen destination. Get guidance on academic records, financial evidence, health insurance, accommodation requirements and the relevant student visa application process.",
    badge: " Get Visa Guidance",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795176282/4_Steps_03_1254_x_1254.webp"
  },
  {
    num: "04",
    title: "Pre-Departure Preparation",
    desc: "Once your admission and visa formalities are complete, prepare for your international education journey. Get guidance on travel planning, accommodation considerations, essential documents and pre-departure preparation.",
    badge: "Plan Your Journey",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1795176282/4_Steps_04_1254_x_1254.webp"
  }
];

const STEPS_BASE_TOP = 132;
const STEPS_STACK_OFFSET = 16;

const StepsSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepCardRefs = useRef([]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const threshold = window.innerHeight * 0.55;
      let current = 0;
      stepCardRefs.current.forEach((el, index) => {
        if (el && el.getBoundingClientRect().top <= threshold) current = index;
      });
      setActiveStep(current);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="py-20 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f2547]">
            <RedUnderline>4 Steps</RedUnderline> to Start Your Abroad Study Journey
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          The Raptor Academics helps you understand the process of applying to selected institutions across Malta and Europe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Stacked Cards */}
          <div className="lg:col-span-6">
            {stepsData.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  ref={(el) => (stepCardRefs.current[index] = el)}
                  style={{ top: STEPS_BASE_TOP + index * STEPS_STACK_OFFSET, zIndex: index + 1 }}
                  className={`sticky mb-10 last:mb-0 rounded-3xl px-7 py-8 md:px-10 md:py-10 min-h-[340px] flex flex-col transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#0f2547] text-white border-[#1b365d] shadow-[0_20px_50px_rgba(15,37,71,0.2)]'
                      : 'bg-[#f8fafc] text-[#0f2547] border-gray-200/90 shadow-[0_-10px_25px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-extrabold shrink-0 transition-colors duration-300 ${
                          isActive
                            ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                            : 'bg-[#1b365d]/10 text-[#1b365d]'
                        }`}
                      >
                        {step.num}
                      </span>
                      <h3
                        className={`text-xl md:text-2xl font-extrabold leading-tight ${
                          isActive ? 'text-white' : 'text-[#0f2547]'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className={`text-sm md:text-base leading-relaxed mt-5 md:pl-16 ${
                      isActive ? 'text-blue-100/85' : 'text-gray-600'
                    }`}
                  >
                    {step.desc}
                  </p>

                  <div className="lg:hidden mt-5 h-44 rounded-2xl overflow-hidden">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="mt-auto pt-7 md:pl-16">
                    <Link to="/contact-us">
                      <button
                        className={`inline-flex items-center gap-2.5 text-xs md:text-sm font-extrabold px-6 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                            : 'bg-white text-[#1b365d] border border-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white'
                        }`}
                      >
                        Free Expert Consultation <FaArrowRight size={11} />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sticky Preview Image */}
          <div
            className="hidden lg:flex lg:col-span-6 justify-center items-center sticky"
            style={{ top: STEPS_BASE_TOP, height: `calc(100vh - ${STEPS_BASE_TOP + 24}px)` }}
          >
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-6 bg-gradient-to-br from-red-100/60 via-transparent to-[#1b365d]/15 rounded-[2.5rem] blur-2xl pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-[min(560px,calc(100vh-260px))] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#0f2547]"
                >
                  <img 
                    src={stepsData[activeStep].image} 
                    alt={stepsData[activeStep].title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2547]/90 via-[#0f2547]/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="bg-red-600 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      Step {stepsData[activeStep].num} Highlight
                    </span>
                    <h4 className="text-2xl font-extrabold mt-2">{stepsData[activeStep].badge}</h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;