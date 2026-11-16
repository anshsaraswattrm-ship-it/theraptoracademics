import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Torus } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Plane, 
  Zap, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  Briefcase, 
  CheckCircle2, 
  MapPin, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowUpRight, 
  Plus, 
  Minus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  FaPhoneVolume, 
  FaArrowRight, 
  FaInstagram, 
  FaUniversity 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. THREE.JS / R3F / DREI 3D FLUID METALLIC ORB
// ==========================================
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

      {/* Morphing Fluid Core Sphere */}
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

        {/* Orbital Metallic Wireframe Ring in Logo Deep Blue
        <Torus ref={ringRef} args={[2.1, 0.03, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#1b365d" metalness={0.9} roughness={0.1} wireframe />
        </Torus> */}
        
      </Float>
    </group>
  );
};

// ==========================================
// 2. FRAMER MOTION + WEBKIT TEXT STROKE MARQUEE
// ==========================================
const LuxuryMarquee = () => {
  const marqueeItems = [
    "STUDY IN MALTA WITHOUT IELTS",
    "PAY TUITION FEE AFTER VISA",
    "70% GET QUALIFIED TAX REBATE",
    "24-48 HRS EXPRESS OFFER LETTER",
    "20 HRS/WEEK LEGAL WORK PERMIT",
    "29 SCHENGEN COUNTRIES ACCESS"
  ];

  return (
    <div className="bg-[#050505] py-6 border-y border-gray-800 overflow-hidden select-none relative z-20">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 24 }}
        className="flex whitespace-nowrap gap-12 items-center w-max"
      >
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-12">
            <span className="text-3xl md:text-5xl font-black tracking-wider uppercase stroke-text-white cursor-default">
              {item}
            </span>
            <span className="text-red-600 text-2xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ==========================================
// SIGNATURE HAND-DRAWN RED UNDERLINE SVG
// ==========================================
const RedUnderline = ({ children }) => (
  <span className="relative inline-block">
    <span className="relative z-10">{children}</span>
    <svg
      className="absolute -bottom-2 left-0 w-full h-3.5 text-red-600 z-0 pointer-events-none"
      viewBox="0 0 200 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M3 9C55 2.5 145 1.5 197 7.5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M18 12.5C75 7.5 135 6.5 185 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </span>
);

// ==========================================
// DATA ARRAYS (REELS, STEPS, PARTNERS, COURSES, CASE STUDIES, FAQS)
// ==========================================
const reelsData = [
  {
    id: 1,
    title: "Real stories. Real experiences. Real results. 🎓✨",
    category: "Student Trust",
    views: "379K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794829560/reel3.mp4",
    poster: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "November Intake 🇲🇹✈️ | Your Dream to Study in Malta Starts Here!",
    category: "Director Message",
    views: "206K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794829491/reel2.mp4",
    poster: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "A parent’s trust is our biggest achievement. ❤️",
    category: "Parent Trust",
    views: "143K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794829372/reel1.mp4",
    poster: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    title: "Visa Approved! 🇲🇹✨",
    category: "Student Trust",
    views: "304K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794829631/reel4.mp4",
    poster: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    title: "Dreaming of a nursing career in Europe? 🌍",
    category: "Director Message",
    views: "170K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794829713/reel5.mp4",
    poster: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
  }
];

const stepsData = [
  {
    num: "1",
    title: "Education Counseling",
    desc: "One-on-One counseling with our Malta specialist. Shortlist your ideal MFHEA-accredited institution and MQF Level 4, 5, 6, or 7 program based on your budget and career goals.",
    badge: "100% Free Profile Assessment",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "2",
    title: "University Applications",
    desc: "Apply to your dream Malta college without IELTS or PTE. Even with 10th/12th pass qualifications or unlimited study gaps, we secure your conditional offer letter within 24 to 48 hours.",
    badge: "Offer Letter in 24–48 Hours",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "3",
    title: "Hostel & VFS Documentation",
    desc: "We arrange your official college hostel accommodation letter, health insurance, financial checklist, and book your priority VFS appointment slot without delays.",
    badge: "Guaranteed Hostel Letter & VFS Slot",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "4",
    title: "Visa Processing & Pay After Visa",
    desc: "Apply for your Malta Schengen student visa with our 99% visa success team. Best of all—at top partner colleges, you pay your main tuition fees ONLY after your visa is approved!",
    badge: "Pay Tuition Fee AFTER Visa Approval",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
  }
];

