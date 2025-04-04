import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar';
import Footer from '../Footer';

function ReportIssue() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = (data) => {
    console.log("Issue Reported:", data);
    alert("Issue reported successfully!");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Form Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-green-700 text-center">Report an Issue</h1>
          <p className="text-gray-600 text-center mt-2">Submit issues related to your community here.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* User Name Input */}
            <div>
              <label className="block text-gray-700 font-medium">username</label>
              <input
                type="text"
                {...register('username', { required: 'Your user is required' })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter your Username"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
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
              <label className="block text-gray-700 font-medium">Upload Image</label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-green-500"
                onClick={() => document.getElementById('imageInput').click()}
              >
                {image ? (
                  <img src={image} alt="Uploaded" className="max-h-40 rounded-lg" />
                ) : (
                  <p className="text-gray-500">Click to upload an image</p>
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
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Submit Issue
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
