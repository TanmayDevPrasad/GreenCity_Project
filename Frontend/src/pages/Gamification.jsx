import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Gamification() {
  const [points, setPoints] = useState(0);

  // Optional: For future use
  const handleReportIssue = () => {
    setPoints(points + 10);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-green-700">Gamification Score</h1>
        <p className="text-gray-600 mt-4">Check your community contribution score.</p>
        <div className="mt-6 p-6 bg-white shadow-md rounded-lg w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold">
            Your Points: <span className="text-blue-600">{points}</span>
          </h2>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
}

export default Gamification;
