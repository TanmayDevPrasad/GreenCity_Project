import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Green City</h1>
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'underline font-bold' : 'hover:underline'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'underline font-bold' : 'hover:underline'
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              isActive ? 'underline font-bold' : 'hover:underline'
            }
          >
            How It Works
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'underline font-bold' : 'hover:underline'
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;