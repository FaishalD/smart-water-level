import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DropletIcon, LogOut } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();

  // Cek apakah user sudah login
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
        <h1 className="text-xl font-bold">Smart Water Level</h1>
        <button
          className="flex items-center bg-red-600 hover:bg-red-700 transition-colors px-3 py-1 rounded-md text-sm"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          <LogOut className="mr-1" size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};
