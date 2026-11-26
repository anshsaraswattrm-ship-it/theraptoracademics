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
    badge: "Get Visa Guidance",
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
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const stepCardRefs = useRef([]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setIsDesktop(window.innerWidth >= 1024);
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
    <section className="py-16 md:py-20 px-4 sm:px-8 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f2547] leading-tight">
            <RedUnderline>4 Steps</RedUnderline> to Start Your Abroad Study Journey
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            The Raptor Academics helps you understand the process of applying to selected institutions across Malta and Europe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (Cards) */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 lg:space-y-0">
            {stepsData.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  ref={(el) => (stepCardRefs.current[index] = el)}
                  style={
                    isDesktop
                      ? { top: STEPS_BASE_TOP + index * STEPS_STACK_OFFSET, zIndex: index + 1 }
                      : undefined
                  }
                  className={`lg:sticky lg:mb-10 lg:last:mb-0 rounded-3xl p-6 sm:p-8 lg:px-10 lg:py-10 lg:min-h-[340px] flex flex-col transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#0f2547] text-white border-[#1b365d] shadow-[0_20px_50px_rgba(15,37,71,0.18)]'
                      : 'bg-[#f8fafc] text-[#0f2547] border-gray-200/90 shadow-sm lg:shadow-[0_-10px_25px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  {/* Tablet Vertical (md to <lg): Side-by-side Text + Square Image */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center lg:block flex-1">
                    <div className="md:col-span-7 flex flex-col h-full">
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <span
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-base sm:text-lg font-extrabold shrink-0 transition-colors duration-300 ${
                            isActive
                              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                              : 'bg-[#1b365d]/10 text-[#1b365d]'
                          }`}
                        >
                          {step.num}
                        </span>
                        <h3
                          className={`text-xl sm:text-2xl font-extrabold leading-tight ${
                            isActive ? 'text-white' : 'text-[#0f2547]'
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>

                      <p
                        className={`text-sm md:text-base leading-relaxed mt-4 sm:mt-5 lg:pl-16 ${
                          isActive ? 'text-blue-100/85' : 'text-gray-600'
                        }`}
                      >
                        {step.desc}
                      </p>

                      {/* Mobile Only (< md): Full-aspect uncropped preview */}
                      <div className="md:hidden mt-5 aspect-[4/3] rounded-2xl overflow-hidden border border-white/15">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="mt-6 lg:mt-auto lg:pt-7 lg:pl-16">
                        <Link to="/contact-us">
                          <button
                            className={`inline-flex items-center gap-2.5 text-xs md:text-sm font-extrabold px-6 py-3 rounded-xl transition-all cursor-pointer ${
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

                    {/* Tablet Vertical Only (md to <lg): Clean Square Card Preview */}
                    <div className="hidden md:block lg:hidden md:col-span-5">
                      <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg bg-[#0f2547]">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2547]/80 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 right-3 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg text-center">
                          {step.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Only (lg+): Right Sticky Preview Image */}
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