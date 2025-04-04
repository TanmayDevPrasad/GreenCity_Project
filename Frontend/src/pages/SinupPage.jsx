import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

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

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.organizationName || !formData.organizationId || !formData.address) {
        setError('Please fill in all organization details');
        return false;
      }
    } else if (step === 2) {
      if (!formData.email || !formData.phone) {
        setError('Please fill in all contact information');
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
      
      if (!formData.password || !formData.confirmPassword) {
        setError('Please set your password');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setError('');
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setError('');
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    
    try {
      // Simulate API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setError('');
      // Show success message
      alert('Admin account created successfully!');
      // Redirect to login page
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Admin sign-up error:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(120deg, #134e5e, #71b280)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full w-96 h-96 bg-green-200 opacity-20 blur-3xl"
          style={{ 
            left: `${animationPosition.x}%`, 
            top: `${animationPosition.y}%`,
            transition: 'all 3s ease-in-out'
          }} 
        />
        <div className="absolute rounded-full w-64 h-64 bg-green-400 opacity-10 blur-3xl"
          style={{ 
            right: `${100 - animationPosition.x}%`, 
            bottom: `${100 - animationPosition.y}%`,
            transition: 'all 4s ease-in-out'
          }} 
        />
      </div>
      
      {/* Header */}
      <header className="relative z-10 py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-white p-2 shadow-md flex items-center justify-center">
            <div className="text-green-600 font-bold text-xl">A</div>
          </div>
          <h1 className="ml-3 text-white font-bold text-xl">Admin Portal</h1>
        </div>
        <div>
          <button onClick={() => navigate('/login')} className="text-green-100 hover:text-white transition-colors text-sm">
            Already have an account? Sign In
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all hover:shadow-green-900/20">
          {/* Signup form header */}
          <div className="bg-gradient-to-r from-green-700 to-green-500 p-6">
            <h2 className="text-white font-bold text-2xl">Create Admin Account</h2>
            <p className="text-green-100 text-sm mt-1">Register your organization's administrative account</p>
            
            {/* Progress indicator */}
            <div className="mt-4 flex items-center">
              <div className="w-full bg-green-800 rounded-full h-2.5">
                <div className="bg-white h-2.5 rounded-full" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
              </div>
              <span className="ml-2 text-white text-sm">Step {currentStep}/{totalSteps}</span>
            </div>
          </div>
          
          <div className="p-8 bg-gradient-to-b from-green-50 to-white">
            {/* Registration form */}
            <form onSubmit={currentStep === totalSteps ? handleSubmit : nextStep}>
              {error && (
                <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg animate-pulse">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-green-800 font-medium border-b border-green-100 pb-2 mb-4">Organization Details</h3>
                  
                  <div>
                    <label htmlFor="admin-organizationName" className="block text-gray-700 font-medium mb-2">
                      Organization Name*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <input
                        id="admin-organizationName"
                        type="text"
                        value={formData.organizationName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="Enter organization name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="admin-organizationId" className="block text-gray-700 font-medium mb-2">
                      Organization ID* <span className="text-xs text-green-600">(Unique)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                      </div>
                      <input
                        id="admin-organizationId"
                        type="text"
                        value={formData.organizationId}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="Create a unique organization ID"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="admin-address" className="block text-gray-700 font-medium mb-2">
                      Address*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <textarea
                        id="admin-address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="Enter organization address"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-green-800 font-medium border-b border-green-100 pb-2 mb-4">Contact Information</h3>
                  
                  <div>
                    <label htmlFor="admin-email" className="block text-gray-700 font-medium mb-2">
                      Email* <span className="text-xs text-green-600">(Unique)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        id="admin-email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="Enter admin email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="admin-phone" className="block text-gray-700 font-medium mb-2">
                      Phone* <span className="text-xs text-green-600">(Unique)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        id="admin-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="Enter contact phone number"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-green-800 font-medium border-b border-green-100 pb-2 mb-4">Security</h3>
                  
                  <div>
                    <label htmlFor="admin-password" className="block text-gray-700 font-medium mb-2">
                      Password*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="Create a secure password"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('password')}
                          className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                  </div>
                  
                  <div>
                    <label htmlFor="admin-confirmPassword" className="block text-gray-700 font-medium mb-2">
                      Confirm Password*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <input
                        id="admin-confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="Confirm your password"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showConfirmPassword ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="#" className="text-green-600 hover:text-green-700 font-medium">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-700 font-medium">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                )}
                
                <button
                  type={currentStep === totalSteps ? 'submit' : 'button'}
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
                  ) : currentStep === totalSteps ? (
                    'Create Account'
                  ) : (
                    <>
                      Next
                      <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-4 px-8 text-center text-white text-sm">
        <p>© 2025 Admin Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SignupPage;