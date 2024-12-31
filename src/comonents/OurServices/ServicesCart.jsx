import React from "react";

const ServicesCart = ({ services }) => {
  const { name, images, description } = services;
  return (
    <div className="card shadow-md hover:shadow-lg transition-shadow duration-300 shadow-purple-200">
      <div className="md:flex  flex-grow items-center justify-between p-4 bg-white rounded-md">
        <div className="p-2 gap-5">
          <div className="image-container">
            <img className="services-image" src={images} alt={name} />
          </div>
          <div className="mt-5">
            <h3 className="uppercase font-bold ">{name}</h3>
            <p className=" text-gray-600">{description}</p>
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default ServicesCart;
