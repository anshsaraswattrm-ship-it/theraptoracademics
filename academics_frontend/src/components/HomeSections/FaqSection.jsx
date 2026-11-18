import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { FaArrowRight } from 'react-icons/fa';
import { RedUnderline } from './Shared';

const faqsData = [
  {
    q: "Which European countries can Indian students consider for higher education?",
    a: "Indian students can explore study opportunities in destinations such as Malta, Germany, France, Italy, Ireland, Poland, Spain and the Netherlands. Each country has different admission requirements, tuition fees, language requirements and student visa procedures. The right destination depends on your academic background, budget and career plans."
  },
  {
    q: "Why should I consider studying in Malta?",
    a: "Malta offers higher education opportunities in an English-speaking environment, with programmes across business, healthcare, IT, hospitality and other fields. Students should compare the institution, programme accreditation, tuition fees and entry requirements before making a decision."
  },
  {
    q: "Is IELTS mandatory to study in European countries?",
    a: "English language requirements vary by country, university and programme. Some institutions may accept alternative English proficiency evidence, while others require IELTS, PTE or another recognised test. Always check the specific institution's admission criteria."
  },
  {
    q: "How much does it cost to study in Europe?",
    a: "The cost depends on the destination, university, programme and lifestyle. Tuition fees and living expenses can differ significantly between countries. We recommend comparing the complete cost of education, including accommodation, insurance, travel and other expenses."
  },
  {
    q: "Can I work while studying in Europe?",
    a: "Some European countries allow eligible international students to work while studying, subject to local immigration rules, residence status and employment conditions. The permitted hours and eligibility differ by destination, so students should check the current official rules."
  },
  {
    q: "Can I apply to European colleges after Class 12?",
    a: "Yes, students who have completed Class 12 can explore eligible undergraduate, diploma and foundation programmes. Admission depends on the course, institution, academic qualifications and any additional entry requirements."
  },
  {
    q: "Does The Raptor Academics provide student visa assistance?",
    a: "Yes. The Raptor Academics provides guidance on student visa documentation and application procedures for the destinations it supports. Visa requirements differ between countries, and final decisions are made by the relevant immigration authorities."
  },
  {
    q: "How do I choose the right European country for my studies?",
    a: "Consider your academic qualifications, preferred course, tuition budget, living expenses, language requirements and long-term career objectives. A profile assessment can help you compare suitable study destinations before choosing an institution."
  },
  {
    q: "How can I get counselling for studying abroad from Jaipur?",
    a: "You can contact The Raptor Academics by phone, WhatsApp or the website enquiry form to request a counselling session. Students can discuss their academic profile, preferred destination, course interests and budget with the counselling team."
  },
  {
    q: "Does The Raptor Academics help with accommodation and pre-departure preparation?",
    a: "Pre-departure guidance may include accommodation considerations, travel planning, essential documents and preparation for studying abroad. The exact support depends on the destination and services agreed with the student."
  }
];

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="py-24 md:py-28 px-4 md:px-12 bg-[#f8f9fc] border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-36">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0f2547] leading-none tracking-tight">
            <RedUnderline>FAQs</RedUnderline>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mt-8 max-w-md">
            Straight answers to what students and parents ask us most about studying in Europe and Malta.
          </p>

          <div className="mt-10 p-6 md:p-7 rounded-3xl bg-[#1b365d] text-white max-w-md shadow-xl shadow-[#1b365d]/20">
            <p className="text-xl font-extrabold leading-snug">Still have a question?</p>
            <p className="text-blue-100/80 text-sm md:text-base mt-2 leading-relaxed">
              Our experts will answer it on a free call.
            </p>
            <Link to="/free-counselling">
              <button className="mt-5 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl flex items-center gap-3 transition-colors">
                Talk to an expert <FaArrowRight size={13} />
              </button>
            </Link>
          </div>
        </div>

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
  );
};

export default FaqSection;