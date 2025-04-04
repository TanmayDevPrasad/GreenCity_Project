import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SignUpSidebar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Join <span className="text-green-900">Green City</span>
      </h2>

      <button
        onClick={() => navigate('/admin-signup')}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 mb-3 rounded-xl transition duration-300"
      >
        Sign Up as Admin
      </button>

      <button
        onClick={() => navigate('/user-signup')}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 mb-3 rounded-xl transition duration-300"
      >
        Sign Up as User
      </button>

      <div className="border-t pt-4 mt-4">
        <p className="text-gray-500 text-sm text-center mb-2">Already have an account?</p>
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2.5 rounded-xl transition duration-300"
        >
          Log In
        </button>
      </div>
    </motion.aside>
  );
}

export default SignUpSidebar;
