// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FaComments,
//   FaPhoneAlt,
//   FaTimes,
//   FaCheckCircle,
//   FaRedo,
//   FaPaperPlane,
//   FaShieldAlt
// } from 'react-icons/fa';

// // =========================================================
// // RAPTOR ACADEMICS LOGO URL (Yahan apni logo URL paste kar sakta hai)
// // =========================================================
// const RAPTOR_LOGO =
//   "/src/assets/raptor r logo.png";

// const INITIAL_BOT_MESSAGES = [
//   {
//     id: 'welcome-1',
//     sender: 'bot',
//     text: 'Namaste! Welcome to The Raptor Academics (Jaipur). How can we help with your 2027 study abroad plans?'
//   },
//   {
//     id: 'welcome-2',
//     sender: 'bot',
//     text: 'Please tap an option below to get started:'
//   }
// ];

// const TOPIC_OPTIONS = [
//   'Malta 2027 Admissions',
//   'Pay Tuition After Visa',
//   'Study Gap & No IELTS',
//   'Request a Call Back'
// ];

// const PROGRAM_OPTIONS = [
//   'Nursing & Healthcare',
//   'MBA / Business / Finance',
//   'Hospitality & Tourism',
//   'IT, AI & Digital'
// ];

// const INTAKE_OPTIONS = [
//   'Feb 2027 Intake',
//   'Apr / Jul 2027 Intake',
//   'Oct 2027 Intake'
// ];

// const CHAT_TEXT = 'Chat with us';
// const CALL_TEXT = 'Call me back';

// const RaptorChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // One-time sequence on mount: 'logo' -> 'buttons_only' -> 'typing' -> 'unwriting' -> 'buttons_only'
//   const [phase, setPhase] = useState('logo');
//   const [typedLen, setTypedLen] = useState(0);

//   const [messages, setMessages] = useState(INITIAL_BOT_MESSAGES);
//   const [stage, setStage] = useState('topic');
//   const [selections, setSelections] = useState({
//     topic: '',
//     program: '',
//     intake: ''
//   });
//   const [leadInfo, setLeadInfo] = useState({
//     name: '',
//     phone: ''
//   });
//   const [errorMsg, setErrorMsg] = useState('');

//   const chatBodyRef = useRef(null);

//   // Run once on mount: show brand logo briefly, then smoothly transition into the two action buttons
//   useEffect(() => {
//     if (isOpen) return;

//     let innerTimer;
//     const logoTimer = setTimeout(() => {
//       setPhase('buttons_only');
//       innerTimer = setTimeout(() => {
//         setTypedLen(0);
//         setPhase('typing');
//       }, 650);
//     }, 1600);

//     return () => {
//       clearTimeout(logoTimer);
//       if (innerTimer) clearTimeout(innerTimer);
//     };
//   }, [isOpen]);

//   // Smooth, slightly slower typewriter & unwrite step engine (runs once)
//   useEffect(() => {
//     if (isOpen) return;

//     const maxLen = Math.max(CHAT_TEXT.length, CALL_TEXT.length);

//     if (phase === 'typing') {
//       if (typedLen < maxLen) {
//         const timer = setTimeout(() => {
//           setTypedLen((prev) => prev + 1);
//         }, 85);
//         return () => clearTimeout(timer);
//       } else {
//         const holdTimer = setTimeout(() => {
//           setPhase('unwriting');
//         }, 1600);
//         return () => clearTimeout(holdTimer);
//       }
//     }

//     if (phase === 'unwriting') {
//       if (typedLen > 0) {
//         const timer = setTimeout(() => {
//           setTypedLen((prev) => prev - 1);
//         }, 65);
//         return () => clearTimeout(timer);
//       } else {
//         setPhase('buttons_only');
//       }
//     }
//   }, [phase, typedLen, isOpen]);

//   useEffect(() => {
//     if (chatBodyRef.current) {
//       chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
//     }
//   }, [messages, stage, isOpen]);

