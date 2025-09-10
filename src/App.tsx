// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import TestPage from './pages/testPage';  
// You will create these files later for your dashboard
// import DashboardLayout from './pages/DashboardLayout';
// import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/test" element={<TestPage />} /> */}
      {/* <Route path="/dashboard" element={<DashboardLayout />} /> */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;