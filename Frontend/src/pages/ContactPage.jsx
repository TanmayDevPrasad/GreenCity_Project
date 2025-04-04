import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/logo.png" // Replace with actual logo path
              alt="Green City Logo"
              className="w-10 h-10"
            />
            <h1 className="text-3xl font-bold text-green-700">Contact Green City</h1>
          </div>

          {/* Contact Info */}
          <div className="mb-6 text-gray-700">
            <p className="mb-2">
              We'd love to hear from you! Whether you have questions, suggestions, or need support.
            </p>
            <p>
              Email:{' '}
              <a href="mailto:info@greencity.com" className="text-green-600 hover:underline">
                info@greencity.com
              </a>
            </p>
            <p className="mt-1">
              Phone:{' '}
              <a href="tel:+1234567890" className="text-green-600 hover:underline">
                +1 (234) 567-890
              </a>
            </p>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
     
    </div>
  );
}

export default ContactPage;