//   const appendBotReply = (botTexts) => {
//     const newBots = botTexts.map((t, i) => ({
//       id: `${Date.now()}-bot-${i}-${Math.random().toString(36).slice(2, 6)}`,
//       sender: 'bot',
//       text: t
//     }));
//     setMessages((prev) => [...prev, ...newBots]);
//   };

//   const appendUserChoice = (choiceText) => {
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: `${Date.now()}-user-${Math.random().toString(36).slice(2, 6)}`,
//         sender: 'user',
//         text: choiceText
//       }
//     ]);
//   };

//   const handleSelectTopic = (topic) => {
//     appendUserChoice(topic);
//     setSelections((prev) => ({ ...prev, topic }));

//     if (topic === 'Request a Call Back') {
//       setSelections((prev) => ({
//         ...prev,
//         topic: 'Call Back Request',
//         program: 'General Counseling',
//         intake: '2027 Intake'
//       }));
//       setStage('lead');
//       appendBotReply([
//         'Sure! Our Jaipur counselor calls between 10:00 AM – 6:00 PM with unbiased 2027 guidance.',
//         'Please enter your Name and Mobile Number below:'
//       ]);
//       return;
//     }

//     setStage('program');
//     appendBotReply([
//       `Got it — ${topic}. Which field or program are you looking for?`
//     ]);
//   };

//   const handleSelectProgram = (program) => {
//     appendUserChoice(program);
//     setSelections((prev) => ({ ...prev, program }));
//     setStage('intake');
//     appendBotReply([
//       `${program} is a great choice. Which 2027 intake are you targeting?`
//     ]);
//   };

//   const handleSelectIntake = (intake) => {
//     appendUserChoice(intake);
//     setSelections((prev) => ({ ...prev, intake }));
//     setStage('lead');
//     appendBotReply([
//       `Noted: ${selections.program} for ${intake}.`,
//       'To share your 2027 eligibility & fee options, please enter only your Name and Mobile Number:'
//     ]);
//   };

//   const handleLeadSubmit = (e) => {
//     e.preventDefault();
//     const trimmedName = leadInfo.name.trim();
//     const digitsOnly = leadInfo.phone.replace(/\D/g, '');

//     if (trimmedName.length < 2) {
//       setErrorMsg('Please enter your name.');
//       return;
//     }
//     if (digitsOnly.length < 10) {
//       setErrorMsg('Please enter a valid 10-digit mobile number.');
//       return;
//     }

//     setErrorMsg('');
//     appendUserChoice(`${trimmedName} • ${leadInfo.phone.trim()}`);
//     setStage('done');
//     appendBotReply([
//       `Thank you, ${trimmedName}! Our Jaipur team will call or WhatsApp you on ${leadInfo.phone.trim()} shortly.`,
//       'Need immediate help? Call (+91) 72320 10105.'
//     ]);
//   };

//   const handleReset = () => {
//     setMessages(INITIAL_BOT_MESSAGES);
//     setStage('topic');
//     setSelections({ topic: '', program: '', intake: '' });
//     setLeadInfo({ name: '', phone: '' });
//     setErrorMsg('');
//   };

//   const handleOpenChat = () => {
//     setIsOpen(true);
//   };

//   const handleOpenCallback = () => {
//     setIsOpen(true);
//     if (stage !== 'done') {
//       setMessages([
//         ...INITIAL_BOT_MESSAGES,
//         {
//           id: `${Date.now()}-cb-user`,
//           sender: 'user',
//           text: 'Request a Call Back'
//         },
//         {
//           id: `${Date.now()}-cb-bot`,
//           sender: 'bot',
//           text: 'Sure! Enter your Name and Mobile Number below and our Jaipur advisor will call you back.'
//         }
//       ]);
//       setSelections({
//         topic: 'Call Back Request',
//         program: 'General Counseling',
//         intake: '2027 Intake'
//       });
//       setStage('lead');
//     }
//   };

