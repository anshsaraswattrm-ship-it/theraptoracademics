import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Database, Share2, UserCheck, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const privacySections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: "When you fill out an enquiry form, request free counseling, or submit documents for university admission and visa processing, we may collect personal information including your full name, phone number, email address, residential address, educational transcripts (10th, 12th, Diploma, Degree), passport details, English proficiency records (MOI/IELTS/PTE), and financial sponsorship documents."
  },
  {
    icon: UserCheck,
    title: "2. How We Use Your Information",
    content: "We use your personal data strictly to evaluate your academic eligibility, apply to MFHEA-accredited colleges and universities on your behalf, arrange official accommodation/hostel letters, schedule VFS visa appointments, and communicate updates regarding your application via phone, WhatsApp, or email."
  },
  {
    icon: Share2,
    title: "3. Information Sharing & Confidentiality",
    content: "We never sell, rent, or trade your personal data to third-party marketers. Your documents and profile details are shared strictly with authorized partner universities, official admission portals, health insurance providers, and visa/immigration bodies (such as VFS Global and embassy authorities) required to complete your admission and visa process."
  },
  {
    icon: Lock,
    title: "4. Data Security & Your Rights",
    content: "We implement strict administrative and digital safeguards to protect your academic and identity records against unauthorized access or misuse. You may request access to, correction of, or deletion of your personal records from our counseling database at any time by contacting us via email."
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans overflow-x-clip">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 px-4 md:px-12 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block bg-red-50 border border-red-100 text-red-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
            Data Protection • Last Updated: November 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f2547] tracking-tight">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Your academic documents and personal details are safe with us. Learn how The Raptor Academics collects, protects, and uses your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {privacySections.map((sec, idx) => {
            const IconComp = sec.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white border border-gray-200/90 rounded-3xl p-7 md:p-9 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#1b365d]/10 text-[#1b365d] flex items-center justify-center shrink-0">
                    <IconComp size={22} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#0f2547]">
                    {sec.title}
                  </h2>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed pt-1">
                  {sec.content}
                </p>
              </motion.div>
            );
          })}

          {/* Contact Box */}
          <div className="bg-[#1b365d] text-white rounded-3xl p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-red-400 text-xs font-extrabold uppercase tracking-wider">
                <Mail size={15} /> Privacy & Data Queries
              </div>
              <h3 className="text-xl font-extrabold">Want to update or remove your records?</h3>
              <p className="text-blue-100/80 text-sm">
                Reach out to our Jaipur compliance desk at (+91) 72320 10105 or email us directly.
              </p>
            </div>
            <a
              href="mailto:theraptoracademics@gmail.com"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shrink-0"
            >
              theraptoracademics@gmail.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;