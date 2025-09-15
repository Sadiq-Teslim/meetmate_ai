import React from "react";
import { SettingsContainer } from "../components/SettingsContainer";
import { motion } from "framer-motion";
import { TrashIcon } from "lucide-react";

const SecuritySettings: React.FC = () => {
  return (
    <SettingsContainer
      title="Security"
      description="Manage your account security and active sessions."
    >
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div>
            <label className="text-white">Two-Factor Authentication</label>
            <p className="text-sm text-slate-400">
              Add an extra layer of security
            </p>
          </div>
          <button
            type="button"
            className="border-slate-600 text-white hover:bg-slate-700 bg-transparent border-[1px] py-1 px-3 rounded-md"
          >
            Enable 2FA
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="text-white font-medium">Active Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-white font-medium">MacBook Pro</p>
              <p className="text-sm text-slate-400">Last login: 2 hours ago</p>
            </div>
            <div className="bg-green-600/20 text-green-400 px-4 py-1 rounded-lg">
              Current
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-white font-medium">iPhone 15</p>
              <p className="text-sm text-slate-400">Last login: 1 day ago</p>
            </div>
            <button className="text-slate-400 hover:text-white py-3 px-5">
              Revoke
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-red-400 font-medium">Danger Zone</h3>
        <div className="p-4 bg-red-950/20 border border-red-800/30 rounded-lg ">
          <div className="flex md:items-center items-start justify-between md:flex-row flex-col gap-y-3">
            <div>
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-sm text-slate-400">
                Permanently delete your account and all data
              </p>
            </div>
            <motion.button
              className="flex items-center justify-center md:space-x-2 bg-red-800 md:text-[1.5rem] text-[.7rem] text-white font-bold py-3 md:px-6 px-4 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:saturate-150 cursor-pointer"
              whileHover={{ scale: status === "idle" ? 1.03 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
            >
              <TrashIcon />
              <span className="ml-2">Delete Account</span>
            </motion.button>{" "}
          </div>
        </div>
      </div>
    </SettingsContainer>
  );
};

export default SecuritySettings;
