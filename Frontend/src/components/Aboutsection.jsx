import React from 'react';

function AboutSection() {
  return (
    <section className="flex flex-row items-center gap-8 p-8 bg-gradient-to-b from-green-50 to-white ">
      
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

      {/* About Section */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-8 border border-green-100 hover:border-green-300">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center hover:underline transition-all duration-300">
          🌿 About Green City
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          Green City is a <span className="font-medium text-green-600">community-driven platform</span> aimed at promoting 
          <span className="font-medium text-green-600"> sustainability</span> and increasing <span className="font-medium text-green-600">environmental awareness</span>.
          Our mission is to empower citizens 
        </p>
      </div>

      {/* How It Works Section */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-8 border border-green-100 hover:border-green-300">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center hover:underline transition-all duration-300">
          ⚙️ How It Works
        </h2>
        <ul className="text-gray-600 text-lg leading-relaxed list-disc list-inside">
          <li><span className="font-medium text-green-600">Sign up</span> as a user or admin</li>
          <li>Explore <span className="font-medium text-green-600">eco-friendly projects</span></li>
          <li>Contribute and <span className="font-medium text-green-600">track your impact</span></li>
        </ul>
      </div>

    </section>
  );
}

export default AboutSection;
