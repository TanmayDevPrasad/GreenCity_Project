import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import api from '../services/api';

function UserSignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      // Replace the following simulated API call with your actual API request.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Example:
      // const response = await api.post('/user/register', data);
      
      alert('User account created successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-blue-500">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">User Registration</h2>
          <p className="text-blue-100 text-center text-sm mt-1">
            Create your user account
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-blue-800 font-medium border-b border-blue-100 pb-1 mb-2">
                Personal Information
              </h3>
              <div>
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1 text-sm">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">
                  Email* <span className="text-xs text-blue-600">(Unique)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address'
                    }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            
            {/* Security */}
            <div className="space-y-4">
              <h3 className="text-blue-800 font-medium border-b border-blue-100 pb-1 mb-2">
                Security
              </h3>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-sm">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a secure password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1 text-sm">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) => value === password || 'Passwords do not match'
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-medium flex items-center justify-center shadow-lg"
              >
                Register Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSignupPage;
