
import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';

const trailIcons = ['🎓', '✈️', '🌍', '📜', '✒️', '✨'];

// Brand colors
const BRAND_RED = '#E30613';
const BRAND_BLUE = '#142E55';

const CursorTrail = () => {
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;

      const interactive = target.closest(
        'a, button, input, select, video, [data-magnetic]'
      );

      setIsHovered(Boolean(interactive));

      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          const newParticle = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            icon:
              trailIcons[
                Math.floor(Math.random() * trailIcons.length)
              ],
          };

          setParticles((prev) => [
            ...prev.slice(-8),
            newParticle,
          ]);

          timeoutId = null;
        }, 55);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.length > 0 ? prev.slice(1) : prev
      );
    }, 160);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Brand Color Magnetic Cursor */}

      <motion.div
        
style={{
  x: smoothX,
  y: smoothY,
  translateX: '-50%',
  translateY: '-50%',
  backgroundColor: isHovered
    ? 'rgba(20, 46, 85, 0.18)'
    : 'rgba(227, 6, 19, 0.06)',
  borderColor: isHovered
    ? 'rgba(20, 46, 85, 0.75)'
    : 'rgba(227, 6, 19, 0.85)',
}}

        animate={{
          width: isHovered ? 64 : 28,
          height: isHovered ? 64 : 28,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-2 hidden md:flex items-center justify-center"
      >
        <div
          className="rounded-full transition-all duration-200"
          
style={{
  width: isHovered ? 10 : 6,
  height: isHovered ? 10 : 6,
  backgroundColor: isHovered
    ? '#E30613'
    : '#142E55',
}}

        />
      </motion.div>

      {/* Floating Education Icons Trail */}

      <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden hidden md:block">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                opacity: 0.9,
                scale: 0.3,
                x: p.x,
                y: p.y,
                rotate: 0,
              }}
              animate={{
                opacity: 0,
                scale: 1.35,
                y: p.y - 90,
                x: p.x + (Math.random() * 50 - 25),
                rotate: Math.random() * 80 - 40,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.1,
                ease: 'easeOut',
              }}
              className="absolute text-xl drop-shadow-md"
              style={{
                left: -10,
                top: -10,
              }}
            >
              {p.icon}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CursorTrail;
