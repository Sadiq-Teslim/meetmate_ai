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
import AIAssistantantSettings from "../features/AIAssistantantSettings";
import NotificationSettings from "../features/NotificationSettings";
import AppearanceSettings from "../features/AppearanceSettings";
import SecuritySettings from "../features/SecuritySettings";
import { X, Menu } from "lucide-react";

const navigationTabs = [
  { id: "account", label: "Account", icon: <BiUser /> },
  { id: "collaboration", label: "Collaboration", icon: <FaUsers /> },
  { id: "aiAssistant", label: "AI Assistant", icon: <FaRobot /> },
  { id: "notifications", label: "Notifications", icon: <FaBell /> },
  { id: "appearance", label: "Appearance", icon: <FaPalette /> },
  { id: "security", label: "Security", icon: <MdSecurity /> },
];

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col justify-start items-start p-4"
    >
      <div className="container mx-auto md:px-20 flex justify-between items-start">
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
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
          className="md:hidden block text-white bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-2xl p-2"
        >
          <Menu />
        </button>
      </div>

      <div className="container mx-auto md:px-20 flex flex-col lg:flex-row gap-6">
        {/* Desktop Navigation */}
        <div className="lg:w-64 md:flex-shrink-0 hidden md:block">
          <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-2xl">
            <div className="p-4">
              <nav className="space-y-2">
                {navigationTabs.map((tab) => (
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
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (Slide-out) */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setIsMobileNavOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                key="sidebar"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 bottom-0 w-80 bg-slate-800 border-r border-slate-700 z-50 flex flex-col"
              >
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                  <h2 className="text-white font-bold">Settings</h2>
                  <button
                    onClick={() => setIsMobileNavOpen(false)}
                    className="text-white"
                  >
                    <X />
                  </button>
                </div>
                <nav className="p-4 space-y-2 flex-1">
                  {navigationTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileNavOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "collaboration" && <CollaborationSettings />}
          {activeTab === "aiAssistant" && <AIAssistantantSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
