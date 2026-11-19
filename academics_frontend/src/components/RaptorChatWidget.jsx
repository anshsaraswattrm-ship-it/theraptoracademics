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

































import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaComments,
  FaPhoneAlt,
  FaTimes,
  FaCheckCircle,
  FaRedo,
  FaPaperPlane,
  FaShieldAlt
} from 'react-icons/fa';

// =========================================================
// RAPTOR ACADEMICS LOGO URL (Yahan apni logo URL paste kar sakta hai)
// =========================================================
const RAPTOR_LOGO =
  "/src/assets/raptor r logo.png";

const INITIAL_BOT_MESSAGES = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: 'Namaste! Welcome to The Raptor Academics (Jaipur). How can we help with your 2027 study abroad plans?'
  },
  {
    id: 'welcome-2',
    sender: 'bot',
    text: 'Please tap an option below to get started:'
  }
];

const TOPIC_OPTIONS = [
  'Malta 2027 Admissions',
  'Pay Tuition After Visa',
  'Study Gap & No IELTS',
  'Request a Call Back'
];

const PROGRAM_OPTIONS = [
  'Nursing & Healthcare',
  'MBA / Business / Finance',
  'Hospitality & Tourism',
  'IT, AI & Digital'
];

const INTAKE_OPTIONS = [
  'Feb 2027 Intake',
  'Apr / Jul 2027 Intake',
  'Oct 2027 Intake'
];

const CHAT_TEXT = 'Chat with us';
const CALL_TEXT = 'Call me back';

const RaptorChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // One-time sequence on mount: 'logo' -> 'buttons_only' -> 'typing' -> 'unwriting' -> 'buttons_only'
  const [phase, setPhase] = useState('logo');
  const [typedLen, setTypedLen] = useState(0);

  const [messages, setMessages] = useState(INITIAL_BOT_MESSAGES);
  const [stage, setStage] = useState('topic');
  const [selections, setSelections] = useState({
    topic: '',
    program: '',
    intake: ''
  });
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    phone: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const chatBodyRef = useRef(null);

  // Run once on mount: show circle brand logo briefly, then smoothly transition into the two action buttons
  useEffect(() => {
    if (isOpen) return;

    let innerTimer;
    const logoTimer = setTimeout(() => {
      setPhase('buttons_only');
      innerTimer = setTimeout(() => {
        setTypedLen(0);
        setPhase('typing');
      }, 650);
    }, 1600);

    return () => {
      clearTimeout(logoTimer);
      if (innerTimer) clearTimeout(innerTimer);
    };
  }, [isOpen]);

  // Smooth, slightly slower typewriter & unwrite step engine (runs once)
  useEffect(() => {
    if (isOpen) return;

    const maxLen = Math.max(CHAT_TEXT.length, CALL_TEXT.length);

    if (phase === 'typing') {
      if (typedLen < maxLen) {
        const timer = setTimeout(() => {
          setTypedLen((prev) => prev + 1);
        }, 85);
        return () => clearTimeout(timer);
      } else {
        const holdTimer = setTimeout(() => {
          setPhase('unwriting');
        }, 1600);
        return () => clearTimeout(holdTimer);
      }
    }

    if (phase === 'unwriting') {
      if (typedLen > 0) {
        const timer = setTimeout(() => {
          setTypedLen((prev) => prev - 1);
        }, 65);
        return () => clearTimeout(timer);
      } else {
        setPhase('buttons_only');
      }
    }
  }, [phase, typedLen, isOpen]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, stage, isOpen]);

  const appendBotReply = (botTexts) => {
    const newBots = botTexts.map((t, i) => ({
      id: `${Date.now()}-bot-${i}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'bot',
      text: t
    }));
    setMessages((prev) => [...prev, ...newBots]);
  };

  const appendUserChoice = (choiceText) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user-${Math.random().toString(36).slice(2, 6)}`,
        sender: 'user',
        text: choiceText
      }
    ]);
  };

  const handleSelectTopic = (topic) => {
    appendUserChoice(topic);
    setSelections((prev) => ({ ...prev, topic }));

    if (topic === 'Request a Call Back') {
      setSelections((prev) => ({
        ...prev,
        topic: 'Call Back Request',
        program: 'General Counseling',
        intake: '2027 Intake'
      }));
      setStage('lead');
      appendBotReply([
        'Sure! Our Jaipur counselor calls between 10:00 AM – 6:00 PM with unbiased 2027 guidance.',
        'Please enter your Name and Mobile Number below:'
      ]);
      return;
    }

    setStage('program');
    appendBotReply([
      `Got it — ${topic}. Which field or program are you looking for?`
    ]);
  };

  const handleSelectProgram = (program) => {
    appendUserChoice(program);
    setSelections((prev) => ({ ...prev, program }));
    setStage('intake');
    appendBotReply([
      `${program} is a great choice. Which 2027 intake are you targeting?`
    ]);
  };

  const handleSelectIntake = (intake) => {
    appendUserChoice(intake);
    setSelections((prev) => ({ ...prev, intake }));
    setStage('lead');
    appendBotReply([
      `Noted: ${selections.program} for ${intake}.`,
      'To share your 2027 eligibility & fee options, please enter only your Name and Mobile Number:'
    ]);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const trimmedName = leadInfo.name.trim();
    const digitsOnly = leadInfo.phone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (digitsOnly.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg('');
    appendUserChoice(`${trimmedName} • ${leadInfo.phone.trim()}`);
    setStage('done');
    appendBotReply([
      `Thank you, ${trimmedName}! Our Jaipur team will call or WhatsApp you on ${leadInfo.phone.trim()} shortly.`,
      'Need immediate help? Call (+91) 72320 10105.'
    ]);
  };

  const handleReset = () => {
    setMessages(INITIAL_BOT_MESSAGES);
    setStage('topic');
    setSelections({ topic: '', program: '', intake: '' });
    setLeadInfo({ name: '', phone: '' });
    setErrorMsg('');
  };

  const handleOpenChat = () => {
    setIsOpen(true);
  };

  const handleOpenCallback = () => {
    setIsOpen(true);
    if (stage !== 'done') {
      setMessages([
        ...INITIAL_BOT_MESSAGES,
        {
          id: `${Date.now()}-cb-user`,
          sender: 'user',
          text: 'Request a Call Back'
        },
        {
          id: `${Date.now()}-cb-bot`,
          sender: 'bot',
          text: 'Sure! Enter your Name and Mobile Number below and our Jaipur advisor will call you back.'
        }
      ]);
      setSelections({
        topic: 'Call Back Request',
        program: 'General Counseling',
        intake: '2027 Intake'
      });
      setStage('lead');
    }
  };

  const showTwoButtons = !isOpen && phase !== 'logo';
  const showTypewriterPill = !isOpen && (phase === 'typing' || phase === 'unwriting') && typedLen > 0;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden font-sans outline-none focus:outline-none">
      {/* Chat Popup Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-[340px] sm:w-[375px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[540px] outline-none"
          >
            {/* Header with Raptor Academics Circle Logo */}
            <div className="bg-gradient-to-r from-[#0b1930] to-[#0f2547] text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white p-1.5 flex items-center justify-center shadow-md shrink-0 overflow-hidden">
                  <img
                    src={RAPTOR_LOGO}
                    alt="The Raptor Academics Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm tracking-tight">
                      Raptor 2027 Assistant
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-blue-200/80">
                    Tap options • Jaipur Study Desk
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Restart chat"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
                >
                  <FaRedo size={11} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
                >
                  <FaTimes size={13} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={chatBodyRef}
              data-lenis-prevent="true"
              className="p-4 space-y-3 overflow-y-auto overscroll-contain flex-1 bg-[#f8fafc]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[84%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed font-medium shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#0f2547] text-white rounded-br-sm font-semibold'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* STAGE 1: TOPIC OPTIONS */}
              {stage === 'topic' && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {TOPIC_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectTopic(opt)}
                      className="text-left text-xs font-bold bg-white hover:bg-red-600 text-[#0f2547] hover:text-white border border-slate-300 hover:border-red-600 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* STAGE 2: PROGRAM OPTIONS */}
              {stage === 'program' && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {PROGRAM_OPTIONS.map((prog) => (
                    <button
                      key={prog}
                      type="button"
                      onClick={() => handleSelectProgram(prog)}
                      className="text-left text-xs font-bold bg-white hover:bg-[#0f2547] text-[#0f2547] hover:text-white border border-slate-300 hover:border-[#0f2547] px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
                    >
                      {prog}
                    </button>
                  ))}
                </div>
              )}

              {/* STAGE 3: INTAKE OPTIONS */}
              {stage === 'intake' && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {INTAKE_OPTIONS.map((intake) => (
                    <button
                      key={intake}
                      type="button"
                      onClick={() => handleSelectIntake(intake)}
                      className="text-left text-xs font-bold bg-white hover:bg-red-600 text-[#0f2547] hover:text-white border border-slate-300 hover:border-red-600 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
                    >
                      {intake}
                    </button>
                  ))}
                </div>
              )}

              {/* STAGE 4: ONLY NAME & PHONE INPUT */}
              {stage === 'lead' && (
                <form
                  onSubmit={handleLeadSubmit}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 mt-1"
                >
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={leadInfo.name}
                      onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none font-medium text-[#0f2547]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadInfo.phone}
                      onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f2547] focus:outline-none font-medium text-[#0f2547]"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] font-bold text-red-600">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-[#0f2547] text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
                  >
                    <FaPaperPlane size={10} /> Submit Details
                  </button>
                </form>
              )}

              {/* STAGE 5: COMPLETED */}
              {stage === 'done' && (
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl space-y-2.5 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 font-extrabold text-emerald-800">
                    <FaCheckCircle size={14} />
                    <span>Request Confirmed</span>
                  </div>
                  <p className="text-[11px] text-emerald-900/85 leading-relaxed">
                    {selections.topic} • {selections.program} • {selections.intake}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="tel:+917232010105"
                      className="flex-1 text-center bg-[#0f2547] text-white font-bold py-2 rounded-xl text-[11px] outline-none focus:outline-none"
                    >
                      Call Now
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 text-center bg-white border border-emerald-300 text-emerald-900 font-bold py-2 rounded-xl text-[11px] cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
                    >
                      New Query
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Note */}
            <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400 shrink-0">
              <span className="flex items-center gap-1">
                <FaShieldAlt size={10} className="text-red-500" /> Guided options only
              </span>
              <span>The Raptor Academics</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL CIRCLE BRAND LOGO BUTTON (Zero outer outline) */}
      <AnimatePresence mode="wait">
        {!isOpen && phase === 'logo' && (
          <motion.button
            key="main-brand-logo"
            type="button"
            onClick={() => setPhase('buttons_only')}
            initial={{ opacity: 0, scale: 0.85, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -26 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            aria-label="The Raptor Academics"
            className="w-16 h-16 p-2.5 rounded-full bg-white border border-slate-200 hover:scale-105 shadow-xl flex items-center justify-center transition-transform duration-300 cursor-pointer overflow-hidden outline-none focus:outline-none focus-visible:outline-none"
          >
            <img
              src={RAPTOR_LOGO}
              alt="The Raptor Academics"
              className="w-full h-full object-contain rounded-full select-none pointer-events-none"
            />
          </motion.button>
        )}

        {/* TWO ACTION BUTTONS (Zero outer outline) */}
        {showTwoButtons && (
          <motion.div
            key="two-action-buttons"
            initial={{ opacity: 0, y: 34, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end gap-3 outline-none"
          >
            {/* Button 1: Chat with us */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5"
            >
              <AnimatePresence>
                {showTypewriterPill && (
                  <motion.span
                    key="chat-typewriter-pill"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="bg-white text-[#0f2547] border border-slate-200 text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-md whitespace-nowrap"
                  >
                    {CHAT_TEXT.slice(0, typedLen)}
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={handleOpenChat}
                aria-label="Chat with us"
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
              >
                <FaComments size={19} />
              </button>
            </motion.div>

            {/* Button 2: Call me back */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5"
            >
              <AnimatePresence>
                {showTypewriterPill && (
                  <motion.span
                    key="call-typewriter-pill"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="bg-white text-[#0f2547] border border-slate-200 text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-md whitespace-nowrap"
                  >
                    {CALL_TEXT.slice(0, typedLen)}
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={handleOpenCallback}
                aria-label="Call me back"
                className="w-12 h-12 rounded-full bg-[#0f2547] hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
              >
                <FaPhoneAlt size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RaptorChatWidget;