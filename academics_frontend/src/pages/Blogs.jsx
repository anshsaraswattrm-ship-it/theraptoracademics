import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaArrowRight, FaClock, FaBookOpen, FaTag } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { blogsData } from '../data/blogsData';

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Malta Admissions & Visa',
    '2027 Intakes & Deadlines',
    'Budget & Country Comparisons',
    'Study Gap & Documents'
  ];

  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesCat =
        selectedCategory === 'All' || blog.category === selectedCategory;
      const haystack = `${blog.title} ${blog.metaDescription} ${blog.category}`.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() || haystack.includes(searchQuery.toLowerCase().trim());
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredBlog = blogsData[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <SEO
        title="Study Abroad & Malta Visa Blog (2027 Guides) | The Raptor Academics"
        description="Read honest, research-backed guides on Study in Malta, 2027 intakes, Type D student visa documents, study gap letters, and affordable European study destinations."
        keywords="Study in Malta Blog, Malta Student Visa Guide 2027, Study Abroad Intakes 2027, Study Gap Malta Visa, The Raptor Academics Blog Jaipur"
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-[#0b1930] text-white overflow-hidden px-4 md:px-12">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-5">
          <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
            <FaBookOpen size={12} /> 2027 Study Abroad Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Honest Guides for <span className="text-red-500">Malta & Europe</span> Aspirants
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            No exaggerated promises—just clear, verified answers on 2027 intakes, Identità visa checklists, study gaps, and total budget planning from our Jaipur counselling desk.
          </p>
        </div>
      </section>

      {/* Search & Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-5 md:p-7 shadow-xl shadow-slate-900/5 border border-slate-200/90 space-y-5">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles — e.g. February 2027 intake, Type D visa, study gap, UK vs Malta..."
              className="w-full pl-11 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm md:text-base text-[#0f2547] font-medium focus:bg-white focus:border-[#0f2547] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-red-600 px-3 py-1.5 rounded-lg bg-slate-200/70 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0f2547] text-white border-[#0f2547] shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400">
              Showing {filteredBlogs.length} of {blogsData.length} guides
            </span>
          </div>
        </div>
      </section>

      {/* Featured Guide (Only shown when All & no search query) */}
      {selectedCategory === 'All' && !searchQuery.trim() && (
        <section className="max-w-7xl mx-auto px-4 md:px-12 pt-12">
          <Link
            to={`/blogs/${featuredBlog.slug}`}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            <div className="lg:col-span-6 relative min-h-[280px] overflow-hidden">
              <img
                src={featuredBlog.coverImage}
                alt={featuredBlog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                ★ Featured 2027 Guide
              </span>
            </div>
            <div className="lg:col-span-6 p-7 md:p-10 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
                  <span className="text-red-600 uppercase tracking-wider">{featuredBlog.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FaClock size={11} /> {featuredBlog.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[#0f2547] group-hover:text-red-600 transition-colors leading-snug">
                  {featuredBlog.title}
                </h2>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {featuredBlog.metaDescription}
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-sm font-extrabold text-[#0f2547] group-hover:text-red-600 transition-colors">
                Read Complete Guide <FaArrowRight size={12} />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-14 md:py-16">
        {filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <h3 className="text-xl font-extrabold text-[#0f2547]">No matching articles found</h3>
            <p className="text-slate-500 text-sm">Try clearing your search or selecting another category.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-[#0f2547] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Show All Guides
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredBlogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-red-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 bg-[#0f2547]/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                        <FaClock size={11} className="text-red-500" />
                        <span>{blog.readTime}</span>
                        <span>•</span>
                        <span>{blog.faqs.length} FAQs Included</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-extrabold text-[#0f2547] group-hover:text-red-600 transition-colors leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                        {blog.metaDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#0f2547] group-hover:text-red-600">
                      <span>Read Full Guide</span>
                      <FaArrowRight size={11} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;