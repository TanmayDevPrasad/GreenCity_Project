import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-green-700 mb-4 text-center">How It Works</h1>
          <p className="text-center text-gray-600 text-lg mb-10">
            Green City makes it easy to report issues, track progress, and contribute to a better environment. Here's how:
          </p>

          {/* Step-by-step cards */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Step 1 */}
            <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-xl transition">
              <div className="text-green-600 text-4xl mb-4 text-center">📸</div>
              <h2 className="text-xl font-bold text-green-800 mb-2 text-center">1. Spot an Issue</h2>
              <p className="text-gray-700 text-center">
                Found a garbage dump, pothole, broken light, or any civic issue? Just open the app and capture it.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-xl transition">
              <div className="text-green-600 text-4xl mb-4 text-center">📤</div>
              <h2 className="text-xl font-bold text-green-800 mb-2 text-center">2. Report Instantly</h2>
              <p className="text-gray-700 text-center">
                Submit your report with a short description and location. It only takes a few seconds!
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-xl transition">
              <div className="text-green-600 text-4xl mb-4 text-center">👀</div>
              <h2 className="text-xl font-bold text-green-800 mb-2 text-center">3. Track & Monitor</h2>
              <p className="text-gray-700 text-center">
                Monitor the status of your report and get notified when it’s resolved by the concerned authority.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-xl transition">
              <div className="text-green-600 text-4xl mb-4 text-center">🏆</div>
              <h2 className="text-xl font-bold text-green-800 mb-2 text-center">4. Earn Green Points</h2>
              <p className="text-gray-700 text-center">
                Every report you submit adds to your community score. Get rewarded for being an active citizen!
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-xl transition">
              <div className="text-green-600 text-4xl mb-4 text-center">📊</div>
              <h2 className="text-xl font-bold text-green-800 mb-2 text-center">5. View City Progress</h2>
              <p className="text-gray-700 text-center">
                Analyze how your neighborhood and city are improving with real-time stats and analytics.
              </p>
            </div>

            {/* Step 6 */}
            <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-xl transition">
              <div className="text-green-600 text-4xl mb-4 text-center">🤝</div>
              <h2 className="text-xl font-bold text-green-800 mb-2 text-center">6. Collaborate</h2>
              <p className="text-gray-700 text-center">
                Work with others, take part in green challenges, and make a real difference together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    
    </div>
  );
}

export default HowItWorks;
