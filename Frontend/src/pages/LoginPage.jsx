import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    organizationId: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.organizationId || !formData.password) {
      setError('Please enter both Organization ID and Password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated API response based on organizationId (this is just for demo)
      // For example, if organizationId contains "admin", then role is admin
      const simulatedUser = {
        role: formData.organizationId.toLowerCase().includes('admin')
                ? 'admin'
                : 'user'
      };

      // Successfully logged in; navigate based on the returned role
      if (simulatedUser.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <button onClick={() => navigate('/signup')} className="text-green-100 hover:text-white transition-colors text-sm">
            Need an account? Sign Up
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all hover:shadow-green-900/20">
          {/* Login form header */}
          <div className="bg-gradient-to-r from-green-700 to-green-500 p-6">
            <h2 className="text-white font-bold text-2xl">Welcome Back</h2>
            <p className="text-green-100 text-sm mt-1">Sign in to your administrative account</p>
          </div>
          
          <div className="p-8 bg-gradient-to-b from-green-50 to-white">
            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg animate-pulse">
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
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="organizationId" className="block text-gray-700 font-medium mb-2">
                    Organization ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <input
                      id="organizationId"
                      type="text"
                      value={formData.organizationId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Enter your Organization ID"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
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
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-700 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg shadow-lg shadow-green-500/30 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
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

export default LoginPage;
