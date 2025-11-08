import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import IntroSection from '../components/Introduction';
import AboutSection from '../components/Aboutsection';
import HowItWorksSection from '../components/howit';
import SignUpSidebar from '../components/SignUpSidebar';

function HomePage() {
  const navigate = useNavigate();

  // Removed unnecessary API call that was causing errors
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/api/data')
  //     .then((response) => setData(response.data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Welcome to Green City
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
            Building a sustainable future, one issue at a time. Join thousands of eco-warriors making a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/user-signup')}
              className="px-8 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="px-8 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition-all transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-1 space-y-8">
            <IntroSection />
            <AboutSection />
            <HowItWorksSection />
            
            {/* Feature Cards with Enhanced Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Report Issue Card */}
              <div
                onClick={() => navigate('/report-issue')}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-green-200 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-4 rounded-xl mr-4 text-3xl group-hover:scale-110 transition-transform">
                    🛠️
                  </div>
                  <h2 className="text-2xl font-bold text-green-800">Report Issue</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Submit and track city issues to help build a cleaner, greener city.
                </p>
                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                  Get Started <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Eco Transport Query Card */}
              <div
                onClick={() => navigate('/eco-transport')}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-xl mr-4 text-3xl group-hover:scale-110 transition-transform">
                    🚲
                  </div>
                  <h2 className="text-2xl font-bold text-blue-800">Eco Transport</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Discover eco-friendly transportation options around your city.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Find Routes <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Gamification Score Card */}
              <div
                onClick={() => navigate('/gamification-score')}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-yellow-200 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-yellow-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-4 rounded-xl mr-4 text-3xl group-hover:scale-110 transition-transform">
                    🎯
                  </div>
                  <h2 className="text-2xl font-bold text-yellow-800">Leaderboard</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Earn points and level up as you contribute to your city.
                </p>
                <div className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700">
                  View Rankings <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Transport Entry Card */}
              <div
                onClick={() => navigate('/transport-entry')}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-200 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-4 rounded-xl mr-4 text-3xl group-hover:scale-110 transition-transform">
                    🚌
                  </div>
                  <h2 className="text-2xl font-bold text-purple-800">Transport Entry</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Add and manage public transport details for better connectivity.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                  Add Entry <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <SignUpSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
