import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaUniversity,
  FaClock,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { RedUnderline } from './Shared';
import { institutionsData } from '../../data/institutionsData';

const courseCategories = [
  'All Courses',
  'Nursing & Healthcare',
  'Business & MBA',
  'IT, AI & Cloud',
  'Hospitality & Tourism',
  'HR, Psychology & Coaching',
  'Logistics & Supply Chain'
];

// Helper matching Institutions.jsx deep-link slugs
const getCollegeSlug = (collegeName = '') => {
  const short = collegeName.split('–')[0].trim().toLowerCase();
  return short.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

// Custom Cloudinary images for flagship programmes
const CUSTOM_COURSE_IMAGES = [
  {
    collegeId: 'lvi',
    match: /Nursing Bridging Course/i,
    image:
      'https://res.cloudinary.com/ppkvzeli/image/upload/v1794910056/Nursing_Bridging_Course_by_the_Waterfront.png'
  },
  {
    collegeId: 'lvi',
    match: /Nursing Studies/i,
    image:
      'https://res.cloudinary.com/ppkvzeli/image/upload/v1794910058/Nursing_Studies_Vaccination_Banner.png'
  },
  {
    collegeId: 'avanza',
    match: /Complete MBA Pathway/i,
    image:
      'https://res.cloudinary.com/ppkvzeli/image/upload/v1794910062/Complete_UK_MBA_Pathway.png'
  },
  {
    collegeId: 'learnkey',
    match: /Software Design, Artificial Intelligence and Cloud Computing/i,
    image:
      'https://res.cloudinary.com/ppkvzeli/image/upload/v1794910056/B.Sc._Software_Design__AI_Cloud_Computing.png'
  },
  {
    collegeId: 'eec',
    match: /Bachelor of Arts \(Honours\) in International Tourism/i,
    image:
      'https://res.cloudinary.com/ppkvzeli/image/upload/v1794910057/Luxury_Hospitality_Tourism_Program.png'
  },
  {
    collegeId: 'mic',
    match: /Logistics and Supply Chain Crisis Management/i,
    image:
      'https://res.cloudinary.com/ppkvzeli/image/upload/v1794910057/Logistics_and_Supply_Chain_Diploma_Banner.png'
  }
];

const CATEGORY_FALLBACK_IMAGES = {
  'Nursing & Healthcare':
    'https://res.cloudinary.com/ppkvzeli/image/upload/v1794910058/Nursing_Studies_Vaccination_Banner.png',
  'Business & MBA':
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
  'IT, AI & Cloud':
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
  'Hospitality & Tourism':
    'https://res.cloudinary.com/ppkvzeli/image/upload/v1794910057/Luxury_Hospitality_Tourism_Program.png',
  'HR, Psychology & Coaching':
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000',
  'Logistics & Supply Chain':
    'https://res.cloudinary.com/ppkvzeli/image/upload/v1794910057/Logistics_and_Supply_Chain_Diploma_Banner.png'
};

const detectCategory = (title = '') => {
  if (
    /nursing|early years|early childhood|public health|occupational health|health and social care|health, social care|neuroscience/i.test(
      title
    )
  ) {
    return 'Nursing & Healthcare';
  }
  if (/psychology|coaching|human resource|\bhrm\b/i.test(title)) {
    return 'HR, Psychology & Coaching';
  }
  if (/logistics|supply chain/i.test(title)) {
    return 'Logistics & Supply Chain';
  }
  if (/hospitality|tourism|events management/i.test(title)) {
    return 'Hospitality & Tourism';
  }
  if (
    /information technology|software design|artificial intelligence|\bai\b|cloud computing|computer science/i.test(
      title
    )
  ) {
    return 'IT, AI & Cloud';
  }
  return 'Business & MBA';
};

const extractCourseBadge = (title = '', collegeId = '') => {
  if (/nursing bridging/i.test(title)) return 'Pay After Visa';
  if (/nursing/i.test(title)) return 'EU Registered Nurse';
  if (collegeId === 'avanza' && /Complete MBA Pathway/i.test(title))
    return 'UK Dual Award';
  if (/dba|doctor/i.test(title)) return 'MQF Level 8 • DBA';
  if (/mba/i.test(title)) return 'MQF Level 7 • MBA';
  if (/level 7|master|msc|postgraduate|post graduate/i.test(title))
    return 'MQF Level 7 • PG';
  if (/level 6|bachelor|bsc|b\.sc|ba \(/i.test(title))
    return 'MQF Level 6 • Degree';
  if (/level 4|pre-tertiary|award in/i.test(title))
    return 'MQF Level 4 • Foundation';
  return 'MQF Level 5 • Diploma';
};

const extractCourseDuration = (course) => {
  const durDetail = course?.keyDetails?.find((d) => /duration/i.test(d.label));
  if (durDetail?.value) {
    const cleaned = durDetail.value
      .split('│')[0]
      .split('|')[0]
      .split('[')[0]
      .trim();
    if (cleaned) return cleaned;
  }
  const titleMatch = course?.title?.match(
    /\((\d+(?:\.\d+)?\s*(?:Year|Years|Month|Months)[^)]*)\)/i
  );
  if (titleMatch) return titleMatch[1];
  return 'Full-Time';
};

const extractCourseFee = (course) => {
  // 1. Check feeStructure array first for Non-EU / Year 1
  if (Array.isArray(course?.feeStructure) && course.feeStructure.length > 0) {
    const nonEuRow =
      course.feeStructure.find((f) =>
        /non-eu.*year 1|non-eu tuition fee$/i.test(f.category)
      ) ||
      course.feeStructure.find((f) => /year 1/i.test(f.category)) ||
      course.feeStructure[0];
    if (nonEuRow?.amount) {
      return nonEuRow.amount.replace('.00', '');
    }
  }

  // 2. Check keyDetails for Tuition Fee
  const feeDetail = course?.keyDetails?.find((d) =>
    /tuition|fee/i.test(d.label)
  );
  if (feeDetail?.value) {
    const val = feeDetail.value;
    // Prefer Non-EU price when both EU and Non-EU are listed
    const nonEuMatch = val.match(
      /(?:Non-EU[^€]*)(€[\d,]+(?:\s*\/\s*(?:yr|year)|\s*per\s*year)?)/i
    );
    if (nonEuMatch) return nonEuMatch[1].replace(/\s*per\s*year/i, ' / Yr');

    const nonEuBeforeMatch = val.match(
      /(€[\d,]+(?:\s*\/\s*(?:yr|year)|\s*per\s*year)?)\s*\([^)]*Non-EU/i
    );
    if (nonEuBeforeMatch)
      return nonEuBeforeMatch[1].replace(/\s*per\s*year/i, ' / Yr');

    const firstEuro = val.match(
      /(€[\d,]+(?:\s*\/\s*(?:yr|year)|\s*per\s*year)?)/i
    );
    if (firstEuro) return firstEuro[1].replace(/\s*per\s*year/i, ' / Yr');
  }

  return 'Pay After Visa';
};

const getCourseImage = (collegeId, title, category) => {
  const custom = CUSTOM_COURSE_IMAGES.find(
    (item) => item.collegeId === collegeId && item.match.test(title)
  );
  if (custom) return custom.image;
  return CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES['Business & MBA'];
};

const resetScrollBeforeNavigate = () => {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};

const DESKTOP_INITIAL_COUNT = 9;

const TrendingCoursesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleDesktopCount, setVisibleDesktopCount] = useState(DESKTOP_INITIAL_COUNT);
  const mobileSliderRef = useRef(null);

  // Dynamically hydrate ALL courses from ALL 12 institutions in institutionsData.js
  const allCourses = useMemo(() => {
    return institutionsData.flatMap((college) => {
      const collegeShortName = college.name.split('–')[0].trim();
      const collegeSlug = getCollegeSlug(college.name);

      return (college.courses || []).map((course) => {
        const category = detectCategory(course.title);
        return {
          collegeId: college.id,
          collegeSlug,
          title: course.title,
          category,
          badge: extractCourseBadge(course.title, college.id),
          collegeName: collegeShortName,
          location: college.location?.split(',')[0]?.trim() || 'Malta',
          duration: extractCourseDuration(course),
          fee: extractCourseFee(course),
          image: getCourseImage(college.id, course.title, category),
          targetUrl: `/institutions#${collegeSlug}`,
          modulesCount: course.modules?.length || 0
        };
      });
    });
  }, []);

  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'All Courses') return allCourses;
    return allCourses.filter((c) => c.category === selectedCategory);
  }, [allCourses, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts = { 'All Courses': allCourses.length };
    allCourses.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [allCourses]);

  useEffect(() => {
    setActiveSlide(0);
    setVisibleDesktopCount(DESKTOP_INITIAL_COUNT);
    if (mobileSliderRef.current) {
      mobileSliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  const scrollMobileToIndex = (index) => {
    const container = mobileSliderRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, filteredCourses.length - 1));
    const cardEl = container.children[clamped];
    if (cardEl) {
      container.scrollTo({
        left: cardEl.offsetLeft - container.offsetLeft,
        behavior: 'smooth'
      });
    }
    setActiveSlide(clamped);
  };

  const handleMobileScroll = () => {
    const container = mobileSliderRef.current;
    if (!container || !container.children.length) return;
    const firstCardWidth = container.children[0].offsetWidth + 16; // card width + gap-4
    const currentIndex = Math.round(container.scrollLeft / firstCardWidth);
    setActiveSlide(Math.max(0, Math.min(currentIndex, filteredCourses.length - 1)));
  };

  const desktopCourses = filteredCourses.slice(0, visibleDesktopCount);
  const remainingCount = filteredCourses.length - desktopCourses.length;
  const mobileProgress =
    filteredCourses.length > 0
      ? ((activeSlide + 1) / filteredCourses.length) * 100
      : 0;

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 bg-[#f8f9fc] border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-10 space-y-3">
          <p className="text-red-600 font-extrabold uppercase tracking-[0.2em] text-xs">
            ★ 2027 INTAKES OPEN • PAY TUITION AFTER VISA ★
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Explore <RedUnderline>All {allCourses.length} Courses</RedUnderline> to Study in Malta
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Click any programme below to jump directly to its accredited Malta college, full 2027 fee breakdown, curriculum modules, and expected Schengen salaries.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-2.5 mb-8 md:mb-12 bg-white p-2.5 rounded-3xl md:rounded-full max-w-6xl mx-auto shadow-sm border border-gray-200/80">
          {courseCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0f2547] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              {cat}{' '}
              <span className="opacity-75 text-[11px]">
                ({categoryCounts[cat] || 0})
              </span>
            </button>
          ))}
        </div>

        {/* MOBILE ONLY (< md): TOUCH SWIPE + LEFT/RIGHT ARROW CAROUSEL */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-extrabold text-[#0f2547]">
              Course {activeSlide + 1} of {filteredCourses.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollMobileToIndex(activeSlide - 1)}
                disabled={activeSlide === 0}
                aria-label="Previous course"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#0f2547] disabled:opacity-35 active:scale-95 transition"
              >
                <FaChevronLeft size={13} />
              </button>
              <button
                type="button"
                onClick={() => scrollMobileToIndex(activeSlide + 1)}
                disabled={activeSlide >= filteredCourses.length - 1}
                aria-label="Next course"
                className="w-9 h-9 rounded-full bg-[#0f2547] text-white shadow-sm flex items-center justify-center disabled:opacity-35 active:scale-95 transition"
              >
                <FaChevronRight size={13} />
              </button>
            </div>
          </div>

          <div
            ref={mobileSliderRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredCourses.map((course, idx) => (
              <div
                key={`mobile-${course.collegeId}-${course.title}-${idx}`}
                className="w-[88%] shrink-0 snap-center bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm flex flex-col"
              >
                <div className="h-48 overflow-hidden relative bg-slate-900">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0f2547] text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                    {course.category}
                  </span>

                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-emerald-600/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow">
                    <FaCheckCircle size={9} /> {course.badge}
                  </span>

                  <span className="absolute bottom-3 right-3 bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow">
                    {course.fee}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 mb-2">
                      <span className="inline-flex items-center gap-1 text-[#0f2547] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        <FaUniversity size={10} className="text-red-600" /> {course.collegeName}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaClock size={10} className="text-slate-400" /> {course.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-gray-900 mb-3 line-clamp-2 leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  <div className="pt-3.5 mt-1 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      to={course.targetUrl}
                      state={{
                        collegeId: course.collegeId,
                        collegeSlug: course.collegeSlug,
                        courseTitle: course.title
                      }}
                      onClick={resetScrollBeforeNavigate}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-600 hover:text-[#0f2547] transition-colors"
                    >
                      View College, Modules &amp; Salaries <FaArrowRight size={10} />
                    </Link>
                    {course.modulesCount > 0 && (
                      <span className="text-[11px] font-bold text-slate-400 shrink-0">
                        {course.modulesCount} Units
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sleek Progress Bar (works cleanly even for 82 courses) */}
          {filteredCourses.length > 1 && (
            <div className="mt-3 px-2">
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-300"
                  style={{ width: `${mobileProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* TABLET & DESKTOP (md+): Responsive Course Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {desktopCourses.map((course, idx) => (
            <motion.div
              key={`${course.collegeId}-${course.title}-${idx}`}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="h-56 overflow-hidden relative bg-slate-900">
                <img
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs text-[#0f2547] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                  {course.category}
                </span>

                <span className="absolute bottom-3 left-3.5 inline-flex items-center gap-1 bg-emerald-600/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow">
                  <FaCheckCircle size={10} /> {course.badge}
                </span>

                <span className="absolute bottom-3 right-3.5 bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow">
                  {course.fee}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 mb-2">
                    <span className="inline-flex items-center gap-1 text-[#0f2547] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                      <FaUniversity size={10} className="text-red-600" /> {course.collegeName}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FaClock size={10} className="text-slate-400" /> {course.duration}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-extrabold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
                    {course.title}
                  </h3>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    to={course.targetUrl}
                    state={{
                      collegeId: course.collegeId,
                      collegeSlug: course.collegeSlug,
                      courseTitle: course.title
                    }}
                    onClick={resetScrollBeforeNavigate}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-red-600 hover:text-[#0f2547] transition-colors"
                  >
                    View College, Modules &amp; Salaries <FaArrowRight size={11} />
                  </Link>
                  {course.modulesCount > 0 && (
                    <span className="text-[11px] font-bold text-slate-400">
                      {course.modulesCount} Units
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More / Show Less Controls on Tablet & Desktop */}
        <div className="hidden md:flex items-center justify-center gap-4 mt-10">
          {remainingCount > 0 && (
            <button
              type="button"
              onClick={() => setVisibleDesktopCount((prev) => prev + 9)}
              className="px-7 py-3 rounded-xl bg-white border border-gray-300 text-[#0f2547] font-extrabold text-xs md:text-sm hover:border-red-600 hover:text-red-600 transition cursor-pointer shadow-xs"
            >
              Load More Courses ({remainingCount} more)
            </button>
          )}
          {remainingCount > 0 && (
            <button
              type="button"
              onClick={() => setVisibleDesktopCount(filteredCourses.length)}
              className="px-7 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-extrabold text-xs md:text-sm hover:bg-red-600 hover:text-white transition cursor-pointer"
            >
              Show All {filteredCourses.length} Courses
            </button>
          )}
          {visibleDesktopCount > DESKTOP_INITIAL_COUNT && remainingCount === 0 && (
            <button
              type="button"
              onClick={() => setVisibleDesktopCount(DESKTOP_INITIAL_COUNT)}
              className="px-7 py-3 rounded-xl bg-white border border-gray-300 text-[#0f2547] font-extrabold text-xs md:text-sm hover:border-red-600 hover:text-red-600 transition cursor-pointer"
            >
              Show Fewer Courses
            </button>
          )}
        </div>

        {/* Bottom CTA to Full 12-College Directory */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/institutions"
            onClick={resetScrollBeforeNavigate}
            className="inline-flex items-center gap-2.5 bg-[#0f2547] hover:bg-red-600 text-white font-extrabold text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg transition-colors"
          >
            Explore All {institutionsData.length} Malta Colleges &amp; Full Matrix <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingCoursesSection;