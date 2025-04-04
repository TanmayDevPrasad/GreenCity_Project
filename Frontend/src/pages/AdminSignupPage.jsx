import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import api from '../services/api';

function AdminSignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Optional: Handle file upload if a logo is provided
      if (data.logo && data.logo[0]) {
        // You could add code here to upload the file and set data.logoUrl accordingly.
        // For now we simulate by logging the file:
        console.log('Uploaded logo file:', data.logo[0]);
      }
      
      // Simulate API call to register admin (replace with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // For example, you could do:
      // const response = await api.post('/admin/register', data);
      
      alert('Admin account created successfully!');
      navigate('/login'); // Redirect to login page after registration
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-green-600 to-green-500"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">Organization Admin Registration</h2>
          <p className="text-green-100 text-center text-sm mt-1">
            Create your administrative account
          </p>
        </div>
        <div className="p-6 bg-gradient-to-b from-green-50 to-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Organization Details */}
            <div className="space-y-4">
              <h3 className="text-green-800 font-medium border-b border-green-100 pb-1 mb-2">
                Organization Details
              </h3>
              <div>
                <label htmlFor="organizationName" className="block text-gray-700 font-medium mb-1 text-sm">
                  Organization Name*
                </label>
                <input
                  type="text"
                  id="organizationName"
                  {...register("organizationName", { required: "Organization name is required" })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter organization name"
                />
                {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName.message}</p>}
              </div>
              <div>
                <label htmlFor="organizationId" className="block text-gray-700 font-medium mb-1 text-sm">
                  Organization ID* <span className="text-xs text-green-600">(Unique)</span>
                </label>
                <input
                  type="text"
                  id="organizationId"
                  {...register("organizationId", { required: "Organization ID is required" })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter unique organization ID"
                />
                {errors.organizationId && <p className="text-red-500 text-xs mt-1">{errors.organizationId.message}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium mb-1 text-sm">
                  Address*
                </label>
                <textarea
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter organization address"
                  rows="2"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>
              <div>
                <label htmlFor="logo" className="block text-gray-700 font-medium mb-1 text-sm">
                  Organization Logo (Optional)
                </label>
                <input
                  type="file"
                  id="logo"
                  {...register("logo")}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-green-800 font-medium border-b border-green-100 pb-1 mb-2">
                Contact Information
              </h3>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">
                  Email* <span className="text-xs text-green-600">(Unique)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter admin email address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1 text-sm">
                  Phone* <span className="text-xs text-green-600">(Unique)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: { value: /^\d{10,15}$/, message: "Enter a valid phone number" }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter contact phone number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>
            {/* Security */}
            <div className="space-y-4">
              <h3 className="text-green-800 font-medium border-b border-green-100 pb-1 mb-2">Security</h3>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-sm">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Create a secure password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1 text-sm">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
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
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all font-medium flex items-center justify-center shadow-lg"
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

export default AdminSignupPage;
