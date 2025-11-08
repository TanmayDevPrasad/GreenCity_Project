import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function Navbar() {
  const { user, organization, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowMenu(false);
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <NavLink to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
          <span className="text-3xl">🌿</span>
          <h1 className="text-2xl font-extrabold tracking-wide">
            Green City
          </h1>
        </NavLink>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium items-center">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'How It Works', path: '/how-it-works' },
            { name: 'Contact', path: '/contact' }
          ].map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `relative transition-all duration-300 hover:text-green-200 px-2 py-1 rounded ${
                    isActive
                      ? 'font-bold bg-green-800 bg-opacity-50'
                      : ''
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
          
          {/* Auth Buttons */}
          {isAuthenticated ? (
            <li className="ml-4 relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center space-x-2 bg-green-800 hover:bg-green-900 px-4 py-2 rounded-lg transition-colors"
              >
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold">
                  {user ? user.username?.charAt(0).toUpperCase() : organization?.organizationName?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="hidden lg:inline">
                  {user ? user.username : organization?.organizationName || 'User'}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  {user && (
                    <NavLink
                      to="/user-dashboard"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-gray-800 hover:bg-green-50 transition-colors"
                    >
                      Dashboard
                    </NavLink>
                  )}
                  {organization && (
                    <NavLink
                      to="/admin-dashboard"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-gray-800 hover:bg-green-50 transition-colors"
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li className="ml-4">
                <NavLink
                  to="/user-login"
                  className="px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user-signup"
                  className="px-4 py-2 bg-green-800 hover:bg-green-900 rounded-lg transition-colors"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden p-2 hover:bg-green-800 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden mt-4 pb-4 border-t border-green-500">
          <ul className="flex flex-col space-y-2 mt-4">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'How It Works', path: '/how-it-works' },
              { name: 'Contact', path: '/contact' }
            ].map(({ name, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={() => setShowMenu(false)}
                  className="block px-4 py-2 hover:bg-green-800 rounded transition-colors"
                >
                  {name}
                </NavLink>
              </li>
            ))}
            {isAuthenticated ? (
              <>
                {user && (
                  <li>
                    <NavLink
                      to="/user-dashboard"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 hover:bg-green-800 rounded transition-colors"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {organization && (
                  <li>
                    <NavLink
                      to="/admin-dashboard"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 hover:bg-green-800 rounded transition-colors"
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-300 hover:bg-red-900 rounded transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/user-login"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 hover:bg-green-800 rounded transition-colors"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user-signup"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 bg-green-800 hover:bg-green-900 rounded transition-colors"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
