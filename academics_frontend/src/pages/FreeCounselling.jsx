import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaGraduationCap,
  FaUserGraduate,
  FaLanguage,
  FaCheckCircle,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FreeCounselling = () => {
  const [formData, setFormData] = useState({
    visa: 'Study',
    intake: '',
    firstName: '',
    lastName: '',
    dob: '',
    contactNo: '',
    emailId: '',
    address: '',
    countryPreferred: 'Malta',
    coursePreferred: '',
    workExperience: '',
    educationBudget: '',
    education: {
      tenth: { subjectStream: '', score: '', startDate: '', endDate: '', universityBoard: '' },
      twelfth: { subjectStream: '', score: '', startDate: '', endDate: '', universityBoard: '' },
      graduation: { subjectStream: '', score: '', startDate: '', endDate: '', universityBoard: '' },
      other: { subjectStream: '', score: '', startDate: '', endDate: '', universityBoard: '' },
    },
    ielts: { overall: '', reading: '', writing: '', speaking: '', listening: '' },
    optInScholarshipNews: false
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBasicChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedChange = (category, level, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [level]: { ...prev[category][level], [field]: value }
      }
    }));
  };

  const handleIeltsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      ielts: { ...prev.ielts, [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting...');
    try {
      const response = await fetch('https://theraptoracademics.onrender.com/api/counselling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setStatus('Application Submitted Successfully!');
      } else {
        setStatus('Submission failed.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error connecting to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-200 text-[#0f2547] font-medium focus:bg-white focus:border-[#0f2547] focus:ring-2 focus:ring-[#0f2547]/10 focus:outline-none transition-all';

  const tableInputClass =
    'w-full px-3 py-2 text-xs md:text-sm rounded-lg bg-slate-50 border border-slate-200 text-[#0f2547] font-medium focus:bg-white focus:border-[#0f2547] focus:outline-none transition-all';

  const labelClass =
    'block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5';

  const qualificationRows = [
    { key: 'tenth', label: '10th Standard' },
    { key: 'twelfth', label: '12th / Higher Secondary' },
    { key: 'graduation', label: 'Graduation / Diploma' },
    { key: 'other', label: 'Other / Post-Grad' }
  ];

  const isSuccess = typeof status === 'string' && status.includes('Successfully');

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-[#0b1930] text-white overflow-hidden px-4 md:px-10">
        <div className="absolute -top-24 right-1/4 w-[480px] h-[480px] bg-red-600/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-8 space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-300 font-extrabold uppercase tracking-widest text-xs">
                2027 Study Abroad Desk • Jaipur & Pan-India
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight">
              Free Study Abroad <span className="text-red-500">Counselling</span> Jaipur
            </h1>

            <p className="text-blue-100/85 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              Share your academic profile, target intake, and preferred programme for 2027 Malta admissions—get clear guidance on eligibility, study gaps, no-IELTS pathways, and tuition-after-visa options.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 space-y-3.5 shadow-2xl">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-400 block">
                Jaipur Counseling Desk
              </span>
              <div className="flex items-start gap-2.5 text-xs text-blue-100">
                <FaMapMarkerAlt className="text-red-400 mt-0.5 shrink-0" size={14} />
                <span>120/64, New Sanganer Rd, Sector 12, Mansarovar, Jaipur</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-blue-100 font-bold">
                <FaPhoneAlt className="text-emerald-400 shrink-0" size={13} />
                <a href="tel:+917232010105" className="hover:text-white">
                  (+91) 72320 10105
                </a>
              </div>
              <div className="pt-2 border-t border-white/15 flex items-center gap-2 text-xs text-emerald-300 font-bold">
                <FaCheckCircle className="shrink-0" />
                <span>100% Free Profile Assessment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN FORM CONTAINER */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 -mt-10 pb-20 relative z-20">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: BASIC & ADMISSION INFORMATION */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/90 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-[#0f2547] text-white text-xs font-black flex items-center justify-center">
                01
              </span>
              <div>
                <h2 className="text-lg md:text-xl font-black text-[#0f2547] flex items-center gap-2">
                  <FaGraduationCap className="text-red-600" /> Basic & 2027 Admission Preferences
                </h2>
                <p className="text-xs text-slate-500">
                  Tell us your contact details, preferred intake, and study goals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Choose Your Visa</label>
                <select
                  name="visa"
                  value={formData.visa}
                  onChange={handleBasicChange}
                  className={inputClass}
                >
                  <option value="">Choose your visa</option>
                  <option value="Study">Study Visa</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Intake (2027)</label>
                <input
                  type="text"
                  name="intake"
                  value={formData.intake}
                  placeholder="e.g. Jan / Apr / Jul / Oct 2027"
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="Enter first name"
                  required
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Enter last name"
                  required
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Contact No / WhatsApp <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  placeholder="+91 98765 43210"
                  required
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Email ID <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  placeholder="Enter your email"
                  required
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Date Of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Country Preferred</label>
                <input
                  type="text"
                  name="countryPreferred"
                  value={formData.countryPreferred}
                  placeholder="e.g. Malta"
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Course Preferred</label>
                <input
                  type="text"
                  name="coursePreferred"
                  value={formData.coursePreferred}
                  placeholder="e.g. Nursing, MBA, IT/AI, Hospitality"
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Work Experience</label>
                <input
                  type="text"
                  name="workExperience"
                  value={formData.workExperience}
                  placeholder="e.g. Fresher or 2 years in healthcare/IT"
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Education Budget</label>
                <input
                  type="text"
                  name="educationBudget"
                  value={formData.educationBudget}
                  placeholder="e.g. €6,500 – €8,000 / Tuition after visa"
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  placeholder="Enter your current city & address"
                  rows="3"
                  onChange={handleBasicChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: EDUCATION DETAILS */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/90 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-[#0f2547] text-white text-xs font-black flex items-center justify-center">
                02
              </span>
              <div>
                <h2 className="text-lg md:text-xl font-black text-[#0f2547] flex items-center gap-2">
                  <FaUserGraduate className="text-red-600" /> Education Details
                </h2>
                <p className="text-xs text-slate-500">
                  Add your completed qualifications, scores/CGPA, and board/university details.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr className="bg-[#0f2547] text-white text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 font-extrabold">Qualification</th>
                    <th className="p-3.5 font-extrabold">Subject / Stream</th>
                    <th className="p-3.5 font-extrabold">% Or CGPA</th>
                    <th className="p-3.5 font-extrabold">Start Date</th>
                    <th className="p-3.5 font-extrabold">End Date</th>
                    <th className="p-3.5 font-extrabold">University / Board</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {qualificationRows.map(({ key, label }) => (
                    <tr key={key} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-extrabold text-xs md:text-sm text-[#0f2547] whitespace-nowrap">
                        {label}
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={formData.education[key].subjectStream}
                          placeholder="Stream / Subject"
                          onChange={(e) =>
                            handleNestedChange('education', key, 'subjectStream', e.target.value)
                          }
                          className={tableInputClass}
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={formData.education[key].score}
                          placeholder="% / CGPA"
                          onChange={(e) =>
                            handleNestedChange('education', key, 'score', e.target.value)
                          }
                          className={tableInputClass}
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="date"
                          value={formData.education[key].startDate}
                          onChange={(e) =>
                            handleNestedChange('education', key, 'startDate', e.target.value)
                          }
                          className={tableInputClass}
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="date"
                          value={formData.education[key].endDate}
                          onChange={(e) =>
                            handleNestedChange('education', key, 'endDate', e.target.value)
                          }
                          className={tableInputClass}
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={formData.education[key].universityBoard}
                          placeholder="Board / University"
                          onChange={(e) =>
                            handleNestedChange('education', key, 'universityBoard', e.target.value)
                          }
                          className={tableInputClass}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 3: LANGUAGE SCORE */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/90 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-[#0f2547] text-white text-xs font-black flex items-center justify-center">
                03
              </span>
              <div>
                <h2 className="text-lg md:text-xl font-black text-[#0f2547] flex items-center gap-2">
                  <FaLanguage className="text-red-600" /> Language Score (Optional)
                </h2>
                <p className="text-xs text-slate-500">
                  Leave blank if applying under No-IELTS or MOI pathways.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-center border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[#0f2547] text-white text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 font-extrabold text-left">Test</th>
                    <th className="p-3.5 font-extrabold">Overall</th>
                    <th className="p-3.5 font-extrabold">Reading</th>
                    <th className="p-3.5 font-extrabold">Writing</th>
                    <th className="p-3.5 font-extrabold">Speaking</th>
                    <th className="p-3.5 font-extrabold">Listening</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-extrabold text-xs md:text-sm text-[#0f2547] text-left whitespace-nowrap">
                      IELTS / English
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={formData.ielts.overall}
                        placeholder="e.g. 6.0"
                        onChange={(e) => handleIeltsChange('overall', e.target.value)}
                        className={tableInputClass}
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={formData.ielts.reading}
                        placeholder="R"
                        onChange={(e) => handleIeltsChange('reading', e.target.value)}
                        className={tableInputClass}
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={formData.ielts.writing}
                        placeholder="W"
                        onChange={(e) => handleIeltsChange('writing', e.target.value)}
                        className={tableInputClass}
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={formData.ielts.speaking}
                        placeholder="S"
                        onChange={(e) => handleIeltsChange('speaking', e.target.value)}
                        className={tableInputClass}
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={formData.ielts.listening}
                        placeholder="L"
                        onChange={(e) => handleIeltsChange('listening', e.target.value)}
                        className={tableInputClass}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 4: CONSENT & SUBMIT */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/90 space-y-5">
            <label className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 cursor-pointer leading-relaxed">
              <input
                type="checkbox"
                name="optInScholarshipNews"
                checked={formData.optInScholarshipNews}
                onChange={handleBasicChange}
                className="mt-1 w-4 h-4 rounded accent-red-600 shrink-0 cursor-pointer"
              />
              <span>
                Keep me informed of scholarship news and special offers. By clicking submit, I agree to The Raptor Academics{' '}
                <Link to="/terms-and-conditions" className="text-red-600 font-bold hover:underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-red-600 font-bold hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <FaShieldAlt className="text-[#0f2547] shrink-0" size={14} />
                <span>Your details are used strictly for your 2027 study abroad counselling request.</span>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-[#0f2547] disabled:opacity-60 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                <FaArrowRight size={12} />
              </button>
            </div>

            {status && (
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 ${
                  isSuccess
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : status === 'Submitting...'
                    ? 'bg-blue-50 text-[#0f2547] border border-blue-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {isSuccess && <FaCheckCircle className="text-emerald-600 shrink-0" />}
                <span>{status}</span>
              </div>
            )}
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default FreeCounselling;