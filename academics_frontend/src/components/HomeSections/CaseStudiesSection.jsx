import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RedUnderline } from './Shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ALL 17 REAL CLIENT REVIEWS
const caseStudiesData = [
  {
    id: "REV-01",
    student: "Harendra Kurdiya • Malta",
    program: "Smooth Process, Excellent Guidance!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Hassle-Free Process", "Expert Support", "Highly Recommended"],
    desc: "Raptor Academics made my Malta student visa journey effortless. Their support and expertise ensured a hassle-free process. Highly recommended!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900844/Success-Visa-2024.webp"
  },
  {
    id: "REV-02",
    student: "Rashid Khan • Malta",
    program: "Fast & Reliable Service!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Fast Processing", "Expert Advice", "Norway Visa"],
    desc: "I was worried about my Norway visitor visa, but Raptor Academics made it so simple. Thank you for your dedication and expert advice!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900843/57.webp"
  },
  {
    id: "REV-03",
    student: "Noman Ali Qureshi • Malta",
    program: "Dreams Turned Into Reality!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Stress-Free Journey", "Expert Guidance", "Dream Achieved"],
    desc: "I can't thank Raptor Academics enough for their expert guidance and support. They truly made my Malta student visa journey stress-free!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900843/59.webp"
  },
  {
    id: "REV-04",
    student: "Ravindra Singh Shekhawat • Malta",
    program: "Effortless Process, Outstanding Support!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Great Professionalism", "Helpful Team", "Knowledgeable"],
    desc: "The team at Raptor Academics is incredibly knowledgeable and helpful. They handled my Malta student visa process with great professionalism!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900843/62.webp"
  },
  {
    id: "REV-05",
    student: "Pawan Rathore • Norway",
    program: "Highly Recommended For Visa Services!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Top-Notch Service", "Norway Trip", "Highly Recommended"],
    desc: "From consultation to approval, Raptor Academics provided top-notch service. A big thanks for making my Norway trip possible! A Big Thanks",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900843/58.webp"
  },
  {
    id: "REV-06",
    student: "Kamlesh Pipioda • Malta",
    program: "A Seamless Visa Experience!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Seamless Experience", "Step-by-Step Guide", "Dream Completed"],
    desc: "The entire process was smooth, and the team guided me at every step. I truly appreciate their commitment and support! My Dream to study abroad is now completed.",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900843/Success-Visa-2024-1_11zon.webp"
  },
  {
    id: "REV-07",
    student: "Manjeet Singh Tanwar • Malta",
    program: "Professional And Trustworthy!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Professional Handling", "Document Prep", "Trustworthy"],
    desc: "From document preparation to final approval, the Raptor Academics team handled everything professionally. Thank you for making my dream a reality!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900843/Congratulations-1080-x-1350-px_11zon.webp"
  },
  {
    id: "REV-08",
    student: "Yuvraj • Malta",
    program: "Quick & Transparent Process!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Quick Process", "Transparent", "Doubts Cleared"],
    desc: "I was amazed by how quickly my student visa was processed. The counselors at Raptor Academics were always available to clear my doubts and kept everything transparent from day one. Highly recommended!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900842/Yuvraj-768x1024.webp"
  },
  {
    id: "REV-09",
    student: "Sumit Saxena • Malta",
    program: "Exceptional Guidance & Support!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["University Selection", "Interview Prep", "Stress-Free"],
    desc: "The team made my study abroad journey completely stress-free. From university selection to the final visa interview prep, they helped me at every single step. Thank you for the amazing support!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900843/Sumit-Saxena-768x960.webp"
  },
  {
    id: "REV-10",
    student: "Shobendra Singh Chauhan • Malta",
    program: "Best Decision For My Career!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Complex Paperwork", "Best Decision", "Focus on Goals"],
    desc: "Choosing Raptor Academics was the best decision I made. Their expert team took care of all the complex paperwork and documentation, allowing me to focus entirely on my goals.",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900842/Shobendra-Singh-Chauhan-768x1024.webp"
  },
  {
    id: "REV-11",
    student: "Shivam • Malta",
    program: "Highly Dedicated Team!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Dedicated Team", "Complicated Case", "Visa Approved"],
    desc: "The dedication of the Raptor Academics team is unmatched. They handled my complicated case with so much professionalism and got my visa approved when I had almost given up hope.",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900842/Shivam-768x1024.webp"
  },
  {
    id: "REV-12",
    student: "Neeraj • Malta",
    program: "Turning Dreams Into Reality!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Study Gap Handled", "Perfect Guidance", "Dream University"],
    desc: "I had a study gap and was really worried about my admission chances. But the experts at Raptor Academics guided me perfectly and highlighted my strengths. Today, I'm studying at my dream university!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900842/Neeraj-768x1024.webp"
  },
  {
    id: "REV-13",
    student: "Himanshu Soni • Malta",
    program: "100% Recommended!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Honest Approach", "Career Matched", "Breeze Process"],
    desc: "What I loved most was their honest approach. They didn't just suggest random colleges but found the exact course that matched my career goals. The entire visa process was just a breeze.",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900842/Himanshu-soni-768x1024.webp"
  },
  {
    id: "REV-14",
    student: "Kuldeep Singh Shekhawat • Malta",
    program: "A Lifesaver For My Career!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Refusal Reversed", "Flaws Fixed", "Record Time Approval"],
    desc: "After getting a visa refusal earlier through another consultant, I was completely heartbroken. Raptor Academics took up my case, fixed the flaws, and got my visa approved in record time!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900844/Kuldeep-Singh-Shekhawat-768x1024.webp"
  },
  {
    id: "REV-15",
    student: "Dipendra Singh Rathore • Malta",
    program: "Superb End-To-End Service!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["End-to-End Service", "Flight & Stay", "Like Family"],
    desc: "From finding the right accommodation to booking my flight tickets, they assisted me even after my visa arrived. It felt like family guiding me rather than just an agency.",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900842/Deependra-768x1024.webp"
  },
  {
    id: "REV-16",
    student: "Hemant Singh Shekhawat • Malta",
    program: "Flawless Documentation!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Zero Errors", "Absolute Perfection", "Best Consultants"],
    desc: "The paperwork for studying abroad can be overwhelming, but their team handled my file with absolute perfection and zero errors. They are truly the best study abroad consultants out there!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900842/Hemant-singh-sekhawat-768x960.webp"
  },
  {
    id: "REV-17",
    student: "Krishan Singh • Malta",
    program: "Amazing Scholarship Support!",
    result: "5.0 ★ Rating • Verified Client",
    metrics: ["Budget Friendly", "Scholarship Secured", "Impossible to Possible"],
    desc: "Studying abroad felt too expensive at first, but the team at Raptor Academics helped me find a university that fit my budget and even guided me in securing a scholarship. Their support made the impossible happen for me!",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794900841/KrishanSingh-_with_Bg-768x768.webp"
  }
];

const caseVariants = {
  enter: (dir) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -60 })
};

const CaseStudiesSection = () => {
  const [csIndex, setCsIndex] = useState(0);
  const [csDir, setCsDir] = useState(1);

  const goCase = (dir) => {
    setCsDir(dir);
    setCsIndex((i) => (i + dir + caseStudiesData.length) % caseStudiesData.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goCase(1);
    }, 4000);
    return () => clearTimeout(timer);
  }, [csIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.gsap-case-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: card, start: 'top 82%', end: 'top 40%', toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 md:py-20 px-4 md:px-12 bg-[#050505] text-white overflow-hidden border-y border-gray-900">
      
      {/* Background Airplane Silhouette & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
         <img 
           src="https://res.cloudinary.com/ppkvzeli/image/upload/v1794901404/9h-vua-malta-air-boeing-737-8200-max_PlanespottersNet_1741508_080ee32d2d_o.jpg" 
           alt="Airplane Background" 
           className="w-full h-full object-cover grayscale mix-blend-overlay"
         />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs mb-2.5">
              ★ REAL STUDENT JOURNEYS ★
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Real Profiles. Real International Education <RedUnderline>Journeys</RedUnderline>.
            </h2>
          </div>
          <Link to="/free-counselling">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl transition text-sm cursor-pointer">
              Evaluate Your Profile Free
            </button>
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => goCase(-1)}
            className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-7 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30 border-4 border-[#0b0d13] transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            onClick={() => goCase(1)}
            className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-7 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30 border-4 border-[#0b0d13] transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight size={26} />
          </button>

          <AnimatePresence mode="wait" custom={csDir} initial={false}>
            <motion.div
              key={csIndex}
              custom={csDir}
              variants={caseVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="gsap-case-card bg-[#131722]/90 backdrop-blur-md border border-gray-800 rounded-3xl p-5 md:p-7 grid grid-cols-1 lg:grid-cols-12 gap-7 items-center shadow-2xl"
            >
              {/* Taller Image Container without increasing overall section height */}
              <div className="lg:col-span-5 h-80 sm:h-96 lg:h-[440px] rounded-2xl overflow-hidden relative bg-[#0b0d13]">
                <img
                  src={caseStudiesData[csIndex].image}
                  alt={caseStudiesData[csIndex].student}
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
                  {caseStudiesData[csIndex].id}
                </span>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className="inline-block bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-extrabold px-4 py-1.5 rounded-full">
                  ✓ {caseStudiesData[csIndex].result}
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">{caseStudiesData[csIndex].student}</h3>
                <p className="text-red-400 font-bold text-sm uppercase tracking-wider">{caseStudiesData[csIndex].program}</p>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{caseStudiesData[csIndex].desc}</p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {caseStudiesData[csIndex].metrics.map((m, i) => (
                    <span key={i} className="bg-black/50 border border-gray-800 text-gray-200 text-xs font-bold px-4 py-2 rounded-xl">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-5 mt-7">
          <span className="text-sm font-bold text-gray-400 tabular-nums">
            {String(csIndex + 1).padStart(2, '0')} / {caseStudiesData.length}
          </span>
          <div className="flex items-center gap-2">
            {caseStudiesData.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCsDir(i > csIndex ? 1 : -1);
                  setCsIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === csIndex ? 'w-8 bg-red-600' : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;