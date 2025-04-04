import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar"; // Assuming it's in src/components or src

const ORS_API_KEY = "YOUR_OPENROUTESERVICE_API_KEY"; // Replace with your API key

function EcoTransport() {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const findRoute = async () => {
    if (!start || !destination || !vehicle) {
      alert("Please enter all fields.");
      return;
    }

    setLoading(true);
    try {
      const startCoords = await getCoordinates(start);
      const destCoords = await getCoordinates(destination);

      if (!startCoords || !destCoords) {
        alert("Invalid locations, please try again.");
        setLoading(false);
        return;
      }

      const modeMap = {
        Bus: "driving-car",
        Bicycle: "cycling-regular",
        EV: "driving-electric",
      };

      const mode = modeMap[vehicle];

      const routeResponse = await axios.get(
        `https://api.openrouteservice.org/v2/directions/${mode}?api_key=${ORS_API_KEY}&start=${startCoords}&end=${destCoords}`
      );

      const routeData = routeResponse.data;
      const distance = (routeData.routes[0].summary.distance / 1000).toFixed(2);
      const duration = (routeData.routes[0].summary.duration / 60).toFixed(0);

      setRouteInfo({ distance, duration });

    } catch (error) {
      console.error("Error fetching route:", error);
      alert("Could not find a route. Try again.");
    }
    setLoading(false);
  };

  const getCoordinates = async (location) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );
      if (response.data.length > 0) {
        return `${response.data[0].lon},${response.data[0].lat}`;
      }
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="pt-24 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-green-700 text-center">
            Eco Transport Query
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Find sustainable transport options in your area.
          </p>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Starting Point
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter starting location"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Destination
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Select Vehicle Type
              </label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
              >
                <option value="">Choose a vehicle</option>
                <option value="Bus">Bus</option>
                <option value="Bicycle">Bicycle</option>
                <option value="EV">Electric Vehicle</option>
              </select>
            </div>

            <button
              onClick={findRoute}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Finding Route..." : "Find Route"}
            </button>
          </div>

          {routeInfo && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-lg font-semibold text-green-700">
                Route Information
              </h2>
              <p className="text-gray-700 mt-2">
                Distance: {routeInfo.distance} km
              </p>
              <p className="text-gray-700">
                Estimated Time: {routeInfo.duration} minutes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EcoTransport;
