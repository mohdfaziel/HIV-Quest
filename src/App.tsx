import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ModuleProvider } from './context/ModuleContext';
import { LanguageProvider } from './context/LanguageContext';
import ToastProvider from './context/ToastContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ModuleDetail from './pages/ModuleDetail';
import AboutCreator from './pages/AboutCreator';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ModuleProvider>
          <ToastProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/module/:moduleId" element={<ModuleDetail />} />
                <Route path="/about-creator" element={<AboutCreator />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </ToastProvider>
        </ModuleProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;