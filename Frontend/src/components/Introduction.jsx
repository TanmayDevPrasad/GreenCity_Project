import React from 'react';

function IntroSection() {
  return (
    <section className="flex flex-col items-center gap-8 p-8 bg-gradient-to-b from-green-50 to-white">
    
      {/* Intro Section */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-8 border border-green-100 hover:border-green-300">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center hover:underline transition-all duration-300">
          🌱 Application Intro
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          Welcome to <span className="font-semibold text-green-600">Green City</span>! This platform helps you connect with 
          eco-friendly initiatives, manage sustainable projects, and contribute to a greener future. 
          <span className="font-semibold text-green-600"> Join us today!</span>
        </p>
      </div>
    </section>
  );
}

export default IntroSection;