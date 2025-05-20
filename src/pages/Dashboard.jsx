import { Header } from "../components/Header";
import { AlertMessage } from "../components/AlertMessage";
import { WaterLevel } from "../components/WaterLevel";
import { TemperatureCard } from "../components/TemperatureCard";
import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";

const MAX_TANK_HEIGHT_CM = 50; // Set this to your tank's maximum height in cm

export default function dashboard() {
  const [sensorData, setSensorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const dataRef = ref(db, `UsersData/${uid}`);

        const unsubscribeData = onValue(
          dataRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();

              // Ambil key timestamp terbaru
              const timestamps = Object.keys(data);
              const latestTimestamp = Math.max(...timestamps.map(Number));
              const latestData = data[latestTimestamp];

              const levelInCm = latestData.distance;

              const waterLevelPercentage = Math.max(
                0,
                Math.min(
                  100,
                  ((MAX_TANK_HEIGHT_CM - levelInCm) / MAX_TANK_HEIGHT_CM) * 100
                )
              );

              setSensorData({
                temperature: latestData.temperature,
                waterLevel: Math.round(waterLevelPercentage),
                rawLevel: levelInCm,
                deviceId: uid,
              });

              setLastUpdate(new Date(latestData.timestamp * 1000)); // Karena timestamp masih dalam detik
              setError(null);
            } else {
              setError("No data found for this user.");
            }
            setIsLoading(false);
          },
          (error) => {
            console.error("Error fetching data:", error);
            setIsLoading(false);
            setError(error.message);
          }
        );

        return () => unsubscribeData();
      } else {
        setError("User not authenticated.");
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
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
                {isLoading
                  ? "Loading..."
                  : lastUpdate?.toLocaleTimeString() || "N/A"}
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
