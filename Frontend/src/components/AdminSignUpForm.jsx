import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSignUpForm({ onClose }) {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationId: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });

  // Animation effect for background
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id.replace('admin-', '')]: value
    });
  };

  const validateForm = () => {
    if (!formData.organizationName || !formData.organizationId || !formData.email || 
        !formData.phone || !formData.address || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/[-()\s]/g, ''))) {
      setError('Please enter a valid phone number');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setError('');
      alert('Admin account created successfully!');
      onClose(); // Close the modal
      navigate('/login'); // Redirect to login page
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Admin sign-up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
      style={{
        background: `linear-gradient(120deg, #134e5e, #71b280)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full w-64 h-64 bg-green-200 opacity-20 blur-3xl"
          style={{ 
            left: `${animationPosition.x}%`, 
            top: `${animationPosition.y}%`,
            transition: 'all 3s ease-in-out'
          }} 
        />
        <div className="absolute rounded-full w-96 h-96 bg-green-400 opacity-10 blur-3xl"
          style={{ 
            right: `${100 - animationPosition.x}%`, 
            bottom: `${100 - animationPosition.y}%`,
            transition: 'all 4s ease-in-out'
          }} 
        />
      </div>
      
      {/* Form container */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden relative z-10">
        {/* Green header bar */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">Organization Admin Registration</h2>
          <p className="text-green-100 text-center text-sm mt-1">Create your administrative account</p>
        </div>
        
        {/* Form with subtle animated background */}
        <div className="p-6 relative bg-gradient-to-b from-green-50 to-white">
          <div className="absolute inset-0 bg-green-100 opacity-5">
            <div className="absolute w-full h-full" 
              style={{
                backgroundImage: `radial-gradient(circle, #4ade80 8%, transparent 8%)`,
                backgroundPosition: '0 0',
                backgroundSize: '20px 20px',
                opacity: '0.1'
              }} />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 relative">
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm animate-pulse">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Organization Details */}
            <div className="space-y-4">
              <h3 className="text-green-800 font-medium border-b border-green-100 pb-1 mb-2">Organization Details</h3>
              <div>
                <label htmlFor="admin-organizationName" className="block text-gray-700 font-medium mb-1 text-sm">
                  Organization Name*
                </label>
                <input
                  type="text"
                  id="admin-organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter organization name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="admin-organizationId" className="block text-gray-700 font-medium mb-1 text-sm">
                  Organization ID* <span className="text-xs text-green-600">(Unique)</span>
                </label>
                <input
                  type="text"
                  id="admin-organizationId"
                  value={formData.organizationId}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter unique organization ID"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="admin-address" className="block text-gray-700 font-medium mb-1 text-sm">
                  Address*
                </label>
                <textarea
                  id="admin-address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter organization address"
                  rows="2"
                  required
                />
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-green-800 font-medium border-b border-green-100 pb-1 mb-2">Contact Information</h3>
              <div>
                <label htmlFor="admin-email" className="block text-gray-700 font-medium mb-1 text-sm">
                  Email* <span className="text-xs text-green-600">(Unique)</span>
                </label>
                <input
                  type="email"
                  id="admin-email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter admin email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="admin-phone" className="block text-gray-700 font-medium mb-1 text-sm">
                  Phone* <span className="text-xs text-green-600">(Unique)</span>
                </label>
                <input
                  type="tel"
                  id="admin-phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter contact phone number"
                  required
                />
              </div>
            </div>
            
            {/* Security */}
            <div className="space-y-4">
              <h3 className="text-green-800 font-medium border-b border-green-100 pb-1 mb-2">Security</h3>
              <div>
                <label htmlFor="admin-password" className="block text-gray-700 font-medium mb-1 text-sm">
                  Password*
                </label>
                <input
                  type="password"
                  id="admin-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Create a secure password"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="admin-confirmPassword" className="block text-gray-700 font-medium mb-1 text-sm">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  id="admin-confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-green-500/30 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Register Account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUpForm;