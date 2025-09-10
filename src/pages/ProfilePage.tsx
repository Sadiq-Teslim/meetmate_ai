// src/pages/ProfilePage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaSave, FaArrowLeft } from 'react-icons/fa';

const ProfilePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-2xl">
        <Link to="/dashboard" className="flex items-center space-x-2 text-slate-400 hover:text-slate-100 transition-colors mb-6">
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </Link>
        
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <img
              src="https://i.pravatar.cc/100?u=a042581f4e29026704d"
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-slate-600 ring-4 ring-slate-700"
            />
            <div>
              <h1 className="text-3xl font-bold text-white text-center sm:text-left">Edit Profile</h1>
              <p className="text-slate-400 text-center sm:text-left">Update your account information.</p>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  id="name"
                  defaultValue="Daniel Elegy"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  id="email"
                  defaultValue="hire@topone.au"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:saturate-150 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSave />
                <span>Save Changes</span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;