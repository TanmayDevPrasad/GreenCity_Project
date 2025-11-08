import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-800 text-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">

        {/* Logo & Description */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Green City</h2>
          <p className="text-green-200">
            Promoting sustainability and eco-friendly initiatives across urban environments.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-green-200">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/projects" className="hover:text-white">Our Projects</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-2">Contact</h3>
          <p className="text-green-200">123 Eco Street, Green District, Sustainable City</p>
          <p className="text-green-200 mt-1">Email: info@greencity.com</p>
          <p className="text-green-200 mt-1">Phone: +1 (234) 567-890</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-600 mt-8 pt-4 text-green-200 text-sm text-center">
        © {currentYear} Green City Project. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
