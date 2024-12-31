import React from "react";
import useServices from "../Hooks/useServices";
import ServicesCart from "./ServicesCart";

const Services = () => {
  const [services, refetch] = useServices();

  // Check if services array is empty
  if (!services || services.length === 0) {
    return <div className="text-center text-gray-500">No services available.</div>;
  }

  return (
    <div className="p-20 bg-gradient-to-tr from-cyan-50 via-cyan-50 to-white min-h-screen">
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
        <div className="container mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
