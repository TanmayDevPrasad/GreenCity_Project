import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    alert("You have been logged out.");
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col py-6 px-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="text-left hover:text-green-300">Dashboard</button>
          <button className="text-left hover:text-green-300">Organizations</button>
          <button className="text-left hover:text-green-300">Users</button>
          <button className="text-left hover:text-green-300">Reports</button>
          <button className="text-left hover:text-green-300">Settings</button>
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="mt-10 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-green-50 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-green-800">Welcome, Admin</h1>
          <p className="text-gray-600">admin@yourdomain.com</p>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-green-700">Total Organizations</h2>
            <p className="text-3xl mt-2 font-semibold text-gray-800">12</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-green-700">Active Users</h2>
            <p className="text-3xl mt-2 font-semibold text-gray-800">248</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-green-700">Reports Received</h2>
            <p className="text-3xl mt-2 font-semibold text-gray-800">37</p>
          </div>
        </div>

        {/* Recent Activity */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Recent Activities</h2>
          <ul className="bg-white rounded-xl shadow-md divide-y">
            <li className="p-4 hover:bg-green-50">✔ New organization "SmartWaste Inc." registered.</li>
            <li className="p-4 hover:bg-green-50">✔ Admin John updated settings.</li>
            <li className="p-4 hover:bg-green-50">✔ Report received from Ward 12 - potholes.</li>
            <li className="p-4 hover:bg-green-50">✔ User Priya uploaded sanitation report.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
