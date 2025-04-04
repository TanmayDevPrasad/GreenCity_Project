import React from 'react';

function HowItWorksSection() {
  return (
    <section className="flex flex-col items-center gap-8 p-8 bg-gradient-to-b from-green-50 to-white">
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

export default HowItWorksSection;