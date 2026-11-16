import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaGlobe,
  FaChevronDown,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaPhoneVolume
} from 'react-icons/fa';

const inputBase =
  'peer w-full bg-white text-[#0f2547] placeholder-gray-400 text-sm font-semibold pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm outline-none transition-all duration-200 hover:border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10';

const iconBase =
  'absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-red-600 transition-colors pointer-events-none';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    city: '',
    visaType: '',
    destination: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setStatus('Success! We will contact you soon.');
        setFormData({ fullName: '', phoneNumber: '', email: '', city: '', visaType: '', destination: '' });
      } else {
        setStatus('Failed to submit form.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = status && status.includes('Success');
  const isPending = status === 'Submitting...';

  return (
    <section className="relative py-24 px-4 md:px-12 bg-[#f8f9fc] overflow-hidden">
      {/* Soft background glows */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-red-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] bg-[#1b365d]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-[#1b365d]/10 border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* ============ LEFT: FORM ============ */}
        <div className="lg:col-span-7 p-8 md:p-12 lg:p-14">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest">Contact</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2547] leading-tight tracking-tight">
            Have Questions? <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Let's Talk.
            </span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-3 max-w-md leading-relaxed">
            Fill in your details and our Malta expert will call you back with a free profile assessment.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  required
                  className={inputBase}
                />
                <FaUser className={iconBase} />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  required
                  className={inputBase}
                />
                <FaPhone className={iconBase} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your E-mail Id"
                  required
                  className={inputBase}
                />
                <FaEnvelope className={iconBase} />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your City"
                  required
                  className={inputBase}
                />
                <FaMapMarkerAlt className={iconBase} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <select
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleChange}
                  required
                  className={`${inputBase} appearance-none cursor-pointer pr-10 ${
                    formData.visaType === '' ? 'text-gray-400' : ''
                  }`}
                >
                  <option value="" disabled>Choose your visa</option>
                  <option value="Study Visa">Study Visa</option>
                  <option value="Tourist Visa">Tourist Visa</option>
                </select>
                <FaIdCard className={iconBase} />
                <FaChevronDown size={11} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className={`${inputBase} appearance-none cursor-pointer pr-10 ${
                    formData.destination === '' ? 'text-gray-400' : ''
                  }`}
                >
                  <option value="" disabled>Select Preferred Destination</option>
                  <option value="Malta">Malta</option>
                  <option value="Other">Other</option>
                </select>
                <FaGlobe className={iconBase} />
                <FaChevronDown size={11} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold px-9 py-4 rounded-2xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit Now'}
                {!loading && <FaArrowRight size={13} />}
              </motion.button>
              <p className="text-xs text-gray-400 font-medium">100% free • No spam, ever.</p>
            </div>

            <AnimatePresence>
              {status && !isPending && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold border ${
                    isSuccess
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-600 border-red-200'
                  }`}
                >
                  {isSuccess ? <FaCheckCircle size={18} /> : <FaExclamationCircle size={18} />}
                  {status}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* ============ RIGHT: IMAGE PANEL ============ */}
        <div className="hidden lg:block lg:col-span-5 relative min-h-[560px]">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
            alt="Students"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b33]/90 via-[#0b1b33]/30 to-[#1b365d]/10" />

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <FaPhoneVolume size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Call Back In</p>
              <p className="text-sm font-extrabold text-[#1b365d]">Under 24 Hours</p>
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="bg-red-600 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
              Malta • Schengen • EU
            </span>
            <h3 className="text-2xl font-extrabold mt-3 leading-tight">
              Your European degree starts with one message.
            </h3>
            <p className="text-sm text-gray-200 mt-2 leading-relaxed">
              Without IELTS, pay tuition after visa, and a team that guides you till you land.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
