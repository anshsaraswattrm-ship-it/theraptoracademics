import React from 'react';
import { motion } from 'framer-motion';

const marqueeItems = [
  "STUDY IN MALTA WITHOUT IELTS",
  "PAY TUITION FEE AFTER VISA",
  "70% GET QUALIFIED TAX REBATE",
  "24-48 HRS EXPRESS OFFER LETTER",
  "20 HRS/WEEK LEGAL WORK PERMIT",
  "29 SCHENGEN COUNTRIES ACCESS"
];

const MarqueeSection = () => {
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

export default MarqueeSection;