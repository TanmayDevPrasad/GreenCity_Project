import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm({ onClose, setIsLoggedIn }) {
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

    // Simulate login logic (replace with API call in a real app)
    try {
      if (email === 'test@example.com' && password === 'password') {
        alert('Logged in successfully!');
        setIsLoggedIn(true);
        onClose();
        navigate('/'); // Redirect to homepage after login
      } else {
        alert('Invalid credentials!');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
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
        <label htmlFor="login-email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="login-password" className="block text-gray-700 font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="login-password"
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
        Log In
      </button>
      <p className="mt-3 text-center text-gray-600">
        <Link to="/forgot-password" className="text-green-600 hover:underline" onClick={onClose}>
          Forgot Password?
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;