import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';
import Navbar from '../Navbar';
import Footer from '../Footer';

function UserDashboard() {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userIssues, setUserIssues] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    if (!authUser) {
      navigate('/user-login');
      return;
    }

    fetchUserData();
  }, [authUser, navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      let currentUserRank = null;
      
      // Fetch user rankings
      const rankingsRes = await axios.get(API_ENDPOINTS.USER_RANK);
      if (rankingsRes.data) {
        setRankings(rankingsRes.data);
        const rankIndex = rankingsRes.data.findIndex(r => r._id === authUser._id);
        if (rankIndex !== -1) {
          currentUserRank = rankingsRes.data[rankIndex];
          setUserRank(currentUserRank);
        }
      }

      // Fetch user issues
      if (authUser._id) {
        try {
          const issuesRes = await axios.get(`${API_ENDPOINTS.GET_USER_ISSUES}/${authUser._id}`);
          if (issuesRes.data) {
            setUserIssues(issuesRes.data);
          }
        } catch (err) {
          console.error('Error fetching user issues:', err);
        }
      }

      // Set user data from auth context
      setUserData({
        name: `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim() || authUser.username,
        email: authUser.email,
        username: authUser.username,
        issueCount: currentUserRank?.issuecount || 0,
        points: currentUserRank?.points || 0,
        rank: currentUserRank?.rank || 'N/A'
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-green-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-green-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 bg-gradient-to-r from-green-600 to-green-500 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="h-20 w-20 rounded-full bg-white text-green-700 flex items-center justify-center text-3xl font-bold mr-6 shadow-lg">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">{userData.name}</h2>
                <p className="text-green-100 text-lg">{userData.email}</p>
                <p className="text-green-200">@{userData.username}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-all font-semibold shadow-lg transform hover:scale-105"
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
                <span className="font-medium">{userData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Email:</span>
                <span className="font-medium">{userData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Username:</span>
                <span className="font-medium">@{userData.username}</span>
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
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    <span className="text-green-700 font-medium">Issues Reported:</span>
                  </div>
                  <span className="text-green-800 font-bold text-2xl">{userData.issueCount}</span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⭐</span>
                    <span className="text-blue-700 font-medium">Points:</span>
                  </div>
                  <span className="text-blue-800 font-bold text-2xl">{userData.points}</span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🏆</span>
                    <span className="text-yellow-700 font-medium">Rank:</span>
                  </div>
                  <span className="text-yellow-800 font-bold text-2xl">#{userData.rank}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* User Issues Section - Full Width */}
        <section className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-700 border-b border-green-100 pb-2">Your Reported Issues</h2>
            <button
              onClick={() => navigate('/report-issue')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              + Report New Issue
            </button>
          </div>
          {userIssues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userIssues.map((issue) => (
                <div key={issue._id} className="p-4 border-2 border-green-100 rounded-xl hover:border-green-300 hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    {issue.image && (
                      <img 
                        src={`${API_BASE_URL}${issue.image}`} 
                        alt={issue.title} 
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-green-800 text-lg mb-1">{issue.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{issue.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">📍 {issue.location}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">🔢 {issue.issueCode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg mb-4">No issues reported yet.</p>
              <button
                onClick={() => navigate('/report-issue')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Report Your First Issue
              </button>
            </div>
          )}
        </section>
      </main>
      
    </div>
  );
}

export default UserDashboard;
