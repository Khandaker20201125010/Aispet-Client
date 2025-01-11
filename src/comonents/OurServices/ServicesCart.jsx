import React from "react";
import { FaRegEye } from "react-icons/fa";

const ServicesCart = ({ services }) => {
  const { name, images, description } = services;

  return (
    <div className="relative group card shadow-md rounded-md overflow-hidden">
      {/* Main Content */}
      <div className="md:flex flex-grow items-center justify-between p-4 bg-white">
        <div className="p-2 gap-5">
          <div className="image-container">
            <img className="services-image" src={images} alt={name} />
          </div>
          <div className="mt-5">
            <h3 className="uppercase font-bold">{name}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      {/* Shadow Overlay with Eye Icon */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 -top-full group-hover:top-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
        <button>
          <FaRegEye className="absolute bottom-2 right-4 text-purple-100 border-2 border-purple-100 text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default ServicesCart;
