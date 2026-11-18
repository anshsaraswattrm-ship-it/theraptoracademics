import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partnersList = [
  { abbr: "LVI", name: "La Vallette Institute", sub: "License: 2024-016 • Healthcare & Nursing" },
  { abbr: "ATA", name: "Avanza Training Academy", sub: "License: 2019-004 • UK MBA & Sports" },
  { abbr: "UA", name: "Uniplural Academy", sub: "License: 2019-010 • Nursing Bridging" },
  { abbr: "MIC", name: "Malita International College", sub: "License: 2021-014 • Supply Chain & IAU MBA" },
  { abbr: "LKI", name: "Learn Key Institute", sub: "License: 2005-TC-007 • IT, AI & Finance" },
  { abbr: "21A", name: "21 Academy Malta", sub: "MFHEA Licensed • AI & Digital Marketing" },
  { abbr: "TT", name: "Think Talent (OTHM)", sub: "License: 2017-004 • UK OTHM Pathways" },
  { abbr: "EEC", name: "EEC-ITIS Tourism Institute", sub: "License: 2008-TC-003 • Hospitality Degrees" },
  { abbr: "SSM", name: "Swiss School of Management", sub: "Swiss & MFHEA Accredited • BBA & MBA" },
  { abbr: "BESC", name: "BESC Graduate College", sub: "Qualifi Accredited • Sport Neuroscience" },
  { abbr: "GCM", name: "Global College Malta", sub: "SmartCity Malta • BA, MSc, MBA & DBA" },
  { abbr: "GBS", name: "GBS Malta (Banking School)", sub: "License: 2022-010 • 25% MBA Scholarship" }
];

const partnerImages = [
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794901696/R.jpg",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794901977/avanza.png",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794902183/uniplural.jpg",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794902377/malita.png",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794905430/6ab65cc7d1360417047843_1.jpg",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794905524/21.jpg",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794905645/TTI_Desktop_Diploma.jpg",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794905807/eec-itis.png",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794906060/swiss.avif",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794906232/besc.webp",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794906355/global.jpg",
  "https://res.cloudinary.com/ppkvzeli/image/upload/v1794906533/gbs.jpg"
];

const partnerCards = partnersList.map((p, i) => ({
  ...p,
  image: partnerImages[i],
  field: p.sub.split('•').pop().trim()
}));
const partnerColLeft = partnerCards.filter((_, i) => i % 2 === 0);
const partnerColRight = partnerCards.filter((_, i) => i % 2 === 1);

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

const PartnersSection = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.partner-col-up', {
        yPercent: -35, 
        ease: 'none',
        scrollTrigger: {
          trigger: '.partner-panel',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, 
        },
      });

      gsap.to('.partner-col-down', {
        yPercent: 35, 
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
    <section className="py-16 md:py-24 px-3 md:px-6 bg-white overflow-hidden">
      <div className="partner-panel relative max-w-[1700px] mx-auto bg-[#1b365d] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-96 bg-red-600/15 blur-[150px] pointer-events-none" />

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
            Explore Our Partner  <br />
              <span className="font-extrabold bg-clip-text text-transparent bg-[linear-gradient(90deg,#ffffff,#dc2626,#dc2626,#ffffff)] bg-[length:200%_auto] animate-[gradientMove_3s_linear_infinite]">
              Colleges & Institutions
              </span>
              <br /> in Europe
            </h2>
            <p className="text-blue-100/80 text-sm md:text-base leading-relaxed mt-6 max-w-sm">
            Choosing the right institution is an important part of studying abroad. Explore selected partner colleges and educational institutions, compare available programmes and understand the academic requirements for your preferred study destination.
            </p>
            <Link
              to="/institutions"
              className="mt-8 inline-block border border-white/70 text-white hover:bg-white hover:text-[#1b365d] font-bold text-sm px-9 py-3.5 rounded-full transition-colors shadow-lg"
            >
              Explore Our Institutions
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
          
          {/* MOBILE ONLY */}
          <div className="lg:hidden w-full grid grid-cols-2 gap-3 pb-10">
             {partnerCards.map((partner, i) => (
               <PartnerTile key={`mob-${i}`} partner={partner} />
             ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;