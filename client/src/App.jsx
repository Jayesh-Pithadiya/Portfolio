import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import './index.css';

function App() {
  // Check if we are on the backend domain to show Admin at the root
  const isAdminDomain = window.location.hostname.includes('backend-nzlg') ||
    window.location.hostname === 'localhost'; // Added localhost for testing

  return (
    <Router>
      <Routes>
        {/* Root path depends on the domain */}
        <Route path="/" element={isAdminDomain ? <AdminLogin /> : <Home />} />

        {/* Keep these for direct access or backward compatibility */}
        <Route path="/portfolio" element={<Home />} />
        <Route path="/admin/private" element={<AdminLogin />} />
        <Route path="/login/private" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
