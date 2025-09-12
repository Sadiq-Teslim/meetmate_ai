import React from "react";
import { SettingsContainer } from "../components/SettingsContainer";
import { Switch } from "../components/ui/switch";
import { motion } from "framer-motion";

const NotificationSettings: React.FC = () => {
  return (
    <SettingsContainer
      title="Notifications"
      description="Manage how and when you receive notifications."
    >
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-white">Email notifications</label>
            <p className="text-sm text-slate-400">
              Receive notifications via email
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-white">In-app alerts</label>
            <p className="text-sm text-slate-400">
              Show notifications within the app
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-white">Weekly summary emails</label>
            <p className="text-sm text-slate-400">
              Get a weekly digest of your activity
            </p>
          </div>
          <Switch />
        </div>
      </div>
      <motion.button
        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:saturate-150 cursor-pointer"
        whileHover={{ scale: status === "idle" ? 1.03 : 1 }}
        whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
      >
        <span>Save Changes</span>
      </motion.button>{" "}
    </SettingsContainer>
  );
};

export default NotificationSettings;
