// src/pages/LandingPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaRegCircle } from 'react-icons/fa';

// --- Header Component ---
const Header: React.FC = () => {
  const navItems = ["Home", "Feature", "Subscription", "Testimonial", "FAQ"];
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex justify-between items-center"
    >
      <div className="flex items-center space-x-2">
        <FaRegCircle className="text-blue-600" />
        <span className="font-semibold text-lg text-slate-800">MeetMate AI</span>
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map(item => (
          <a key={item} href="#" className="text-slate-600 hover:text-blue-600 transition-colors">{item}</a>
        ))}
      </nav>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px -5px rgba(37, 99, 235, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg"
      >
        Sign Up
      </motion.button>
    </motion.header>
  );
};

// --- Phone Mockup Component ---
const PhoneMockup: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative w-[300px] h-[600px] bg-black border-4 border-slate-800 rounded-[40px] shadow-2xl p-2"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-lg" />
      <div className="w-full h-full bg-slate-100 rounded-[32px] p-4 flex flex-col text-slate-900">
        <div className="flex justify-between items-center text-xs text-slate-700">
          <span>9:41</span>
          <div className="flex space-x-1"><span>📶</span><span>🔋</span></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-2xl">Minutes of Meeting</p>
          <div className="w-8 h-8 rounded-full bg-slate-200" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 mt-6 space-y-1">
          <p className="font-semibold">Strategic Sync-Up: Q3 Goals...</p>
          <p className="text-xs text-slate-500">16 Jan 2025 at 13:58 - 10 min, 40 sec</p>
        </div>
        <div className="flex-grow" />
        <motion.button whileHover={{ scale: 1.03 }} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full shadow-lg">
          Start Taking Notes
        </motion.button>
      </div>
    </motion.div>
  );
};

// --- App Store Buttons Component ---
const AppStoreButtons: React.FC = () => (
  <div className="flex items-center space-x-4 mt-8">
    <a href="#" className="transform hover:scale-105 transition-transform">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
    </a>
    <a href="#" className="transform hover:scale-105 transition-transform">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-12" />
    </a>
  </div>
);


// --- The Main Landing Page Component ---
const LandingPage: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  // };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-12"
      >
        <Header />
        <main className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.h1 variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }} className="text-4xl lg:text-6xl font-extrabold tracking-tighter text-slate-900">
              Note Every Meeting with MeetMate AI!
            </motion.h1>
            <motion.p variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }} className="mt-4 text-lg text-slate-600 max-w-md">
              The AI-powered app for effortless meeting minutes. Record, transcribe, and summarize meetings in seconds.
            </motion.p>
            <motion.div variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }}>
              <AppStoreButtons />
            </motion.div>
          </motion.div>
          
          {/* Right Column: Phone Mockup */}
          <div className="flex justify-center items-center">
            <PhoneMockup />
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default LandingPage;