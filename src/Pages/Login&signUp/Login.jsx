import React, { useState } from "react";
import loginsignin from "../../assets/images/login&signin.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
    console.log("Logging in with", email, password);
    setErrorMessage("");
  };

  const handleSocialLogin = (platform) => {
    console.log(`Logging in with ${platform}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
        <img
          src={loginsignin}
          alt="Login Illustration"
          className="w-32 mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Welcome Back
        </h2>
        {errorMessage && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            Login
          </button>
        </form>
        <div className="my-4 text-sm text-center text-gray-600">
          Or login with
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleSocialLogin("Google")}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            Google
          </button>
        </div>
        <div className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-purple-700 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
