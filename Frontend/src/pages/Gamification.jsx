import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Gamification() {
  const { user, isAuthenticated } = useAuth();
  const [rankings, setRankings] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.USER_RANK);
      if (response.data) {
        setRankings(response.data);
        if (user && user._id) {
          const currentUser = response.data.find(r => r._id === user._id);
          if (currentUser) {
            setUserRank(currentUser);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-green-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-green-700">Loading leaderboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-green-700 mb-4">🏆 Leaderboard</h1>
            <p className="text-gray-600 text-lg">See how you rank among eco-warriors!</p>
          </div>

          {/* User Stats Card */}
          {isAuthenticated && userRank && (
            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl shadow-2xl p-8 mb-8 transform hover:scale-105 transition-transform">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h2 className="text-3xl font-bold mb-2">Your Ranking</h2>
                  <p className="text-green-100 text-lg">Keep contributing to climb higher!</p>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold">#{userRank.rank}</div>
                    <div className="text-green-100 text-sm">Rank</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">{userRank.points}</div>
                    <div className="text-green-100 text-sm">Points</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">{userRank.issuecount}</div>
                    <div className="text-green-100 text-sm">Issues</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
              <p className="text-yellow-800">
                <span className="font-semibold">Login required!</span> Please login to see your ranking and compete with others.
              </p>
            </div>
          )}

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Top Contributors</h2>
            {rankings.length > 0 ? (
              <div className="space-y-4">
                {rankings.slice(0, 20).map((rank, index) => {
                  const isCurrentUser = user && rank._id === user._id;
                  return (
                    <div
                      key={rank._id}
                      className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                        isCurrentUser
                          ? 'bg-green-50 border-green-400 shadow-md'
                          : 'bg-gray-50 border-gray-200 hover:border-green-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg mr-4">
                        {index === 0 ? (
                          <span className="text-yellow-500 text-2xl">🥇</span>
                        ) : index === 1 ? (
                          <span className="text-gray-400 text-2xl">🥈</span>
                        ) : index === 2 ? (
                          <span className="text-orange-400 text-2xl">🥉</span>
                        ) : (
                          <span className={`${isCurrentUser ? 'text-green-600' : 'text-gray-500'}`}>
                            #{rank.rank}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className={`font-bold text-lg ${isCurrentUser ? 'text-green-700' : 'text-gray-800'}`}>
                              {rank.username}
                              {isCurrentUser && <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded">You</span>}
                            </h3>
                            <p className="text-sm text-gray-600">Issues Reported: {rank.issuecount}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{rank.points}</div>
                            <div className="text-xs text-gray-500">Points</div>
                          </div>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((rank.points / (rankings[0]?.points || 1)) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No rankings available yet. Be the first to contribute!</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Gamification;
