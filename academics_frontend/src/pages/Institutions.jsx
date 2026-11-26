import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaAward,
  FaChevronRight,
  FaChevronDown,
  FaCheckCircle,
  FaBriefcase,
  FaGraduationCap,
  FaEuroSign,
  FaClipboardCheck,
  FaLightbulb,
  FaStar,
  FaUserCheck,
  FaSearch,
  FaCopy,
  FaPrint,
  FaTimes,
  FaArrowRight,
  FaClock,
  FaShieldAlt,
  FaInfoCircle,
  FaUniversity
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { institutionsData } from '../data/institutionsData';
import logo from '../assets/logo.png';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// ==========================================
// 1. INSTITUTION CAMPUS IMAGES & LOGOS MAP
// ==========================================
const COLLEGE_IMAGES = {
  "La Vallette": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688615/La_valletta_campus_img.webp",
  "Avanza": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688613/Avanza_Campus_Img.webp",
  "Uniplural": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688614/Uniplural_Academy_campus_img1.webp",
  "Malita": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688614/MICM.webp",
  "Learn Key": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688614/Learn_Key_Training_Institute_campus_img_2.webp",
  "21 Academy": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688614/21_Academy_Campus_Img.webp",
  "Think Talent": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688615/Think_Talent_Campus_Img.webp",
  "EEC-ITIS": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688613/EEC-ITIS_Malta_Campus_Img.webp",
  "Swiss School": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688614/Swiss_School_Of_Management.webp",
  "BESC": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688613/BESC_Graduate_College_Campus_Img.webp",
  "Global College": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688613/Global_College_Malta_Campus_Img.webp",
  "GBS": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795688613/GBS_Malta_Campus_Img.webp"
};

// Official University / College Logos used specifically for clean Print Header
const COLLEGE_LOGOS = {
  "La Vallette": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/La-Vallette-institute-PNG-08-360x312-1-1.png",
  "Avanza": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/gabriel-bajada-malta-avanza-training-academy-logo-primary-jpg.webp",
  "Uniplural": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079937/OIP.webp",
  "Malita": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/malita-logo-dark-scaled.png",
  "Learn Key": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079939/Learnkey-malta-logo.png",
  "21 Academy": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/4-removebg-preview.webp",
  "Think Talent": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/ThinkTalent.webp",
  "EEC-ITIS": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795080664/eec_itis_logo.webp",
  "Swiss School": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079938/logo.png",
  "BESC": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079939/Logo_Malta_DEFINITIVO.png",
  "Global College": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079937/Logo-transparent-GCM-01-300x63-1.png",
  "GBS": "https://res.cloudinary.com/ppkvzeli/image/upload/v1795079937/gbs_social_profile_gbs-malta_twitter-400-x-400-svg.png"
};

const DEFAULT_FALLBACK_IMAGES = Object.values(COLLEGE_IMAGES);

const getCollegeImage = (college, index = 0) => {
  if (college?.image) return college.image;
  const name = college?.name || '';
  for (const [key, url] of Object.entries(COLLEGE_IMAGES)) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return url;
    }
  }
  return DEFAULT_FALLBACK_IMAGES[index % DEFAULT_FALLBACK_IMAGES.length];
};

const getCollegeLogo = (college, index = 0) => {
  if (college?.logo) return college.logo;
  const name = college?.name || '';
  for (const [key, url] of Object.entries(COLLEGE_LOGOS)) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return url;
    }
  }
  return getCollegeImage(college, index);
};

// ==========================================
// 2. SLUG HELPER FOR SHAREABLE DEEP LINKS
// ==========================================
const getCollegeSlug = (college) => {
  const short = (college?.name || '').split('–')[0].trim().toLowerCase();
  return short.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

// ==========================================
// 3. SMART FORMATTERS (100% DRIVEN BY institutionsData.js)
// ==========================================
const to2027 = (val) => {
  if (typeof val !== 'string') return val;
  return val.replace(/\b2026\b/g, '2027');
};

const isLaValletteCollege = (collegeName = '') => {
  return /la\s*vallette/i.test(collegeName);
};

const formatCourseTitleForCollege = (title = '', collegeName = '') => {
  let clean = to2027(title);
  if (isLaValletteCollege(collegeName) && /\bmba\b/i.test(clean)) {
    clean = clean
      .replace(/^Level\s*7\s+/i, '')
      .replace(/\(\s*2\s*Years?\s*\)/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!/\(MQF\/EQF Level 7\)/i.test(clean)) {
      clean = `${clean} (MQF/EQF Level 7)`;
    }
  }
  return clean;
};

const formatLaValletteMbaText = (val = '', collegeName = '', isMbaCourse = false) => {
  let clean = to2027(String(val));
  if (isLaValletteCollege(collegeName) && isMbaCourse) {
    clean = clean.replace(/\b2\s*Years?\b/gi, '18 Months');
  }
  return clean;
};

const extractLicense = (text = '') => {
  const match = text.match(/Licen[cs]e\s*(?:No\.?|Number)?\s*[:\-]?\s*([0-9]{4}[A-Za-z0-9.\-]*)/i);
  if (match && match[1]) return `Licence No. ${match[1]}`;
  return 'MFHEA Accredited';
};

const splitIntoCleanLines = (val = '') => {
  const str = to2027(String(val));
  return str
    .split(/\s*(?:\||;)\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
};

const formatShortIntake = (raw = '') => {
  const text = to2027(raw);
  if (!text) return '—';
  if (/flexible\s*monthly/i.test(text)) return 'Flexible monthly';
  if (/quarterly\s*rolling/i.test(text)) return 'Quarterly (Jan/Apr/Jul/Oct)';
  if (/every\s*2\s*months/i.test(text) && !/january|february/i.test(text)) {
    return 'Every 2 months (2027)';
  }

  let cleaned = text.split('(')[0].trim();
  const monthMap = {
    January: 'Jan',
    February: 'Feb',
    March: 'Mar',
    April: 'Apr',
    May: 'May',
    June: 'Jun',
    July: 'Jul',
    August: 'Aug',
    September: 'Sep',
    October: 'Oct',
    November: 'Nov',
    December: 'Dec'
  };
  Object.entries(monthMap).forEach(([full, short]) => {
    cleaned = cleaned.replace(new RegExp(`\\b${full}\\b`, 'gi'), short);
  });
  cleaned = cleaned.replace(/\s*[-–]\s*2027/g, ' 2027').replace(/\s+/g, ' ').trim();
  if (!/2027|monthly/i.test(cleaned)) {
    cleaned = `${cleaned} 2027`;
  }
  return cleaned;
};

const formatMinimalTableTuition = (raw = '') => {
  const parts = splitIntoCleanLines(raw);
  if (parts.length === 0) return { primary: '—', secondary: '' };

  let diplomaFee = '';
  let level4Fee = '';
  let ugFee = '';
  let pgFee = '';
  let nbcFee = '';

  parts.forEach((p) => {
    const euroMatch = p.match(/€\s?[\d,]+(?:\s*[-–]\s*€\s?[\d,]+)?(?:\/[Yy]r)?/);
    if (!euroMatch) return;
    const amt = euroMatch[0].replace(/\s+/g, '').replace(/,+$/, '');

    if (/nbc|nursing\s*bridging/i.test(p)) {
      nbcFee = `NBC ${amt}`;
    } else if (/level\s*4\s*awards/i.test(p)) {
      level4Fee = `L4 ${amt}`;
    } else if (/ug\s*\/\s*pg\s*diploma/i.test(p)) {
      diplomaFee = amt;
    } else if (/ug\s*diploma/i.test(p)) {
      ugFee = `UG ${amt}`;
    } else if (/pg\s*diploma/i.test(p)) {
      pgFee = `PG ${amt}`;
    } else if (!diplomaFee && /^diploma/i.test(p)) {
      diplomaFee = amt;
    }
  });

  if (ugFee && pgFee) {
    return { primary: ugFee, secondary: pgFee };
  }
  if (diplomaFee && nbcFee) {
    return { primary: diplomaFee, secondary: nbcFee };
  }
  if (diplomaFee) {
    return { primary: diplomaFee, secondary: '' };
  }
  if (level4Fee) {
    return { primary: level4Fee, secondary: '' };
  }

  const allEuros = raw.match(/€\s?[\d,]+(?:\/[Yy]r)?/g) || [];
  return {
    primary: allEuros[0] ? allEuros[0].replace(/\s+/g, '').replace(/,+$/, '') : to2027(parts[0]),
    secondary: ''
  };
};

const formatOwnAppFee = (raw = '') => {
  const clean = to2027(raw).trim();
  if (!clean) return { primary: '—', secondary: '' };
  if (/contact\s*campus/i.test(clean)) {
    const parenMatch = clean.match(/\(([^)]+)\)/);
    return {
      primary: 'Per Campus Terms',
      secondary: parenMatch ? parenMatch[1].trim() : ''
    };
  }
  const lines = splitIntoCleanLines(clean);
  const firstLine = lines[0];
  const parenMatch = firstLine.match(/^([^()]+)\(([^)]+)\)(.*)$/);
  if (parenMatch) {
    return {
      primary: parenMatch[1].trim(),
      secondary: parenMatch[2].trim()
    };
  }
  return {
    primary: firstLine,
    secondary: lines[1] || ''
  };
};

const formatCompactInterview = (raw = '') => {
  const text = to2027(raw);
  if (!text) return { label: '—', tone: 'amber' };
  if (/direct\s*admission/i.test(text)) return { label: 'None (direct admission)', tone: 'green' };
  if (/no\s*interview|not\s*required|none/i.test(text)) return { label: 'None', tone: 'green' };
  if (/basic/i.test(text)) return { label: 'Basic assessment', tone: 'amber' };
  if (/mandatory/i.test(text)) return { label: 'Mandatory', tone: 'amber' };
  if (/admissions\s*interview/i.test(text)) return { label: 'Assessment / Interview', tone: 'amber' };
  if (/required/i.test(text)) return { label: 'Required', tone: 'amber' };
  return { label: text.split('(')[0].trim(), tone: 'amber' };
};

const formatCompactGap = (raw = '') => {
  const text = to2027(raw);
  if (!text) return '—';
  if (/unlimited/i.test(text)) return 'Unlimited';
  if (/2020\s*or\s*later/i.test(text)) return '2020 or later';
  if (/standard\s*academic\s*gap/i.test(text)) return 'Evaluated case-by-case';
  if (/up\s*to\s*(\d+)\s*years/i.test(text)) {
    const m = text.match(/up\s*to\s*(\d+)\s*years/i);
    return `Up to ${m[1]} years`;
  }
  if (/max(?:imum)?\s*(\d+)\s*years/i.test(text)) {
    const m = text.match(/max(?:imum)?\s*(\d+)\s*years/i);
    return `Max ${m[1]} years`;
  }
  return text.split('(')[0].trim();
};

const formatCompactIelts = (raw = '') => {
  const text = to2027(raw);
  if (!text) return '—';
  if (/no\s*mandatory\s*ielts/i.test(text)) return 'No mandatory IELTS';
  if (/ielts\s*optional/i.test(text)) return 'IELTS optional (MOI / 5.0)';
  if (/not\s*mandatory/i.test(text) && /ielts/i.test(text)) return 'IELTS not mandatory';
  if (/no\s*ielts\s*\/?\s*pte|without\s*ielts\s*\/?\s*pte/i.test(text)) return 'No IELTS / PTE';
  if (/moi\s*accepted/i.test(text) && /5\.5|6\.0/i.test(text)) return 'IELTS 5.0–6.0 / MOI';
  if (/5\.5\s*ielts.*moi/i.test(text)) return 'IELTS 5.5 or MOI';
  if (/no\s*ielts|without\s*ielts/i.test(text)) return 'No IELTS';
  return text.split('(')[0].trim();
};

const formatCompactOfferSpeed = (raw = '') => {
  const text = to2027(raw).trim();
  if (!text) return 'Per campus schedule';
  if (/same[-\s]*day/i.test(text)) return 'Same day (express)';
  if (/express\s*48[-\s]*hour/i.test(text)) return '48 hours (express)';
  if (/48\s*hours/i.test(text)) return '48 hours';
  if (/2\s*working\s*days/i.test(text)) return '2 working days';
  if (/2[-\s]*days?/i.test(text)) return '2 days';
  return text.split('|')[0].trim();
};

const formatPayAfterVisaColumn = (inst) => {
  const summary = to2027(inst.highlights?.tuitionFeeSummary || '');
  const appFee = to2027(inst.highlights?.applicationFee || '');

  if (/50%\s*tuition\s*fee\s*payment\s*after\s*offer\s*letter/i.test(appFee)) {
    return '50% after Offer Letter';
  }

  if (!/after\s*visa/i.test(summary)) {
    return 'Before visa / per year';
  }

  const hasDiploma = /diploma/i.test(summary);
  const hasMba = /\bmba\b/i.test(summary);
  const hasMsc = /\bmsc\b|master/i.test(summary);
  const hasBachelor = /b\.?sc|bachelor|\bbba\b/i.test(summary);
  const hasNbc = /\bnbc\b/i.test(summary);

  if (hasNbc && hasDiploma && !hasMba && !hasBachelor) return 'NBC & UG Diploma';
  if (hasBachelor && !hasMba && !hasDiploma) return 'B.Sc. (Honours)';
  if (hasMba && hasBachelor && hasDiploma) return 'Diplomas, BBA & MBA';
  if (hasMba && hasMsc && hasDiploma) return 'Diplomas, MSc & MBA';
  if (hasMba && hasDiploma) return 'Diplomas & MBA';
  if (hasDiploma && hasMsc) return 'Diplomas & Master’s';
  if (hasDiploma) return 'All Diplomas';

  return 'Eligible Programs';
};

const extractDurationBadge = (course, collegeName = '') => {
  const isMba = /\bmba\b/i.test(course?.title || '');
  if (isLaValletteCollege(collegeName) && isMba) {
    return '18 Months';
  }
  if (!course?.keyDetails) return '2027 Intake';
  const dur = course.keyDetails.find((d) =>
    /duration|length|year|month|week/i.test(d.label)
  );
  if (dur) {
    const shortMatch = dur.value.match(/(\d+(?:\.\d+)?\s*(?:Years?|Months?|Weeks?))/i);
    return shortMatch ? shortMatch[1] : dur.value.split('(')[0].trim();
  }
  return 'Full-Time';
};

const extractCourseHeadlineFee = (course) => {
  if (!course?.feeStructure || course.feeStructure.length === 0) return null;
  const main =
    course.feeStructure.find((f) => /tuition|course|total|program/i.test(f.category)) ||
    course.feeStructure[0];
  return main;
};

const parseTuitionSummaryBlocks = (summaryText = '') => {
  const clean = to2027(summaryText);
  const parts = clean
    .split(/\s*(?:\||;|•)\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  const cards = [];
  parts.forEach((part) => {
    let payAfterVisaNote = '';
    const parenMatch = part.match(/\(([^)]*pay[^)]*visa[^)]*)\)/i);
    if (parenMatch) {
      payAfterVisaNote = parenMatch[1].trim();
    }
    const textWithoutVisaParen = part.replace(/\([^)]*pay[^)]*visa[^)]*\)/gi, '').trim();

    const colonIdx = textWithoutVisaParen.indexOf(':');
    const title =
      colonIdx > -1
        ? textWithoutVisaParen.slice(0, colonIdx).trim()
        : 'Program Tuition Fee';
    const breakdown =
      colonIdx > -1
        ? textWithoutVisaParen.slice(colonIdx + 1).trim()
        : textWithoutVisaParen;

    const euroMatch = breakdown.match(/€\s?\d+(?:,\d{3})*(?:\s*[-–to]+\s*€?\s?\d+(?:,\d{3})*)?/i);
    if (euroMatch) {
      const amount = euroMatch[0].replace(/,+$/, '').trim();
      const hasMultiYear = /yr\s*2|6\s*months|year\s*2/i.test(breakdown);

      cards.push({
        label: title,
        amount,
        subBreakdown: hasMultiYear ? breakdown : '',
        payAfterVisaNote
      });
    }
  });

  const formattedLines = parts.map((part) => {
    const parenMatch = part.match(/\(([^)]*pay[^)]*visa[^)]*)\)/i);
    if (parenMatch) {
      const mainPart = part.replace(parenMatch[0], '').trim();
      return { main: mainPart, subNote: `(${parenMatch[1].trim()})` };
    }
    return { main: part, subNote: '' };
  });

  return { fullText: clean, cards, formattedLines };
};

