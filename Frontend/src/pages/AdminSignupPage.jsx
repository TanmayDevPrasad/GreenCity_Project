import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

function AdminSignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(API_ENDPOINTS.ORG_SIGNUP, {
        organizationName: data.organizationName,
        address: data.address,
        organizationId: data.organizationId,
        email: data.email,
        phone: parseInt(data.phone),
        password: data.password
      });

      if (response.data && response.data.message) {
        alert('Admin account created successfully!');
        navigate('/admin-login');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-green-600 to-green-500">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">Organization Admin Registration</h2>
          <p className="text-green-100 text-center text-sm mt-1">Create your administrative account</p>
        </div>
        <div className="p-6 bg-gradient-to-b from-green-50 to-white">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-green-800 font-medium border-b border-green-100 pb-1 mb-2">Organization Details</h3>
              <div>
                <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">Organization Name*</label>
                <input
                  type="text"
                  id="organizationName"
                  {...register("organizationName", { required: "Organization name is required" })}
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Enter organization name"
                />
                {errors.organizationName && <p className="text-red-500 text-xs">{errors.organizationName.message}</p>}
              </div>
              <div>
                <label htmlFor="organizationId" className="block text-sm font-medium text-gray-700">Organization ID*</label>
                <input
                  type="text"
                  id="organizationId"
                  {...register("organizationId", { required: "Organization ID is required" })}
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Unique organization ID"
                />
                {errors.organizationId && <p className="text-red-500 text-xs">{errors.organizationId.message}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address*</label>
                <textarea
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Enter address"
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>
              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Organization Logo</label>
                <input type="file" id="logo" {...register("logo")} className="w-full p-2.5 border rounded-lg" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-green-800 font-medium border-b border-green-100 pb-1 mb-2">Contact Information</h3>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
                  })}
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Enter email"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone*</label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: { value: /^\d{10,15}$/, message: "Invalid phone number" }
                  })}
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-green-800 font-medium border-b border-green-100 pb-1 mb-2">Security</h3>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password*</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Enter password"
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password*</label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
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

export default AdminSignupPage;
