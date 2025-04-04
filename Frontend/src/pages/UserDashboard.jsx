import React, { useState } from 'react';

function UserDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    memberSince: 'Mar 2023',
    issueCount: 42,
    points: 1500,
    ranking: 'Top 10%',
  });

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <header className="p-4 bg-green-700 text-white flex justify-center items-center">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
      </header>
      
      <main className="flex-1 container mx-auto p-6">
        {currentView === 'home' ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold text-green-700 mb-4">Welcome to Our Platform</h2>
                <p className="text-lg text-green-600 mb-6">Your one-stop solution for issue tracking and management</p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => setCurrentView('dashboard')}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
              
              {/* Featured Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-green-50">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Track Issues</h3>
                  <p className="text-green-600">Easily monitor and manage all your issues in one place.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Earn Points</h3>
                  <p className="text-green-600">Get rewarded for your contributions and collaboration.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-green-700 mb-2">View Analytics</h3>
                  <p className="text-green-600">Gain insights with comprehensive performance statistics.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Dashboard Header */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold mr-4">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-green-800">{user.name}</h2>
                    <p className="text-green-600">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Profile Section */}
              <section className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-bold text-green-700 mb-4 border-b border-green-100 pb-2">Your Profile</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-600">Name:</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Member Since:</span>
                    <span className="font-medium">{user.memberSince}</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Edit Profile
                  </button>
                </div>
              </section>

              {/* User Stats Section */}
              <section className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-bold text-green-700 mb-4 border-b border-green-100 pb-2">Your Stats</h2>
                <div className="grid gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-medium">Issue Count:</span>
                      <span className="text-green-800 font-bold text-xl">{user.issueCount}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-medium">Points:</span>
                      <span className="text-green-800 font-bold text-xl">{user.points}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-medium">Ranking:</span>
                      <span className="text-green-800 font-bold text-xl">{user.ranking}</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </main>
      
      <footer className="p-4 bg-green-700 text-white text-center">
        <p>© 2025 Your Company</p>
        <p className="text-sm mt-1">All rights reserved</p>
      </footer>
    </div>
  );
}

export default UserDashboard;