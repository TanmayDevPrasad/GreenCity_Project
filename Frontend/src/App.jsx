import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminSignupPage from './pages/AdminSignupPage';
import UserSignupPage from './pages/UserSignupPage';
import EcoTransport from './pages/EcoTransport';
import Gamification from './pages/Gamification';
import ReportIssue from './pages/ReportIssue';
import AdminDashboard from './pages/AdminDashboard';
import HowItWorks from './pages/HowItWorks';
import TransportEntry from './pages/TransportEntry';
import UserLoginPage from './pages/UserLoginPage';

import UserDashboard from './pages/UserDashboard';
import './App.css';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define routes for each page */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin-signup" element={<AdminSignupPage />} />
          <Route path="/user-signup" element={<UserSignupPage />} />
          <Route path="/eco-transport" element={<EcoTransport />} />
          <Route path="/gamification-score" element={<Gamification />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/transport-entry" element={<TransportEntry />} />
          <Route path="/user-login" element={<UserLoginPage />} />
          {/* Add more routes as needed */}
          {/* Example: Admin Dashboard */}
         
          <Route path="/user-dashboard" element={<UserDashboard />} />
          {/* Fallback route for undefined paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
