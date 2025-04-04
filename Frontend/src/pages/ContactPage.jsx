import React from 'react';

function ContactPage() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Contact Us</h1>
      <p className="text-gray-700">
        Get in touch with us at{' '}
        <a href="mailto:info@greencity.com" className="text-green-600 hover:underline">
          info@greencity.com
        </a>
        .
      </p>
      <p className="text-gray-700 mt-2">
        Or call us at{' '}
        <a href="tel:+1234567890" className="text-green-600 hover:underline">
          +1 (234) 567-890
        </a>
        .
      </p>
    </div>
  );
}

export default ContactPage;