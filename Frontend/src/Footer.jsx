import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-green-700 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Green City</h3>
            <p className="text-sm">
              Green City is a platform dedicated to promoting sustainability and eco-friendly initiatives. Join us in building a greener future!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm hover:underline hover:text-green-200 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm hover:underline hover:text-green-200 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-sm hover:underline hover:text-green-200 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm hover:underline hover:text-green-200 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <p className="text-sm mb-2">
              Email: <a href="mailto:info@greencity.com" className="hover:underline hover:text-green-200 transition-colors">info@greencity.com</a>
            </p>
            <p className="text-sm mb-4">
              Phone: <a href="tel:+1234567890" className="hover:underline hover:text-green-200 transition-colors">+1 (234) 567-890</a>
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-600 my-6"></div>
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} Green City Project. All rights reserved.</p>
          <p className="mt-2">
            <a href="/privacy-policy" className="hover:underline hover:text-green-200 transition-colors">Privacy Policy</a>
            {' | '}
            <a href="/terms-of-service" className="hover:underline hover:text-green-200 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;