import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUniversity, FaClock, FaCheckCircle } from 'react-icons/fa';
import { RedUnderline } from './Shared';
import { institutionsData } from '../../data/institutionsData';

const courseCategories = [
  "All Trending",
  "Nursing & Healthcare",
  "Business & MBA",
  "IT, AI & Cloud",
  "Hospitality & Tourism",
  "HR, Psychology & Coaching"
];

// Helper matching Institutions.jsx deep-link slugs
const getCollegeSlug = (collegeName = '') => {
  const short = collegeName.split('–')[0].trim().toLowerCase();
  return short.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

// Curated 9 flagship programmes mapped directly to institutionsData.js
const TRENDING_CONFIG = [
  {
    collegeId: "lvi",
    courseMatch: /Nursing Bridging Course/i,
    fallbackTitle: "Nursing Bridging Course (NBC) – MQF/EQF Level 5",
    category: "Nursing & Healthcare",
    badge: "Pay After Visa",
    durationFallback: "1 Year (50 ECTS)",
    feeFallback: "€5,500",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910056/Nursing_Bridging_Course_by_the_Waterfront.png"
  },
  {
    collegeId: "lvi",
    courseMatch: /Nursing Studies/i,
    fallbackTitle: "B.Sc. in Nursing Studies (MQF/EQF Level 6)",
    category: "Nursing & Healthcare",
    badge: "EU Registered Nurse",
    durationFallback: "3 Years (180 ECTS)",
    feeFallback: "€7,000 / Yr",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910058/Nursing_Studies_Vaccination_Banner.png"
  },
  {
    collegeId: "avanza",
    courseMatch: /Complete MBA Pathway/i,
    fallbackTitle: "Complete MBA Pathway (MQF/EQF Level 7 – Dual Award)",
    category: "Business & MBA",
    badge: "UK Dual Award",
    durationFallback: "18 Months (90 ECTS)",
    feeFallback: "€12,000 Total",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910062/Complete_UK_MBA_Pathway.png"
  },
  {
    collegeId: "learnkey",
    courseMatch: /Software Design, Artificial Intelligence and Cloud Computing/i,
    fallbackTitle: "B.Sc. in Software Design, AI & Cloud Computing (MQF/EQF Level 6)",
    category: "IT, AI & Cloud",
    badge: "High Tech Demand",
    durationFallback: "3 Years (180 ECTS)",
    feeFallback: "€6,500 (Yr 1)",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910056/B.Sc._Software_Design__AI_Cloud_Computing.png"
  },
  {
    collegeId: "eec",
    courseMatch: /Bachelor of Arts \(Honours\) in International Tourism/i,
    fallbackTitle: "BA (Honours) in International Tourism & Hospitality Management (MQF/EQF Level 6)",
    category: "Hospitality & Tourism",
    badge: "640-Hr Internship",
    durationFallback: "3 Years (180 ECTS)",
    feeFallback: "€6,500 (Yr 1)",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910057/Luxury_Hospitality_Tourism_Program.png"
  },
  {
    collegeId: "mic",
    courseMatch: /Logistics and Supply Chain Crisis Management/i,
    fallbackTitle: "Level 7 Diploma in Logistics & Supply Chain Crisis Management",
    category: "Business & MBA",
    badge: "MBA Top-Up Route",
    durationFallback: "1 Year (Level 7)",
    feeFallback: "€6,500 / Yr",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910057/Logistics_and_Supply_Chain_Diploma_Banner.png"
  },
  {
    collegeId: "academy21",
    courseMatch: /AI for Professional Use/i,
    fallbackTitle: "Undergraduate Diploma in AI for Professional Use",
    category: "IT, AI & Cloud",
    badge: "10th Pass • No IELTS",
    durationFallback: "1 Year",
    feeFallback: "€7,500",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
  },
  {
    collegeId: "academy21",
    courseMatch: /Masters in Human Resources Management/i,
    fallbackTitle: "Masters in Human Resources Management (MQF/EQF Level 7)",
    category: "HR, Psychology & Coaching",
    badge: "90 ECTS Master's",
    durationFallback: "1 Year Full-Time",
    feeFallback: "€8,000",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000"
  },
  {
    collegeId: "gcm",
    courseMatch: /Bachelor of Arts in Management \(MQF\/EQF Level 6\)/i,
    fallbackTitle: "Bachelor of Arts in Management (MQF/EQF Level 6)",
    category: "Business & MBA",
    badge: "SmartCity Campus",
    durationFallback: "36 Months (180 ECTS)",
    feeFallback: "€6,100 / Yr",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
  }
];

const TrendingCoursesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Trending");

  // Dynamically hydrate every card directly from institutionsData.js
  const trendingCourses = useMemo(() => {
    return TRENDING_CONFIG.map((item) => {
      const college = institutionsData.find((c) => c.id === item.collegeId);
      const matchedCourse = college?.courses?.find((crs) =>
        item.courseMatch.test(crs.title)
      );

      const collegeShortName = college
        ? college.name.split('–')[0].trim()
        : 'Accredited Malta College';
      const collegeSlug = college ? getCollegeSlug(college.name) : '';

      // Extract live duration from course keyDetails if available
      const durDetail = matchedCourse?.keyDetails?.find((d) =>
        /duration/i.test(d.label)
      );
      const liveDuration = durDetail
        ? durDetail.value.split('│')[0].split('|')[0].trim()
        : item.durationFallback;

      return {
        title: matchedCourse?.title || item.fallbackTitle,
        category: item.category,
        badge: item.badge,
        collegeName: collegeShortName,
        location: college?.location?.split(',')[0]?.trim() || 'Malta',
        duration: liveDuration,
        fee: item.feeFallback,
        image: item.image,
        targetUrl: collegeSlug ? `/institutions#${collegeSlug}` : '/institutions',
        modulesCount: matchedCourse?.modules?.length || 0
      };
    });
  }, []);

  const filteredCourses =
    selectedCategory === "All Trending"
      ? trendingCourses
      : trendingCourses.filter((c) => c.category === selectedCategory);

  return (
    <section className="py-24 px-4 md:px-12 bg-[#f8f9fc] border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <p className="text-red-600 font-extrabold uppercase tracking-[0.2em] text-xs">
            ★ 2027 INTAKES OPEN • PAY TUITION AFTER VISA ★
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Explore <RedUnderline>Popular Courses</RedUnderline> to Study in Malta
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Click any programme below to jump directly to its accredited Malta college, full 2027 fee breakdown, curriculum modules, and expected Schengen salaries.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 bg-white p-2.5 rounded-3xl md:rounded-full max-w-5xl mx-auto shadow-sm border border-gray-200/80">
          {courseCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0f2547] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3x3 Responsive Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={`${course.title}-${idx}`}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="h-56 overflow-hidden relative bg-slate-900">
                <img
                  src={course.image}
                  alt={course.title}
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
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-red-600 hover:text-[#0f2547] transition-colors"
                  >
                    View College, Modules & Salaries <FaArrowRight size={11} />
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

        {/* Bottom CTA to Full 12-College Directory */}
        <div className="text-center mt-12">
          <Link
            to="/institutions"
            className="inline-flex items-center gap-2.5 bg-[#0f2547] hover:bg-red-600 text-white font-extrabold text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg transition-colors"
          >
            Explore All {institutionsData.length} Malta Colleges & Full Matrix <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingCoursesSection;