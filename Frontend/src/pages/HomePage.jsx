import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import IntroSection from '../components/Introduction';
import AboutSection from '../components/Aboutsection';
import HowItWorksSection from '../components/howit';
import SignUpSidebar from '../components/SignUpSidebar';

function HomePage() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/data') // Replace with your backend API endpoint
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 p-6">
        {/* Left Section: Intro, About, How It Works */}
        <div className="flex-1 space-y-6 mr-6">
          <IntroSection />
          <AboutSection />
          <HowItWorksSection />

          {/* Display fetched data */}
          {data.length > 0 && (
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Fetched Data</h2>
              <ul className="list-disc pl-5">
                {data.map((item) => (
                  <li key={item.id} className="text-gray-700">
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Section: Sign-Up Sidebar */}
        <div className="w-1/4">
          <SignUpSidebar setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
}

export default HomePage;