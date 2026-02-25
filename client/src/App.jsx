import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private/login" element={<AdminLogin />} />
        <Route path="/login/private" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
