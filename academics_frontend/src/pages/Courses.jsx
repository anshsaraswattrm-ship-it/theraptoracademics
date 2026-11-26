import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaGraduationCap,
  FaUniversity,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
  FaTimes,
  FaBriefcase,
  FaBookOpen,
  FaUserCheck,
  FaFilter,
  FaStar,
  FaExchangeAlt
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { institutionsData } from '../data/institutionsData';

// ==========================================
// INSTITUTION LOGOS / CAMPUS THUMBNAILS MAP
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

const STREAM_FILTERS = [
  'All Courses',
  'Nursing & Healthcare',
  'Business & MBA',
  'IT, AI & Cloud',
  'Hospitality & Tourism',
  'HR, Psychology & Coaching'
];

const LEVEL_FILTERS = [
  'All Levels',
  'Level 4',
  'Level 5',
  'Level 6',
  'Level 7'
];

const to2027 = (val) => {
  if (typeof val !== 'string') return val;
  return val.replace(/\b2026\b/g, '2027');
};

const getCollegeSlug = (collegeName = '') => {
  const short = collegeName.split('–')[0].trim().toLowerCase();
  return short.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

const formatCourseTitle = (title = '', collegeName = '') => {
  let clean = to2027(title);
  if (/la\s*vallette/i.test(collegeName) && /\bmba\b/i.test(clean)) {
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

// STRICT COURSE-ONLY MQF LEVEL DETECTOR
const detectMqfLevel = (course) => {
  const title = course?.title || '';
  const levelDetail = (course?.keyDetails || []).find((d) =>
    /mqf|eqf|level/i.test(d.label)
  );
  const levelSource = `${title} ${levelDetail ? levelDetail.value : ''}`;

  const explicitMatch = levelSource.match(/\bLevel\s*([4567])\b/i);
  if (explicitMatch) {
    return `Level ${explicitMatch[1]}`;
  }

  if (/pre[-\s]*tertiary|award|foundation/i.test(title)) return 'Level 4';
  if (/undergraduate\s*diploma|undergraduate\s*certificate|higher\s*diploma|\bdiploma\b|bridging|\bnbc\b/i.test(title)) {
    return 'Level 5';
  }
  if (/bachelor|\bb\.?sc\b|\bba\b|\bbba\b|honours|top[-\s]*up/i.test(title)) {
    return 'Level 6';
  }
  if (/master|\bmba\b|\bm\.?sc\b|postgraduate|pg\s*diploma|doctor\s*of\s*business|\bdba\b/i.test(title)) {
    return 'Level 7';
  }

  return 'Level 5';
};

// STRICT STREAM DETECTOR
const detectStream = (course) => {
  const text = `${course?.title || ''} ${course?.overview || ''}`.toLowerCase();

  if (
    /nursing|health|social care|public health|occupational health|medical|midwi/i.test(text) &&
    !/wellness coaching|human resource|\bhrm\b/i.test(text)
  ) {
    return 'Nursing & Healthcare';
  }
  if (
    /software|artificial intelligence|\bai\b|cloud|cyber|information technology|\bit\b|computer|digital marketing/i.test(text)
  ) {
    return 'IT, AI & Cloud';
  }
  if (/hospitality|tourism|hotel|resort|event|culinary/i.test(text)) {
    return 'Hospitality & Tourism';
  }
  if (/human resource|\bhrm\b|psycholog|wellness coaching|neuroscience/i.test(text)) {
    return 'HR, Psychology & Coaching';
  }
  return 'Business & MBA';
};

// NORMALIZE COURSE SUBJECT KEYWORDS FOR CROSS-UNIVERSITY MATCHING
const extractCoreSubjectTokens = (title = '') => {
  const stopWords = new Set([
    'diploma', 'undergraduate', 'postgraduate', 'higher', 'extended', 'certificate',
    'award', 'bachelor', 'masters', 'master', 'degree', 'honours', 'hons', 'arts',
    'science', 'level', 'mqf', 'eqf', 'othm', 'qualifi', 'year', 'years', 'months',
    'in', 'of', 'and', 'for', 'the', 'with', 'to', 'use', 'studies', 'study', 'skills',
    'pathway', 'dual', 'complete', 'course', 'practice', 'management', 'administration'
  ]);

  const cleaned = title
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ');

  const tokens = cleaned
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w) && !/^\d+$/.test(w));

  // If title was generic like "Diploma in Business Management", keep "business"
  if (tokens.length === 0 && /business|management|administration/i.test(title)) {
    return ['business'];
  }
  return tokens;
};

const findSameCourseInOtherColleges = (currentItem, allCoursesList) => {
  if (!currentItem) return [];

  const currentTokens = extractCoreSubjectTokens(currentItem.formattedTitle);

  const matches = allCoursesList.filter((other) => {
    if (other.collegeId === currentItem.collegeId) return false;
    if (other.level !== currentItem.level) return false;
    if (other.stream !== currentItem.stream) return false;

    const otherTokens = extractCoreSubjectTokens(other.formattedTitle);

    // Check shared core subject tokens (e.g., nursing, business, hospitality, tourism, health, social, logistics, supply, chain, human, resources, psychology, accounting, finance, digital, marketing, software, computer, mba)
    const overlap = currentTokens.filter((t) => otherTokens.includes(t));
    return overlap.length >= 1;
  });

  // Deduplicate by collegeId (keep best title match per university)
  const byCollege = new Map();
  matches.forEach((m) => {
    const mTokens = extractCoreSubjectTokens(m.formattedTitle);
    const score = currentTokens.filter((t) => mTokens.includes(t)).length;
    const existing = byCollege.get(m.collegeId);
    if (!existing || score > existing.score) {
      byCollege.set(m.collegeId, { item: m, score });
    }
  });

  return Array.from(byCollege.values())
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
};

const extractDuration = (course, collegeName = '') => {
  if (/la\s*vallette/i.test(collegeName) && /\bmba\b/i.test(course?.title || '')) {
    return '18 Months';
  }
  const durItem = course?.keyDetails?.find((d) => /duration|length/i.test(d.label));
  if (durItem) {
    const cleanVal = to2027(durItem.value);
    const shortMatch = cleanVal.match(/(\d+(?:\.\d+)?\s*(?:Years?|Months?|Weeks?))/i);
    return shortMatch ? shortMatch[1] : cleanVal.split('│')[0].split('|')[0].trim();
  }
  const titleMatch = (course?.title || '').match(/\((\d+(?:\.\d+)?\s*(?:Years?|Months?))\)/i);
  return titleMatch ? titleMatch[1] : 'Full-Time (2027)';
};

const extractFeeInfo = (course, college) => {
  const courseFeeItem = course?.keyDetails?.find((d) => /fee|tuition/i.test(d.label));
  const feeStructItem =
    course?.feeStructure?.find((f) => /non-eu|tuition|course|total|program/i.test(f.category)) ||
    course?.feeStructure?.[0];

  const rawText = to2027(
    courseFeeItem?.value ||
      feeStructItem?.amount ||
      college?.highlights?.tuitionFeeSummary ||
      'Contact Jaipur Desk'
  );

  const nonEuMatch = rawText.match(/Non-EU[^€]*?(€\s?[\d,]+(?:\s*\/?\s*(?:Yr|Year|per year))?)/i);
  const euroMatches = rawText.match(/€\s?[\d,]+(?:\s*\/?\s*(?:Yr|Year|per year))?/gi);

  const headline = nonEuMatch
    ? nonEuMatch[1].replace(/\s+/g, ' ').trim()
    : euroMatches
    ? euroMatches[0].replace(/\s+/g, ' ').trim()
    : rawText.split('|')[0].trim();

  const payAfterVisa =
    /after\s*visa/i.test(rawText) ||
    /after\s*visa/i.test(college?.highlights?.tuitionFeeSummary || '') ||
    /after\s*offer/i.test(college?.highlights?.applicationFee || '');

  return {
    headline,
    fullText: rawText,
    payAfterVisa
  };
};

// ==========================================
// QUICK COURSE DETAIL MODAL (WITH CROSS-UNIVERSITY SWITCHER)
// ==========================================
const CourseDetailModal = ({ item, allCoursesList, onSelectCourse, onClose }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = 'hidden';
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  const similarInOtherColleges = useMemo(() => {
    return findSameCourseInOtherColleges(item, allCoursesList);
  }, [item, allCoursesList]);

  if (!item) return null;

  const { course, college, formattedTitle, level, duration, feeInfo, collegeSlug, collegeLogo } = item;

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 bg-[#071122]/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.22 }}
        className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col my-auto"
      >
        {/* Header with College Logo */}
        <div className="bg-gradient-to-r from-[#0b1930] to-[#0f2547] text-white px-6 py-5 md:px-8 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white p-1 shrink-0 overflow-hidden shadow-md hidden sm:flex items-center justify-center">
              <img
                src={collegeLogo}
                alt={college.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  MQF/EQF {level}
                </span>
                <span className="bg-white/15 text-blue-100 text-[10px] font-bold px-3 py-1 rounded-full">
                  {duration}
                </span>
                {feeInfo.payAfterVisa && (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold px-3 py-1 rounded-full">
                    ✓ Tuition After Visa Available
                  </span>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-black leading-snug">
                {formattedTitle}
              </h3>
              <p className="text-xs text-blue-200/85 font-semibold flex flex-wrap items-center gap-2">
                <span>{college.name.split('–')[0].trim()}</span>
                <span>•</span>
                <span>📍 {to2027(college.location)}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <FaTimes size={15} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          className="p-6 md:p-8 overflow-y-auto overscroll-contain space-y-6 bg-[#f8fafc]"
        >
          {/* Fee & Intake Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Tuition Fee
              </span>
              <p className="text-lg font-black text-red-600 mt-1">{feeInfo.headline}</p>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{feeInfo.fullText}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                2027 Intake
              </span>
              <p className="text-sm font-extrabold text-[#0f2547] mt-1">
                {to2027(college.highlights?.intake || '2027 Intakes Open')}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                English / Gap Rule
              </span>
              <p className="text-xs font-bold text-slate-700 mt-1 leading-snug">
                {to2027(college.highlights?.ielts || 'No IELTS / PTE')} • Gap: {to2027(college.highlights?.gap || 'Flexible')}
              </p>
            </div>
          </div>

          {/* Overview */}
          {course.overview && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0f2547] mb-2 flex items-center gap-2">
                <FaBookOpen className="text-red-600" /> Programme Overview
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">{to2027(course.overview)}</p>
            </div>
          )}

          {/* Entry Requirements */}
          {course.entryRequirements && course.entryRequirements.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0f2547] mb-3 flex items-center gap-2">
                <FaUserCheck className="text-emerald-600" /> Entry Requirements
              </h4>
              <ul className="space-y-2">
                {course.entryRequirements.map((req, idx) => (
                  <li key={idx} className="text-xs md:text-sm text-slate-700 flex items-start gap-2">
                    <FaCheckCircle className="text-emerald-600 mt-1 shrink-0" size={13} />
                    <span>{to2027(req)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Modules */}
          {course.modules && course.modules.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0f2547] mb-3">
                Core Curriculum & Modules ({course.modules.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {course.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-semibold flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#0f2547] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{to2027(mod)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Careers */}
          {course.careers && course.careers.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0f2547] mb-3 flex items-center gap-2">
                <FaBriefcase className="text-red-600" /> Career Roles & Expected Schengen Salaries
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-[#0f2547] uppercase">
                    <tr>
                      <th className="p-3 font-extrabold">Role</th>
                      <th className="p-3 font-extrabold">Sector / Focus</th>
                      <th className="p-3 font-extrabold">Starting</th>
                      <th className="p-3 font-extrabold">Mid / Senior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {course.careers.map((car, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-bold text-[#0f2547]">{to2027(car.role)}</td>
                        <td className="p-3 text-slate-600">{to2027(car.sector || '-')}</td>
                        <td className="p-3 font-extrabold text-emerald-700">{to2027(car.startSalary || car.salary || '-')}</td>
                        <td className="p-3 font-bold text-slate-800">{to2027(car.midSalary || '-')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ALSO OFFERED AT THESE MALTA UNIVERSITIES / COLLEGES */}
          {similarInOtherColleges.length > 0 && (
            <div className="bg-gradient-to-br from-[#eff6ff] to-white p-5 md:p-6 rounded-2xl border-2 border-blue-200/80 space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0f2547] flex items-center gap-2">
                  <FaExchangeAlt className="text-red-600" /> Also Offered At These Malta Institutions ({similarInOtherColleges.length})
                </h4>
                <span className="text-[11px] font-bold text-blue-800 bg-white px-2.5 py-0.5 rounded-full border border-blue-200">
                  Click any logo to switch & compare
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {similarInOtherColleges.map((alt) => (
                  <button
                    key={alt.id}
                    type="button"
                    onClick={() => onSelectCourse(alt)}
                    className="text-left bg-white hover:bg-[#0f2547] group/alt p-3.5 rounded-2xl border border-slate-200 hover:border-[#0f2547] shadow-2xs hover:shadow-md transition-all flex items-center gap-3 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <img
                        src={alt.collegeLogo}
                        alt={alt.collegeShortName}
                        className="w-full h-full object-cover group-hover/alt:scale-105 transition-transform"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-extrabold text-[#0f2547] group-hover/alt:text-white truncate">
                        {alt.collegeShortName}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-500 group-hover/alt:text-blue-200 line-clamp-1 mt-0.5">
                        {alt.formattedTitle}
                      </p>
                      <div className="flex items-center justify-between gap-1 mt-1">
                        <span className="text-[11px] font-black text-red-600 group-hover/alt:text-amber-300">
                          {alt.feeInfo.headline}
                        </span>
                        <span className="text-[10px] font-extrabold text-blue-700 group-hover/alt:text-white inline-flex items-center gap-1">
                          Switch <FaArrowRight size={8} />
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 md:px-8 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <Link
            to={`/institutions#${collegeSlug}`}
            onClick={onClose}
            className="text-xs font-extrabold text-[#0f2547] hover:text-red-600 underline flex items-center gap-1.5"
          >
            Open Full {college.name.split('–')[0].trim()} Profile <FaArrowRight size={10} />
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
            <Link
              to="/free-counselling"
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              Apply For 2027 <FaArrowRight size={11} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// MAIN COURSES PAGE
// ==========================================
const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState('All Courses');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedCollegeId, setSelectedCollegeId] = useState('All');
  const [payAfterVisaOnly, setPayAfterVisaOnly] = useState(false);
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  // Flatten all courses across all colleges from institutionsData.js
  const allCoursesList = useMemo(() => {
    const list = [];
    institutionsData.forEach((college, colIdx) => {
      const collegeShortName = college.name.split('–')[0].trim();
      const collegeSlug = getCollegeSlug(college.name);
      const collegeLogo = getCollegeImage(college, colIdx);

      (college.courses || []).forEach((course, idx) => {
        const formattedTitle = formatCourseTitle(course.title, college.name);
        const level = detectMqfLevel(course);
        const stream = detectStream(course);
        const duration = extractDuration(course, college.name);
        const feeInfo = extractFeeInfo(course, college);

        list.push({
          id: `${college.id}-${idx}`,
          course,
          college,
          collegeId: college.id,
          collegeShortName,
          collegeSlug,
          collegeLogo,
          formattedTitle,
          level,
          stream,
          duration,
          feeInfo
        });
      });
    });
    return list;
  }, []);

  const filteredCourses = useMemo(() => {
    return allCoursesList.filter((item) => {
      if (selectedStream !== 'All Courses' && item.stream !== selectedStream) {
        return false;
      }
      if (selectedLevel !== 'All Levels' && item.level !== selectedLevel) {
        return false;
      }
      if (selectedCollegeId !== 'All' && item.collegeId !== selectedCollegeId) {
        return false;
      }
      if (payAfterVisaOnly && !item.feeInfo.payAfterVisa) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const hay = `${item.formattedTitle} ${item.collegeShortName} ${item.college.location} ${
          item.course.overview || ''
        } ${item.stream} ${item.level} ${(item.course.modules || []).join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allCoursesList, selectedStream, selectedLevel, selectedCollegeId, payAfterVisaOnly, searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStream('All Courses');
    setSelectedLevel('All Levels');
    setSelectedCollegeId('All');
    setPayAfterVisaOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-[#0b1930] text-white overflow-hidden px-4 md:px-10">
        <div className="absolute -top-24 right-1/4 w-[480px] h-[480px] bg-red-600/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-300 font-extrabold uppercase tracking-widest text-xs">
                2027 Malta Study Directory • {allCoursesList.length}+ Programmes
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight">
              Find Your <span className="text-red-500">Malta Course</span> & Degree Pathway
            </h1>

            <p className="text-blue-100/85 text-base md:text-lg max-w-2xl leading-relaxed">
              Browse every accredited diploma, bachelor’s, master’s, and MBA programme across {institutionsData.length} MFHEA-licensed Malta institutions—filter by stream, MQF level, college, or Pay-After-Visa options.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-red-400">
                  Live Directory Stats
                </span>
                <FaGraduationCap className="text-white" size={20} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0b1930]/75 p-4 rounded-2xl border border-white/10">
                  <p className="text-2xl font-black text-white">{allCoursesList.length}</p>
                  <p className="text-[11px] text-blue-200/80">Total Courses</p>
                </div>
                <div className="bg-[#0b1930]/75 p-4 rounded-2xl border border-white/10">
                  <p className="text-2xl font-black text-red-400">{institutionsData.length}</p>
                  <p className="text-[11px] text-blue-200/80">Partner Colleges</p>
                </div>
              </div>
              <p className="text-xs text-emerald-300 font-bold flex items-center gap-2">
                <FaCheckCircle /> 10th / 12th Pass & Gap Friendly • 2027 Intakes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-5 md:p-7 shadow-xl border border-slate-200/90 space-y-5">
          {/* Search + College Dropdown + Pay After Visa Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            <div className="md:col-span-6 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course, college, city, or module (e.g. Nursing, MBA, AI, Logistics)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none text-sm font-medium text-[#0f2547]"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedCollegeId}
                onChange={(e) => setSelectedCollegeId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none text-sm font-bold text-[#0f2547] cursor-pointer"
              >
                <option value="All">All Partner Colleges ({institutionsData.length})</option>
                {institutionsData.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name.split('–')[0].trim()}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => setPayAfterVisaOnly((prev) => !prev)}
                className={`w-full py-3 px-4 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  payAfterVisaOnly
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-[#0f2547] border-slate-200 hover:border-emerald-500'
                }`}
              >
                <FaCheckCircle size={12} /> Pay After Visa
              </button>
            </div>
          </div>

          {/* Stream Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <FaFilter size={10} /> Stream:
            </span>
            {STREAM_FILTERS.map((stream) => (
              <button
                key={stream}
                type="button"
                onClick={() => setSelectedStream(stream)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedStream === stream
                    ? 'bg-[#0f2547] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {stream}
              </button>
            ))}
          </div>

          {/* MQF Level Pills + Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
                MQF Level:
              </span>
              {LEVEL_FILTERS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
              <span>
                Showing <strong className="text-[#0f2547]">{filteredCourses.length}</strong> courses
              </span>
              {(searchQuery ||
                selectedStream !== 'All Courses' ||
                selectedLevel !== 'All Levels' ||
                selectedCollegeId !== 'All' ||
                payAfterVisaOnly) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-red-600 hover:underline font-extrabold cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-14">
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <p className="text-lg font-extrabold text-[#0f2547]">
              No matching courses found for your filter criteria.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
            >
              Show All Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {filteredCourses.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#0f2547]/40 p-6 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="bg-blue-50 text-[#0f2547] border border-blue-200 text-[11px] font-extrabold px-3 py-1 rounded-full">
                      MQF/EQF {item.level}
                    </span>
                    <span className="bg-red-50 text-red-600 border border-red-200 text-[11px] font-extrabold px-3 py-1 rounded-full">
                      {item.stream}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-lg font-extrabold text-[#0f2547] group-hover:text-red-600 transition-colors leading-snug">
                    {item.formattedTitle}
                  </h3>

                  {/* College & Location */}
                  <div className="space-y-1.5 text-xs text-slate-600 font-semibold">
                    <p className="flex items-center gap-2 text-[#0f2547] font-bold">
                      <FaUniversity className="text-red-600 shrink-0" size={13} />
                      <span className="truncate">{item.collegeShortName}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-500">
                      <FaMapMarkerAlt className="text-slate-400 shrink-0" size={12} />
                      <span className="truncate">{to2027(item.college.location)}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-500">
                      <FaClock className="text-slate-400 shrink-0" size={12} />
                      <span>{item.duration}</span>
                    </p>
                  </div>

                  {/* Overview Snippet */}
                  {item.course.overview && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                      {to2027(item.course.overview)}
                    </p>
                  )}
                </div>

                {/* Bottom Fee & Actions */}
                <div className="pt-5 mt-5 border-t border-slate-100 space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Tuition Fee
                      </span>
                      <span className="text-base font-black text-red-600">
                        {item.feeInfo.headline}
                      </span>
                    </div>

                    {item.feeInfo.payAfterVisa && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                        Pay After Visa
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveCourseModal(item)}
                      className="flex-1 bg-[#0f2547] hover:bg-red-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Syllabus & Details <FaArrowRight size={10} />
                    </button>

                    <Link
                      to={`/institutions#${item.collegeSlug}`}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f2547] text-xs font-extrabold transition-colors"
                    >
                      College
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
        <div className="bg-[#0f2547] text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-400 flex items-center gap-1.5">
              <FaStar size={12} /> Need Help Picking The Right Course?
            </span>
            <h2 className="text-2xl md:text-3xl font-black">
              Talk To Our 2027 Malta Admissions Team in Jaipur
            </h2>
            <p className="text-sm text-blue-100/80">
              Free profile evaluation for 10th/12th pass, graduates, nursing & hospitality candidates.
            </p>
          </div>
          <Link
            to="/free-counselling"
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs md:text-sm uppercase tracking-wider px-7 py-4 rounded-2xl shadow-lg transition-colors shrink-0 flex items-center gap-2"
          >
            Book Free Counselling <FaArrowRight size={12} />
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {activeCourseModal && (
          <CourseDetailModal
            item={activeCourseModal}
            allCoursesList={allCoursesList}
            onSelectCourse={(nextItem) => setActiveCourseModal(nextItem)}
            onClose={() => setActiveCourseModal(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Courses;