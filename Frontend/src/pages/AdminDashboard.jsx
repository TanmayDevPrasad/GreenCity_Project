import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-1 container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Profile Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Admin Profile</h2>
            <div className="space-y-2">
              <p className="text-blue-600">Name: Admin User</p>
              <p className="text-blue-600">Email: admin@example.com</p>
              <p className="text-blue-600">Role: Super Admin</p>
            </div>
          </section>

          {/* Admin Stats Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Dashboard Stats</h2>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-medium">Total Users:</span>
                <span className="text-blue-800 font-bold text-xl animate-pulse">1,200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-medium">Total Issues:</span>
                <span className="text-blue-800 font-bold text-xl animate-bounce">320</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-medium">Resolved Issues:</span>
                <span className="text-blue-800 font-bold text-xl animate-pulse">280</span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