//   const showTwoButtons = !isOpen && phase !== 'logo';
//   const showTypewriterPill = !isOpen && (phase === 'typing' || phase === 'unwriting') && typedLen > 0;

//   return (
//     <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden font-sans">
//       {/* Chat Popup Box */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             data-lenis-prevent="true"
//             initial={{ opacity: 0, y: 20, scale: 0.96 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 16, scale: 0.96 }}
//             transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//             className="w-[340px] sm:w-[375px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[540px]"
//           >
//             {/* Header with Raptor Academics Logo */}
//             <div className="bg-gradient-to-r from-[#0b1930] to-[#0f2547] text-white px-5 py-4 flex items-center justify-between shrink-0">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 px-2.5 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0">
//                   <img
//                     src={RAPTOR_LOGO}
//                     alt="The Raptor Academics Logo"
//                     className="h-6 w-auto object-contain"
//                   />
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="font-extrabold text-sm tracking-tight">
//                       Raptor 2027 Assistant
//                     </span>
//                     <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//                   </div>
//                   <p className="text-[11px] text-blue-200/80">
//                     Tap options • Jaipur Study Desk
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-1.5">
//                 <button
//                   type="button"
//                   onClick={handleReset}
//                   title="Restart chat"
//                   className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
//                 >
//                   <FaRedo size={11} />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   title="Close chat"
//                   className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
//                 >
//                   <FaTimes size={13} />
//                 </button>
//               </div>
//             </div>

