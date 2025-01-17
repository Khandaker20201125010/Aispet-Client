import React from "react";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServicesCarts = ({ services }) => {
  const { id,name, images, description } = services;

  return (
    <div className="relative group card shadow-md rounded-md overflow-hidden ">
      {/* Main Content */}
      <div className="md:flex flex-grow items-center justify-between p-4 bg-white">
        <div className="p-2 gap-5">
          <div className="image-container  justify-center flex ">
            <img className="services-image h-48 w-48" src={images} alt={name} />
          </div>
          <div className="mt-5">
            <h3 className="uppercase font-bold">{name}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      {/* Shadow Overlay with Eye Icon */}
      <div className="absolute inset-0 hover:bg-black hover:bg-opacity-40 flex items-center justify-center -top-full group-hover:top-0 transition-all duration-500 ease-in-out shadow-lg shadow-purple-400">
        <div className="absolute inset-0 hover:bg-black hover:bg-opacity-5 flex items-center justify-end pr-4 -top-full group-hover:top-72 transition-all duration-500 ease-in-out shadow-lg shadow-purple-400 ">
          <Link to={`/details/${id}`}>
            <button>
              <FaRegEye className="text-red-600 text-4xl transform scale-90 group-hover:scale-100 transition-transform duration-500 ease-in-out border-b-2 border-r-2 border-black p-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCarts;
