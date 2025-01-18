import React from "react";
import useServices from "../Hooks/useServices";
import ServicesCart from "./ServicesCart";
import sb from "../../assets/images/SB.jpg";
const Services = () => {
  const [services, refetch] = useServices();

  // Check if services array is empty
  if (!services || services.length === 0) {
    return (
      <div className="text-center text-gray-500">No services available.</div>
    );
  }

  return (
    <div className=" bg-gradient-to-tr from-cyan-50 via-cyan-50 to-white min-h-screen ">
      <div
        className="relative h-[400px] bg-fixed bg-center bg-cover flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${
            sb || "https://via.placeholder.com/1200x400"
          })`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Text Content */}
        <h1 className="relative z-10 text-4xl font-bold text-white text-center">
          Aispet Solutions
        </h1>
        <div className="">
          <p className="relative z-10 text-white text-center mt-5">
            Our Services aim to solve complex business challenges
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-center mb-5 p-6">
          <h3 className="bg-purple-300 w-32 py-1 rounded-full text-center text-purple-600">
            Our Solutions
          </h3>
        </div>
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-bold">Our Services</h1>
        </div>
        <p className="text-center text-gray-500 mb-10">
          Get the most advanced solutions we provide to solve complex business
          challenges.
        </p>
      </div>
      <div className="">
        <div className="container mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-20 max-sm:p-5 ">
          {Array.isArray(services) &&
            services.map((service) => (
              <ServicesCart key={service.id} services={service} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
