import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaChevronDown,
  FaChevronRight,
  FaPhoneAlt,
  FaExternalLinkAlt,
  FaBookOpen
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { blogsData } from '../data/blogsData';

// =========================================================================
// SMART RICH TEXT PARSER
// Converts (blog - 3), (blog - 10), (counselling form), (home page),
// and external official URLs (https://...) into real clickable links!
// =========================================================================
const RichTextRenderer = ({ text }) => {
  if (!text) return null;

  // Tokenize external URLs and internal parenthetical references
  const tokenRegex =
    /(\(https?:\/\/[^\s)]+\)|\(\s*(?:blog\s*-\s*\d+|counselling\s*form|home\s*page)\s*\))/gi;
  const parts = text.split(tokenRegex);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        // 1. External URL inside parentheses: (https://identita.gov.mt/...)
        const extUrlMatch = part.match(/^\((https?:\/\/[^\s)]+)\)$/i);
        if (extUrlMatch) {
          const url = extUrlMatch[1];
          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-red-600 hover:text-[#0f2547] underline font-bold mx-1 break-all"
            >
              <span>Official Source</span>
              <FaExternalLinkAlt size={10} />
            </a>
          );
        }

        // 2. Internal Blog Cross-Link: (blog - 3), (blog-10), etc.
        const blogRefMatch = part.match(/^\(\s*blog\s*-\s*(\d+)\s*\)$/i);
        if (blogRefMatch) {
          const refNum = parseInt(blogRefMatch[1], 10);
          const targetBlog = blogsData.find((b) => b.id === refNum);
          if (targetBlog) {
            return (
              <Link
                key={idx}
                to={`/blogs/${targetBlog.slug}`}
                className="inline-flex items-center gap-1 text-red-600 hover:text-[#0f2547] underline font-bold mx-1"
                title={targetBlog.title}
              >
                Read Guide →
              </Link>
            );
          }
          return null;
        }

        // 3. Free Counselling Form Link: (counselling form)
        if (/^\(\s*counselling\s*form\s*\)$/i.test(part)) {
          return (
            <Link
              key={idx}
              to="/free-counselling"
              className="text-red-600 hover:text-[#0f2547] underline font-bold mx-1"
            >
              Free Counselling Form
            </Link>
          );
        }

        // 4. Home Page Link: (home page)
        if (/^\(\s*home\s*page\s*\)$/i.test(part)) {
          return (
            <Link
              key={idx}
              to="/"
              className="text-red-600 hover:text-[#0f2547] underline font-bold mx-1"
            >
              Home
            </Link>
          );
        }

        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const blog = useMemo(() => {
    return blogsData.find((b) => b.slug === slug);
  }, [slug]);

  const relatedBlogs = useMemo(() => {
    if (!blog) return [];
    return blogsData.filter((b) => b.id !== blog.id).slice(0, 3);
  }, [blog]);

  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      {/* Dynamic Page-Specific SEO Title & Meta Description */}
      <SEO
        title={blog.seoTitle}
        description={blog.metaDescription}
        ogImage={blog.coverImage}
      />

      <Navbar />

      {/* Article Hero Header */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 bg-[#0b1930] text-white px-4 md:px-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${blog.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1930] via-[#0b1930]/85 to-[#0b1930]/75 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-5">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-200 hover:text-red-400 transition-colors"
          >
            <FaArrowLeft size={11} /> Back to All 2027 Study Guides
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-red-600 text-white text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full">
              {blog.category}
            </span>
            <span className="text-xs font-bold text-blue-200/80 flex items-center gap-1.5">
              <FaClock size={11} /> {blog.readTime}
            </span>
            <span className="text-xs font-bold text-blue-200/80">
              • Updated: {blog.publishedDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
            {blog.title}
          </h1>
        </div>
      </section>

      {/* Main Content + Sticky Sidebar */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Article Body */}
        <article className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-slate-200/90 space-y-10">
          {/* Featured Banner Image */}
          <div className="rounded-2xl overflow-hidden h-64 md:h-96 border border-slate-100">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Intro Paragraphs */}
          <div className="space-y-4 text-slate-700 text-base md:text-[17px] leading-relaxed font-medium border-l-4 border-red-600 pl-5 bg-slate-50/70 py-4 pr-4 rounded-r-2xl">
            {blog.intro.map((para, idx) => (
              <p key={idx}>
                <RichTextRenderer text={para} />
              </p>
            ))}
          </div>

          {/* Article Sections */}
          {blog.sections.map((sec, sIdx) => (
            <div key={sIdx} id={`section-${sIdx}`} className="space-y-4 scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f2547] leading-snug">
                {sec.heading}
              </h2>

              {sec.paragraphs &&
                sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-700 text-base leading-relaxed">
                    <RichTextRenderer text={p} />
                  </p>
                ))}

              {sec.bullets && (
                <ul className="space-y-2.5 bg-[#f8fafc] p-5 md:p-6 rounded-2xl border border-slate-200/80">
                  {sec.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-slate-800 text-sm md:text-base font-medium leading-relaxed"
                    >
                      <FaCheckCircle className="text-red-600 mt-1 shrink-0" size={14} />
                      <span>
                        <RichTextRenderer text={b} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.afterBullets &&
                sec.afterBullets.map((p, abIdx) => (
                  <p key={abIdx} className="text-slate-700 text-base leading-relaxed">
                    <RichTextRenderer text={p} />
                  </p>
                ))}

              {sec.table && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 my-4">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#0f2547] text-white text-xs uppercase tracking-wider">
                        {sec.table.headers.map((th, thIdx) => (
                          <th key={thIdx} className="p-4 font-extrabold">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-4 leading-relaxed ${
                                cIdx === 0
                                  ? 'font-extrabold text-[#0f2547] bg-slate-50/60'
                                  : 'text-slate-700 font-medium'
                              }`}
                            >
                              <RichTextRenderer text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {sec.afterTable &&
                sec.afterTable.map((p, atIdx) => (
                  <p key={atIdx} className="text-slate-700 text-base leading-relaxed">
                    <RichTextRenderer text={p} />
                  </p>
                ))}
            </div>
          ))}

          {/* FAQs Accordion Section */}
          {blog.faqs && blog.faqs.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f2547]">
                Frequently Asked Questions (FAQs)
              </h2>
              <div className="space-y-3">
                {blog.faqs.map((faq, fIdx) => {
                  const isOpen = openFaqIdx === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : fIdx)}
                        className="w-full p-5 text-left font-extrabold text-[#0f2547] flex items-center justify-between gap-4 hover:bg-slate-100/70 transition-colors cursor-pointer"
                      >
                        <span className="text-sm md:text-base">{faq.q}</span>
                        {isOpen ? (
                          <FaChevronDown className="text-red-600 shrink-0" size={12} />
                        ) : (
                          <FaChevronRight className="text-slate-400 shrink-0" size={12} />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-200/70 bg-white">
                          <RichTextRenderer text={faq.a} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conclusion Box */}
          {blog.conclusion && (
            <div className="bg-[#0f2547] text-white rounded-3xl p-7 md:p-9 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-400 block">
                Final Takeaways & Next Steps
              </span>
              <p className="text-blue-100/90 text-base leading-relaxed">
                <RichTextRenderer text={blog.conclusion} />
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/free-counselling"
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs md:text-sm px-6 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  Book Free Counselling <FaArrowRight size={11} />
                </Link>
                <a
                  href="tel:+917232010105"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs md:text-sm px-6 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <FaPhoneAlt size={12} /> (+91) 72320 10105
                </a>
              </div>
            </div>
          )}
        </article>

        {/* Right Sticky Sidebar: Table of Contents + CTA */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          {/* Quick Table of Contents */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0f2547] flex items-center gap-2 border-b border-slate-100 pb-3">
              <FaBookOpen className="text-red-600" /> In This Guide
            </h3>
            <ul className="space-y-2.5">
              {blog.sections.map((sec, idx) => (
                <li key={idx}>
                  <a
                    href={`#section-${idx}`}
                    className="text-xs md:text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors block leading-snug"
                  >
                    {idx + 1}. {sec.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky Counselling CTA Card */}
          <div className="bg-gradient-to-br from-[#0f2547] to-[#1b365d] text-white rounded-3xl p-7 shadow-xl space-y-4">
            <span className="inline-block bg-red-600 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
              Jaipur Study Abroad Desk
            </span>
            <h3 className="text-xl font-black leading-snug">
              Need an Honest 2027 Profile Check?
            </h3>
            <p className="text-blue-100/85 text-xs md:text-sm leading-relaxed">
              Get a written cost breakdown, check study gap acceptance, and explore Malta MFHEA-accredited colleges with Pay-After-Visa options.
            </p>
            <div className="space-y-2.5 pt-2">
              <Link
                to="/free-counselling"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Free Profile Assessment <FaArrowRight size={11} />
              </Link>
              <Link
                to="/institutions"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition-colors flex items-center justify-center"
              >
                Explore Partner Colleges
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* Related Guides Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 pb-20">
        <h3 className="text-2xl font-extrabold text-[#0f2547] mb-6">
          More 2027 Study Abroad Guides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedBlogs.map((rel) => (
            <Link
              key={rel.id}
              to={`/blogs/${rel.slug}`}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-red-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600">
                  {rel.category}
                </span>
                <h4 className="text-lg font-extrabold text-[#0f2547] group-hover:text-red-600 transition-colors leading-snug">
                  {rel.title}
                </h4>
              </div>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 pt-2">
                Read Article <FaArrowRight size={10} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;