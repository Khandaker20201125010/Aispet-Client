import React from "react";
import b1 from "../../assets/images/b1.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-100 via-sky-200 to-white py-10 px-5">
      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left space-y-4 ">
        <h1 className="text-4xl font-bold leading-tight text-gray-800">
          World’s Leading AI & Machine Learning Company
        </h1>
        <p className="text-gray-600">
          We specialize in delivering innovative AI solutions and cutting-edge
          machine learning technologies that empower businesses to unlock their
          full potential. Our mission is to transform industries, drive growth,
          and create smarter solutions for a better future.
        </p>
        <Link to="/services">
          <button className="btn mt-5 bg-green-500 text-white px-6 py-2 rounded shadow-lg hover:bg-green-600">
            Get Started
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <img
          src={b1}
          alt="AI and Machine Learning Illustration"
          className="w-3/4 md:w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default Banner;
