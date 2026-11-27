import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaNewspaper,
  FaCheckCircle,
  FaShareAlt
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { maltaUpdatesData } from '../data/maltaUpdatesData';

const CATEGORIES = [
  'All Updates',
  'Fees and Tax',
  'Foreign Student Study',
  'Living and Market',
  'Education'
];

// ==========================================
// SEO META UPDATER HOOK
// ==========================================
const useSeoMeta = ({ title, description, keywords }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
    if (keywords) {
      let metaKeys = document.querySelector('meta[name="keywords"]');
      if (!metaKeys) {
        metaKeys = document.createElement('meta');
        metaKeys.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeys);
      }
      metaKeys.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);
};

// ==========================================
// FAQ ACCORDION ITEM
// ==========================================
const FaqItem = ({ faq }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 font-extrabold text-[#0f2547] text-sm md:text-base hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <span>{faq.question}</span>
        {open ? (
          <FaChevronUp className="text-red-600 shrink-0" size={12} />
        ) : (
          <FaChevronDown className="text-slate-400 shrink-0" size={12} />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-xs md:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

// ==========================================
// SINGLE ARTICLE VIEW (MSN READER LAYOUT)
// ==========================================
const ArticleReaderView = ({ article }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useSeoMeta({
    title: article.seo.seoTitle,
    description: article.seo.metaDescription,
    keywords: [article.seo.focusKeyphrase, ...(article.seo.secondaryKeywords || [])].join(', ')
  });

  const currentIndex = maltaUpdatesData.findIndex((a) => a.slug === article.slug);
  const nextArticle =
    maltaUpdatesData[(currentIndex + 1) % maltaUpdatesData.length];
  const prevArticle =
    maltaUpdatesData[(currentIndex - 1 + maltaUpdatesData.length) % maltaUpdatesData.length];

  const otherArticles = maltaUpdatesData.filter((a) => a.slug !== article.slug);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] font-sans">
      <Navbar />

      {/* TOP MSN-STYLE BREAKING TICKER BAR */}
      <div className="pt-24 md:pt-28 bg-[#0b1930] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
            <Link
              to="/malta-updates"
              className="inline-flex items-center gap-1.5 font-extrabold text-red-400 hover:text-white transition-colors"
            >
              <FaArrowLeft size={10} /> All Malta News & Updates
            </Link>
            <span className="text-white/30">|</span>
            <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              {article.category}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white font-bold shrink-0 cursor-pointer"
          >
            <FaShareAlt size={11} /> {copied ? 'Link Copied!' : 'Share'}
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN MSN ARTICLE LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT MAIN ARTICLE COLUMN (8 COLS) */}
        <article className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
          {/* Article Header */}
          <div className="p-6 md:p-10 pb-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
              <span className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider text-[11px] font-extrabold">
                {article.category}
              </span>
              <span className="text-slate-500 inline-flex items-center gap-1.5">
                <FaCalendarAlt size={11} className="text-slate-400" /> Last updated: {article.lastUpdated}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 inline-flex items-center gap-1.5">
                <FaClock size={11} className="text-slate-400" /> {article.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f2547] leading-tight">
              {article.title}
            </h1>

            <p className="text-xs md:text-sm font-bold text-slate-500">
              By <span className="text-[#0f2547]">{article.author}</span> • Verified Malta 2027 Desk
            </p>
          </div>

          {/* Hero Image Banner */}
          <div className="px-6 md:px-10">
            <div className="h-60 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 md:p-10 space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
            {/* Lead Paragraphs */}
            <div className="space-y-4 text-base md:text-lg text-slate-800 font-medium leading-relaxed border-l-4 border-red-600 pl-4 md:pl-5 bg-slate-50/70 py-3 rounded-r-xl">
              {article.leadParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Content Sections */}
            {article.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-[#0f2547]">
                  {sec.heading}
                </h2>

                {sec.paragraphs &&
                  sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                {sec.table && (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 my-4 shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                      <thead>
                        <tr className="bg-[#0f2547] text-white uppercase text-[11px] tracking-wider">
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3.5 md:p-4 font-extrabold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3.5 md:p-4 ${
                                  cIdx === 0
                                    ? 'font-bold text-[#0f2547]'
                                    : cIdx === row.length - 1
                                    ? 'font-black text-red-600'
                                    : 'text-slate-600 font-semibold'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {sec.bullets && (
                  <ul className="space-y-2.5">
                    {sec.bullets.map((b, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-slate-800 font-medium"
                      >
                        <FaCheckCircle
                          className="text-red-600 mt-1 shrink-0"
                          size={14}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.afterTableParagraphs &&
                  sec.afterTableParagraphs.map((p, apIdx) => (
                    <p key={apIdx} className="leading-relaxed font-medium text-slate-800">
                      {p}
                    </p>
                  ))}

                {/* Inline Cross-Article Links */}
                {sec.relatedLinks && sec.relatedLinks.length > 0 && (
                  <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-extrabold text-[#0f2547] uppercase tracking-wider">
                      Related Report:
                    </span>
                    {sec.relatedLinks.map((rl, rlIdx) => (
                      <Link
                        key={rlIdx}
                        to={`/malta-updates/${rl.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-extrabold text-red-600 hover:text-[#0f2547] underline"
                      >
                        {rl.label} <FaArrowRight size={10} />
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Frequently Asked Questions */}
            {article.faqs && article.faqs.length > 0 && (
              <section className="pt-4 space-y-4">
                <h2 className="text-xl md:text-2xl font-black text-[#0f2547]">
                  Frequently asked questions
                </h2>
                <div className="space-y-3">
                  {article.faqs.map((faq, idx) => (
                    <FaqItem key={idx} faq={faq} />
                  ))}
                </div>
              </section>
            )}

            {/* Sources Box */}
            <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-5 space-y-1.5 text-xs text-slate-600">
              <p className="font-extrabold uppercase tracking-wider text-[#0f2547]">
                Sources to check before you rely on this
              </p>
              <p className="leading-relaxed">{article.sources}</p>
            </div>

            {/* Counselling CTA Box */}
            <div className="bg-gradient-to-r from-[#0b1930] to-[#0f2547] text-white rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-400">
                  The Raptor Academics • Jaipur
                </span>
                <p className="text-sm md:text-base font-bold text-white leading-snug">
                  {article.ctaText}
                </p>
              </div>
              <Link
                to="/free-counselling"
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shrink-0 inline-flex items-center gap-2 transition-colors"
              >
                Free Counselling <FaArrowRight size={11} />
              </Link>
            </div>

            {/* PREVIOUS / NEXT ARTICLE CONTINUOUS BAR */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => navigate(`/malta-updates/${prevArticle.slug}`)}
                className="text-left p-4 rounded-2xl border border-slate-200 hover:border-[#0f2547] hover:bg-slate-50 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FaArrowLeft size={10} /> Previous Update
                </span>
                <p className="text-sm font-extrabold text-[#0f2547] group-hover:text-red-600 line-clamp-2 mt-1">
                  {prevArticle.title}
                </p>
              </button>

              <button
                type="button"
                onClick={() => navigate(`/malta-updates/${nextArticle.slug}`)}
                className="text-left sm:text-right p-4 rounded-2xl border border-slate-200 hover:border-[#0f2547] hover:bg-slate-50 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600 inline-flex items-center gap-1.5">
                  Up Next <FaArrowRight size={10} />
                </span>
                <p className="text-sm font-extrabold text-[#0f2547] group-hover:text-red-600 line-clamp-2 mt-1">
                  {nextArticle.title}
                </p>
              </button>
            </div>
          </div>
        </article>

        {/* RIGHT STICKY MSN SIDEBAR (4 COLS) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0f2547] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                More Malta Updates
              </h3>
              <Link
                to="/malta-updates"
                className="text-xs font-extrabold text-red-600 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {otherArticles.map((other) => (
                <Link
                  key={other.slug}
                  to={`/malta-updates/${other.slug}`}
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 block">
                      {other.category}
                    </span>
                    <h4 className="text-xs md:text-sm font-extrabold text-[#0f2547] group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mt-0.5">
                      {other.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      {other.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Explore Colleges & Courses Card */}
          <div className="bg-[#0f2547] text-white rounded-3xl p-6 shadow-md space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 block">
              2027 Admissions Open
            </span>
            <h4 className="text-lg font-black leading-snug">
              Compare 12 MFHEA Colleges & 53+ Malta Courses
            </h4>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              Check tuition-after-visa options, entry rules, and expected Schengen salaries before you apply.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <Link
                to="/courses"
                className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors"
              >
                Explore All Courses
              </Link>
              <Link
                to="/institutions"
                className="w-full text-center bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
              >
                Compare Malta Colleges
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* BOTTOM MSN-STYLE "RECOMMENDED FOR YOU" CONTINUOUS FEED */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
        <div className="border-t-2 border-slate-200 pt-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 block">
                Continue Reading • Malta News Feed
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0f2547] mt-0.5">
                More Stories You Should Read Next
              </h2>
            </div>
            <Link
              to="/malta-updates"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0f2547] hover:text-red-600"
            >
              All Malta Updates <FaArrowRight size={10} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherArticles.map((rec) => (
              <Link
                key={rec.slug}
                to={`/malta-updates/${rec.slug}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-[#0f2547]/40 shadow-xs hover:shadow-xl transition-all flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0f2547]/95 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                    {rec.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0f2547] group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {rec.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span>{rec.lastUpdated}</span>
                    <span className="text-red-600 font-extrabold inline-flex items-center gap-1">
                      Read Full Story <FaArrowRight size={9} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// ==========================================
// MAIN MSN-STYLE NEWS & UPDATES HUB PAGE
// ==========================================
const MaltaUpdates = () => {
  const { slug } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('All Updates');

  const activeArticle = useMemo(() => {
    if (!slug) return null;
    return maltaUpdatesData.find((a) => a.slug === slug) || null;
  }, [slug]);

  useSeoMeta({
    title: activeArticle
      ? activeArticle.seo.seoTitle
      : 'Malta News & Updates 2027: Visa Fees, Living Cost & Education | The Raptor Academics',
    description: activeArticle
      ? activeArticle.seo.metaDescription
      : 'Latest Malta student news and updates for 2027: Budget 2027 visa fees (Bill 15), student visa requirements, cost of living, and Malta education updates for Indian students.',
    keywords:
      'Malta news and updates, Malta student visa fees 2027, Malta cost of living, Malta education news, study in Malta'
  });

  if (activeArticle) {
    return <ArticleReaderView article={activeArticle} />;
  }

  const featuredArticle = maltaUpdatesData[0];
  const sideHeadlines = maltaUpdatesData.slice(1);

  const filteredArticles =
    selectedCategory === 'All Updates'
      ? maltaUpdatesData
      : maltaUpdatesData.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f4f6fa] font-sans">
      <Navbar />

      {/* MSN-STYLE EDITORIAL MASTHEAD */}
      <section className="pt-32 md:pt-40 pb-12 bg-[#0b1930] text-white px-4 md:px-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:items-center md:text-center lg:flex-row lg:items-end lg:text-left justify-between gap-4">
            <div className="flex flex-col md:items-center lg:items-start">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 px-3.5 py-1 rounded-full mb-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-300 font-extrabold uppercase tracking-widest text-[11px]">
                  Malta Local News & Student Policy Desk
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                Malta <span className="text-red-500">News & Updates</span>
              </h1>
              <p className="text-blue-100/80 text-sm md:text-base mt-2 max-w-2xl md:mx-auto lg:mx-0">
                Verified coverage on Malta Budget 2027, Bill 15 visa &amp; residence permit fees, proof of funds, rent &amp; inflation, and education policy for international students.
              </p>
            </div>

            <div className="text-xs text-blue-200/80 font-bold md:text-center lg:text-right">
              Updated: 24 November 2026 • By The Raptor Academics Team
            </div>
          </div>

          {/* MSN Category Tabs */}
          <div className="flex flex-wrap items-center md:justify-center lg:justify-start gap-2 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white/10 text-blue-100 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MSN TOP HERO GRID (LEAD STORY + TRENDING SIDE LIST) */}
      {selectedCategory === 'All Updates' && (
        <section className="max-w-7xl mx-auto px-4 md:px-10 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
            {/* Lead Featured Story (7 Cols) */}
            <Link
              to={`/malta-updates/${featuredArticle.slug}`}
              className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="h-64 sm:h-80 overflow-hidden relative bg-slate-900">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow">
                  Lead Report • {featuredArticle.category}
                </span>
                <div className="absolute bottom-4 left-5 right-5 text-white md:text-center lg:text-left">
                  <p className="text-xs font-bold text-blue-200 mb-1">
                    {featuredArticle.lastUpdated} • {featuredArticle.readTime}
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-snug group-hover:text-red-300 transition-colors">
                    {featuredArticle.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 md:text-center lg:text-left">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-extrabold">
                  <span className="text-slate-500">By {featuredArticle.author}</span>
                  <span className="text-red-600 inline-flex items-center gap-1.5">
                    Read Full Breakdown <FaArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Right Top Headlines Stack (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#0f2547] flex items-center gap-2">
                  <FaNewspaper className="text-red-600" /> Top Malta Student Stories
                </h3>
                <span className="text-[11px] font-bold text-slate-400">2027 Policy</span>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {sideHeadlines.map((story) => (
                  <Link
                    key={story.slug}
                    to={`/malta-updates/${story.slug}`}
                    className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all group"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 block">
                        {story.category}
                      </span>
                      <h4 className="text-sm font-extrabold text-[#0f2547] group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mt-0.5">
                        {story.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {story.excerpt}
                      </p>
                      <span className="text-[11px] font-bold text-slate-400 block mt-1">
                        {story.lastUpdated} • {story.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ALL ARTICLES FEED GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-black text-[#0f2547]">
            {selectedCategory === 'All Updates'
              ? 'All Malta Reports & Guides (4)'
              : `${selectedCategory} (${filteredArticles.length})`}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                to={`/malta-updates/${article.slug}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-[#0f2547]/40 shadow-xs hover:shadow-xl transition-all flex flex-col h-full group"
              >
                <div className="h-56 overflow-hidden relative bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3.5 left-3.5 bg-[#0f2547]/95 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      <span>{article.lastUpdated}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-[#0f2547] group-hover:text-red-600 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold">
                    <span className="text-slate-500">{article.author}</span>
                    <span className="text-red-600 inline-flex items-center gap-1.5">
                      Read Article <FaArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MaltaUpdates;