//             {/* Messages Area */}
//             <div
//               ref={chatBodyRef}
//               data-lenis-prevent="true"
//               className="p-4 space-y-3 overflow-y-auto overscroll-contain flex-1 bg-[#f8fafc]"
//             >
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${
//                     msg.sender === 'user' ? 'justify-end' : 'justify-start'
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[84%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed font-medium shadow-2xs ${
//                       msg.sender === 'user'
//                         ? 'bg-[#0f2547] text-white rounded-br-sm font-semibold'
//                         : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-sm'
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}

//               {/* STAGE 1: TOPIC OPTIONS */}
//               {stage === 'topic' && (
//                 <div className="pt-1 flex flex-wrap gap-2">
//                   {TOPIC_OPTIONS.map((opt) => (
//                     <button
//                       key={opt}
//                       type="button"
//                       onClick={() => handleSelectTopic(opt)}
//                       className="text-left text-xs font-bold bg-white hover:bg-red-600 text-[#0f2547] hover:text-white border border-slate-300 hover:border-red-600 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
//                     >
//                       {opt}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* STAGE 2: PROGRAM OPTIONS */}
//               {stage === 'program' && (
//                 <div className="pt-1 flex flex-wrap gap-2">
//                   {PROGRAM_OPTIONS.map((prog) => (
//                     <button
//                       key={prog}
//                       type="button"
//                       onClick={() => handleSelectProgram(prog)}
//                       className="text-left text-xs font-bold bg-white hover:bg-[#0f2547] text-[#0f2547] hover:text-white border border-slate-300 hover:border-[#0f2547] px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
//                     >
//                       {prog}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* STAGE 3: INTAKE OPTIONS */}
//               {stage === 'intake' && (
//                 <div className="pt-1 flex flex-wrap gap-2">
//                   {INTAKE_OPTIONS.map((intake) => (
//                     <button
//                       key={intake}
//                       type="button"
//                       onClick={() => handleSelectIntake(intake)}
//                       className="text-left text-xs font-bold bg-white hover:bg-red-600 text-[#0f2547] hover:text-white border border-slate-300 hover:border-red-600 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
//                     >
//                       {intake}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* STAGE 4: ONLY NAME & PHONE INPUT */}
//               {stage === 'lead' && (
//                 <form
//                   onSubmit={handleLeadSubmit}
//                   className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 mt-1"
//                 >
//                   <div>
//                     <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
//                       Your Name
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={leadInfo.name}
//                       onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
//                       placeholder="Enter your name"
//                       className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none font-medium text-[#0f2547]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
//                       Mobile Number
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={leadInfo.phone}
//                       onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
//                       placeholder="+91 98765 43210"
//                       className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none font-medium text-[#0f2547]"
//                     />
//                   </div>

//                   {errorMsg && (
//                     <p className="text-[11px] font-bold text-red-600">{errorMsg}</p>
//                   )}

//                   <button
//                     type="submit"
//                     className="w-full bg-red-600 hover:bg-[#0f2547] text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
//                   >
//                     <FaPaperPlane size={10} /> Submit Details
//                   </button>
//                 </form>
//               )}

//               {/* STAGE 5: COMPLETED */}
//               {stage === 'done' && (
//                 <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl space-y-2.5 text-xs text-emerald-950">
//                   <div className="flex items-center gap-2 font-extrabold text-emerald-800">
//                     <FaCheckCircle size={14} />
//                     <span>Request Confirmed</span>
//                   </div>
//                   <p className="text-[11px] text-emerald-900/85 leading-relaxed">
//                     {selections.topic} • {selections.program} • {selections.intake}
//                   </p>
//                   <div className="flex items-center gap-2 pt-1">
//                     <a
//                       href="tel:+917232010105"
//                       className="flex-1 text-center bg-[#0f2547] text-white font-bold py-2 rounded-xl text-[11px]"
//                     >
//                       Call Now
//                     </a>
//                     <button
//                       type="button"
//                       onClick={handleReset}
//                       className="flex-1 text-center bg-white border border-emerald-300 text-emerald-900 font-bold py-2 rounded-xl text-[11px] cursor-pointer"
//                     >
//                       New Query
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Bottom Note */}
//             <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400 shrink-0">
//               <span className="flex items-center gap-1">
//                 <FaShieldAlt size={10} className="text-red-500" /> Guided options only
//               </span>
//               <span>The Raptor Academics</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* INITIAL BRAND LOGO BUTTON (Smoothly glides out as the two buttons rise up) */}
//       <AnimatePresence mode="wait">
//         {!isOpen && phase === 'logo' && (
//           <motion.button
//             key="main-brand-logo"
//             type="button"
//             onClick={() => setPhase('buttons_only')}
//             initial={{ opacity: 0, scale: 0.9, y: 16 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.85, y: -24 }}
//             transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//             aria-label="The Raptor Academics"
//             className="h-14 px-4 rounded-full bg-white border-2 border-[#0f2547]/20 hover:border-red-600 shadow-2xl flex items-center justify-center cursor-pointer"
//           >
//             <img
//               src={RAPTOR_LOGO}
//               alt="The Raptor Academics"
//               className="h-8 w-auto object-contain"
//             />
//           </motion.button>
//         )}

//         {/* TWO ACTION BUTTONS (Smooth slow rise from logo position; typewriter types & unwrites once) */}
//         {showTwoButtons && (
//           <motion.div
//             key="two-action-buttons"
//             initial={{ opacity: 0, y: 34, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 18, scale: 0.95 }}
//             transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
//             className="flex flex-col items-end gap-3"
//           >
//             {/* Button 1: Chat with us */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
//               className="flex items-center gap-2.5"
//             >
//               <AnimatePresence>
//                 {showTypewriterPill && (
//                   <motion.span
//                     key="chat-typewriter-pill"
//                     initial={{ opacity: 0, x: 10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 10 }}
//                     transition={{ duration: 0.35, ease: 'easeOut' }}
//                     className="bg-white text-[#0f2547] border border-slate-200 text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-md whitespace-nowrap"
//                   >
//                     {CHAT_TEXT.slice(0, typedLen)}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//               <button
//                 type="button"
//                 onClick={handleOpenChat}
//                 aria-label="Chat with us"
//                 className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30 transition-transform duration-300 hover:scale-105 cursor-pointer"
//               >
//                 <FaComments size={19} />
//               </button>
//             </motion.div>

//             {/* Button 2: Call me back */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
//               className="flex items-center gap-2.5"
//             >
//               <AnimatePresence>
//                 {showTypewriterPill && (
//                   <motion.span
//                     key="call-typewriter-pill"
//                     initial={{ opacity: 0, x: 10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 10 }}
//                     transition={{ duration: 0.35, ease: 'easeOut' }}
//                     className="bg-white text-[#0f2547] border border-slate-200 text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-md whitespace-nowrap"
//                   >
//                     {CALL_TEXT.slice(0, typedLen)}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//               <button
//                 type="button"
//                 onClick={handleOpenCallback}
//                 aria-label="Call me back"
//                 className="w-12 h-12 rounded-full bg-[#0f2547] hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
//               >
//                 <FaPhoneAlt size={16} />
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default RaptorChatWidget;

































import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhoneAlt,
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaCheckCircle,
  FaChevronDown,
  FaHeadset,
  FaRedo
} from 'react-icons/fa';
import raptorIcon from '../assets/raptor r logo.png';
import { institutionsData } from '../data/institutionsData';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const SUPPORT_PHONE_DISPLAY = '(+91) 72320 10105';
const SUPPORT_PHONE_HREF = 'tel:+917232010105';

const INTAKE_OPTIONS = ['Mar', 'Jun', 'Sep', 'Dec'];

const GENERAL_COURSE_OPTIONS = [
  'Nursing & Healthcare',
  'Business & MBA',
  'IT, AI & Cloud',
  'Hospitality & Tourism',
  'HR, Psychology & Coaching'
];

const BrandEmblem = ({ className = 'w-12 h-12' }) => (
  <span
    className={`rounded-full bg-white flex items-center justify-center overflow-hidden p-1.5 shadow-xs shrink-0 ${className}`}
  >
    <img
      src={raptorIcon}
      alt="The Raptor Academics"
      className="w-full h-full object-contain"
    />
  </span>
);

const sendChatLeadToApi = async (payload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat-leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error('Chat Lead API Error:', err);
    return { success: false };
  }
};

// ==========================================
// SEPARATE CALLBACK MODAL (NAVY + RED + BLACK POINTS)
// ==========================================
const CallbackModal = ({ isOpen, onClose, initialName = '' }) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [studentName, setStudentName] = useState(initialName);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setStudentName(initialName || '');
    setSubmitted(false);
    setPhone('');
    setIsSubmitting(false);
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim() || isSubmitting) return;

    setIsSubmitting(true);
    await sendChatLeadToApi({
      leadType: 'callback',
      name: studentName.trim(),
      countryCode,
      phone: phone.trim(),
      topic: 'Callback Modal Request',
      choice: '9 AM to 9 PM Callback'
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 bg-[#071122]/75 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 14 }}
        transition={{ duration: 0.2 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close callback modal"
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white flex items-center justify-center transition-colors absolute top-4 right-4 z-10 cursor-pointer"
        >
          <FaTimes size={13} />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <FaCheckCircle size={28} />
            </div>
            <h3 className="text-xl font-black text-[#0f2547]">
              Thank You{studentName ? `, ${studentName}` : ''}!
            </h3>
            <p className="text-sm text-slate-900 leading-relaxed">
              Our team will contact you shortly on{' '}
              <strong className="text-[#0f2547]">
                {countryCode} {phone}
              </strong>{' '}
              between 9 AM to 9 PM.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 bg-[#0f2547] hover:bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3 rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleCallbackSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="text-center space-y-1 pr-4">
              <span className="inline-block bg-red-50 text-red-600 border border-red-200 text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full">
                The Raptor Academics • Malta Desk
              </span>
              <h3 className="text-2xl font-black text-[#0f2547] pt-1">
                Request a call back
              </h3>
              <p className="text-xs text-slate-700">
                Let us help you guide towards your study abroad career path.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="relative shrink-0">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  aria-label="Country code"
                  className="appearance-none bg-slate-50 border border-slate-300 focus:border-[#0f2547] rounded-xl pl-3 pr-7 py-3 text-xs font-extrabold text-slate-950 focus:outline-none cursor-pointer"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+356">🇲🇹 +356</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+1">🇺🇸 +1</option>
                </select>
                <FaChevronDown
                  size={10}
                  className="text-slate-500 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                />
              </div>

              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-[#0f2547] focus:ring-2 focus:ring-[#0f2547]/10 text-sm font-semibold text-slate-950 focus:outline-none"
              />
            </div>

            <p className="text-xs font-extrabold text-slate-950 text-center">
              We will give you a call between 9 AM to 9 PM.
            </p>

            <ul className="space-y-2 text-xs font-semibold text-slate-900 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-red-600 shrink-0" size={12} />
                <span>Non-biased Malta course &amp; college guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-red-600 shrink-0" size={12} />
                <span>Counselling based on your profile &amp; preference</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-red-600 shrink-0" size={12} />
                <span>No repetitive calls, only as per convenience</span>
              </li>
            </ul>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-[#0f2547] disabled:opacity-60 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-red-600/20 transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Request a call back'}
            </button>

            {/* Single Direct Support Contact (9 AM to 9 PM) */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5 text-center">
              <p className="text-[11px] text-slate-800 font-medium">
                OR contact our learner support. We are available 9 AM to 9 PM.
              </p>

              <a
                href={SUPPORT_PHONE_HREF}
                className="w-full bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 text-xs transition-colors"
              >
                <FaHeadset className="text-red-600 shrink-0" size={13} />
                <span className="font-bold text-slate-600">Jaipur / India Desk:</span>
                <span className="font-extrabold text-[#0f2547]">
                  {SUPPORT_PHONE_DISPLAY}
                </span>
              </a>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

// ==========================================
// MAIN RAPTOR CHAT WIDGET (CLICK-DRIVEN ONLY)
// ==========================================
const RaptorChatWidget = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);

  const [launcherMode, setLauncherMode] = useState(0);

  const [step, setStep] = useState('ASK_NAME');
  const [userName, setUserName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [isSendingPhone, setIsSendingPhone] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Namaste! Welcome to The Raptor Academics. What is your name?'
    }
  ]);

  const universityList = useMemo(() => {
    return institutionsData.map((col) => col.name.split('–')[0].trim());
  }, []);

  useEffect(() => {
    if (menuOpen || chatOpen) return;
    const interval = setInterval(() => {
      setLauncherMode((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, [menuOpen, chatOpen]);

  const pushBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: `bot-${Date.now()}-${Math.random()}`, sender: 'bot', text }
    ]);
  };

  const pushUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}-${Math.random()}`, sender: 'user', text }
    ]);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const cleanName = nameInput.trim();
    if (!cleanName) return;

    setUserName(cleanName);
    setNameInput('');
    pushUserMessage(cleanName);
    pushBotMessage(
      `Nice to meet you, ${cleanName}! Please choose an option below so we can assist you with your Malta study plans:`
    );
    setStep('MAIN_MENU');
  };

  const handleMainOptionClick = (optionLabel) => {
    pushUserMessage(optionLabel);
    setSelectedTopic(optionLabel);

    if (optionLabel === 'Which Intake') {
      pushBotMessage(`${userName}, which intake month are you targeting?`);
      setStep('SUB_INTAKE');
    } else if (optionLabel === 'Which Course') {
      pushBotMessage(`${userName}, which course stream are you interested in?`);
      setStep('SUB_COURSE');
    } else if (optionLabel === 'Which University') {
      pushBotMessage(
        `${userName}, please select a university or college from the dropdown below:`
      );
      setStep('SUB_UNIVERSITY');
    } else if (optionLabel === 'Request a Callback') {
      setSelectedChoice('Direct Callback Request');
      pushBotMessage(
        `${userName}, please share your phone number so our team can call you back.`
      );
      setStep('ASK_PHONE');
    }
  };

  const handleSubChoiceClick = (choiceValue) => {
    pushUserMessage(choiceValue);
    setSelectedChoice(choiceValue);
    pushBotMessage(
      `Got it, ${userName}! Please enter your phone number so our team can contact you with details for ${choiceValue}.`
    );
    setStep('ASK_PHONE');
  };

  const handleUniversitySelect = (e) => {
    const chosen = e.target.value;
    setSelectedUniversity(chosen);
    if (!chosen) return;
    pushUserMessage(chosen);
    setSelectedChoice(chosen);
    pushBotMessage(
      `Great choice, ${userName}! Please share your phone number so our team can contact you regarding ${chosen}.`
    );
    setStep('ASK_PHONE');
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = phoneInput.trim();
    if (!cleanPhone || isSendingPhone) return;

    setIsSendingPhone(true);
    pushUserMessage(cleanPhone);
    setPhoneInput('');

    await sendChatLeadToApi({
      leadType: 'chat',
      name: userName,
      countryCode: '+91',
      phone: cleanPhone,
      topic: selectedTopic || 'General Chat',
      choice: selectedChoice || ''
    });

    pushBotMessage(
      `Thank you, ${userName}! We have noted your number (${cleanPhone})${
        selectedChoice ? ` for ${selectedChoice}` : ''
      }. Our team will contact you shortly.`
    );
    setIsSendingPhone(false);
    setStep('DONE');
  };

  const resetChat = () => {
    setUserName('');
    setNameInput('');
    setSelectedTopic('');
    setSelectedChoice('');
    setSelectedUniversity('');
    setPhoneInput('');
    setIsSendingPhone(false);
    setStep('ASK_NAME');
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'bot',
        text: 'Namaste! Welcome to The Raptor Academics. What is your name?'
      }
    ]);
  };

  const renderLauncherIcon = () => {
    if (menuOpen || chatOpen) {
      return <FaTimes size={22} />;
    }
    if (launcherMode === 0) {
      return <BrandEmblem className="w-14 h-14 border-2 border-white" />;
    }
    if (launcherMode === 1) {
      return <FaPhoneAlt size={21} />;
    }
    return <FaComments size={23} />;
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              data-lenis-prevent="true"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-[350px] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[78vh]"
            >
              <div className="bg-gradient-to-r from-[#0b1930] to-[#0f2547] text-white px-5 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <BrandEmblem className="w-11 h-11" />
                  <div>
                    <h4 className="text-sm sm:text-base font-black leading-tight">
                      Raptor Malta Assistant
                    </h4>
                    <p className="text-[11px] text-emerald-300 font-semibold">
                      {userName
                        ? `Chatting with ${userName}`
                        : 'The Raptor Academics • 2027 Desk'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={resetChat}
                    title="Restart chat"
                    aria-label="Restart chat"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FaRedo size={11} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setChatOpen(false)}
                    aria-label="Close chat"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FaTimes size={13} />
                  </button>
                </div>
              </div>

              <div
                data-lenis-prevent="true"
                className="p-4 sm:p-5 space-y-3 overflow-y-auto overscroll-contain flex-1 bg-[#f8fafc]"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium shadow-2xs ${
                        m.sender === 'user'
                          ? 'bg-red-600 text-white rounded-br-sm font-semibold'
                          : 'bg-white text-[#0f2547] border border-slate-200 rounded-bl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {step === 'MAIN_MENU' && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {[
                      'Which Intake',
                      'Which Course',
                      'Which University',
                      'Request a Callback'
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleMainOptionClick(opt)}
                        className="text-left px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#0f2547] text-[#0f2547] hover:text-white border border-slate-200 hover:border-[#0f2547] text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {step === 'SUB_INTAKE' && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {INTAKE_OPTIONS.map((month) => (
                      <button
                        key={month}
                        type="button"
                        onClick={() => handleSubChoiceClick(`${month} Intake`)}
                        className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-red-600 text-[#0f2547] hover:text-white border border-slate-200 hover:border-red-600 text-xs font-extrabold transition-all cursor-pointer"
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}

                {step === 'SUB_COURSE' && (
                  <div className="flex flex-col gap-2 pt-1">
                    {GENERAL_COURSE_OPTIONS.map((courseOpt) => (
                      <button
                        key={courseOpt}
                        type="button"
                        onClick={() => handleSubChoiceClick(courseOpt)}
                        className="text-left px-3.5 py-2 rounded-xl bg-white hover:bg-red-600 text-[#0f2547] hover:text-white border border-slate-200 hover:border-red-600 text-xs font-bold transition-all cursor-pointer"
                      >
                        {courseOpt}
                      </button>
                    ))}
                  </div>
                )}

                {step === 'SUB_UNIVERSITY' && (
                  <div className="pt-1">
                    <select
                      value={selectedUniversity}
                      onChange={handleUniversitySelect}
                      aria-label="Select a Malta university or college"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#0f2547]/30 focus:border-[#0f2547] text-xs font-bold text-[#0f2547] focus:outline-none cursor-pointer"
                    >
                      <option value="">Select from 12 Malta colleges...</option>
                      {universityList.map((uniName) => (
                        <option key={uniName} value={uniName}>
                          {uniName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {step === 'DONE' && (
                  <div className="pt-1 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setStep('MAIN_MENU')}
                      className="text-xs font-extrabold text-[#0f2547] hover:text-red-600 underline cursor-pointer"
                    >
                      Ask another option
                    </button>
                    <button
                      type="button"
                      onClick={resetChat}
                      className="text-xs font-bold text-slate-600 hover:text-[#0f2547] cursor-pointer"
                    >
                      Start over
                    </button>
                  </div>
                )}
              </div>

              {(step === 'ASK_NAME' || step === 'ASK_PHONE') && (
                <form
                  onSubmit={step === 'ASK_NAME' ? handleNameSubmit : handlePhoneSubmit}
                  className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
                >
                  {step === 'ASK_NAME' ? (
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Type your name..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] text-xs sm:text-sm font-medium text-slate-950 focus:outline-none"
                    />
                  ) : (
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="Enter your phone number..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] text-xs sm:text-sm font-medium text-slate-950 focus:outline-none"
                    />
                  )}

                  <button
                    type="submit"
                    disabled={step === 'ASK_PHONE' && isSendingPhone}
                    aria-label="Send"
                    className="w-10 h-10 rounded-xl bg-red-600 hover:bg-[#0f2547] disabled:opacity-60 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  >
                    <FaPaperPlane size={13} />
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuOpen && !chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-end gap-2.5"
            >
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setCallbackModalOpen(true);
                }}
                className="flex items-center gap-3 bg-[#0f2547] hover:bg-red-600 text-white px-4 py-2.5 rounded-full shadow-xl border border-white/15 text-xs font-extrabold transition-colors cursor-pointer"
              >
                <span>Request a Callback</span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <FaPhoneAlt size={12} />
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setChatOpen(true);
                }}
                className="flex items-center gap-3 bg-red-600 hover:bg-[#0f2547] text-white px-4 py-2.5 rounded-full shadow-xl border border-white/15 text-xs font-extrabold transition-colors cursor-pointer"
              >
                <span>Chat with Us</span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <FaComments size={13} />
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => {
            if (chatOpen) {
              setChatOpen(false);
              setMenuOpen(false);
            } else {
              setMenuOpen((prev) => !prev);
            }
          }}
          aria-label="Open Call and Chat options"
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0b1930] via-[#0f2547] to-red-600 text-white shadow-2xl border-2 border-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={menuOpen || chatOpen ? 'close' : `mode-${launcherMode}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full flex items-center justify-center"
            >
              {renderLauncherIcon()}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <CallbackModal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        initialName={userName}
      />
    </>
  );
};

export default RaptorChatWidget;