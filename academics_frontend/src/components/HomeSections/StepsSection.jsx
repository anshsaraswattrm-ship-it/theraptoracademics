import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RedUnderline } from './Shared';

const stepsData = [
  {
    num: "1",
    title: "Education Counseling",
    desc: "One-on-One counseling with our Malta specialist. Shortlist your ideal MFHEA-accredited institution and MQF Level 4, 5, 6, or 7 program based on your budget and career goals.",
    badge: "100% Free Profile Assessment",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794899393/Education_Counseling.png"
  },
  {
    num: "2",
    title: "University Applications",
    desc: "Apply to your dream Malta college without IELTS or PTE. Even with 10th/12th pass qualifications or unlimited study gaps, we secure your conditional offer letter within 24 to 48 hours.",
    badge: "Offer Letter in 24–48 Hours",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794899392/University_Applications.png"
  },
  {
    num: "3",
    title: "Hostel & VFS Documentation",
    desc: "We arrange your official college hostel accommodation letter, health insurance, financial checklist, and book your priority VFS appointment slot without delays.",
    badge: "Guaranteed Hostel Letter & VFS Slot",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794899393/Hostel_VFS_Documentation.png"
  },
  {
    num: "4",
    title: "Visa Processing & Pay After Visa",
    desc: "Apply for your Malta Schengen student visa with our 99% visa success team. Best of all—at top partner colleges, you pay your main tuition fees ONLY after your visa is approved!",
    badge: "Pay Tuition Fee AFTER Visa Approval",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794899397/Visa_Processing_Pay_After_Visa.png"
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            <RedUnderline>4 Steps</RedUnderline> To Your Dream Destination
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            From your first free counseling call to landing in Malta—here is how we make your study abroad journey effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            {stepsData.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepCardRefs.current[index] = el)}
                style={{ top: STEPS_BASE_TOP + index * STEPS_STACK_OFFSET, zIndex: index + 1 }}
                className="sticky mb-10 last:mb-0 rounded-[2rem] bg-[#eef1f8] border border-[#dbe2ef] shadow-[0_-10px_30px_rgba(27,54,93,0.08)] px-7 py-8 md:px-10 md:py-10 min-h-[340px] flex flex-col"
              >
                <div className="flex items-center gap-5">
                  <span
                    className={`text-4xl md:text-5xl font-light leading-none transition-colors duration-300 ${
                      activeStep === index ? 'text-red-600' : 'text-[#1b365d]'
                    }`}
                  >
                    {step.num}
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#0f2547] leading-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-5 md:pl-[3.25rem]">
                  {step.desc}
                </p>
                <div className="lg:hidden mt-5 h-44 rounded-2xl overflow-hidden">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                </div>
                <div className="mt-auto pt-7 md:pl-[3.25rem]">
                  <Link to="/contact-us">
                    <button className="text-xs md:text-sm font-extrabold text-[#1b365d] bg-white/60 border border-[#1b365d]/70 hover:bg-red-600 hover:border-red-600 hover:text-white px-6 py-3 rounded-xl transition-colors">
                      Free Expert Consultation
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div
            className="hidden lg:flex lg:col-span-6 justify-center items-center sticky"
            style={{ top: STEPS_BASE_TOP, height: `calc(100vh - ${STEPS_BASE_TOP + 24}px)` }}
          >
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-6 bg-gradient-to-br from-red-100/60 via-transparent to-[#1b365d]/10 rounded-[2.5rem] blur-2xl pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-[min(560px,calc(100vh-260px))] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#f4f6fb]"
                >
                  <img 
                    src={stepsData[activeStep].image} 
                    alt={stepsData[activeStep].title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="bg-red-600 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      Step 0{stepsData[activeStep].num} Highlight
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