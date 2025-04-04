import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaLeaf, FaMapMarkerAlt, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-green-800 to-green-600 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-12 transform -translate-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-8">
              <h3 className="text-green-700 text-xl font-bold">Join Our Newsletter</h3>
              <p className="text-gray-600">Stay updated with the latest green initiatives and sustainability tips</p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-r-lg transition-colors flex items-center">
                  Subscribe <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <FaLeaf className="text-green-300 text-2xl mr-2" />
              <h3 className="text-xl font-bold">Green City</h3>
            </div>
            <p className="text-green-100 mb-6">
              Green City is a platform dedicated to promoting sustainability and eco-friendly initiatives across urban environments. Join us in building a greener, more sustainable future for generations to come.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-green-700 hover:bg-green-500 p-2 rounded-full transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-green-700 hover:bg-green-500 p-2 rounded-full transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-green-700 hover:bg-green-500 p-2 rounded-full transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-green-700 hover:bg-green-500 p-2 rounded-full transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  About Us
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  How It Works
                </a>
              </li>
              <li>
                <a href="/projects" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  Our Projects
                </a>
              </li>
              <li>
                <a href="/blog" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  Blog & News
                </a>
              </li>
              <li>
                <a href="/contact" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="/services/energy-consulting" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  Energy Consulting
                </a>
              </li>
              <li>
                <a href="/services/sustainable-design" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  Sustainable Design
                </a>
              </li>
              <li>
                <a href="/services/green-certifications" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  Green Certifications
                </a>
              </li>
              <li>
                <a href="/services/urban-farming" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  Urban Farming
                </a>
              </li>
              <li>
                <a href="/services/waste-management" className="flex items-center text-green-100 hover:text-white transition-colors">
                  <FaArrowRight className="mr-2 text-green-300 text-xs" />
                  Waste Management
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-green-300 mt-1 mr-3" />
                <span className="text-green-100">123 Eco Street, Green District, Sustainable City, 10001</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-green-300 mr-3" />
                <a href="mailto:info@greencity.com" className="text-green-100 hover:text-white transition-colors">
                  info@greencity.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-green-300 mr-3" />
                <a href="tel:+1234567890" className="text-green-100 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Working Hours</h4>
              <p className="text-green-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-green-100">Saturday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-green-500 opacity-30 my-8"></div>
        
        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-green-100">
          <p>© {currentYear} Green City Project. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="/sitemap" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;