import React from "react";
import { SettingsContainer } from "../components/SettingsContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { motion } from "framer-motion";

const CollaborationSettings: React.FC = () => {
  return (
    <SettingsContainer
      title="Collaboration Preferences"
      description="Configure how you work with your team and AI assistant."
      className="flex-1"
    >
      <div className="grid gap-4 mb-6">
        <div className="grid gap-2">
          <label className="text-white">Role</label>
          <Select defaultValue="editor">
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-white">Notifications for mentions</label>
            <p className="text-sm text-slate-400">
              Get notified when someone mentions you
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-white">AI suggestion alerts</label>
            <p className="text-sm text-slate-400">
              Receive alerts for AI-generated suggestions
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-white">Meeting auto-summaries</label>
            <p className="text-sm text-slate-400">
              Automatically generate meeting summaries
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
      </motion.button>
    </SettingsContainer>
  );
};

export default CollaborationSettings;
