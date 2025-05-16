import { Header } from "../components/Header";
import { AlertMessage } from "../components/AlertMessage";
import { WaterLevel } from "../components/WaterLevel";
import { TemperatureCard } from "../components/TemperatureCard";
import React, { useState, useEffect } from "react";

export default function dashboard() {
  const [sensorData, setSensorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setSensorData({ temperature: 28, waterLevel: 65 });
      setIsLoading(false);
    }, 1500);

    // Simulate real-time updates
    const intervalId = setInterval(() => {
      setSensorData({
        temperature: Math.floor(Math.random() * 10) + 25, // 25-34°C
        waterLevel: Math.floor(Math.random() * 100), // 0-100%
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 bg-gray-100">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Water Tank Status
          </h2>

          <AlertMessage
            waterLevel={sensorData.waterLevel}
            isLoading={isLoading}
          />

          <WaterLevel
            waterLevel={sensorData.waterLevel}
            isLoading={isLoading}
          />

          <TemperatureCard
            temperature={sensorData.temperature}
            isLoading={isLoading}
          />

          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              System Status
            </h3>
            <div className="flex items-center justify-between">
              <span>Connection:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {isLoading ? "Connecting..." : "online"}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span>Last Update:</span>
              <span className="text-gray-600 text-sm">
                {isLoading ? "Loading..." : new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        Smart Water Monitor Dashboard &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
