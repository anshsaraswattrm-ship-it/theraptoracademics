import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckSquare, CreditCard, AlertCircle, Gavel } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const termsSections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: "By accessing and using The Raptor Academics website (theraptoracademics.com) or engaging our study abroad and visa counseling services, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using our services."
  },
  {
    icon: CheckSquare,
    title: "2. Student Responsibilities & Authenticity of Documents",
    content: "Applicants must provide genuine, accurate, and verifiable academic certificates, identity proofs, work experience letters, and financial statements. Submitting forged, altered, or misleading documents will result in immediate termination of our services without refund, and The Raptor Academics bears zero responsibility for blacklisting or legal consequences imposed by universities or embassies."
  },
  {
    icon: CreditCard,
    title: "3. Tuition Fees, Embassy Charges & Refund Policies",
    content: "Tuition fees, university registration charges, VFS service fees, embassy visa fees, and health insurance premiums are governed by the respective institution's and embassy's refund policies. Where 'Pay Tuition Fee After Visa' options apply at eligible partner institutions, students must fulfill all university registration and post-approval payment timelines as outlined in their official offer letter."
  },
  {
    icon: AlertCircle,
    title: "4. Intellectual Property Rights",
    content: "All logos, branding, text, custom graphics, video reels, and course guides displayed on this website are the intellectual property of The Raptor Academics. Unauthorized copying, reproduction, or commercial use of our website content is strictly prohibited."
  },
  {
    icon: Gavel,
    title: "5. Governing Law & Jurisdiction",
    content: "These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to services provided by The Raptor Academics shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan."
  }
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans overflow-x-clip">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 px-4 md:px-12 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block bg-red-50 border border-red-100 text-red-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
            Service Agreement • Last Updated: November 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f2547] tracking-tight">
            Terms & <span className="text-red-600">Conditions</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Clear, transparent guidelines governing our overseas education counseling, documentation, and student support services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {termsSections.map((sec, idx) => {
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
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;