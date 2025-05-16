import React from "react";

export const WaterLevel = ({ waterLevel, isLoading = false }) => {
  const getColorClass = (level) => {
    if (level >= 80) return "bg-red-500";
    if (level >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <h2 className="text-lg font-medium text-gray-700">Water Level</h2>
        {!isLoading && waterLevel !== undefined && (
          <span className="ml-auto text-lg font-semibold">{waterLevel}%</span>
        )}
      </div>

      {isLoading ? (
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden animate-pulse"></div>
      ) : (
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getColorClass(
              waterLevel
            )} transition-all duration-500 ease-in-out`}
            style={{ width: `${waterLevel !== undefined ? waterLevel : 0}%` }}
          ></div>
        </div>
      )}

      {/* Tank visualization */}
      <div className="mt-4 flex justify-center">
        <div className="relative w-16 h-32 border-2 border-gray-300 rounded-b-lg overflow-hidden">
          {!isLoading && waterLevel !== undefined && (
            <div
              className={`absolute bottom-0 w-full ${getColorClass(
                waterLevel
              )} transition-all duration-500`}
              style={{ height: `${waterLevel}%` }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};
