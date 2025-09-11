import React from "react";
import { SettingsContainer } from "../components/SettingsContainer";

const CollaborationSettings: React.FC = () => {
  return (
    <SettingsContainer
      title="Collaboration Preferences"
      description="Configure how you work with your team and AI assistant."
      className="flex-1 w-full"
    >
      Collaboration
    </SettingsContainer>
  );
};

export default CollaborationSettings;
