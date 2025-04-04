import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });

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
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.password) {
      setError('Please enter both User ID and Password');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const simulatedUser = {
        role: formData.userId.toLowerCase().includes('admin') ? 'admin' : 'user'
      };

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
        background: `linear-gradient(120deg, #00c6ff, #0072ff)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full w-96 h-96 bg-blue-200 opacity-20 blur-3xl"
          style={{
            left: `${animationPosition.x}%`,
            top: `${animationPosition.y}%`,
            transition: 'all 3s ease-in-out'
          }}
        />
        <div className="absolute rounded-full w-64 h-64 bg-blue-400 opacity-10 blur-3xl"
          style={{
            right: `${100 - animationPosition.x}%`,
            bottom: `${100 - animationPosition.y}%`,
            transition: 'all 4s ease-in-out'
          }}
        />
      </div>

      <header className="relative z-10 py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-white p-2 shadow-md flex items-center justify-center">
            <div className="text-blue-600 font-bold text-xl">U</div>
          </div>
          <h1 className="ml-3 text-white font-bold text-xl">User Portal</h1>
        </div>
        <div>
          <button onClick={() => navigate('/signup')} className="text-blue-100 hover:text-white transition-colors text-sm">
            Need an account? Sign Up
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all hover:shadow-blue-900/20">
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6">
            <h2 className="text-white font-bold text-2xl">Hello Again!</h2>
            <p className="text-blue-100 text-sm mt-1">Login to your user account</p>
          </div>

          <div className="p-8 bg-gradient-to-b from-blue-50 to-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg animate-pulse">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="userId" className="block text-gray-700 font-medium mb-2">
                    User ID
                  </label>
                  <input
                    id="userId"
                    type="text"
                    value={formData.userId}
                    onChange={handleChange}
                    className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your User ID"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={togglePasswordVisibility} className="text-gray-400 hover:text-gray-600">
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Logging in...
                  </span>
                ) : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-4 px-8 text-center text-white text-sm">
        <p>© 2025 User Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default UserLoginPage;
