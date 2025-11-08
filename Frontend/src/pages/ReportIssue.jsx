import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import Navbar from '../Navbar';
import Footer from '../Footer';

function ReportIssue() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    if (!user) {
      setError('Please login to report an issue');
      return;
    }

    if (!imageFile) {
      setError('Please upload an image');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('username', user.username || data.username);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('location', data.location);
      formData.append('image', imageFile);

      const response = await axios.post(API_ENDPOINTS.REPORT_ISSUE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.message) {
        setSuccess(`Issue reported successfully! Issue Code: ${response.data.issue.issueCode}`);
        // Revoke object URL before resetting
        if (image) {
          URL.revokeObjectURL(image);
        }
        // Reset form
        reset();
        setImage(null);
        setImageFile(null);
        // Clear file input
        const fileInput = document.getElementById('imageInput');
        if (fileInput) fileInput.value = '';
        setTimeout(() => {
          setSuccess('');
        }, 5000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to report issue. Please try again.';
      setError(errorMessage);
      console.error('Error reporting issue:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      // Revoke previous object URL to prevent memory leak
      if (image) {
        URL.revokeObjectURL(image);
      }
      setImage(URL.createObjectURL(file));
      setImageFile(file);
      setError('');
    }
  };

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Form Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-green-700 text-center">Report an Issue</h1>
          <p className="text-gray-600 text-center mt-2">Submit issues related to your community here.</p>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-lg">
              <p className="text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* User Name Input - Auto-filled if logged in */}
            {!user && (
              <div>
                <label className="block text-gray-700 font-medium">Username</label>
                <input
                  type="text"
                  {...register('username', { required: !user ? 'Username is required' : false })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your Username"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>
            )}

            {/* Location Input */}
            <div>
              <label className="block text-gray-700 font-medium">Location*</label>
              <input
                type="text"
                {...register('location', { required: 'Location is required' })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter issue location"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            {/* Issue Title */}
            <div>
              <label className="block text-gray-700 font-medium">Issue Title*</label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter issue title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-gray-700 font-medium">Description*</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                rows="3"
                placeholder="Describe the issue..."
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium">Upload Image*</label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors"
                onClick={() => document.getElementById('imageInput').click()}
              >
                {image ? (
                  <div className="text-center">
                    <img src={image} alt="Uploaded" className="max-h-40 rounded-lg mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                    <p className="text-xs text-gray-400 mt-1">Max size: 5MB</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Issue'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ReportIssue;
