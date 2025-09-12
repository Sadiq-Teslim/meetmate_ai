import React from "react";
import { SettingsContainer } from "../components/SettingsContainer";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { motion } from "framer-motion";

const AppearanceSettings: React.FC = () => {
  return (
    <SettingsContainer
      title="Appearance"
      description="Customize the look and feel of your interface."
    >
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-white mb-3 block">Theme</label>
          <RadioGroup defaultValue="dark" className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 bg-slate-700/30 p-3 rounded-lg">
              <RadioGroupItem value="light" id="light" />
              <Sun />
              <label htmlFor="light" className="text-white">
                Light
              </label>
            </div>
            <div className="flex items-center space-x-2 bg-slate-700/30 p-3 rounded-lg">
              <RadioGroupItem value="dark" id="dark" />
              <Moon />
              <label htmlFor="dark" className="text-white">
                Dark
              </label>
            </div>
            <div className="flex items-center space-x-2 bg-slate-700/30 p-3 rounded-lg">
              <RadioGroupItem value="system" id="system" />
              <Monitor />
              <label htmlFor="system" className="text-white">
                System
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-2">
          <label className="text-white">Font Size</label>
          <Select defaultValue="medium">
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
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

export default AppearanceSettings;
