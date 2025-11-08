import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import Navbar from "../Navbar";
import Footer from "../Footer";

function EcoTransport() {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [transportType, setTransportType] = useState("");
  const [transportOptions, setTransportOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allTransports, setAllTransports] = useState([]);

  useEffect(() => {
    fetchAllTransports();
  }, []);

  const fetchAllTransports = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_ALL_TRANSPORTS);
      if (response.data) {
        setAllTransports(response.data);
      }
    } catch (err) {
      console.error("Error fetching transports:", err);
    }
  };

  const findTransport = async () => {
    if (!start.trim() || !destination.trim()) {
      setError("Please enter both starting point and destination.");
      return;
    }

    setLoading(true);
    setError("");
    setTransportOptions([]);

    try {
      const response = await axios.post(API_ENDPOINTS.TRANSPORT_QUERY, {
        from: start.trim(),
        to: destination.trim(),
        transportType: transportType || undefined
      });

      if (response.data && response.data.data) {
        let results = response.data.data;
        setTransportOptions(results);
        
        if (results.length === 0) {
          setError(response.data.message || "No transport options found for this route. Try different locations or check all available routes below.");
        } else {
          // Clear error on success
          setError("");
        }
      } else {
        setError("No transport options found for this route. Check all available routes below.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("No exact matches found. Check all available routes below or try different search terms.");
      } else {
        const errorMessage = err.response?.data?.message || "Failed to find transport options. Please try again.";
        setError(errorMessage);
      }
      console.error("Error fetching transport:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setStart("");
    setDestination("");
    setTransportType("");
    setTransportOptions([]);
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      findTransport();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-700 mb-4">🌱 Eco Transport Finder</h1>
            <p className="text-gray-600 text-lg">Discover sustainable transportation options for your journey</p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Find Your Route</h2>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">From*</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="e.g., Downtown Station"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">To*</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="e.g., Airport Terminal"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Transport Type</label>
                <select
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Bus">🚌 Bus</option>
                  <option value="Train">🚂 Train</option>
                  <option value="Metro">🚇 Metro</option>
                  <option value="SharedCab">🚗 Shared Cab</option>
                  <option value="Other">🚕 Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={findTransport}
                disabled={loading || !start.trim() || !destination.trim()}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-600 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    🔍 Search Transport Options
                  </>
                )}
              </button>
              
              {(start || destination || transportType || transportOptions.length > 0) && (
                <button
                  onClick={handleClearSearch}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center"
                >
                  🗑️ Clear
                </button>
              )}
            </div>
          </div>

          {/* Results Section */}
          {transportOptions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">
                    🎉 Found {transportOptions.length} Transport Option{transportOptions.length > 1 ? 's' : ''}
                  </h2>
                  <p className="text-gray-600">
                    Routes from <span className="font-semibold">{start}</span> to <span className="font-semibold">{destination}</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transportOptions.map((transport) => (
                  <div key={transport._id} className="border-2 border-green-100 rounded-xl p-6 hover:shadow-xl hover:border-green-400 transition-all bg-gradient-to-br from-white to-green-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full text-sm font-semibold">
                        {transport.transportType}
                      </span>
                      <span className="text-2xl font-bold text-green-600">₹{transport.fare}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{transport.agencyName}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700 bg-white p-2 rounded-lg">
                        <span className="text-lg mr-2">📍</span>
                        <div>
                          <span className="text-xs text-gray-500">From</span>
                          <p className="font-semibold">{transport.from}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700 bg-white p-2 rounded-lg">
                        <span className="text-lg mr-2">🎯</span>
                        <div>
                          <span className="text-xs text-gray-500">To</span>
                          <p className="font-semibold">{transport.to}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-gray-600 bg-white p-2 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">⏰</span>
                          <span className="text-sm font-semibold">Frequency:</span>
                        </div>
                        <span className="font-bold">{transport.frequency}</span>
                      </div>
                    </div>
                    <div className="mb-4 bg-white p-3 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <span className="mr-2">🚌</span> Departure Times:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(transport.departureTimes) ? (
                          transport.departureTimes.map((time, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                              {time}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">Not specified</span>
                        )}
                      </div>
                    </div>
                    {transport.contactInfo && transport.contactInfo !== 'Not provided' && (
                      <div className="pt-4 border-t border-gray-200 bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="font-semibold mr-2">📞 Contact:</span>
                          <span className="text-green-600 font-medium">{transport.contactInfo}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Available Transports */}
          {allTransports.length > 0 && transportOptions.length === 0 && !loading && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">All Available Transport Routes</h2>
                  <p className="text-gray-600">Browse all {allTransports.length} available routes</p>
                </div>
                {allTransports.length > 12 && (
                  <span className="text-sm text-gray-500">Showing first 12 routes</span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTransports.slice(0, 12).map((transport) => (
                  <div 
                    key={transport._id} 
                    className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 transition-all cursor-pointer"
                    onClick={() => {
                      setStart(transport.from);
                      setDestination(transport.to);
                      setTransportType(transport.transportType);
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {transport.transportType}
                      </span>
                      <span className="text-xl font-bold text-green-600">₹{transport.fare}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{transport.agencyName}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">{transport.from}</span> → <span className="font-semibold">{transport.to}</span>
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-gray-500">Frequency: {transport.frequency}</p>
                      <span className="text-xs text-green-600 font-semibold">Click to search</span>
                    </div>
                  </div>
                ))}
              </div>
              {allTransports.length > 12 && (
                <div className="mt-6 text-center">
                  <p className="text-gray-600">And {allTransports.length - 12} more routes available. Use search to find specific routes.</p>
                </div>
              )}
            </div>
          )}

          {/* Show all transports when no search is performed */}
          {allTransports.length > 0 && transportOptions.length === 0 && !loading && !start && !destination && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">Popular Routes</h2>
                  <p className="text-gray-600">Click on any route to search for it</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTransports.slice(0, 9).map((transport) => (
                  <div 
                    key={transport._id} 
                    className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 transition-all cursor-pointer transform hover:scale-105"
                    onClick={() => {
                      setStart(transport.from);
                      setDestination(transport.to);
                      setTransportType("");
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 rounded-full text-sm font-semibold">
                        {transport.transportType}
                      </span>
                      <span className="text-xl font-bold text-green-600">₹{transport.fare}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{transport.agencyName}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">{transport.from}</span> → <span className="font-semibold">{transport.to}</span>
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-gray-500">Frequency: {transport.frequency}</p>
                      <span className="text-xs text-green-600 font-semibold animate-pulse">👆 Click to search</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EcoTransport;
