import React from "react";
import s1 from "../../assets/images/s1.png";
import s2 from "../../assets/images/s2.png";
import s3 from "../../assets/images/s3.png";
import s4 from "../../assets/images/s4.png";

const Services = () => {
  const services = [
    {
      image: s1,
      title: "Robotic Automation",
      description:
        "Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.",
    },
    {
      image: s2,
      title: "Cognitive Automation",
      description:
        "Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.",
    },
    {
      image: s3,
      title: "Cognitive Engagement",
      description:
        "Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.",
    },
    {
      image: s4,
      title: "Security & Surveillance",
      description:
        "Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.",
    },
  ];

  return (
    <div className="container mx-auto mt-20">
      {/* Section Header */}
      <div className="flex justify-center mb-5">
        <h3 className="bg-purple-300 w-32 py-1 rounded-full text-center flex justify-center text-purple-600">
          What We Offer
        </h3>
      </div>
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold">Our Featured Solutions</h1>
      </div>
      <p className="text-center text-gray-500 mb-10">
        Discover the solutions we provide to solve complex business challenges.
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-tr from-cyan-200 via-cyan-50 to-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-start mb-4 bg-white w-16 rounded-full">
              <img
                src={service.image}
                alt={service.title}
                className="w-14 hover:animate-spin-slow"
              />
            </div>
            <h3 className="text-lg font-semibold text-start mb-3">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 text-start mb-4">
              {service.description}
            </p>
            <div className="flex justify-start">
              <button className="text-blue-500 flex items-center space-x-1">
                <span>Learn More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
