import React from "react";
import { SettingsContainer } from "../components/SettingsContainer";
import { motion } from "framer-motion";

const AccountSettings: React.FC = () => {
  return (
    <SettingsContainer
      title="Account"
      description="Manage your profile information and account details."
      className="flex-1 w-full"
    >
      <div className="space-y-4 mb-6">
        <h3 className="text-white font-medium">Change Password</h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              New Password
            </label>

            <input
              type="text"
              id="password"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <motion.button
        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:saturate-150 cursor-pointer"
        whileHover={{ scale: status === "idle" ? 1.03 : 1 }}
        whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
      >
        {/* <FaMicrophone /> */}
        <span>Save Changes</span>
      </motion.button>
    </SettingsContainer>
  );
};

export default AccountSettings;
