import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Top Header & Map Section */}
        <section className="pt-40 md:pt-48 pb-16 px-4 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text & Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                ★ QUICK CONTACT ★
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Have Questions? <br/>
                <span className="text-gray-500 font-light">Don't Hesitate To Contact Us</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                We'd love to hear from you and help you take the next step toward your international dream. Reach out to us today and let's make your study abroad journey seamless and successful.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               {/* Location Card */}
               <div className="flex gap-4 sm:col-span-2">
                  <div className="bg-red-50 p-4 rounded-xl text-red-600 self-start shrink-0">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Location</h4>
                    <p className="text-gray-600 leading-relaxed">120/64, New Sanganer Rd, Mansarover, Sector 12, Mansarovar, Jaipur, Rajasthan 302020</p>
                  </div>
               </div>

               {/* Phone & Email Card */}
               <div className="flex gap-4">
                  <div className="bg-red-50 p-4 rounded-xl text-red-600 self-start shrink-0">
                    <FaPhoneAlt size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Quick Contact</h4>
                    <p className="text-gray-900 font-semibold mb-1">Phone:</p>
                    <p className="text-gray-600 mb-3">(+91) 72320 10105</p>
                    <p className="text-gray-900 font-semibold mb-1">Email:</p>
                    <a href="mailto:theraptoracademics@gmail.com" className="text-red-600 hover:underline">theraptoracademics@gmail.com</a>
                  </div>
               </div>

               {/* Opening Hours Card */}
               <div className="flex gap-4">
                  <div className="bg-red-50 p-4 rounded-xl text-red-600 self-start shrink-0">
                    <FaClock size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Opening Hrs</h4>
                    <p className="text-gray-900 font-semibold mb-1 flex items-center gap-2"><FaCalendarAlt className="text-red-600"/> Mon-Saturday:</p>
                    <p className="text-gray-600 mb-3 pl-6">10.00 am to 06.00 pm</p>
                    <p className="text-gray-900 font-semibold mb-1 flex items-center gap-2"><FaCalendarAlt className="text-gray-400"/> Sunday:</p>
                    <p className="text-red-600 font-semibold pl-6">Close</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right: Google Map iframe */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full h-[520px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <iframe 
              title="The Raptor Academics Jaipur Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.852888108025!2d75.76311427934571!3d26.844631000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5333730590d%3A0x4229b41592a270bd!2sThe%20Raptor%20Academics%20Jaipur!5e0!3m2!1sen!2sin!4v1794914726534!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </motion.div>

        </section>

        {/* Contact Form Section (Zero bottom margin so it attaches cleanly to footer) */}
        <div className="mt-0 mb-0">
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;