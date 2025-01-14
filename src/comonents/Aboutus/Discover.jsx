import React from 'react';

const Discover = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-10 px-5">
        <div className="container mx-auto max-w-screen-xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
            Discover More About Us
          </h1>
          <p className="text-lg text-center text-gray-700 mb-8">
            We're committed to providing exceptional services that engage, inspire, and empower you. Our team works tirelessly to bring you solutions that matter.
          </p>
          {/* Main Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Block 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">Innovative Solutions</h3>
              <p className="text-gray-600">
                Our solutions are designed to be innovative, using the latest technologies to bring efficiency and value.
              </p>
            </div>
  
            {/* Feature Block 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Our team consists of experts from diverse fields, working collaboratively to achieve the best results.
              </p>
            </div>
  
            {/* Feature Block 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">Customer Focused</h3>
              <p className="text-gray-600">
                We are customer-centric, always striving to meet the unique needs of every individual or organization we work with.
              </p>
            </div>
          </div>
  
          {/* Call to Action Section */}
          <div className="text-center mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Ready to get started?</h2>
            <p className="text-lg text-gray-600 mb-6">
              We are excited to partner with you and help you grow. Let's connect and take the next step forward.
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    );
};

export default Discover;