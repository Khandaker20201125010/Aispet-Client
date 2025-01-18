import React from "react";
import a1 from "../../assets/images/a1.png";
import { Link } from "react-router-dom";
const Aboutus = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left py-10 px-5 mt-10">
    <img src={a1} alt="" className="max-w-full md:max-w-none" />
    <div className="md:w-1/2">
      <div>
        <div className="flex justify-center md:justify-start mb-5">
          <h3 className="bg-purple-300 w-32 py-1 rounded-full text-center text-purple-600">
            About Us
          </h3>
        </div>
        <div className="flex justify-center md:justify-start mb-8">
          <h1 className="text-xl md:text-4xl font-bold">
            Engaging New Audiences Through Smart Approach
          </h1>
        </div>
        <p className="text-gray-500 mb-10 md:w-3/4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <br /><br /> Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.
        </p>
        <Link to="/discover">
          <button className="btn bg-green-500 text-white px-6 py-2 rounded shadow-lg hover:bg-green-600">
            Discover More
          </button>
        </Link>
      </div>
    </div>
  </div>
  
  );
};

export default Aboutus;
