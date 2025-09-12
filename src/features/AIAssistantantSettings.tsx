import React from "react";
import { SettingsContainer } from "../components/SettingsContainer";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { motion } from "framer-motion";

const AIAssistantantSettings: React.FC = () => {
  return (
    <SettingsContainer
      title="AI Assistant Settings"
      description="Customize your AI assistant experience and preferences."
    >
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-white mb-3 block">AI Mode</label>
          <RadioGroup defaultValue="expert" className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 bg-slate-700/30 p-3 rounded-lg">
              <RadioGroupItem value="beginner" id="beginner" />
              <label htmlFor="beginner" className="text-white">
                Beginner
              </label>
            </div>
            <div className="flex items-center space-x-2 bg-slate-700/30 p-3 rounded-lg">
              <RadioGroupItem value="expert" id="expert" />
              <label htmlFor="expert" className="text-white">
                Expert
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-2">
          <label className="text-white">Default Coding Language</label>
          <Select defaultValue="javascript">
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-white">Voice Assistant</label>
            <p className="text-sm text-slate-400">
              Enable voice interactions with AI
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

export default AIAssistantantSettings;
