import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSignUpForm({ onClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    // Simulate user sign-up logic (replace with API call in a real app)
    try {
      setError('');
      alert('User signed up successfully!');
      onClose(); // Close the modal
      navigate('/login'); // Redirect to login page after sign-up
    } catch (err) {
      setError('Sign-up failed. Please try again.');
      console.error('User sign-up error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="user-email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="user-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user-password" className="block text-gray-700 font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="user-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
      >
        Sign Up as User
      </button>
    </form>
  );
}

export default UserSignUpForm;