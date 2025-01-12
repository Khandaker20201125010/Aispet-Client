import React from "react";
import errorimage from "../../assets/images/errorimage.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Error Image */}
        <div className="flex-shrink-0">
          <img
            src={errorimage}
            alt="Error"
            className="w-full max-w-md"
          />
        </div>

        {/* Error Text */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <button className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 hover:scale-105 transition-transform">
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
