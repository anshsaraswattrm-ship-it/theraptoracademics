import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = ({ lenisRef }) => {
  const { pathname, hash } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // 1. Always start new page/route from the very top (or smooth-scroll to #hash if present)
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const targetId = hash.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 105;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }

    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, lenisRef]);

  // 2. Show floating scroll-to-top button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 350);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 1.0 });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.22 }}
          aria-label="Scroll back to top"
          title="Back to top"
          className="fixed bottom-5 left-5 z-40 w-11 h-11 rounded-full bg-[#0f2547] hover:bg-red-600 text-white border border-white/20 shadow-xl flex items-center justify-center transition-colors cursor-pointer print:hidden outline-none focus:outline-none"
        >
          <FaArrowUp size={15} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;