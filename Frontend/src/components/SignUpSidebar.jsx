import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpSidebar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  // For demo purposes, navigate based on a dummy role.
  // In a real app, determine the role from user state (e.g., context or Redux)
  const handleLogin = (role) => {
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  return (
    <aside className="p-6 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Join Green City</h2>
      <button
        onClick={() => navigate('/admin-signup')}
        className="w-full bg-green-600 text-white py-2 mb-2 rounded hover:bg-green-700"
      >
        Sign Up as Admin
      </button>
      <button
        onClick={() => navigate('/user-signup')}
        className="w-full bg-green-600 text-white py-2 mb-2 rounded hover:bg-green-700"
      >
        Sign Up as User
      </button>
      <button
        onClick={() => navigate('/login')}
        className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
      >
        If Already Registered, Log In
      </button>

      {/* Demo login buttons */}
      <div className="mt-4">
        <button
          onClick={() => handleLogin('user')}
          className="w-full bg-blue-500 text-white py-2 mb-2 rounded hover:bg-blue-600"
        >
          Go to User Dashboard
        </button>
        <button
          onClick={() => handleLogin('admin')}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Go to Admin Dashboard
        </button>
      </div>
    </aside>
  );
}

export default SignUpSidebar;