// ==========================================
// 4. COURSE ACCORDION
// ==========================================
const CourseAccordion = ({ course, collegeName, isOpen, onToggle, onApplyCourse }) => {
  const isMbaCourse = /\bmba\b/i.test(course?.title || '');
  const displayTitle = formatCourseTitleForCollege(course.title, collegeName);
  const durationBadge = extractDurationBadge(course, collegeName);
  const headlineFee = extractCourseHeadlineFee(course);

  const fmt = (val) => formatLaValletteMbaText(val, collegeName, isMbaCourse);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white print:border-slate-300 print:shadow-none print:mb-6 ${
        isOpen
          ? 'border-[#0f2547] shadow-xl shadow-[#0f2547]/10'
          : 'border-slate-200 hover:border-slate-300 shadow-xs'
      }`}
    >
      <div
        onClick={onToggle}
        className="w-full px-5 py-4 md:px-7 md:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-start gap-3.5 pr-2">
          <button
            type="button"
            className={`mt-1 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors print:hidden ${
              isOpen
                ? 'bg-[#0f2547] text-white'
                : 'bg-slate-100 text-[#0f2547] hover:bg-red-50 hover:text-red-600'
            }`}
          >
            {isOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </button>
          <div>
            <h4 className="font-extrabold text-[#0f2547] text-base md:text-xl leading-snug">
              {displayTitle}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-0.5 rounded-full">
                ★ 2027 Intake Open
              </span>
              {headlineFee && (
                <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-0.5 rounded-full">
                  Fee: {fmt(headlineFee.amount)}
                </span>
              )}
              <span className="text-[11px] font-semibold text-slate-400 print:hidden">
                {isOpen ? 'Click to collapse details' : 'Click to view full fee, modules & career salaries'}
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 self-end sm:self-center shrink-0 print:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="bg-slate-100 text-[#0f2547] font-extrabold text-xs md:text-sm px-3.5 py-2 rounded-xl border border-slate-200">
            {durationBadge}
          </span>
          <button
            type="button"
            onClick={() => onApplyCourse(displayTitle)}
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs md:text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            Apply <FaArrowRight size={11} />
          </button>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden print:block'}`}>
        <div className="p-6 md:p-8 space-y-8 border-t border-slate-200 bg-[#f8fafc]/70 print:bg-white">

          {/* 1. COURSE OVERVIEW + HIGHLIGHT FEE BANNER */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            {course.overview && (
              <div className="xl:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-center">
                <h5 className="font-extrabold text-[#0f2547] mb-2.5 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <FaGraduationCap className="text-red-600" size={18} /> Course Overview
                </h5>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                  {fmt(course.overview)}
                </p>
              </div>
            )}

            <div className={`${course.overview ? 'xl:col-span-4' : 'xl:col-span-12'} bg-[#0f2547] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between gap-4`}>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-400 block">
                  2027 International Student Fee
                </span>
                {headlineFee ? (
                  <div className="mt-2 space-y-1.5">
                    {splitIntoCleanLines(fmt(headlineFee.amount)).map((line, i) => (
                      <div key={i} className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                        {line}
                      </div>
                    ))}
                    <p className="text-xs text-blue-100/85 pt-1 leading-relaxed">
                      {fmt(headlineFee.category)} — {fmt(headlineFee.notes)}
                    </p>
                  </div>
                ) : (
                  <div className="text-2xl font-black text-white mt-2">
                    Pay Tuition After Visa Approval
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => onApplyCourse(displayTitle)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs md:text-sm uppercase tracking-wider py-3.5 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer print:hidden"
              >
                Apply For This Program <FaArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* 2. FULL-WIDTH KEY PROGRAM SPECIFICATIONS */}
          {course.keyDetails && course.keyDetails.length > 0 && (
            <div className="w-full bg-[#eff6ff] p-6 md:p-8 rounded-3xl border-2 border-blue-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b border-blue-200/80">
                <h5 className="font-black text-[#0f2547] text-base md:text-lg uppercase tracking-wider flex items-center gap-2">
                  <FaClipboardCheck className="text-red-600" /> Key Program Specifications & Fee Summary
                </h5>
                <span className="text-xs font-bold text-blue-800 bg-white px-3 py-1 rounded-full border border-blue-200">
                  Easy-to-Read 2027 Breakdown
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {course.keyDetails.map((detail, idx) => {
                  const isFeeField = /fee|tuition|cost|price|scholarship/i.test(detail.label);
                  const lines = splitIntoCleanLines(fmt(detail.value));

                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isFeeField
                          ? 'bg-gradient-to-br from-red-600 to-[#b91c1c] text-white border-red-700 shadow-md md:col-span-2 lg:col-span-1'
                          : 'bg-white border-blue-100 shadow-2xs'
                      }`}
                    >
                      <span
                        className={`block text-xs font-extrabold uppercase tracking-wider mb-2 ${
                          isFeeField ? 'text-red-100' : 'text-blue-700'
                        }`}
                      >
                        {fmt(detail.label)}
                      </span>

                      <div className="space-y-1.5">
                        {lines.map((line, lIdx) => (
                          <div
                            key={lIdx}
                            className={`${
                              isFeeField
                                ? 'text-lg md:text-xl font-black text-white bg-black/15 px-3 py-1.5 rounded-xl'
                                : 'text-base md:text-[17px] font-extrabold text-[#0f2547]'
                            } leading-snug`}
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. COMPLETE FEE STRUCTURE & ADDITIONAL COSTS */}
          {course.feeStructure && course.feeStructure.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-2xs">
              <h5 className="font-extrabold text-[#0f2547] mb-5 flex items-center gap-2 text-base md:text-lg">
                <FaEuroSign className="text-red-600" /> Complete Fee Structure & Step-by-Step Costs (2027)
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {course.feeStructure.map((fee, idx) => {
                  const amountLines = splitIntoCleanLines(fmt(fee.amount));
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200/90 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                          {fmt(fee.category)}
                        </span>
                        <div className="mt-2 space-y-1">
                          {amountLines.map((amt, aIdx) => (
                            <span
                              key={aIdx}
                              className="text-2xl md:text-3xl font-black text-red-600 block leading-tight"
                            >
                              {amt}
                            </span>
                          ))}
                        </div>
                      </div>
                      {fee.notes && (
                        <p className="text-xs md:text-sm font-medium text-slate-600 mt-3 pt-3 border-t border-slate-200 leading-relaxed">
                          {fmt(fee.notes)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-sm md:text-base text-left">
                  <thead className="bg-[#0f2547] text-white text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4 font-bold">Fee Category</th>
                      <th className="p-4 font-bold">Amount (EUR)</th>
                      <th className="p-4 font-bold">Payment Stage / Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.feeStructure.map((fee, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-200 last:border-0 hover:bg-slate-50"
                      >
                        <td className="p-4 font-extrabold text-[#0f2547]">{fmt(fee.category)}</td>
                        <td className="p-4 font-black text-red-600 text-base">
                          {splitIntoCleanLines(fmt(fee.amount)).map((line, lIdx) => (
                            <div key={lIdx}>{line}</div>
                          ))}
                        </td>
                        <td className="p-4 text-slate-700 font-medium leading-relaxed">
                          {fmt(fee.notes)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. ENTRY REQUIREMENTS */}
          {course.entryRequirements && course.entryRequirements.length > 0 && (
            <div className="bg-white p-6 md:p-7 rounded-2xl border border-slate-200">
              <h5 className="font-extrabold text-[#0f2547] mb-4 flex items-center gap-2 text-base md:text-lg">
                <FaUserCheck className="text-red-600" /> Entry Requirements & Eligibility Streams
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {course.entryRequirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-sm md:text-base text-slate-800 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200"
                  >
                    <FaCheckCircle className="text-emerald-600 mt-1 shrink-0" size={16} />
                    <span className="leading-relaxed font-semibold">{fmt(req)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. CORE CURRICULUM & MODULES */}
          {course.modules && course.modules.length > 0 && (
            <div className="bg-white p-6 md:p-7 rounded-2xl border border-slate-200">
              <h5 className="font-extrabold text-[#0f2547] mb-4 text-base md:text-lg">
                Core Curriculum & Modules ({course.modules.length})
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {course.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 text-sm md:text-base text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200/80"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#0f2547] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-semibold">{fmt(mod)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. LEARNING OUTCOMES */}
          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <div className="bg-white p-6 md:p-7 rounded-2xl border border-slate-200">
              <h5 className="font-extrabold text-[#0f2547] mb-4 flex items-center gap-2 text-base md:text-lg">
                <FaLightbulb className="text-red-600" /> What You Will Learn & Core Competencies
              </h5>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {course.learningOutcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-sm md:text-base text-slate-700 leading-relaxed flex items-start gap-2.5 font-medium"
                  >
                    <span className="text-red-600 font-extrabold">✦</span>
                    <span>{fmt(outcome)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 7. ASSESSMENT & GRADING */}
          {(course.assessmentSummary || (course.grading && course.grading.length > 0)) && (
            <div className="bg-white p-6 md:p-7 rounded-2xl border border-slate-200">
              <h5 className="font-extrabold text-[#0f2547] mb-3 flex items-center gap-2 text-base md:text-lg">
                <FaClipboardCheck className="text-red-600" /> Assessment & Grading Framework
              </h5>
              {course.assessmentSummary && (
                <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                  {fmt(course.assessmentSummary)}
                </p>
              )}
              {course.grading && course.grading.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm md:text-base text-left">
                    <thead className="bg-slate-100 text-[#0f2547] text-xs uppercase">
                      <tr>
                        <th className="p-4 font-extrabold border-b border-slate-200">Grade / Stage</th>
                        <th className="p-4 font-extrabold border-b border-slate-200">Range / Strategy</th>
                        <th className="p-4 font-extrabold border-b border-slate-200">Description / Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.grading.map((g, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                          <td className="p-4 font-bold text-[#0f2547]">{fmt(g.grade)}</td>
                          <td className="p-4 text-slate-800 font-semibold">{fmt(g.range)}</td>
                          <td className="p-4 text-slate-600">{fmt(g.description)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 8. TARGET INDUSTRIES */}
          {course.targetIndustries && course.targetIndustries.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h5 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 mb-3">
                Target Industries & Sectors
              </h5>
              <div className="flex flex-wrap gap-2.5">
                {course.targetIndustries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="bg-[#0f2547]/5 text-[#0f2547] border border-[#0f2547]/15 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full"
                  >
                    {fmt(ind)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 9. CAREER OPPORTUNITIES & SCHENGEN SALARIES */}
          {course.careers && course.careers.length > 0 && (
            <div className="bg-white p-6 md:p-7 rounded-2xl border border-slate-200">
              <h5 className="font-extrabold text-[#0f2547] mb-4 flex items-center gap-2 text-base md:text-lg">
                <FaBriefcase className="text-red-600" /> Career Opportunities & Expected Schengen Salaries
              </h5>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm md:text-base text-left">
                  <thead className="bg-slate-100 text-[#0f2547] text-xs uppercase">
                    <tr>
                      <th className="p-4 font-extrabold border-b border-slate-200">Profession / Role</th>
                      <th className="p-4 font-extrabold border-b border-slate-200">Target Sector / Focus</th>
                      <th className="p-4 font-extrabold border-b border-slate-200">Starting Salary (p.a.)</th>
                      <th className="p-4 font-extrabold border-b border-slate-200">Mid / Senior Salary (p.a.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.careers.map((career, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="p-4 font-extrabold text-[#0f2547]">{fmt(career.role)}</td>
                        <td className="p-4 text-slate-600">{fmt(career.sector || '-')}</td>
                        <td className="p-4 font-black text-emerald-700">
                          {fmt(career.startSalary || career.salary)}
                        </td>
                        <td className="p-4 font-bold text-[#0f2547]">
                          {fmt(career.midSalary || '-')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {course.note && (
                <p className="text-xs md:text-sm text-slate-500 italic mt-3">
                  Note: {fmt(course.note)}
                </p>
              )}
            </div>
          )}

          {/* 10. KEY ACADEMIC, FINANCIAL & PROGRESSION HIGHLIGHTS */}
          {course.benefits && course.benefits.length > 0 && (
            <div className="bg-[#0f2547] text-white p-6 md:p-7 rounded-2xl space-y-3.5 shadow-md">
              <h5 className="font-extrabold text-red-400 flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest">
                <FaStar /> Key Academic, Financial & Progression Highlights
              </h5>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.benefits.map((b, idx) => (
                  <li key={idx} className="text-sm md:text-base text-blue-100 flex items-start gap-2.5">
                    <FaCheckCircle className="text-red-400 mt-1 shrink-0" size={14} />
                    <span className="leading-relaxed">{fmt(b)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 11. MANDATORY DISCLAIMER NOTE */}
          <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 md:p-5 flex items-start gap-3.5 text-xs md:text-[13px] text-amber-950 leading-relaxed">
            <FaInfoCircle className="text-amber-600 mt-0.5 shrink-0" size={17} />
            <div>
              <strong className="font-extrabold uppercase tracking-wider text-amber-900 block mb-0.5">
                Important Information & Source Disclaimer:
              </strong>
              The curriculum modules, tuition fee figures, and expected Schengen salary ranges displayed above are compiled from publicly available online sources, Google research, and institutional brochures for general reference only. Figures are indicative and not exact guarantees. Students and parents are strongly advised to independently research, verify current details directly on the official college website, and confirm the final 2027 offer letter terms before making any financial decision. <strong className="font-bold">The Raptor Academics</strong> holds no liability for third-party institutional updates or market salary variations.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. ORIGINAL RAPTOR ACADEMICS APPLY MODAL
// ==========================================
const ApplyNowModal = ({ isOpen, onClose, initialCollegeName, initialProgramName }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    mobile: '',
    email: '',
    country: 'India',
    address: '',
    institute: initialCollegeName || institutionsData[0]?.name || '',
    program: initialProgramName || '',
    branch: 'Jaipur Head Office (Mansarovar)',
    has10th: 'Yes',
    has12th: 'Yes',
    hasGraduation: 'No',
    hasPassport: 'Yes',
    notes: '',
    consent: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const matchedCollege =
        institutionsData.find((c) => c.name === initialCollegeName) || institutionsData[0];
      const firstProgFormatted = matchedCollege?.courses?.[0]
        ? formatCourseTitleForCollege(matchedCollege.courses[0].title, matchedCollege.name)
        : 'General 2027 Intake';
      const defaultProg = initialProgramName || firstProgFormatted;
      setFormData((prev) => ({
        ...prev,
        institute: matchedCollege?.name || '',
        program: defaultProg
      }));
      setSubmitted(false);
      setIsSubmitting(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialCollegeName, initialProgramName]);

  const selectedCollegeObj = useMemo(() => {
    return (
      institutionsData.find((c) => c.name === formData.institute) || institutionsData[0]
    );
  }, [formData.institute]);

  const selectedCollegeIndex = useMemo(() => {
    return Math.max(
      0,
      institutionsData.findIndex((c) => c.id === selectedCollegeObj?.id)
    );
  }, [selectedCollegeObj]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error('Application API Error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const docChecklistQuestions = [
    { key: 'has10th', label: 'Do you have 10th Pass Marksheet?' },
    { key: 'has12th', label: 'Do you have 12th Pass Marksheet?' },
    { key: 'hasGraduation', label: 'Do you have Graduation / Diploma?' },
    { key: 'hasPassport', label: 'Do you have a valid Passport?' }
  ];

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 bg-[#071122]/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto print:hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200/80 my-auto max-h-[92vh] grid grid-cols-1 lg:grid-cols-12"
      >
        <div className="lg:col-span-4 bg-gradient-to-b from-[#0b1930] via-[#0f2547] to-[#16315c] text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between lg:justify-start gap-2">
              <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                2027 Malta Admissions
              </span>
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center cursor-pointer"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-black leading-tight">
                Quick Profile <span className="text-red-400">Assessment</span>
              </h3>
              <p className="text-blue-100/80 text-xs leading-relaxed mt-2">
                No document upload needed right now. Just share your basic details and document readiness—our Jaipur counselors will contact you within 24 hours.
              </p>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 space-y-2.5 backdrop-blur-xs">
              <div className="h-24 rounded-xl overflow-hidden">
                <img
                  src={getCollegeImage(selectedCollegeObj, selectedCollegeIndex)}
                  alt={selectedCollegeObj?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-300 block">
                  Selected Institution
                </span>
                <p className="text-sm font-extrabold text-white leading-snug line-clamp-2">
                  {selectedCollegeObj?.name.split('–')[0]}
                </p>
                <p className="text-[11px] text-blue-200/80 mt-0.5">
                  📍 {selectedCollegeObj?.location}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block pt-6 border-t border-white/15 space-y-2 text-xs text-blue-100/85 relative z-10">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>24–48 Hr Conditional Offer Letter</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Pay Main Tuition After Visa Approval</span>
            </div>
            <p className="text-[11px] text-blue-200/60 pt-2">
              The Raptor Academics • Mansarovar, Jaipur
            </p>
          </div>
        </div>

        <div
          data-lenis-prevent="true"
          className="lg:col-span-8 overflow-y-auto overscroll-contain max-h-[92vh] flex flex-col bg-white"
        >
          <div className="px-6 py-4 md:px-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-20">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#0f2547]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>THE RAPTOR ACADEMICS • APPLICATION DESK</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="hidden lg:flex w-8 h-8 rounded-full bg-slate-100 hover:bg-red-600 text-slate-600 hover:text-white items-center justify-center transition-colors cursor-pointer"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 md:p-12 text-center space-y-5 my-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <FaCheckCircle size={34} />
              </div>
              <h4 className="text-2xl font-black text-[#0f2547]">
                Application Request Received!
              </h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.firstName}</strong>! Our Malta specialist in Jaipur has received your 2027 inquiry for{' '}
                <strong className="text-[#0f2547]">{formData.program}</strong> at{' '}
                <strong className="text-red-600">{formData.institute.split('–')[0]}</strong>.
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto text-xs text-slate-600 space-y-1">
                <p className="font-bold text-[#0f2547]">Direct Helpline & WhatsApp</p>
                <p>(+91) 72320 10105 • theraptoracademics@gmail.com</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#0f2547] hover:bg-red-600 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-7">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#0f2547] text-white text-xs font-black flex items-center justify-center">
                    01
                  </span>
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#0f2547]">
                    Personal & Contact Details
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      First name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Enter first name"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Last name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Enter last name"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Mobile / WhatsApp <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Email ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Gender <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      City / State <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. Jaipur, Rajasthan"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#0f2547] text-white text-xs font-black flex items-center justify-center">
                    02
                  </span>
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#0f2547]">
                    Institution & Program Selection (2027)
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Preferred Institution <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.institute}
                      onChange={(e) => {
                        const newInst = e.target.value;
                        const found = institutionsData.find((c) => c.name === newInst);
                        const firstTitle = found?.courses?.[0]
                          ? formatCourseTitleForCollege(found.courses[0].title, found.name)
                          : '';
                        setFormData({
                          ...formData,
                          institute: newInst,
                          program: firstTitle
                        });
                      }}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none font-bold text-[#0f2547]"
                    >
                      {institutionsData.map((inst) => (
                        <option key={inst.id} value={inst.name}>
                          {inst.name.split('–')[0]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Preferred Program <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none font-bold text-[#0f2547]"
                    >
                      {selectedCollegeObj?.courses?.map((c, idx) => {
                        const formattedProgTitle = formatCourseTitleForCollege(
                          c.title,
                          selectedCollegeObj.name
                        );
                        return (
                          <option key={idx} value={formattedProgTitle}>
                            {formattedProgTitle} • {extractDurationBadge(c, selectedCollegeObj.name)}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Counselling Preference <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none"
                    >
                      <option value="Jaipur Head Office (Mansarovar)">
                        Visit Jaipur Office (120/64, New Sanganer Rd, Mansarovar)
                      </option>
                      <option value="Online Video Counseling">
                        Online Video / Phone Counselling (Pan-India)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 bg-slate-50/90 p-5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white text-xs font-black flex items-center justify-center">
                      03
                    </span>
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#0f2547]">
                      Document Availability
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                    Optional • No Upload Needed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {docChecklistQuestions.map((item) => {
                    const currentVal = formData[item.key];
                    return (
                      <div
                        key={item.key}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/90 flex items-center justify-between gap-3"
                      >
                        <span className="text-xs font-bold text-[#0f2547] leading-snug">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {['Yes', 'No'].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, [item.key]: option })
                              }
                              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                                currentVal === option
                                  ? option === 'Yes'
                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                    : 'bg-slate-700 text-white shadow-2xs'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span>
                    I authorize <strong className="text-[#0f2547]">The Raptor Academics</strong> to contact me regarding 2027 admissions.
                  </span>
                </label>

                <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-600 hover:bg-[#0f2547] disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/20 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'} <FaArrowRight size={11} />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// 6. MAIN INSTITUTIONS DIRECTORY PAGE
// ==========================================
const Institutions = () => {
  const getInitialCollegeFromUrl = () => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashSlug = window.location.hash.replace('#', '').toLowerCase();
      const matched = institutionsData.find((c) => {
        const fullSlug = getCollegeSlug(c);
        return fullSlug === hashSlug || fullSlug.includes(hashSlug) || hashSlug.includes(fullSlug);
      });
      if (matched) return matched;
    }
    return institutionsData[0];
  };

  const [activeCollege, setActiveCollege] = useState(getInitialCollegeFromUrl);
  const [openCourseIndex, setOpenCourseIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [copiedLink, setCopiedLink] = useState(false);

  const [modalState, setModalState] = useState({
    isOpen: false,
    collegeName: '',
    programName: ''
  });

  useEffect(() => {
    const onHashChange = () => {
      const hashSlug = window.location.hash.replace('#', '').toLowerCase();
      if (!hashSlug) return;
      const matched = institutionsData.find((c) => {
        const fullSlug = getCollegeSlug(c);
        return fullSlug === hashSlug || fullSlug.includes(hashSlug) || hashSlug.includes(fullSlug);
      });
      if (matched) {
        setActiveCollege(matched);
        setOpenCourseIndex(null);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const totalProgramsCount = useMemo(() => {
    return institutionsData.reduce((acc, inst) => acc + (inst.courses?.length || 0), 0);
  }, []);

  const filterCategories = [
    'All',
    'Nursing & Healthcare',
    'Business & MBA',
    'Hospitality & Tourism',
    'IT, AI & Digital',
    'No Interview',
    'Unlimited Gap'
  ];

  const filteredColleges = useMemo(() => {
    return institutionsData.filter((college) => {
      const courseText = (college.courses || [])
        .map((c) => `${c.title} ${c.overview || ''}`)
        .join(' ');
      const haystack = `${college.name} ${college.seoCategory || ''} ${college.about} ${
        college.flagshipCourses || ''
      } ${college.highlights?.interview || ''} ${
        college.highlights?.gap || ''
      } ${courseText}`.toLowerCase();

      const matchesSearch =
        !searchQuery.trim() || haystack.includes(searchQuery.toLowerCase().trim());

      let matchesPill = true;
      if (selectedFilter === 'Nursing & Healthcare') {
        matchesPill = /nursing|health|care|medical|clinic/i.test(haystack);
      } else if (selectedFilter === 'Business & MBA') {
        matchesPill = /business|mba|management|dba|finance|accounting|hr|human resource|leadership/i.test(
          haystack
        );
      } else if (selectedFilter === 'Hospitality & Tourism') {
        matchesPill = /hospitality|tourism|culinary|hotel|food|event/i.test(haystack);
      } else if (selectedFilter === 'IT, AI & Digital') {
        matchesPill = /it\b|information technology|artificial intelligence|\bai\b|cyber|computer|digital|data|software|coding/i.test(
          haystack
        );
      } else if (selectedFilter === 'No Interview') {
        matchesPill = /no\s*interview|none|direct|basic|waived/i.test(
          `${college.highlights?.interview || ''} ${college.about}`
        );
      } else if (selectedFilter === 'Unlimited Gap') {
        matchesPill = /unlimited|accepted|10\s*years|15\s*years|any\s*gap|flexible/i.test(
          `${college.highlights?.gap || ''} ${college.about}`
        );
      }

      return matchesSearch && matchesPill;
    });
  }, [searchQuery, selectedFilter]);

  useEffect(() => {
    if (
      filteredColleges.length > 0 &&
      !filteredColleges.some((c) => c.id === activeCollege.id)
    ) {
      const first = filteredColleges[0];
      setActiveCollege(first);
      setOpenCourseIndex(null);
      window.history.replaceState(null, '', `#${getCollegeSlug(first)}`);
    }
  }, [filteredColleges, activeCollege.id]);

  const handleFilterClick = (cat) => {
    setSelectedFilter(cat);
    setOpenCourseIndex(null);
  };

  const handleCollegeChange = (college) => {
    setActiveCollege(college);
    setOpenCourseIndex(null);
    const slug = getCollegeSlug(college);
    window.history.replaceState(null, '', `#${slug}`);
    const el = document.getElementById('institution-detail-panel');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const openApplyModal = (collegeName, programName = '') => {
    setModalState({
      isOpen: true,
      collegeName: collegeName || activeCollege.name,
      programName
    });
  };

  const handleCopyLink = () => {
    const slug = getCollegeSlug(activeCollege);
    const shareUrl = `${window.location.origin}${window.location.pathname}#${slug}`;
    window.history.replaceState(null, '', `#${slug}`);
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrintInstitution = () => {
    window.print();
  };

  const tuitionParsed = useMemo(() => {
    return parseTuitionSummaryBlocks(activeCollege?.highlights?.tuitionFeeSummary || '');
  }, [activeCollege]);

  const activeCollegeIndex = useMemo(() => {
    return Math.max(
      0,
      institutionsData.findIndex((c) => c.id === activeCollege.id)
    );
  }, [activeCollege]);

  const activeCampusImage = getCollegeImage(activeCollege, activeCollegeIndex);
  const activeUniversityLogo = getCollegeLogo(activeCollege, activeCollegeIndex);

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      {/* WRAPPER TABLE FOR CLEAN MULTI-PAGE PRINT HEADER & BOTTOM-PINNED FOOTER */}
      <table className="w-full border-collapse block print:table">
        {/* REPEATING OFFICIAL PRINT-ONLY LETTERHEAD HEADER */}
        <thead className="hidden print:table-header-group">
          <tr>
            <td>
              <div className="border-b-2 border-[#0f2547] pb-4 mb-6 pt-1">
                <div className="flex items-center justify-between gap-8">
                  <div className="shrink-0">
                    <img
                      src={logo}
                      alt="The Raptor Academics"
                      className="h-14 w-auto object-contain"
                    />
                  </div>

                  <div className="text-right space-y-0.5">
                    <span className="inline-block bg-red-50 text-red-600 border border-red-200 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      Official 2027 Institution &amp; Fee Prospectus
                    </span>
                    <p className="text-[11px] font-extrabold text-[#0f2547] pt-0.5">
                      (+91) 72320 10105 &nbsp;|&nbsp; theraptoracademics@gmail.com
                    </p>
                    <p className="text-[10px] font-medium text-slate-600">
                      120/64, New Sanganer Rd, Sector 12, Mansarovar, Jaipur, Rajasthan 302020
                    </p>
                    <p className="text-[10px] font-bold text-[#0f2547]">
                      www.theraptoracademics.com
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </thead>

        {/* MAIN PAGE CONTENT (SCREEN + PRINT) */}
        <tbody className="block print:table-row-group">
          <tr className="block print:table-row">
            <td className="block print:table-cell">
              {/* 1. ORIGINAL RAPTOR ACADEMICS SPLIT EDITORIAL HERO */}
              <section className="relative pt-36 pb-24 md:pt-44 md:pb-28 bg-[#0b1930] text-white overflow-hidden px-4 md:px-10 print:hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1930] via-[#0f2547]/95 to-[#0b1930]/90 pointer-events-none" />
                <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-[1560px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-7 space-y-5"
                  >
                    <div className="inline-flex items-center gap-2.5 bg-red-600/20 border border-red-500/40 px-4 py-1.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-red-300 font-extrabold uppercase tracking-widest text-xs">
                        Official Partner Network • 2027 Admissions Open
                      </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
                      Explore Accredited <br />
                      <span className="text-red-500">Colleges & Universities</span> In Malta
                    </h1>

                    <p className="text-blue-100/85 text-base md:text-lg leading-relaxed max-w-2xl">
                      Discover {institutionsData.length} government-licensed higher education institutions offering {totalProgramsCount}+ career-focused Diplomas, Bachelor’s, and Master’s degrees. Enjoy 24–48 hour offer letters without IELTS and pay your main tuition fee after visa approval.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => openApplyModal(activeCollege.name)}
                        className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs md:text-sm px-7 py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        Start 2027 Application <FaArrowRight size={12} />
                      </button>
                      <a
                        href="#quick-comparison-matrix"
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs md:text-sm px-6 py-4 rounded-xl transition-all"
                      >
                        Jump to Side-by-Side Matrix
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="lg:col-span-5"
                  >
                    <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
                      <div className="flex items-center justify-between border-b border-white/15 pb-4">
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-400 block">
                            The Raptor Academics Advantage
                          </span>
                          <h3 className="text-xl font-black text-white mt-0.5">
                            2027 Malta Intake Snapshot
                          </h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg">
                          <FaUniversity size={22} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0b1930]/70 border border-white/10 rounded-2xl p-4">
                          <span className="text-2xl md:text-3xl font-black text-white block">
                            {institutionsData.length} Colleges
                          </span>
                          <span className="text-xs text-blue-200/80 font-medium mt-1 block">
                            MFHEA & Qualifi / OTHM Accredited
                          </span>
                        </div>
                        <div className="bg-[#0b1930]/70 border border-white/10 rounded-2xl p-4">
                          <span className="text-2xl md:text-3xl font-black text-red-400 block">
                            {totalProgramsCount}+ Courses
                          </span>
                          <span className="text-xs text-blue-200/80 font-medium mt-1 block">
                            MQF Level 4, 5, 6 & 7 Programs
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2.5 text-xs md:text-sm text-blue-100 font-semibold">
                        <div className="flex items-center gap-2.5">
                          <FaCheckCircle className="text-emerald-400 shrink-0" />
                          <span>Pay Main Course Tuition Fee AFTER Visa Approval</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <FaCheckCircle className="text-emerald-400 shrink-0" />
                          <span>Up to 70% Tuition Refund via Malta 'Get Qualified' Scheme</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <FaCheckCircle className="text-emerald-400 shrink-0" />
                          <span>10th / 12th Pass & Study Gaps Accepted Without IELTS</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* 2. SEARCH & FILTER BAR */}
              <section className="max-w-[1560px] mx-auto px-4 md:px-10 -mt-12 relative z-20 print:hidden">
                <div className="bg-white rounded-3xl p-5 md:p-7 shadow-xl shadow-slate-900/5 border border-slate-200/90 space-y-5">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by course, city, or institution — e.g. Nursing, MBA, Hospitality, No Interview, Birkirkara..."
                      className="w-full pl-11 pr-28 py-3.5 md:py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm md:text-base text-[#0f2547] font-medium focus:bg-white focus:border-[#0f2547] focus:outline-none transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-red-600 px-3 py-1.5 rounded-lg bg-slate-200/70 cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
                        Filter By Stream:
                      </span>
                      {filterCategories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleFilterClick(cat)}
                          className={`text-xs font-bold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                            selectedFilter === cat
                              ? 'bg-[#0f2547] text-white border-[#0f2547] shadow-sm scale-[1.02]'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-600'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-slate-500">
                      Showing {filteredColleges.length} of {institutionsData.length} institutions
                    </span>
                  </div>
                </div>
              </section>

              {/* 3. MAIN WIDE SPLIT DIRECTORY LAYOUT */}
              <section
                id="institution-detail-panel"
                className="max-w-[1560px] mx-auto px-4 md:px-10 py-10 flex flex-col lg:flex-row gap-8 items-start print:p-0 print:block"
              >
                {/* Left Sticky Sidebar */}
                <div
                  data-lenis-prevent="true"
                  className="w-full lg:w-[27%] lg:sticky lg:top-28 space-y-2.5 max-h-[82vh] overflow-y-auto overscroll-contain pr-1.5 print:hidden"
                >
                  {filteredColleges.length === 0 ? (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
                      <p className="text-sm font-bold text-[#0f2547]">
                        No institutions match "{searchQuery || selectedFilter}"
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedFilter('All');
                        }}
                        className="text-xs font-extrabold text-red-600 underline cursor-pointer"
                      >
                        Reset all filters
                      </button>
                    </div>
                  ) : (
                    filteredColleges.map((college, index) => {
                      const isSelected = activeCollege.id === college.id;
                      const shortName = college.name.split('–')[0].trim();
                      return (
                        <button
                          key={college.id}
                          type="button"
                          onClick={() => handleCollegeChange(college)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3.5 cursor-pointer ${
                            isSelected
                              ? 'bg-white border-2 border-[#0f2547] shadow-lg shadow-[#0f2547]/10'
                              : 'bg-white/90 border-slate-200/90 hover:bg-white hover:border-slate-300'
                          }`}
                        >
                          <span
                            className={`w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#0f2547] text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {index + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`font-extrabold text-sm leading-snug truncate ${
                                isSelected ? 'text-[#0f2547]' : 'text-slate-800'
                              }`}
                            >
                              {shortName}
                            </p>
                            <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                              {college.location} • {college.courses?.length || 0} Programs
                            </p>
                          </div>
                          <FaChevronRight
                            size={11}
                            className={`shrink-0 transition-transform ${
                              isSelected ? 'text-red-600 translate-x-0.5' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Right Detailed Institution View */}
                <div className="w-full lg:w-[73%] print:w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCollege.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/90 overflow-hidden print:shadow-none print:border-0"
                    >
                      {/* INSTITUTION HERO HEADER */}
                      <div className="relative p-6 md:p-10 border-b border-slate-200 overflow-hidden print:p-0 print:pb-6">
                        {/* Screen-only background campus watermark */}
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-[0.10] pointer-events-none scale-105 print:hidden"
                          style={{ backgroundImage: `url(${activeCampusImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/75 pointer-events-none print:hidden" />

                        <div className="relative z-10 space-y-6">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            {activeCollege.seoCategory ? (
                              <span className="inline-block text-xs font-extrabold text-red-600 uppercase tracking-widest bg-red-50/90 border border-red-100 px-3.5 py-1.5 rounded-full">
                                {to2027(activeCollege.seoCategory)}
                              </span>
                            ) : <div />}

                            <div className="flex flex-wrap items-center gap-2.5 print:hidden">
                              <button
                                type="button"
                                onClick={() => openApplyModal(activeCollege.name)}
                                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl shadow-md shadow-red-600/20 transition-all cursor-pointer flex items-center gap-2"
                              >
                                Apply <FaArrowRight size={11} />
                              </button>
                              <button
                                type="button"
                                onClick={handleCopyLink}
                                className="bg-white/90 hover:bg-slate-100 text-slate-700 font-bold text-xs px-4 py-3 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <FaCopy size={12} />{' '}
                                {copiedLink
                                  ? `Copied #${getCollegeSlug(activeCollege)}!`
                                  : 'Copy link'}
                              </button>
                              <button
                                type="button"
                                onClick={handlePrintInstitution}
                                className="bg-white/90 hover:bg-slate-100 text-slate-700 font-bold text-xs px-4 py-3 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <FaPrint size={12} /> Print
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center print:flex print:items-center print:justify-between print:gap-6">
                            <div className="xl:col-span-7 space-y-4 print:flex-1">
                              <h2 className="text-2xl md:text-4xl font-black text-[#0f2547] leading-tight print:text-2xl">
                                {to2027(activeCollege.name)}
                              </h2>

                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3.5 py-1.5 rounded-full text-xs font-bold border border-slate-200">
                                  <FaMapMarkerAlt className="text-red-600" size={12} />{' '}
                                  {to2027(activeCollege.location)}
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-extrabold">
                                  <FaAward size={12} /> {extractLicense(activeCollege.accreditation)}
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0f2547] border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-extrabold">
                                  2027 Intakes Open
                                </span>
                              </div>

                              <p className="text-xs md:text-sm font-semibold text-slate-600 leading-relaxed">
                                <strong className="text-[#0f2547]">Accreditation:</strong>{' '}
                                {to2027(activeCollege.accreditation)}
                              </p>
                            </div>

                            {/* Screen-Only Campus Photo Card */}
                            <div className="xl:col-span-5 print:hidden">
                              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white group">
                                <img
                                  src={activeCampusImage}
                                  alt={activeCollege.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2547]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                                  <span className="text-xs font-extrabold bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full">
                                    📍 {activeCollege.location}
                                  </span>
                                  <span className="text-[11px] font-extrabold bg-red-600 px-2.5 py-1 rounded-full">
                                    2027 Partner
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Print-Only University Logo Badge (Replaces Campus Pic on Print) */}
                            <div className="hidden print:flex items-center justify-center bg-white border-2 border-slate-200 rounded-2xl p-3 w-36 h-24 shrink-0">
                              <img
                                src={activeUniversityLogo}
                                alt={`${activeCollege.name} Logo`}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* MAIN INSTITUTION CONTENT BODY */}
                      <div className="p-6 md:p-10 space-y-10 print:p-0 print:pt-6">
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0f2547] mb-2.5">
                            About The Institution
                          </h3>
                          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                            {to2027(activeCollege.about)}
                          </p>

                          {activeCollege.flagshipCourses && (
                            <div className="mt-5 bg-red-50/70 border-l-4 border-red-600 p-4 md:p-5 rounded-r-2xl">
                              <span className="text-[11px] font-extrabold text-red-600 uppercase tracking-widest block">
                                Flagship / Popular Courses (2027)
                              </span>
                              <span className="text-sm md:text-base font-extrabold text-[#0f2547] mt-1 block">
                                {to2027(activeCollege.flagshipCourses)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* KEY ADMISSION HIGHLIGHTS */}
                        {activeCollege.highlights && (
                          <div>
                            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0f2547] mb-4">
                              Key Admission Highlights (2027 Intakes)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
                                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                                  Intake (2027)
                                </span>
                                <p className="text-sm md:text-base font-extrabold text-[#0f2547] mt-1.5 leading-snug">
                                  {to2027(activeCollege.highlights.intake)}
                                </p>
                              </div>

                              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
                                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                                  Eligibility & Minimum Age
                                </span>
                                <p className="text-sm md:text-base font-extrabold text-[#0f2547] mt-1.5 leading-snug">
                                  {to2027(activeCollege.highlights.eligibility)}
                                </p>
                              </div>

                              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                                <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                                  Gap Acceptance
                                </span>
                                <p className="text-sm md:text-base font-extrabold text-emerald-950 mt-1.5 leading-snug">
                                  {to2027(activeCollege.highlights.gap)}
                                </p>
                              </div>

                              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                                <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                                  Language Test
                                </span>
                                <p className="text-sm md:text-base font-extrabold text-emerald-950 mt-1.5 leading-snug">
                                  {to2027(activeCollege.highlights.ielts)}
                                </p>
                              </div>

                              {activeCollege.highlights.interview && (
                                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
                                  <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider block">
                                    Interview Requirement
                                  </span>
                                  <p className="text-sm md:text-base font-extrabold text-amber-950 mt-1.5 leading-snug">
                                    {to2027(activeCollege.highlights.interview)}
                                  </p>
                                </div>
                              )}

                              {activeCollege.highlights.applicationFee && (
                                <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200">
                                  <span className="text-[11px] font-extrabold text-red-700 uppercase tracking-wider block">
                                    Application / Offer Fee
                                  </span>
                                  <div className="mt-1.5 space-y-1">
                                    {splitIntoCleanLines(activeCollege.highlights.applicationFee).map((line, i) => (
                                      <p key={i} className="text-sm md:text-base font-black text-red-600 leading-snug">
                                        {line}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* OFFERED PROGRAMS */}
                        {activeCollege.courses && activeCollege.courses.length > 0 && (
                          <div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                              <h3 className="text-sm md:text-base font-extrabold uppercase tracking-wider text-[#0f2547]">
                                Offered Programs ({activeCollege.courses.length}) <span className="print:hidden">— Click Any Program To Expand Full Details</span>
                              </h3>
                              <span className="text-xs font-extrabold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                ★ Pay Tuition Fee After Visa Options Available
                              </span>
                            </div>

                            <div className="space-y-4">
                              {activeCollege.courses.map((course, index) => (
                                <CourseAccordion
                                  key={index}
                                  course={course}
                                  collegeName={activeCollege.name}
                                  isOpen={openCourseIndex === index}
                                  onToggle={() =>
                                    setOpenCourseIndex(openCourseIndex === index ? null : index)
                                  }
                                  onApplyCourse={(courseTitle) =>
                                    openApplyModal(activeCollege.name, courseTitle)
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* BOTTOM SPLIT: TUITION FEE STRUCTURE + VISA & WORK BENEFITS */}
                        {activeCollege.highlights && (
                          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0f2547]">
                                Tuition Fee Structure Overview (2027)
                              </h4>

                              {tuitionParsed.cards.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                  {tuitionParsed.cards.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="p-5 rounded-2xl bg-[#f8fafc] border-2 border-slate-200 flex flex-col justify-between gap-2"
                                    >
                                      <div>
                                        <span className="text-xs font-extrabold text-[#0f2547] block leading-snug">
                                          {item.label}
                                        </span>
                                        <span className="text-2xl md:text-3xl font-black text-red-600 mt-1.5 block">
                                          {item.amount}
                                        </span>
                                        {item.subBreakdown && (
                                          <span className="text-[11px] font-semibold text-slate-500 block mt-1 leading-snug">
                                            {item.subBreakdown}
                                          </span>
                                        )}
                                      </div>

                                      {item.payAfterVisaNote && (
                                        <span className="inline-block text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg mt-1 leading-tight">
                                          ✓ {item.payAfterVisaNote}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {tuitionParsed.formattedLines.length > 0 && (
                                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs md:text-sm text-slate-800 leading-relaxed font-semibold space-y-2.5">
                                  {tuitionParsed.formattedLines.map((lineObj, idx) => (
                                    <div key={idx}>
                                      <p>• {lineObj.main}</p>
                                      {lineObj.subNote && (
                                        <p className="text-emerald-700 font-extrabold text-xs pl-3 mt-0.5">
                                          {lineObj.subNote}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="space-y-5">
                              <div>
                                <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0f2547] mb-3">
                                  Visa & Work Benefits
                                </h4>
                                <div className="space-y-2.5">
                                  {to2027(activeCollege.highlights.visa || '')
                                    .split(/\s*(?:\||•|;|\.)\s*/)
                                    .filter(Boolean)
                                    .map((point, i) => (
                                      <div
                                        key={i}
                                        className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-slate-700"
                                      >
                                        <FaCheckCircle
                                          className="text-emerald-600 mt-0.5 shrink-0"
                                          size={15}
                                        />
                                        <span>{point}</span>
                                      </div>
                                    ))}
                                </div>
                              </div>

                              {activeCollege.highlights.processingSpeed && (
                                <div>
                                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0f2547] mb-2">
                                    Processing Speed
                                  </h4>
                                  <div className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-slate-800 bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
                                    <FaClock className="text-emerald-600 mt-0.5 shrink-0" size={15} />
                                    <span>{to2027(activeCollege.highlights.processingSpeed)}</span>
                                  </div>
                                </div>
                              )}

                              {activeCollege.highlights.accommodation && (
                                <div>
                                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0f2547] mb-2">
                                    Accommodation Support
                                  </h4>
                                  <div className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <FaShieldAlt className="text-[#0f2547] mt-0.5 shrink-0" size={15} />
                                    <span>{to2027(activeCollege.highlights.accommodation)}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </section>
            </td>
          </tr>
        </tbody>

        {/* RESERVED BOTTOM SPACE ON EVERY PRINTED PAGE SO CONTENT NEVER OVERLAPS FOOTER */}
        <tfoot className="hidden print:table-footer-group">
          <tr>
            <td>
              <div className="h-20" />
            </td>
          </tr>
        </tfoot>
      </table>

      {/* FIXED BOTTOM FOOTER ON EVERY PRINTED PAGE */}
      <div className="hidden print:block raptor-print-footer pt-2">
        <div className="bg-slate-50 border-t-2 border-[#0f2547] px-3 py-2.5">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-black text-[#0f2547]">
                The Raptor Academics — Overseas Education &amp; Malta Study Visa Consultants
              </p>
              <p className="text-[10px] text-slate-600">
                120/64, New Sanganer Rd, Sector 12, Mansarovar, Jaipur, Rajasthan 302020
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-[10px] font-extrabold text-[#0f2547]">
                Helpline: (+91) 72320 10105 &nbsp;|&nbsp; theraptoracademics@gmail.com
              </p>
              <p className="text-[9.5px] text-slate-500">
                www.theraptoracademics.com &nbsp;•&nbsp; All fees in Euros (€) for 2027 intakes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM QUICK COMPARISON TABLE (100% LIVE FROM institutionsData.js) */}
      <section
        id="quick-comparison-matrix"
        className="max-w-[1560px] mx-auto px-4 md:px-10 py-12 md:py-16 print:hidden"
      >
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-900/5 border border-slate-200/90">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 block mb-1">
                ★ Side-By-Side 2027 Matrix ★
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0f2547]">
                Quick Comparison
              </h2>
              <p className="text-slate-500 text-xs md:text-sm mt-1">
                Key admission points at a glance. Select an institution name to open its full details above.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openApplyModal(activeCollege.name)}
              className="bg-[#0f2547] hover:bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors self-start md:self-auto cursor-pointer"
            >
              Apply For 2027 Intake
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse min-w-[1150px]">
              <thead>
                <tr className="bg-[#0f2547] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-4 px-4">Institution</th>
                  <th className="py-4 px-3.5">Intake</th>
                  <th className="py-4 px-3.5">Diploma Tuition</th>
                  <th className="py-4 px-3.5">Application Fee</th>
                  <th className="py-4 px-3.5">Interview</th>
                  <th className="py-4 px-3.5">Gap Accepted</th>
                  <th className="py-4 px-3.5">Language Test</th>
                  <th className="py-4 px-3.5">Offer Letter</th>
                  <th className="py-4 px-3.5">Pay After Visa</th>
                  <th className="py-4 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs md:text-[13px] align-top">
                {institutionsData.map((inst) => {
                  const shortTitle = inst.name.split('–')[0].trim();
                  const shortIntake = formatShortIntake(inst.highlights?.intake || '');
                  const minimalTuition = formatMinimalTableTuition(
                    inst.highlights?.tuitionFeeSummary || ''
                  );
                  const ownAppFee = formatOwnAppFee(inst.highlights?.applicationFee || '');
                  const interviewObj = formatCompactInterview(inst.highlights?.interview || '');
                  const gapShort = formatCompactGap(inst.highlights?.gap || '');
                  const ieltsShort = formatCompactIelts(inst.highlights?.ielts || '');
                  const offerSpeed = formatCompactOfferSpeed(inst.highlights?.processingSpeed || '');
                  const payAfterVisaText = formatPayAfterVisaColumn(inst);

                  return (
                    <tr
                      key={inst.id}
                      className={`hover:bg-blue-50/40 transition-colors ${
                        activeCollege.id === inst.id ? 'bg-blue-50/70' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => handleCollegeChange(inst)}
                          className="text-left font-extrabold text-[#1d4ed8] hover:text-red-600 transition-colors block cursor-pointer leading-snug"
                        >
                          {shortTitle}
                        </button>
                        <span className="text-[11px] text-slate-400 block mt-0.5 max-w-[200px] truncate">
                          {inst.location}
                        </span>
                      </td>

                      <td className="py-4 px-3.5 font-medium text-slate-700 whitespace-nowrap">
                        {shortIntake === 'Jan / Apr / Jul / Oct 2027' ? (
                          <div>
                            <span className="block font-semibold text-slate-800">Jan / Apr / Jul / Oct</span>
                            <span className="text-[11px] text-slate-500">2027</span>
                          </div>
                        ) : (
                          <span className="font-semibold text-slate-800">{shortIntake}</span>
                        )}
                      </td>

                      <td className="py-4 px-3.5 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">
                          {minimalTuition.primary}
                        </span>
                        {minimalTuition.secondary && (
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {minimalTuition.secondary}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-3.5">
                        <span className="font-bold text-slate-900 block">{ownAppFee.primary}</span>
                        {ownAppFee.secondary && (
                          <span className="text-[11px] text-slate-500 leading-tight block mt-0.5 max-w-[160px]">
                            {ownAppFee.secondary}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-3.5">
                        <span
                          className={`font-extrabold text-xs ${
                            interviewObj.tone === 'green'
                              ? 'text-emerald-700'
                              : 'text-amber-700'
                          }`}
                        >
                          {interviewObj.label}
                        </span>
                      </td>

                      <td className="py-4 px-3.5 font-medium text-slate-700 whitespace-nowrap">
                        {gapShort}
                      </td>

                      <td className="py-4 px-3.5 font-medium text-slate-700">
                        {ieltsShort}
                      </td>

                      <td className="py-4 px-3.5 font-medium text-slate-800 whitespace-nowrap">
                        {offerSpeed}
                      </td>

                      <td className="py-4 px-3.5 font-semibold text-slate-800">
                        {payAfterVisaText}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => openApplyModal(inst.name)}
                          className="bg-red-600 hover:bg-[#0f2547] text-white font-extrabold text-[11px] px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-400 mt-5 leading-relaxed">
            All fees are in Euros (€) and are compiled from public institutional sources for the 2027 intakes. Fees, intakes, and policies can change — please verify directly with the institution and confirm the latest details with your counselor at The Raptor Academics, Jaipur before applying.
          </p>
        </div>
      </section>

      {/* 5. APPLY NOW MODAL */}
      <ApplyNowModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        initialCollegeName={modalState.collegeName}
        initialProgramName={modalState.programName}
      />

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Institutions;