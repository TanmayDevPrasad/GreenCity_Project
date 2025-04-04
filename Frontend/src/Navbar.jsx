import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300">
          🌿 Green City
        </h1>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg font-medium">
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
                  `relative transition-all duration-300 hover:text-green-200 ${
                    isActive
                      ? 'font-bold after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-white'
                      : ''
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
