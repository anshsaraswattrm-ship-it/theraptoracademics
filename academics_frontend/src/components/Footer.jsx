import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

// Import the logo from assets folder
import logo from '../assets/logo.png';

const scrollPageToTop = () => {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

const Footer = () => {
  const { pathname } = useLocation();

  const handleHomeOrLogoClick = () => {
    if (pathname === '/') {
      scrollPageToTop();
    } else {
      setTimeout(scrollPageToTop, 50);
    }
  };

  const quickLinks = [
    { name: 'Home', path: '/', onClick: handleHomeOrLogoClick },
    { name: 'About Us', path: '/about-us' },
    { name: 'Institutions', path: '/institutions' },
    { name: 'Courses', path: '/courses' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'News', path: '/malta-updates' },
    { name: 'Contact Us', path: '/contact-us' }
  ];

  const servicesLinks = [
    { name: 'Study Visa', path: '/contact-us' },
    { name: 'Tourist Visa', path: '/contact-us' },
    { name: 'Free Counselling', path: '/free-counselling' }
  ];

  return (
    <footer className="w-full bg-[#f8fafc] text-[#334155] pt-20 pb-8 px-4 md:px-10 lg:px-20 border-t border-gray-200 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-x-10 md:gap-y-12 lg:gap-16 mb-16 items-start">

        {/* 1. Brand Information */}
        <div className="space-y-6 lg:pr-6 flex flex-col items-center text-center lg:items-start lg:text-left">
          <Link to="/" onClick={handleHomeOrLogoClick} className="inline-block mb-2 mx-auto lg:mx-0">
            <img
              src={logo}
              alt="The Raptor Academics Logo"
              className="w-52 md:w-56 lg:w-64 object-contain mx-auto"
            />
          </Link>
          <p className="text-sm leading-relaxed font-medium max-w-sm mx-auto lg:mx-0">
            Expert guidance and trusted support for your study abroad journey. We turn your international education goals into reality with seamless visa and university assistance.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 pt-2 justify-center lg:justify-start">
            {[
              { icon: FaFacebookF, link: "https://www.facebook.com/raptoracademics" },
              { icon: FaInstagram, link: "https://www.instagram.com/theraptoracademics?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw==" },
              { icon: FaLinkedinIn, link: "https://www.linkedin.com/company/the-raptor-academics" },
              { icon: FaWhatsapp, link: "https://wa.me/917232010105" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#0f2547] hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* 2 & 3 on Mobile: Quick Links (Left) + Our Services (Right) | md+: Separate Columns */}
        <div className="grid grid-cols-2 gap-6 md:contents">
          {/* 2. Quick Links */}
          <div className="md:pl-4 lg:pl-0">
            <h4 className="text-[#0f2547] font-extrabold text-lg mb-6 flex items-center gap-2.5">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span> Quick Links
            </h4>
            <ul className="space-y-3.5 text-sm font-semibold">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={link.onClick}
                    className="group flex items-center gap-2.5 hover:text-red-600 transition-all duration-300"
                  >
                    <FaChevronRight className="text-[10px] text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Our Services */}
          <div>
            <h4 className="text-[#0f2547] font-extrabold text-lg mb-6 flex items-center gap-2.5">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span> Our Services
            </h4>
            <ul className="space-y-4 text-sm font-semibold">
              {servicesLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="group flex items-center gap-2.5 hover:text-red-600 transition-all duration-300"
                  >
                    <FaChevronRight className="text-[10px] text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. Contact Us */}
        <div className="md:pl-4 lg:pl-0">
          <h4 className="text-[#0f2547] font-extrabold text-lg mb-6 flex items-center gap-2.5">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span> Contact Us
          </h4>
          <div className="space-y-5 text-sm font-semibold">

            <div className="flex items-start gap-4 hover:text-[#0f2547] transition-colors cursor-default group">
              <div className="bg-red-50 p-2.5 rounded-lg text-red-600 shrink-0 group-hover:scale-110 transition-transform"><FaMapMarkerAlt size={16} /></div>
              <p className="leading-relaxed mt-1">120/64, New Sanganer Rd, Sector 12, Mansarovar, Jaipur 302020</p>
            </div>

            <div className="flex items-center gap-4 hover:text-[#0f2547] transition-colors cursor-default group">
              <div className="bg-red-50 p-2.5 rounded-lg text-red-600 shrink-0 group-hover:scale-110 transition-transform"><FaPhoneAlt size={15} /></div>
              <a href="tel:+917232010105" className="tracking-wider hover:text-red-600 transition-colors">(+91) 72320 10105</a>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="bg-red-50 p-2.5 rounded-lg text-red-600 shrink-0 group-hover:scale-110 transition-transform"><FaEnvelope size={15} /></div>
              <a href="mailto:theraptoracademics@gmail.com" className="hover:text-red-600 transition-colors break-all md:break-normal">theraptoracademics@gmail.com</a>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Legal Links */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200 flex flex-col lg:flex-row justify-between items-center text-[13px] gap-6">
        <div className="text-center lg:text-left font-medium text-gray-500">
          Copyright &copy; 2024–{new Date().getFullYear()}. The Raptor Academics{' '}
          <a href="mailto:theraptoracademics@gmail.com" className="text-red-600 hover:text-red-700 font-bold ml-1 transition-colors">
            theraptoracademics@gmail.com
          </a>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-3 font-semibold text-[#0f2547]">
          <Link to="/student-care-process" className="hover:text-red-600 transition-colors">Student Care Process</Link>
          <Link to="/disclaimer" className="hover:text-red-600 transition-colors">Disclaimer</Link>
          <Link to="/privacy-policy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-red-600 transition-colors">Terms &amp; Conditions</Link>
          <Link to="/sitemap" className="hover:text-red-600 transition-colors">Sitemap</Link>
        </div>
      </div>

      {/* Developer Credit (Same font weight & color as copyright line) */}
      <div className="max-w-7xl mx-auto mt-6 text-center lg:text-right text-[13px] font-medium text-gray-500">
        Developed By{' '}
        <a
          href="https://theraptormarketing.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          The Raptor Marketing
        </a>
      </div>
    </footer>
  );
};

export default Footer;