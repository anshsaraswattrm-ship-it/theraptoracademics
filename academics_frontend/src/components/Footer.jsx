import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaChevronRight 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import the logo from assets folder
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-gray-300 pt-20 pb-8 px-4 md:px-12 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* 1. Brand Information */}
        <div className="space-y-6 lg:pr-8">
          <Link to="/" className="flex items-center gap-2 cursor-pointer mb-2">
            <img 
              src={logo} 
              alt="The Raptor Academics Logo" 
              className="w-48 md:w-60 object-contain" 
            />
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            Expert guidance and trusted support for your study abroad journey. We turn your international education goals into reality with seamless visa and university assistance.
          </p>
          
          {/* Luxury Style Social Icons */}
          <div className="flex gap-3 pt-2">
            {[
              { icon: FaFacebookF, link: "#" },
              { icon: FaInstagram, link: "#" },
              { icon: FaLinkedinIn, link: "#" },
              { icon: FaYoutube, link: "#" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span> Quick Links
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about-us' },
              { name: 'Institutions', path: '/institutions' },
              { name: "FAQ's", path: '#' },
              { name: 'Overseas Education Consultants In Jaipur', path: '#' }
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.path} className="group flex items-center gap-2 hover:text-red-500 transition-all duration-300">
                  <FaChevronRight className="text-[10px] text-gray-700 group-hover:text-red-500 transition-colors" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Our Services */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span> Our Services
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            {['Study Visa', 'Tourist Visa', 'Business Visa', 'Free Counselling'].map((service, i) => (
              <li key={i}>
                <a href="#" className="group flex items-center gap-2 hover:text-red-500 transition-all duration-300">
                  <FaChevronRight className="text-[10px] text-gray-700 group-hover:text-red-500 transition-colors" />
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Contact Us */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span> Contact Us
          </h4>
          <div className="space-y-5 text-sm text-gray-400">
            
            <div className="flex items-start gap-4 hover:text-white transition-colors cursor-default">
              <div className="bg-gray-900 p-3 rounded-lg text-red-600 shrink-0"><FaMapMarkerAlt size={16} /></div>
              <p className="leading-relaxed mt-1">120/64, New Sanganer Rd, Sector 12, Mansarovar, Jaipur 302020</p>
            </div>
            
            <div className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
              <div className="bg-gray-900 p-3 rounded-lg text-red-600 shrink-0"><FaPhoneAlt size={16} /></div>
              <p className="font-semibold tracking-wider">(+91) 72320 10105</p>
            </div>
            
            <div className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
              <div className="bg-gray-900 p-3 rounded-lg text-red-600 shrink-0"><FaEnvelope size={16} /></div>
              <a href="mailto:theraptoracademics@gmail.com" className="hover:text-red-500 transition-colors">theraptoracademics@gmail.com</a>
            </div>

          </div>
        </div>
        
      </div>

      {/* Bottom Bar: Copyright & Developer Credit */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-gray-300 font-bold hover:text-white transition cursor-pointer tracking-wide">The Raptor Academics</span>. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          Developed By 
          <a href="https://theraptormarketing.com" target="_blank" rel="noreferrer" className="text-gray-300 font-bold hover:text-red-600 transition-colors ml-1">
            The Raptor Marketing
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;