import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  FileCheck2, 
  PlaneTakeoff, 
  Home, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  PhoneCall,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const careTimeline = [
  {
    phase: "Phase 01 • Before You Apply",
    title: "Honest Profile Evaluation & Career Mapping",
    desc: "We don't push random colleges just to close a file. Our senior counselors sit with you and your parents to understand your academic background, study gaps, financial comfort, and long-term career goals—shortlisting only MFHEA-accredited institutions in Malta and Europe where you truly belong.",
    highlights: ["1-on-1 Parent & Student Counseling", "Transparent Fee & ROI Breakdown", "Zero False Promises Policy"],
    icon: HeartHandshake
  },
  {
    phase: "Phase 02 • Admission & Documentation",
    title: "Zero-Stress Paperwork & Express Offer Letters",
    desc: "From SOP drafting and MOI (Medium of Instruction) verification to securing your conditional offer letter in 24–48 hours without IELTS barriers—our documentation team double-checks every single page so there is zero room for error.",
    highlights: ["24–48 Hrs Express Offer Letter", "Dedicated Document Verification Officer", "Pay Tuition Fee AFTER Visa Options"],
    icon: FileCheck2
  },
  {
    phase: "Phase 03 • Visa & Pre-Departure",
    title: "VFS Slot Booking, Mock Interviews & Travel Prep",
    desc: "Visa filing is the most stressful part for any family. We handle your health insurance, official college hostel letters, financial checklists, priority VFS appointment slots, and conduct 1-on-1 mock visa interviews until you feel 100% confident.",
    highlights: ["Priority VFS Appointment Assistance", "1-on-1 Embassy Interview Prep", "Pre-Departure Briefing & Packing Guide"],
    icon: PlaneTakeoff
  },
  {
    phase: "Phase 04 • Arrival & Settling Abroad",
    title: "We Don't Disappear After Your Visa Is Stamped",
    desc: "For most consultants, their job ends at the airport. For us, that's where our real responsibility begins. From coordinating your airport pickup and hostel check-in in Malta to guiding you on SIM cards, bank accounts, and residence permits (e-Residence), we stay connected.",
    highlights: ["Arrival & Accommodation Coordination", "e-Residence & Local Registration Help", "24/7 Direct Team Support on WhatsApp"],
    icon: Home
  },
  {
    phase: "Phase 05 • Studying, Working & Beyond",
    title: "Part-Time Work Guidance, Tax Rebates & Future Growth",
    desc: "Even months and years after you land, our doors remain open. Whether you need guidance on legal 20 hrs/week student work rules, claiming up to 70% tuition fee refund under Malta's 'Get Qualified' scheme, or planning your Post-Study Work (PSW) visa—we remain your lifelong mentor.",
    highlights: ["70% Get Qualified Tax Rebate Guidance", "Post-Study Work (PSW) & Career Advice", "Lifelong Alumni & Family Support"],
    icon: GraduationCap
  }
];

const parentPromises = [
  {
    title: "Complete Transparency with Parents",
    desc: "Parents stay informed at every milestone—from offer letter issuance to VFS submission and visa approval. No hidden charges, ever.",
    icon: ShieldCheck
  },
  {
    title: "Direct Access, Not Call Centers",
    desc: "You get direct phone and WhatsApp access to your assigned counselor in Jaipur—even after you fly to Malta.",
    icon: PhoneCall
  },
  {
    title: "Ethical & Risk-Free Approach",
    desc: "With pay-tuition-after-visa partner colleges and honest refusal-case analysis, your hard-earned money stays protected.",
    icon: Briefcase
  }
];

const StudentCareProcess = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-clip">
      <Navbar />

      {/* ==========================================
          1. HERO BANNER
      ========================================== */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 px-4 md:px-12 bg-gradient-to-b from-[#f8fafc] to-white border-b border-gray-100 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#1b365d]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full"
          >
            <Sparkles size={14} className="text-red-600" />
            <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest">
              Student Care Process • Beyond Just Visas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f2547] leading-[1.12] tracking-tight"
          >
            With You From Day One — <br />
            <span className="text-red-600">And Long After You Land.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-base md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Most study abroad agencies stop answering your calls the moment your visa is stamped. At <strong className="text-[#0f2547]">The Raptor Academics</strong>, visa approval is only the halfway mark. We treat every student like family—supporting you before, during, and years after your journey abroad begins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <Link to="/free-counselling">
              <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-600/25 flex items-center justify-center gap-3 transition-all">
                Book Free 1-on-1 Counseling <FaArrowRight size={14} />
              </button>
            </Link>
            <a
              href="https://wa.me/917232010105"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#1b365d] hover:bg-[#122644] text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md"
            >
              <FaWhatsapp size={18} className="text-green-400" /> Chat With Our Counselors
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          2. 5-PHASE END-TO-END STUDENT CARE TIMELINE
      ========================================== */}
      <section className="py-20 md:py-28 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs mb-3">
              ★ Our 360° Care Commitment ★
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f2547]">
              How We Stand By You At Every Step
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              A clear, structured roadmap showing how our team protects your career, finances, and peace of mind—in India and in Europe.
            </p>
          </div>

          <div className="space-y-8 relative">
            {careTimeline.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-[#f8fafc] border border-gray-200/80 hover:border-red-200 rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Left Icon & Phase Badge */}
                  <div className="lg:col-span-4 flex flex-col items-start space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#1b365d] text-white flex items-center justify-center shadow-lg shadow-[#1b365d]/20">
                      <IconComponent size={30} className="text-red-400" />
                    </div>
                    <span className="inline-block bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                      {item.phase}
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#0f2547] leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Right Description & Highlights */}
                  <div className="lg:col-span-8 space-y-5 lg:border-l lg:border-gray-200 lg:pl-8">
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      {item.highlights.map((point, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#0f2547] text-xs md:text-sm font-bold px-4 py-2 rounded-xl shadow-xs"
                        >
                          <CheckCircle2 size={15} className="text-red-600 shrink-0" />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. OUR PROMISE TO PARENTS & STUDENTS (NAVY SECTION)
      ========================================== */}
      <section className="py-20 md:py-24 px-4 md:px-12 bg-[#0f2547] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-red-400 font-bold uppercase tracking-[0.2em] text-xs mb-3">
              ★ Built On Family Trust ★
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Why Parents Trust Us With Their Child’s Future
            </h2>
            <p className="text-blue-100/80 text-sm md:text-base mt-4 leading-relaxed">
              Sending your child thousands of miles away is a big decision. Here is our non-negotiable commitment to every family that walks into our Jaipur office or connects with us online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {parentPromises.map((promise, idx) => {
              const IconComp = promise.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#1b365d]/70 border border-white/10 rounded-3xl p-8 space-y-4 hover:border-red-500/50 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg">
                    <IconComp size={26} />
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{promise.title}</h3>
                  <p className="text-blue-100/80 text-sm md:text-base leading-relaxed">
                    {promise.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. CONTACT FORM & FOOTER
      ========================================== */}
      <ContactForm />
      <Footer />
    </div>
  );
};

export default StudentCareProcess;