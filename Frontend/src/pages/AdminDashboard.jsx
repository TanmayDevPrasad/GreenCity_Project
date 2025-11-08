import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';

function AdminDashboard() {
  const { organization, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrganizations: 0,
    activeUsers: 0,
    reportsReceived: 0
  });
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organization) {
      navigate('/admin-login');
      return;
    }
    fetchDashboardData();
  }, [organization, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all issues
      const issuesRes = await axios.get(API_ENDPOINTS.GET_ALL_ISSUES);
      if (issuesRes.data) {
        setIssues(issuesRes.data);
        setStats(prev => ({ ...prev, reportsReceived: issuesRes.data.length }));
      }

      // Fetch user rankings to get total users
      try {
        const usersRes = await axios.get(API_ENDPOINTS.USER_RANK);
        if (usersRes.data) {
          setStats(prev => ({ ...prev, activeUsers: usersRes.data.length }));
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }

      // Fetch organization rankings
      try {
        const orgsRes = await axios.get(API_ENDPOINTS.ORG_RANK);
        if (orgsRes.data) {
          setStats(prev => ({ ...prev, totalOrganizations: orgsRes.data.length }));
        }
      } catch (err) {
        console.error('Error fetching organizations:', err);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMarkAsSolved = async (issueCode) => {
    if (!organization || !organization.organizationId) {
      alert('Organization ID not found');
      return;
    }

    try {
      await axios.post(API_ENDPOINTS.ISSUES_SOLVED, {
        issueCode: issueCode,
        solvedBy: organization.organizationId,
        IssueSolved: true
      });
      
      alert('Issue marked as solved!');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to mark issue as solved';
      alert(errorMessage);
      console.error('Error marking issue as solved:', error);
    }
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

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-700 to-green-800 text-white flex flex-col py-6 px-4 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">🌿 Admin Panel</h2>
          <p className="text-green-200 text-sm">{organization?.organizationName}</p>
        </div>
        <nav className="flex flex-col space-y-2">
          <button className="text-left px-4 py-3 rounded-lg hover:bg-green-600 transition-colors bg-green-600">
            📊 Dashboard
          </button>
          <button className="text-left px-4 py-3 rounded-lg hover:bg-green-600 transition-colors">
            🏢 Organizations
          </button>
          <button className="text-left px-4 py-3 rounded-lg hover:bg-green-600 transition-colors">
            👥 Users
          </button>
          <button className="text-left px-4 py-3 rounded-lg hover:bg-green-600 transition-colors">
            📋 Reports
          </button>
          <button className="text-left px-4 py-3 rounded-lg hover:bg-green-600 transition-colors">
            ⚙️ Settings
          </button>
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="mt-10 w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-lg"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-4xl font-bold text-green-800 mb-2">Welcome back, {organization?.organizationName || 'Admin'}! 👋</h1>
            <p className="text-gray-600 text-lg">{organization?.email || 'admin@yourdomain.com'}</p>
            <p className="text-sm text-gray-500 mt-1">Organization ID: {organization?.organizationId}</p>
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl rounded-2xl p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-green-100 mb-2">Total Organizations</h2>
                <p className="text-4xl font-bold">{stats.totalOrganizations}</p>
              </div>
              <div className="text-5xl opacity-30">🏢</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl rounded-2xl p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-blue-100 mb-2">Active Users</h2>
                <p className="text-4xl font-bold">{stats.activeUsers}</p>
              </div>
              <div className="text-5xl opacity-30">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl rounded-2xl p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-purple-100 mb-2">Reports Received</h2>
                <p className="text-4xl font-bold">{stats.reportsReceived}</p>
              </div>
              <div className="text-5xl opacity-30">📋</div>
            </div>
          </div>
        </div>

        {/* Recent Issues */}
        <section>
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Recent Issues</h2>
            <p className="text-gray-600">Manage and resolve reported issues</p>
          </div>
          {issues.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-xl divide-y divide-gray-100">
              {issues.slice(0, 10).map((issue) => (
                <div key={issue._id} className="p-6 hover:bg-green-50 transition-colors">
                  <div className="flex flex-col md:flex-row gap-4">
                    {issue.image && (
                      <img 
                        src={`${API_BASE_URL}${issue.image}`} 
                        alt={issue.title} 
                        className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-green-800 text-xl mb-2">{issue.title}</h3>
                      <p className="text-gray-600 mb-3">{issue.description}</p>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                          📍 {issue.location}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                          🔢 {issue.issueCode}
                        </span>
                        {issue.username && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">
                            👤 {issue.username.username || issue.username.firstName}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleMarkAsSolved(issue.issueCode)}
                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all font-semibold shadow-lg transform hover:scale-105"
                      >
                        ✅ Mark as Solved
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg">No issues reported yet.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
