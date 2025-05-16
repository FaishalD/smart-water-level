import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Simpan user ke localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect ke dashboard
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col justify-center p-6">
      {/* Wave decoration */}
      <div className="absolute inset-x-0 top-0 overflow-hidden h-16">
        <svg className="w-full" viewBox="0 0 400 50" preserveAspectRatio="none">
          <path
            d="M0,0 C150,40 250,40 400,0 L400,50 L0,50 Z"
            className="fill-blue-500 opacity-20"
          />
        </svg>
      </div>

      <div className="max-w-md w-full mx-auto">
        {/* Logo and App Name */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-4 text-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v6m0 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              <path d="M17.67 7.33C18.36 8.02 19 8.5 19 10c0 1.5-.63 2.98-2 4-1.37 1.02-3 1.5-5 1.5s-3.63-.48-5-1.5c-1.37-1.02-2-2.5-2-4 0-1.5.64-1.98 1.33-2.67" />
              <path d="M12 18v4M8 18c-2.21 0-4-1.79-4-4 0-1 .5-2 1-3 .5-1 1-2 1-3 0-.83.67-1.5 1.5-1.5S9 7.17 9 8c0 1 .5 2 1 3 .5 1 1 2 1 3 0 2.21-1.79 4-4 4zM16 18c-2.21 0-4-1.79-4-4 0-1 .5-2 1-3 .5-1 1-2 1-3 0-.83.67-1.5 1.5-1.5S17 7.17 17 8c0 1 .5 2 1 3 .5 1 1 2 1 3 0 2.21-1.79 4-4 4z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Smart Water Monitor
          </h1>
          <p className="text-gray-600 text-sm mt-1">Login to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>

        {/* Water level indicator decoration */}
        <div className="mt-16 flex justify-center">
          <div className="w-10 h-24 bg-gray-200 rounded-lg overflow-hidden relative">
            <div
              className="absolute bottom-0 w-full bg-blue-500 transition-all duration-1000"
              style={{ height: "40%" }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs font-bold text-white">40%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
