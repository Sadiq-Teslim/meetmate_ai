// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import TestPage from './pages/testPage';
import DashboardLayout from "./pages/DashboardPage";
// import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/test" element={<TestPage />} /> */}
      <Route path="/dashboard" element={<DashboardLayout />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;
