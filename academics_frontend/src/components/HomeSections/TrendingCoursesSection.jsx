import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { RedUnderline } from './Shared';

const courseCategories = [
  "All Trending",
  "Nursing & Healthcare",
  "Business & MBA",
  "IT, AI & Cloud",
  "Hospitality & Tourism"
];

const trendingCoursesData = [
  {
    title: "Nursing Bridging Course (NBC) – MQF Level 5",
    category: "Nursing & Healthcare",
    college: "La Vallette & Uniplural Academy",
    duration: "6 – 12 Months",
    fee: "€5,500",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910056/Nursing_Bridging_Course_by_the_Waterfront.png"
  },
  {
    title: "B.Sc. in Nursing Studies (EU Registered Nurse)",
    category: "Nursing & Healthcare",
    college: "La Vallette Institute (St James Partner)",
    duration: "3 Years (180 ECTS)",
    fee: "€7,000 / Yr",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910058/Nursing_Studies_Vaccination_Banner.png"
  },
  {
    title: "Complete UK MBA Pathway (Dual Award Level 7)",
    category: "Business & MBA",
    college: "Avanza Academy & Cardiff Met (UK)",
    duration: "18 Months",
    fee: "€12,000 Total",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910062/Complete_UK_MBA_Pathway.png"
  },
  {
    title: "B.Sc. in Software Design, AI & Cloud Computing",
    category: "IT, AI & Cloud",
    college: "Learn Key Training Institute",
    duration: "3 Years (180 ECTS)",
    fee: "€6,500 (Yr 1)",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910056/B.Sc._Software_Design__AI_Cloud_Computing.png"
  },
  {
    title: "B.Sc. (Hons) Hospitality & Tourism Management",
    category: "Hospitality & Tourism",
    college: "La Vallette & EEC-ITIS Malta",
    duration: "3 Years",
    fee: "€8,000 (Yr 1)",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910057/Luxury_Hospitality_Tourism_Program.png"
  },
  {
    title: "PG Diploma in Logistics & Supply Chain Crisis Mgmt",
    category: "Business & MBA",
    college: "Malita College & La Vallette",
    duration: "1 Year (Level 7)",
    fee: "€6,500",
    image: "https://res.cloudinary.com/ppkvzeli/image/upload/v1794910057/Logistics_and_Supply_Chain_Diploma_Banner.png"
  }
];

const TrendingCoursesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Trending");

  const filteredCourses = selectedCategory === "All Trending"
    ? trendingCoursesData
    : trendingCoursesData.filter(c => c.category === selectedCategory);

  return (
    <section className="py-24 px-4 md:px-12 bg-[#f8f9fc] border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
          Explore <RedUnderline>Popular Courses</RedUnderline> to Study in Malta
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 bg-white p-2 rounded-full max-w-4xl mx-auto shadow-sm border border-gray-200/80">
          {courseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all group"
            >
              {/* HEIGHT BADHAYA (h-60) TAAKI IMAGE ACHI LAGE */}
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  /* OBJECT-TOP ADD KIYA HAI TAAKI UPAR KA TEXT KABHI NA KATE */
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-[11px] font-extrabold px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow">
                  {course.fee}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {course.college} • {course.duration}
                </p>
                <h3 className="text-lg font-extrabold text-gray-900 mb-4 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {course.title}
                </h3>
                <Link 
                  to="/institutions" 
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-red-600 hover:text-red-700"
                >
                  View Modules & Career Salaries <FaArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCoursesSection;