import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { RedUnderline } from './Shared';

const reelsData = [
  {
    id: 1,
    title: "Real stories. Real experiences. Real results. 🎓✨",
    category: "Student Trust",
    views: "379K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794829560/reel3.mp4",
    poster: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "🎓 12th ke baad abroad jaana hai, but confused ?",
    category: "Director Message",
    views: "127K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794910846/reel2_2.mp4",
    poster: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "A parent’s trust is our biggest achievement. ❤️",
    category: "Parent Trust",
    views: "143K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794829372/reel1.mp4",
    poster: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    title: "Visa Approved! 🇲🇹✨",
    category: "Student Trust",
    views: "304K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794829631/reel4.mp4",
    poster: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    title: "Dreaming of a nursing career in Europe? 🌍",
    category: "Director Message",
    views: "170K+",
    videoUrl: "https://res.cloudinary.com/ppkvzeli/video/upload/v1794829713/reel5.mp4",
    poster: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
  }
];

const ReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Auto-play was prevented.", error);
        setIsMuted(true);
        videoRef.current.muted = true;
        videoRef.current.play();
      });
      setIsPlaying(true);
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={togglePlay}
      className="relative w-full max-w-[300px] sm:max-w-none mx-auto aspect-[3/4] lg:aspect-[9/16] rounded-3xl overflow-hidden bg-[#151515] border border-gray-800 shadow-2xl group cursor-pointer select-none"
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.poster}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover object-top lg:object-center transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          {reel.category}
        </span>
        <button
          onClick={toggleMute}
          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/15 hover:bg-red-600 transition-colors"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.7)] transform scale-90 group-hover:scale-100 transition-transform">
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 text-xs text-gray-300 mb-1.5 font-semibold">
          <FaInstagram className="text-red-500" />
          <span>{reel.views} Views</span>
        </div>
        <h4 className="text-white font-bold text-sm leading-snug line-clamp-2 drop-shadow-md">
          {reel.title}
        </h4>
      </div>
    </motion.div>
  );
};

const ReelsSection = () => {
  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-12 bg-[#080808] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-72 bg-red-600/15 blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center lg:items-end lg:text-left lg:flex-row justify-between mb-12 lg:mb-14 gap-6">
          <div className="max-w-2xl">
            <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs mb-3 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              INSIGHTS FROM OUR FOUNDER & DIRECTOR
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Student <RedUnderline>Stories & Expert</RedUnderline> Guidance
            </h2>
            <p className="text-gray-400 mt-4 text-sm md:text-base leading-relaxed">
              Get a closer look at international education through practical insights from our leadership team. Explore destination guides, admission updates, student experiences and guidance on planning your education in Malta and Europe.
            </p>
          </div>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition shrink-0 self-center lg:self-auto"
          >
            <FaInstagram size={20} /> Follow On Instagram <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {reelsData.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;