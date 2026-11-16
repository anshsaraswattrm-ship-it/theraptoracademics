import React, { useState } from 'react';
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
  FaUserCheck
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { institutionsData } from '../data/institutionsData'; 

const CourseAccordion = ({ course, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-2xl mb-4 overflow-hidden shadow-sm bg-white hover:border-red-200 transition-colors">
      <button 
        onClick={onToggle} 
        className="w-full bg-gray-50/80 p-5 text-left font-bold text-gray-900 flex justify-between items-center hover:bg-red-50/40 transition"
      >
        <span className="pr-4 leading-snug text-base md:text-lg">{course.title}</span>
        {isOpen ? <FaChevronDown className="text-red-600 shrink-0" /> : <FaChevronRight className="text-gray-400 shrink-0" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <div className="p-6 md:p-8 space-y-8 border-t border-gray-100">
              
              {/* Overview */}
              {course.overview && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-base">
                    <FaGraduationCap className="text-red-600" /> Course Overview
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{course.overview}</p>
                </div>
              )}

              {/* Key Program Details Grid */}
              {course.keyDetails && course.keyDetails.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-base">Key Program Details</h4>
                  <div className="bg-gray-50 p-5 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-100">
                    {course.keyDetails.map((detail, idx) => (
                      <div key={idx}>
                        <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">{detail.label}</span>
                        <span className="block text-sm font-semibold text-gray-800 mt-1">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fee Structure & Additional Costs Table */}
              {course.feeStructure && course.feeStructure.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <FaEuroSign className="text-red-600" /> Fee Structure & Additional Costs
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-100 text-gray-700">
                        <tr>
                          <th className="p-3.5 font-bold border-b border-gray-200">Fee Category</th>
                          <th className="p-3.5 font-bold border-b border-gray-200">Amount (EUR)</th>
                          <th className="p-3.5 font-bold border-b border-gray-200">Details / Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.feeStructure.map((fee, idx) => (
                          <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                            <td className="p-3.5 font-semibold text-gray-900">{fee.category}</td>
                            <td className="p-3.5 font-bold text-red-600">{fee.amount}</td>
                            <td className="p-3.5 text-gray-600">{fee.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Entry Requirements & Target Audience */}
              {course.entryRequirements && course.entryRequirements.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <FaUserCheck className="text-red-600" /> Entry Requirements & Eligibility Streams
                  </h4>
                  <ul className="space-y-2.5 bg-red-50/40 p-5 rounded-xl border border-red-100">
                    {course.entryRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Core Modules */}
              {course.modules && course.modules.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-base">Core Curriculum & Modules</h4>
                  <ul className="space-y-3">
                    {course.modules.map((mod, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <FaCheckCircle className="text-red-600 mt-1 shrink-0" />
                        <span className="leading-relaxed">{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What You Will Learn / Learning Outcomes */}
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <FaLightbulb className="text-red-600" /> What You Will Learn & Core Competencies
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <li key={idx} className="bg-gray-50 p-3.5 rounded-lg border border-gray-100 text-sm text-gray-700 leading-relaxed">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Assessment & Grading Structure */}
              {(course.assessmentSummary || (course.grading && course.grading.length > 0)) && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-base">
                    <FaClipboardCheck className="text-red-600" /> Assessment & Grading Framework
                  </h4>
                  {course.assessmentSummary && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{course.assessmentSummary}</p>
                  )}
                  {course.grading && course.grading.length > 0 && (
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700">
                          <tr>
                            <th className="p-3.5 font-bold border-b border-gray-200">Grade / Stage</th>
                            <th className="p-3.5 font-bold border-b border-gray-200">Range / Strategy</th>
                            <th className="p-3.5 font-bold border-b border-gray-200">Description / Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {course.grading.map((g, idx) => (
                            <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                              <td className="p-3.5 font-bold text-gray-900">{g.grade}</td>
                              <td className="p-3.5 text-gray-700">{g.range}</td>
                              <td className="p-3.5 text-gray-600">{g.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Target Industries */}
              {course.targetIndustries && course.targetIndustries.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider text-gray-500">Target Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.targetIndustries.map((ind, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Opportunities Table */}
              {course.careers && course.careers.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base">
                    <FaBriefcase className="text-red-600" /> Career Opportunities & Schengen Salaries
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-100 text-gray-700">
                        <tr>
                          <th className="p-3.5 font-bold border-b border-gray-200">Profession / Role</th>
                          <th className="p-3.5 font-bold border-b border-gray-200">Target Sector / Focus</th>
                          <th className="p-3.5 font-bold border-b border-gray-200">Starting Salary (p.a.)</th>
                          <th className="p-3.5 font-bold border-b border-gray-200">Mid / Senior Salary (p.a.)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.careers.map((career, idx) => (
                          <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                            <td className="p-3.5 font-semibold text-gray-900">{career.role}</td>
                            <td className="p-3.5 text-gray-600">{career.sector || '-'}</td>
                            <td className="p-3.5 font-medium text-gray-800">{career.startSalary || career.salary}</td>
                            <td className="p-3.5 text-gray-600">{career.midSalary || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {course.note && (
                    <p className="text-xs text-gray-500 italic mt-2">Note: {course.note}</p>
                  )}
                </div>
              )}

              {/* Key Academic & Financial Benefits */}
              {course.benefits && course.benefits.length > 0 && (
                <div className="bg-gray-900 text-white p-5 rounded-xl space-y-2.5">
                  <h4 className="font-bold text-red-500 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <FaStar /> Key Academic, Financial & Progression Highlights
                  </h4>
                  <ul className="space-y-2">
                    {course.benefits.map((b, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2.5">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Institutions = () => {
  const [activeCollege, setActiveCollege] = useState(institutionsData[0]);
  const [openCourseIndex, setOpenCourseIndex] = useState(0);

  const handleCollegeChange = (college) => {
    setActiveCollege(college);
    setOpenCourseIndex(0); 
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const toggleCourse = (index) => {
    setOpenCourseIndex(openCourseIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Premium Header Section */}
      <section className="relative pt-44 pb-20 bg-gray-900 overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80" 
            alt="University Campus" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm mb-4 drop-shadow-md">
              ★ Global Education Network ★
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              Our Partner Institutions
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Explore top licensed universities and MFHEA-accredited higher education institutes in Malta. 
              We connect ambition with world-class academic excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Split Layout */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 flex flex-col lg:flex-row gap-10 items-start -mt-8 relative z-20">
        
        {/* Left Sticky Sidebar (College List) */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2 pl-2">Select College ({institutionsData.length})</p>
          {institutionsData.map((college) => (
            <button
              key={college.id}
              onClick={() => handleCollegeChange(college)}
              className={`text-left px-4 py-3.5 rounded-xl transition-all font-semibold flex items-center justify-between group text-sm ${
                activeCollege.id === college.id 
                  ? 'bg-red-600 text-white shadow-md transform scale-[1.02]' 
                  : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <span className="truncate pr-4 leading-snug">{college.name.split('–')[0]}</span>
              {activeCollege.id === college.id && <FaChevronRight size={12} className="shrink-0" />}
            </button>
          ))}
        </div>

        {/* Right Dynamic Content Area */}
        <div className="w-full lg:w-2/3 min-h-[800px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCollege.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* College Header Card */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 mb-8">
                {activeCollege.seoCategory && (
                  <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
                    {activeCollege.seoCategory}
                  </p>
                )}
                <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {activeCollege.name}
                </h2>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-xs md:text-sm font-semibold border border-gray-200">
                    <FaMapMarkerAlt className="text-red-600" /> {activeCollege.location}
                  </span>
                  <span className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-xs md:text-sm font-semibold border border-red-100">
                    <FaAward className="text-red-600" /> {activeCollege.accreditation}
                  </span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold border-b-2 border-red-600 inline-block pb-1 mb-4 text-gray-900">About the Institution</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{activeCollege.about}</p>
                </div>

                {activeCollege.flagshipCourses && (
                  <div className="mb-8 bg-red-50/60 border-l-4 border-red-600 p-4 rounded-r-xl">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">Flagship / Popular Courses</span>
                    <span className="text-sm font-semibold text-gray-900">{activeCollege.flagshipCourses}</span>
                  </div>
                )}

                {/* Complete Admission Highlights */}
                {activeCollege.highlights && (
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-lg font-bold mb-6 text-gray-900">Key Admission & Visa Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Intake Frequency</p>
                        <p className="font-semibold text-gray-800 mt-1 text-sm">{activeCollege.highlights.intake}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Eligibility & Age</p>
                        <p className="font-semibold text-gray-800 mt-1 text-sm">{activeCollege.highlights.eligibility}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Gap Acceptance</p>
                        <p className="font-semibold text-gray-800 mt-1 text-sm">{activeCollege.highlights.gap}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Language Test</p>
                        <p className="font-semibold text-red-600 mt-1 text-sm">{activeCollege.highlights.ielts}</p>
                      </div>
                      {activeCollege.highlights.interview && (
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Interview</p>
                          <p className="font-semibold text-gray-800 mt-1 text-sm">{activeCollege.highlights.interview}</p>
                        </div>
                      )}
                      {activeCollege.highlights.applicationFee && (
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Application / Admin Fee</p>
                          <p className="font-semibold text-gray-800 mt-1 text-sm">{activeCollege.highlights.applicationFee}</p>
                        </div>
                      )}
                      {activeCollege.highlights.processingSpeed && (
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Processing Speed</p>
                          <p className="font-semibold text-gray-800 mt-1 text-sm">{activeCollege.highlights.processingSpeed}</p>
                        </div>
                      )}
                      {activeCollege.highlights.accommodation && (
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Accommodation Support</p>
                          <p className="font-semibold text-gray-800 mt-1 text-sm">{activeCollege.highlights.accommodation}</p>
                        </div>
                      )}
                      {activeCollege.highlights.tuitionFeeSummary && (
                        <div className="sm:col-span-2 bg-white p-4 rounded-xl border border-gray-200">
                          <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">Tuition Fee Structure Overview</p>
                          <p className="font-semibold text-gray-800 mt-1 text-sm leading-relaxed">{activeCollege.highlights.tuitionFeeSummary}</p>
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Visa & Work Benefits</p>
                        <p className="font-semibold text-gray-800 mt-1 text-sm">{activeCollege.highlights.visa}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Courses Accordion Section */}
              {activeCollege.courses && activeCollege.courses.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 pl-2">
                    Offered Programs & Detailed Curriculum
                    <span className="bg-red-600 text-white text-sm py-1 px-3 rounded-full">{activeCollege.courses.length}</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {activeCollege.courses.map((course, index) => (
                      <CourseAccordion 
                        key={index}
                        course={course}
                        isOpen={openCourseIndex === index}
                        onToggle={() => toggleCourse(index)}
                      />
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Institutions;