// Sticky offsets (px) for the stacking steps section.
// Navbar is ~112px tall; each next card peeks 16px lower than the previous one.
const STEPS_BASE_TOP = 132;
const STEPS_STACK_OFFSET = 16;

const caseStudiesData = [
  {
    id: "CS-01",
    student: "Priya Sharma • 5-Year Study Gap",
    program: "Nursing Bridging Course (NBC) — La Vallette Institute",
    result: "Visa Approved in 21 Days • €0 Upfront Tuition Paid",
    metrics: ["No IELTS Used (MOI)", "350 Clinical Hours", "€28,000 Starting EU Nurse Salary"],
    desc: "After completing GNM Nursing in India with a 5-year work gap, Priya struggled with UK IELTS requirements. We processed her admission at LVI Malta with a 48-hour offer letter, arranged her St. James Hospital clinical pathway, and she paid her €5,500 tuition fee ONLY after her Schengen visa was stamped.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "CS-02",
    student: "Rohit Verma • B.Com Graduate",
    program: "Level 7 Complete UK MBA Pathway — Avanza Academy",
    result: "Dual UK MBA + 70% Tuition Tax Rebate Qualified",
    metrics: ["Cardiff Met UK Award", "20 Hrs/Wk Legal Work", "€12,000 Fee After Visa"],
    desc: "Rohit wanted a British MBA without spending ₹35 Lakhs in the UK. Through Avanza Training Academy in Malta, he enrolled in the NCC Level 7 + Cardiff Metropolitan University MBA pathway, working part-time in Birkirkara while qualifying for Malta's 70% Get Qualified tax credit.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "CS-03",
    student: "Amanpreet Singh • 12th Pass (58%)",
    program: "B.Sc. in Software Design, AI & Cloud — Learn Key Institute",
    result: "Direct 3-Year EU Tech Degree • Year 2 Fee Dropped to €3,500",
    metrics: ["No Interview Required", "LearnKey Hostel Letter", "180 ECTS Full Degree"],
    desc: "With 58% in 12th grade and no IELTS score, Amanpreet secured direct admission into Learn Key Institute's 3-year B.Sc. in AI & Cloud Computing. He received his offer letter in 48 hours and enjoys low Year-2 (€3,500) and Year-3 (€4,500) tuition fees.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800"
  }
];

const partnersList = [
  { abbr: "LVI", name: "La Vallette Institute", sub: "License: 2024-016 • Healthcare & Nursing", color: "bg-red-600 text-white" },
  { abbr: "ATA", name: "Avanza Training Academy", sub: "License: 2019-004 • UK MBA & Sports", color: "bg-gray-900 text-white" },
  { abbr: "UA", name: "Uniplural Academy", sub: "License: 2019-010 • Nursing Bridging", color: "bg-red-50 text-red-600" },
  { abbr: "MIC", name: "Malita International College", sub: "License: 2021-014 • Supply Chain & IAU MBA", color: "bg-gray-100 text-gray-900" },
  { abbr: "LKI", name: "Learn Key Institute", sub: "License: 2005-TC-007 • IT, AI & Finance", color: "bg-gray-900 text-white" },
  { abbr: "21A", name: "21 Academy Malta", sub: "MFHEA Licensed • AI & Digital Marketing", color: "bg-red-600 text-white" },
  { abbr: "TT", name: "Think Talent (OTHM)", sub: "License: 2017-004 • UK OTHM Pathways", color: "bg-gray-100 text-gray-900" },
  { abbr: "EEC", name: "EEC-ITIS Tourism Institute", sub: "License: 2008-TC-003 • Hospitality Degrees", color: "bg-red-50 text-red-600" },
  { abbr: "SSM", name: "Swiss School of Management", sub: "Swiss & MFHEA Accredited • BBA & MBA", color: "bg-red-600 text-white" },
  { abbr: "BESC", name: "BESC Graduate College", sub: "Qualifi Accredited • Sport Neuroscience", color: "bg-gray-900 text-white" },
  { abbr: "GCM", name: "Global College Malta", sub: "SmartCity Malta • BA, MSc, MBA & DBA", color: "bg-red-50 text-red-600" },
  { abbr: "GBS", name: "GBS Malta (Banking School)", sub: "License: 2022-010 • 25% MBA Scholarship", color: "bg-gray-900 text-white" }
];

// Images for the partner college cards (same order as partnersList)
const partnerImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600&h=600"
];

const partnerCards = partnersList.map((p, i) => ({
  ...p,
  image: partnerImages[i],
  field: p.sub.split('•').pop().trim()
}));
const partnerColLeft = partnerCards.filter((_, i) => i % 2 === 0);
const partnerColRight = partnerCards.filter((_, i) => i % 2 === 1);

const courseCategories = [
  "All Trending",
  "Nursing & Healthcare",
  "Business & MBA",
  "IT, AI & Cloud",
  "Hospitality & Tourism"
];

const trendingCoursesData = [
  {
    title: "Nursing Bridging Course (NBC) – MQF Level 5",
    category: "Nursing & Healthcare",
    college: "La Vallette & Uniplural Academy",
    duration: "6 – 12 Months",
    fee: "€5,500",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "B.Sc. in Nursing Studies (EU Registered Nurse)",
    category: "Nursing & Healthcare",
    college: "La Vallette Institute (St James Partner)",
    duration: "3 Years (180 ECTS)",
    fee: "€7,000 / Yr",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Complete UK MBA Pathway (Dual Award Level 7)",
    category: "Business & MBA",
    college: "Avanza Academy & Cardiff Met (UK)",
    duration: "18 Months",
    fee: "€12,000 Total",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "B.Sc. in Software Design, AI & Cloud Computing",
    category: "IT, AI & Cloud",
    college: "Learn Key Training Institute",
    duration: "3 Years (180 ECTS)",
    fee: "€6,500 (Yr 1)",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "B.Sc. (Hons) Hospitality & Tourism Management",
    category: "Hospitality & Tourism",
    college: "La Vallette & EEC-ITIS Malta",
    duration: "3 Years",
    fee: "€8,000 (Yr 1)",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "PG Diploma in Logistics & Supply Chain Crisis Mgmt",
    category: "Business & MBA",
    college: "Malita College & La Vallette",
    duration: "1 Year (Level 7)",
    fee: "€6,500",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
  }
];

const faqsData = [
  {
    q: "What does The Raptor Academics do as a Malta study abroad consultant?",
    a: "We provide end-to-end guidance for studying in Malta—including free profile evaluation, shortlisting MFHEA-accredited colleges, securing 24–48 hour offer letters without IELTS, providing official hostel letters, booking daily VFS appointments, and assisting with post-study work permits."
  },
  {
    q: "Can I really pay my tuition fees AFTER my Malta student visa is approved?",
    a: "Yes! At our top partner institutions (including La Vallette Institute, Avanza, Uniplural, Learn Key, Malita, 21 Academy, SSM, and BESC), international students can pay their main course tuition fee after receiving their visa approval, ensuring zero financial risk."
  },
  {
    q: "Is IELTS or PTE mandatory to study in Malta?",
    a: "No, IELTS or PTE is not mandatory at most of our partner colleges. You can apply using a Medium of Instruction (MOI) certificate or clear a basic internal college assessment."
  },
  {
    q: "What is the Malta Government 'Get Qualified' 70% Fee Refund Scheme?",
    a: "Under the Malta Government's Get Qualified incentive, students who graduate from an MFHEA-accredited course and work in Malta can claim back up to 70% of their tuition fees in the form of personal income tax credits."
  }
];

// ==========================================
// VERTICAL REEL CARD COMPONENT
// ==========================================
const ReelCard = ({ reel, index }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play by default
  // Ab saari videos by default muted rahengi (first wali bhi)
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play the video when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Auto-play was prevented.", error);
        setIsMuted(true);
        videoRef.current.muted = true;
        videoRef.current.play();
      });
      setIsPlaying(true);
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={togglePlay}
      className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-[#151515] border border-gray-800 shadow-2xl group cursor-pointer select-none"
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.poster}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

      {/* Top Bar: Category & Mute Button */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          {reel.category}
        </span>
        <button
          onClick={toggleMute}
          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/15 hover:bg-red-600 transition-colors"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      {/* Center Play/Pause Button Overlay (Hidden by default, shown ONLY ON HOVER) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.7)] transform scale-90 group-hover:scale-100 transition-transform">
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 text-xs text-gray-300 mb-1.5 font-semibold">
          <FaInstagram className="text-red-500" />
          <span>{reel.views} Views</span>
        </div>
        <h4 className="text-white font-bold text-sm leading-snug line-clamp-2 drop-shadow-md">
          {reel.title}
        </h4>
      </div>
    </motion.div>
  );
};

// ==========================================
// PARTNER COLLEGE TILE (used in the scrolling columns)
// ==========================================
const PartnerTile = ({ partner }) => (
  <Link to="/institutions" className="block pb-3 md:pb-4 group">
    <div className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
      <img
        src={partner.image}
        alt={partner.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b33]/85 via-[#0b1b33]/40 to-[#0b1b33]/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
        <span className="text-white font-extrabold text-base md:text-xl leading-tight drop-shadow-md">
          {partner.name}
        </span>
        <span className="text-red-300 text-[11px] md:text-xs font-bold mt-1.5">{partner.field}</span>
      </div>
    </div>
  </Link>
);

// Slide direction variants for the case study carousel
const caseVariants = {
  enter: (dir) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -60 })
};

// ==========================================
// MAIN HOME COMPONENT
// ==========================================
const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Trending");
  const [openFaq, setOpenFaq] = useState(0);
  const [csIndex, setCsIndex] = useState(0);
  const [csDir, setCsDir] = useState(1);
  const stepCardRefs = useRef([]);

  const filteredCourses = selectedCategory === "All Trending"
    ? trendingCoursesData
    : trendingCoursesData.filter(c => c.category === selectedCategory);

  // Steps section: the last card that has scrolled past 55% of the screen becomes the active step
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

  // Case studies carousel: prev / next with wrap-around
  const goCase = (dir) => {
    setCsDir(dir);
    setCsIndex((i) => (i + dir + caseStudiesData.length) % caseStudiesData.length);
  };


  // GSAP ScrollTrigger Animation for Case Studies Cards AND Partner Colleges Scroll
  useEffect(() => {
    // Context for cleanup
    const ctx = gsap.context(() => {
      // 1. Case Studies Animation (Already exists)
      const cards = gsap.utils.toArray('.gsap-case-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 2. NEW: Partner Colleges Scroll-Linked Columns Animation
      // Left columns move UP on scroll, Right columns move DOWN on scroll
      gsap.to('.partner-col-up', {
        yPercent: -35, // Adjust this value to control how much it scrolls
        ease: 'none',
        scrollTrigger: {
          trigger: '.partner-panel',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // Smooth scrubbing
        },
      });

      gsap.to('.partner-col-down', {
        yPercent: 35, // Adjust this value to control how much it scrolls
        ease: 'none',
        scrollTrigger: {
          trigger: '.partner-panel',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-clip">
      <Navbar />

      {/* ==========================================
          1. OUR SIGNATURE RAPTOR HERO + LOGO NAVY BLUE (#1b365d)
      ========================================== */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 px-4 md:px-12 bg-white overflow-hidden">
        <div className="absolute top-16 left-0 w-96 h-96 bg-red-100/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#1b365d]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Signature Copy & Red Quote Box (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 z-10"
          >
            <div className="inline-flex items-center gap-2.5 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest">
                Who We Are? • Europe Study Visa Experts
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-[#0f2547] leading-[1.1] tracking-tight">
              Your Trusted Partner <br />
              For Studying in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-600 to-red-800 drop-shadow-sm">
                MALTA
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
              The Raptor Academics is a Malta-focused study abroad consultancy helping students turn international education goals into reality—with <strong className="text-[#1b365d]">12+ MFHEA-licensed colleges, zero IELTS barriers, and tuition payment after visa approval.</strong>
            </p>

            <div className="p-5 border-l-4 border-red-600 bg-gradient-to-r from-red-50/90 to-red-50/20 text-[#0f2547] rounded-r-2xl max-w-lg shadow-sm">
              <p className="font-extrabold text-base md:text-lg leading-snug">
                From Application to Arrival — <br />
                <span className="text-red-600">We Guide You All the Way.</span>
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

          {/* Right Column: Three.js WebGL 3D Orb + Malta Skyline Showcase (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[560px] sm:h-[600px] w-full">
              
              {/* Interactive Three.js 3D Floating Orb Badge (Top-Left Overlay)
              <div className="w-52 h-52 absolute -top-12 -left-10 z-30 pointer-events-none hidden sm:block">
                <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }}>
                  <Suspense fallback={null}>
                    <MorphingRaptorOrb />
                  </Suspense>
                </Canvas>
              </div> */}

              {/* Main Card: Malta Skyline & European Campus */}
              <div className="w-full h-[480px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative z-10 group">
                <img 
                  src="https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=1000" 
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

              {/* Floating Badge 1: 24-48 Hours Offer Letter (Bottom-Left) */}
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

              {/* Floating Badge 2: 20 Hrs Work Permit (Bottom-Right in Logo Navy Blue) */}
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

        {/* Enlarged & Bold Floating 4-Features Bar */}
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

      {/* ==========================================
          2. INFINITE GPU MARQUEE WITH WEBKIT TEXT STROKE
      ========================================== */}
      <LuxuryMarquee />

      {/* ==========================================
          3. 4 STEPS TO YOUR DREAM DESTINATION (SCROLL-STACKING CARDS)
      ========================================== */}
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
            {/* LEFT: stacking cards (each sticks, the next one slides over it) */}
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

                  {/* Mobile-only image (the sticky right image is hidden on small screens) */}
                  <div className="lg:hidden mt-5 h-44 rounded-2xl overflow-hidden">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="mt-auto pt-7 md:pl-[3.25rem]">
                    <Link to="/free-counselling">
                      <button className="text-xs md:text-sm font-extrabold text-[#1b365d] bg-white/60 border border-[#1b365d]/70 hover:bg-red-600 hover:border-red-600 hover:text-white px-6 py-3 rounded-xl transition-colors">
                        Free Expert Consultation
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: sticky image that swaps as you scroll through the steps */}
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

      {/* ==========================================
          4. STUDENT CASE STUDIES (ARROW CAROUSEL)
      ========================================== */}
      <section className="py-24 px-4 md:px-12 bg-[#0b0d13] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs mb-3">
                ★ Verified Visa Case Studies ★
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold">
                Real Profiles. <RedUnderline>Zero Upfront</RedUnderline> Risk.
              </h2>
            </div>
            <Link to="/free-counselling">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl transition text-sm">
                Evaluate Your Profile Free
              </button>
            </Link>
          </div>

          <div className="relative">
            {/* Prev arrow */}
            <button
              onClick={() => goCase(-1)}
              aria-label="Previous case study"
              className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-7 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30 border-4 border-[#0b0d13] transition hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={26} />
            </button>

            {/* Next arrow */}
            <button
              onClick={() => goCase(1)}
              aria-label="Next case study"
              className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-7 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30 border-4 border-[#0b0d13] transition hover:scale-105 active:scale-95"
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
                className="bg-[#131722] border border-gray-800 rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl"
              >
                <div className="lg:col-span-5 h-64 md:h-80 rounded-2xl overflow-hidden relative">
                  <img
                    src={caseStudiesData[csIndex].image}
                    alt={caseStudiesData[csIndex].student}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full">
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

          {/* Counter + dots */}
          <div className="flex items-center justify-center gap-5 mt-10">
            <span className="text-sm font-bold text-gray-400 tabular-nums">
              0{csIndex + 1} / 0{caseStudiesData.length}
            </span>
            <div className="flex items-center gap-2">
              {caseStudiesData.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to case study ${i + 1}`}
                  onClick={() => {
                    setCsDir(i > csIndex ? 1 : -1);
                    setCsIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === csIndex ? 'w-8 bg-red-600' : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. OUR TOP RANKED PARTNERS (4-COLUMN GSAP SCROLL)
      ========================================== */}
      <section className="py-16 md:py-24 px-3 md:px-6 bg-white overflow-hidden">
        <div className="partner-panel relative max-w-[1700px] mx-auto bg-[#1b365d] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden">
          {/* Subtle Red Aura in Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-96 bg-red-600/15 blur-[150px] pointer-events-none" />

          {/* 
            Grid Layout: 
            Col 1 & 2 (Left): Colleges 1-3, 4-6
            Col 3 (Center): Text Content
            Col 4 & 5 (Right): Colleges 7-9, 10-12
          */}
          <div className="relative w-full mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-12 min-h-[700px]">
            
            {/* LEFT 2 COLUMNS (Scrolls UP) */}
            <div className="hidden lg:flex w-1/3 h-[900px] gap-4 overflow-hidden -mt-20">
              <div className="partner-col-up flex flex-col gap-4 w-1/2 pt-32">
                {partnerCards.slice(0, 3).map((partner, i) => (
                  <PartnerTile key={`l1-${i}`} partner={partner} />
                ))}
              </div>
              <div className="partner-col-down flex flex-col gap-4 w-1/2 -mt-40">
                {partnerCards.slice(3, 6).map((partner, i) => (
                  <PartnerTile key={`l2-${i}`} partner={partner} />
                ))}
              </div>
            </div>

            {/* CENTER TEXT CONTENT */}
            <div className="w-full lg:w-1/3 flex flex-col items-center text-center py-16 lg:py-0 z-10 shrink-0">
              <h2 className="text-3xl md:text-5xl lg:text-[52px] font-light text-white leading-[1.1]">
                Meet Our <br />
                {/* Moving Red Gradient Text Instead of Underline */}
                <span className="font-extrabold bg-clip-text text-transparent bg-[linear-gradient(90deg,#ffffff,#dc2626,#dc2626,#ffffff)] bg-[length:200%_auto] animate-[gradientMove_3s_linear_infinite]">
                  Top Ranked
                </span>
                <br /> Partner Colleges
              </h2>
              <p className="text-blue-100/80 text-sm md:text-base leading-relaxed mt-6 max-w-sm">
                12+ MFHEA-licensed colleges across nursing, business, IT and hospitality. Explore their courses, fee structures and pay-after-visa options in one place.
              </p>
              <Link
                to="/institutions"
                className="mt-8 inline-block border border-white/70 text-white hover:bg-white hover:text-[#1b365d] font-bold text-sm px-9 py-3.5 rounded-full transition-colors shadow-lg"
              >
                View 12+ Colleges
              </Link>
            </div>

            {/* RIGHT 2 COLUMNS (Scrolls UP & DOWN) */}
            <div className="hidden lg:flex w-1/3 h-[900px] gap-4 overflow-hidden -mt-20">
              <div className="partner-col-down flex flex-col gap-4 w-1/2 -mt-20">
                {partnerCards.slice(6, 9).map((partner, i) => (
                  <PartnerTile key={`r1-${i}`} partner={partner} />
                ))}
              </div>
              <div className="partner-col-up flex flex-col gap-4 w-1/2 pt-48">
                {partnerCards.slice(9, 12).map((partner, i) => (
                  <PartnerTile key={`r2-${i}`} partner={partner} />
                ))}
              </div>
            </div>
            
            {/* MOBILE ONLY: Simple Grid (Visible only on small screens) */}
            <div className="lg:hidden w-full grid grid-cols-2 gap-3 pb-10">
               {partnerCards.map((partner, i) => (
                 <PartnerTile key={`mob-${i}`} partner={partner} />
               ))}
            </div>

          </div>
        </div>

        {/* Global Keyframes for the gradient text animation */}
        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}</style>
      </section>

      {/* ==========================================
          6. DISCOVER TRENDING COURSES (TABS + CARDS)
      ========================================== */}
      <section className="py-24 px-4 md:px-12 bg-[#f8f9fc] border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Discover <RedUnderline>Trending Courses</RedUnderline> in Malta
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12 bg-white p-2 rounded-full max-w-4xl mx-auto shadow-sm border border-gray-200/80">
            {courseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-52 overflow-hidden relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-[11px] font-extrabold px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow">
                    {course.fee}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{course.college} • {course.duration}</p>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-4 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {course.title}
                  </h3>
                  <Link 
                    to="/institutions" 
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-red-600 hover:text-red-700"
                  >
                    View Modules & Career Salaries <FaArrowRight size={11} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. DIRECTOR'S REELS & VIDEO GALLERY HUB
      ========================================== */}
      <section className="py-24 px-4 md:px-12 bg-[#080808] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-72 bg-red-600/15 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                Live From Our Founder & Director
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Director's <RedUnderline>Reels & Visa</RedUnderline> Hub
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl text-sm md:text-base">
                Watch real student visa approvals, Malta campus breakdowns, and honest guidance directly from our leadership team.
              </p>
            </div>

            <a 
              href="https://www.instagram.com/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition shrink-0 self-start md:self-auto"
            >
              <FaInstagram size={20} /> Follow On Instagram <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {reelsData.map((reel, index) => (
              <ReelCard key={reel.id} reel={reel} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          8. FAQS (CLASSY SPLIT LAYOUT)
      ========================================== */}
      <section className="py-24 md:py-28 px-4 md:px-12 bg-[#f8f9fc] border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: heading + help */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0f2547] leading-none tracking-tight">
              <RedUnderline>FAQs</RedUnderline>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mt-8 max-w-md">
              Straight answers to what students and parents ask us most about studying in Malta.
            </p>

            <div className="mt-10 p-6 md:p-7 rounded-3xl bg-[#1b365d] text-white max-w-md shadow-xl shadow-[#1b365d]/20">
              <p className="text-xl font-extrabold leading-snug">Still have a question?</p>
              <p className="text-blue-100/80 text-sm md:text-base mt-2 leading-relaxed">
                Our Malta experts will answer it on a free call.
              </p>
              <Link to="/free-counselling">
                <button className="mt-5 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl flex items-center gap-3 transition-colors">
                  Talk to an expert <FaArrowRight size={13} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-7 space-y-5">
            {faqsData.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-3xl border bg-white overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-red-200 shadow-xl shadow-red-600/10'
                      : 'border-gray-200/90 shadow-sm hover:shadow-md hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 md:px-8 py-6 md:py-7 text-left flex items-center justify-between gap-6"
                  >
                    <span
                      className={`font-extrabold text-lg md:text-xl lg:text-[22px] leading-snug transition-colors duration-300 ${
                        isOpen ? 'text-red-600' : 'text-[#0f2547]'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`w-11 h-11 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-red-600 border-red-600 text-white rotate-45'
                          : 'border-red-600 text-red-600'
                      }`}
                    >
                      <Plus size={22} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-7 md:pb-8">
                          <div className="h-px bg-gray-100 mb-5" />
                          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          9. INTERACTIVE FREE COUNSELLING CTA
      ========================================== */}
      <section className="relative py-24 bg-[#050505] overflow-hidden flex items-center justify-center px-4 md:px-12 border-y border-gray-900">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-10 w-96 h-96 bg-red-600 rounded-full blur-[120px] z-0 pointer-events-none"
        />
        <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          <div className="space-y-6">
            <p className="text-red-500 font-bold tracking-[0.2em] text-sm uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              Start Your Journey
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Confused About Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Study Abroad</span> Future?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Don't let endless options overwhelm you. Speak with our expert counselors to find the perfect course and Malta college tailored to your career goals. 100% Free.
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

      {/* ==========================================
          10. CONTACT FORM & FOOTER
      ========================================== */}
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;
