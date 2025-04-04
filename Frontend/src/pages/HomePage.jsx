import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import IntroSection from '../components/Introduction';
import AboutSection from '../components/Aboutsection';
import HowItWorksSection from '../components/howit';
import SignUpSidebar from '../components/SignUpSidebar';

function HomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/data')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 p-8 gap-8">
        {/* Left Section */}
        <div className="flex-1 space-y-8">
          <IntroSection />
          <AboutSection />
          <HowItWorksSection />

          {/* Display fetched data */}
          {data.length > 0 && (
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-green-700">Fetched Data</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {data.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Feature Cards with Larger Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Report Issue Card */}
            <div
              onClick={() => navigate('/report-issue')}
              className="bg-gradient-to-br from-green-100 to-white p-8 rounded-2xl shadow-2xl hover:shadow-green-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-200 text-green-700 p-3 rounded-full mr-4 text-2xl">
                  🛠️
                </div>
                <h2 className="text-xl font-bold text-green-800">Report Issue</h2>
              </div>
              <p className="text-gray-600 text-base">
                Submit and track city issues to help build a cleaner, greener city.
              </p>
            </div>

            {/* Eco Transport Query Card */}
            <div
              onClick={() => navigate('/eco-transport')}
              className="bg-gradient-to-br from-blue-100 to-white p-8 rounded-2xl shadow-2xl hover:shadow-blue-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-200 text-blue-700 p-3 rounded-full mr-4 text-2xl">
                  🚲
                </div>
                <h2 className="text-xl font-bold text-blue-800">Eco Transport</h2>
              </div>
              <p className="text-gray-600 text-base">
                Discover eco-friendly transportation options around your city.
              </p>
            </div>

            {/* Gamification Score Card */}
            <div
              onClick={() => navigate('/gamification-score')}
              className="bg-gradient-to-br from-yellow-100 to-white p-8 rounded-2xl shadow-2xl hover:shadow-yellow-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="bg-yellow-200 text-yellow-700 p-3 rounded-full mr-4 text-2xl">
                  🎯
                </div>
                <h2 className="text-xl font-bold text-yellow-800">Gamification Score</h2>
              </div>
              <p className="text-gray-600 text-base">
                Earn points and level up as you contribute to your city.
              </p>
            </div>

            {/* Transport Entry Card */}
            <div
              onClick={() => navigate('/transport-entry')}
              className="bg-gradient-to-br from-purple-100 to-white p-8 rounded-2xl shadow-2xl hover:shadow-purple-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="bg-purple-200 text-purple-700 p-3 rounded-full mr-4 text-2xl">
                  🚌
                </div>
                <h2 className="text-xl font-bold text-purple-800">Transport Entry</h2>
              </div>
              <p className="text-gray-600 text-base">
                Add and manage public transport details for better connectivity.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden md:block w-1/3">
          <SignUpSidebar />
        </div>
      </div>

    
    </div>
  );
}

export default HomePage;
