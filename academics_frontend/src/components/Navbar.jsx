import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.png';

const PHONE_DISPLAY = '(+91) 72320 10105';
const PHONE_LINK = 'tel:+917232010105';

const socialLinks = [
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/theraptoracademics?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw==', hover: 'hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-purple-600' },
  { name: 'Facebook', icon: FaFacebookF, href: 'https://www.facebook.com/raptoracademics', hover: 'hover:bg-[#1877f2]' },
  { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/the-raptor-academics', hover: 'hover:bg-[#0a66c2]' },
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/917232010105', hover: 'hover:bg-[#25d366]' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about-us' },
    { label: 'Institutions', to: '/institutions' },
    { label: 'Courses', to: '/courses' },
    { label: 'Blogs', to: '/blogs' },
    { label: 'News', to: '/malta-updates' },
    { label: 'Contact Us', to: '/contact-us' }
  ];

  const isLinkActive = (to) => {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="px-2.5 md:px-10 xl:px-10 py-2.5 flex justify-between items-center lg:grid lg:grid-cols-[1fr_auto_1fr] gap-3 md:gap-6">

        {/* Left: Mid-Sized Logo */}
        <Link to="/" className="flex items-center gap-2 pl-0.5 md:pl-0 cursor-pointer justify-self-start shrink-0">
          <img
            src={logo}
            alt="The Raptor Academics Logo"
            className="h-16 sm:h-[72px] md:h-[74px] xl:h-[84px] w-auto max-w-none object-contain"
          />
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 font-bold text-sm xl:text-[15px] text-[#1b365d]">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`whitespace-nowrap transition ${
                isLinkActive(to)
                  ? 'text-red-600'
                  : 'hover:text-red-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: Social Icons + Click-to-Call */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 justify-self-end shrink-0">
          <div className="flex items-center gap-1.5 xl:gap-2">
            {socialLinks.map(({ name, icon: Icon, href, hover }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className={`w-8 h-8 xl:w-9 xl:h-9 rounded-full flex items-center justify-center text-[#1b365d] bg-[#1b365d]/5 border border-[#1b365d]/10 hover:text-white hover:border-transparent hover:-translate-y-0.5 transition-all duration-300 ${hover}`}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          <span className="w-px h-7 bg-gray-200" />

          {/* Call pill */}
          <a
            href={PHONE_LINK}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="group flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border border-gray-200 bg-white hover:border-red-200 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300"
          >
            <span className="relative w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center shadow-md shadow-red-600/30 shrink-0">
              <span className="absolute inset-0 rounded-full bg-red-600/40 animate-ping [animation-duration:2.5s]" />
              <FaPhoneAlt size={13} className="relative group-hover:rotate-12 transition-transform" />
            </span>
            <span className="text-xs xl:text-sm font-extrabold text-[#1b365d] group-hover:text-red-600 transition-colors whitespace-nowrap">
              {PHONE_DISPLAY}
            </span>
          </a>
        </div>

        {/* Mobile / Tablet Toggle */}
        <button
          type="button"
          className="lg:hidden mr-1.5 md:mr-0 md:w-11 md:h-11 md:rounded-xl md:border md:border-gray-200 md:bg-white md:shadow-2xs flex items-center justify-center text-[#1b365d] hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer shrink-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-center bg-white py-6 shadow-inner space-y-5 font-bold text-[#1b365d] border-t border-gray-100">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={`transition ${
                isLinkActive(to)
                  ? 'text-red-600'
                  : 'hover:text-red-600'
              }`}
            >
              {label}
            </Link>
          ))}

          <a
            href={PHONE_LINK}
            className="flex items-center gap-3 bg-red-600 text-white px-7 py-3 rounded-full shadow-lg shadow-red-600/30"
          >
            <FaPhoneAlt size={15} /> {PHONE_DISPLAY}
          </a>

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