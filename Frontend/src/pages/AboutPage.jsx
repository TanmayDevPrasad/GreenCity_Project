import React from 'react';
import Footer from '../Footer';

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">About Green City</h1>
        <p className="text-gray-700">
          Green City is a platform dedicated to promoting sustainability and environmental awareness. 
          Our mission is to connect individuals and organizations to eco-friendly initiatives, helping 
          to create a greener future for all.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;