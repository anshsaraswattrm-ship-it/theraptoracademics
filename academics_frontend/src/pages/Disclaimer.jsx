import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Scale, Globe, FileWarning, Building2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const disclaimerSections = [
  {
    icon: Globe,
    title: "1. General Information Purpose Only",
    content: "All information provided on The Raptor Academics website (theraptoracademics.com), brochures, social media channels, and during counseling sessions is published in good faith and for general educational and informational purposes only. While we strive to keep university details, course modules, tuition fees, and intake dates accurate and up to date, educational institutions reserve the right to modify their policies, fee structures, and entry criteria without prior notice."
  },
  {
    icon: ShieldAlert,
    title: "2. No Guarantee of Visa or Admission Approval",
    content: "The Raptor Academics acts solely as an overseas education and study visa consultancy. Final decisions regarding university admission offers, scholarships, and student or visitor visa approvals rest exclusively with the respective educational institutions, embassies, high commissions, and immigration authorities (such as Identità Malta and VFS Global). We do not guarantee visa issuance or admission outcomes, as approvals depend on individual applicant profiles, financial documentation, and official immigration regulations."
  },
  {
    icon: FileWarning,
    title: "3. Third-Party Links & External Accreditations",
    content: "Our website may contain references or external links to partner universities, MFHEA-accredited institutions, government schemes (such as Malta's 'Get Qualified' tax credit initiative), and third-party portals. The Raptor Academics has no control over the content, policy updates, or availability of external sites and does not assume liability for changes made by third-party bodies."
  },
  {
    icon: Scale,
    title: "4. Financial & Post-Study Work Disclaimers",
    content: "Any mention of part-time work allowances (such as 20 hours/week in Malta), post-study work permits (PSW), tax rebates, or starting salary estimates is based on prevailing government guidelines at the time of publication. Students are advised to verify current immigration and labor laws directly with official authorities prior to making financial commitments."
  }
];

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans overflow-x-clip">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 px-4 md:px-12 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block bg-red-50 border border-red-100 text-red-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
            Legal Notice • Last Updated: November 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f2547] tracking-tight">
            Website & Advisory <span className="text-red-600">Disclaimer</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Please read this disclaimer carefully before relying on any course, fee, or immigration information published by The Raptor Academics.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {disclaimerSections.map((sec, idx) => {
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

          {/* Contact Box */}
          <div className="bg-[#0f2547] text-white rounded-3xl p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-red-400 text-xs font-extrabold uppercase tracking-wider">
                <Building2 size={15} /> Official Office Address
              </div>
              <h3 className="text-xl font-extrabold">Have questions regarding our policies?</h3>
              <p className="text-blue-100/80 text-sm">
                The Raptor Academics • 120/64, New Sanganer Rd, Sector 12, Mansarovar, Jaipur 302020
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

export default Disclaimer;