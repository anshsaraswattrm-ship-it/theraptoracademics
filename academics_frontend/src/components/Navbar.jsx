import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.png'; 

// Phone number (display + dial link)
const PHONE_DISPLAY = '(+91) 72320 10105';
const PHONE_LINK = 'tel:+917232010105';

// Apne links yahan daal dena (href: '#' ki jagah)
const socialLinks = [
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/theraptoracademics?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw==', hover: 'hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-purple-600' },
  { name: 'Facebook', icon: FaFacebookF, href: 'https://www.facebook.com/raptoracademics', hover: 'hover:bg-[#1877f2]' },
  { name: 'LinkedIn', icon: FaLinkedinIn, href: ' https://www.linkedin.com/company/the-raptor-academics', hover: 'hover:bg-[#0a66c2]' },
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/917232010105', hover: 'hover:bg-[#25d366]' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full fixed top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="px-4 md:px-12 py-4 flex justify-between items-center md:grid md:grid-cols-[1fr_auto_1fr]">
        
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer justify-self-start">
          <img 
            src={logo} 
            alt="The Raptor Academics Logo" 
            className="w-48 md:w-60 object-contain" 
          />
        </Link>

        {/* Desktop Links (Deep Logo Blue #1b365d + Red Hover) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-[#1b365d]">
          <Link to="/" className="text-red-600 hover:text-[#1b365d] transition">Home</Link>
          <Link to="/about-us" className="hover:text-red-600 transition">About Us</Link>
          <Link to="/institutions" className="hover:text-red-600 transition">Institutions</Link>
          
          <div className="group relative flex items-center gap-1 cursor-pointer hover:text-red-600 transition">
            Visa <ChevronDown size={16} />
          </div>
          <a href="#" className="hover:text-red-600 transition">Blogs</a>
          <Link to="/contact-us" className="hover:text-red-600 transition">Contact Us</Link>
        </div>

        {/* Socials + Click-to-Call */}
        <div className="hidden md:flex items-center gap-5 justify-self-end">
          {/* Social icons (large screens) */}
          <div className="hidden xl:flex items-center gap-2">
            {socialLinks.map(({ name, icon: Icon, href, hover }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[#1b365d] bg-[#1b365d]/5 border border-[#1b365d]/10 hover:text-white hover:border-transparent hover:-translate-y-0.5 transition-all duration-300 ${hover}`}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <span className="hidden xl:block w-px h-8 bg-gray-200" />

          {/* Call pill */}
          <a
            href={PHONE_LINK}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="group flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full border border-gray-200 bg-white hover:border-red-200 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300"
          >
            <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center shadow-md shadow-red-600/30 shrink-0">
              <span className="absolute inset-0 rounded-full bg-red-600/40 animate-ping [animation-duration:2.5s]" />
              <FaPhoneAlt size={14} className="relative group-hover:rotate-12 transition-transform" />
            </span>
            <span className="text-sm font-extrabold text-[#1b365d] group-hover:text-red-600 transition-colors whitespace-nowrap">
              {PHONE_DISPLAY}
            </span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#1b365d]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white py-6 shadow-inner space-y-6 font-bold text-[#1b365d] border-t border-gray-100">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-red-600 hover:text-red-800 transition">Home</Link>
          <Link to="/about-us" onClick={() => setIsOpen(false)} className="hover:text-red-600 transition">About Us</Link>
          <Link to="/institutions" onClick={() => setIsOpen(false)} className="hover:text-red-600 transition">Institutions</Link>
          <a href="#" className="hover:text-red-600 transition">Visa</a>
          <a href="#" className="hover:text-red-600 transition">Blogs</a>
          <Link to="/contact-us" onClick={() => setIsOpen(false)} className="hover:text-red-600 transition">Contact Us</Link>

          {/* Mobile: tap to call */}
          <a
            href={PHONE_LINK}
            className="flex items-center gap-3 bg-red-600 text-white px-7 py-3 rounded-full shadow-lg shadow-red-600/30"
          >
            <FaPhoneAlt size={15} /> {PHONE_DISPLAY}
          </a>

          {/* Mobile: socials */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#1b365d] bg-[#1b365d]/5 border border-[#1b365d]/10 hover:bg-red-600 hover:text-white transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
