import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaPalette,
  FaRobot,
  FaUsers,
} from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import AccountSettings from "../features/AccountSettings";
import CollaborationSettings from "../features/CollaborationSettings";
import { MdSecurity } from "react-icons/md";

const navigationTabs = [
  { id: "account", label: "Account", icon: <BiUser /> },
  { id: "collaboration", label: "Collaboration", icon: <FaUsers /> },
  { id: "ai-assistant", label: "AI Assistant", icon: <FaRobot /> },
  { id: "notifications", label: "Notifications", icon: <FaBell /> },
  { id: "appearance", label: "Appearance", icon: <FaPalette /> },
  { id: "security", label: "Security", icon: <MdSecurity /> },
];

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col justify-start items-start  p-4"
    >
      <div className="container mx-auto px-20">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-slate-400 hover:text-slate-100 transition-colors mb-6"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-blue-200">
            Manage your account, preferences, and AI assistant.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-20 flex flex-col lg:flex-row gap-6">
        <AnimatePresence>
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-slate-800/50 border-[1px] border-slate-700 backdrop-blur-sm rounded-2xl">
              <div className="p-4">
                <nav className="space-y-2">
                  {navigationTabs.map((tab) => {
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-600 text-white"
                            : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </AnimatePresence>

        {/* Content Area */}
        <div className="flex-1 ">
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "collaboration" && <CollaborationSettings />}
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
