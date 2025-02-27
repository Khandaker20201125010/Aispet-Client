import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../comonents/Hooks/useAxiosPublic";
import useAuth from "../../comonents/Hooks/useAuth";
import Swal from "sweetalert2";
import useBookingServices from "../../comonents/Hooks/useBookingServices";


const DetailsPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
  const [bookingServices] = useBookingServices();
  const navigate = useNavigate();
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  // Fetch single service data
  const {
    data: singleServiceData = {},
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["services", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/services/${id}`);
      return res.data.service;
    },
  });
  const { name, description, images } = singleServiceData;
  //addbookservices
  const AddBookServices = () => {
    if (user && user.email) {
      const bookServices = {
        serviceId: id,
        email: user.email,
        name: singleServiceData.name,
        images: singleServiceData.images,
      };
  
      axiosPublic
        .post("/bookServices", bookServices)
        .then((res) => {
          if (res.data.insertedId) {
            // Invalidate related queries after a successful booking
            queryClient.invalidateQueries(["services", id]);
            queryClient.invalidateQueries(["relatedServices", id]);
  
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your booking has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.error(
            "Error booking service:",
            err.response?.data || err.message
          );
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again.",
          });
        });
    } else {
      // Redirect the user to login and send them back after successful login
      Swal.fire({
        title: "You need to log in",
        text: "Please log in to book this service.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/login?redirect=/details/${id}`);
        }
      });
    }
  };
  

  // Fetch related services based on category of the current service
  const {
    data: relatedServices = [],
    isLoading: isLoadingRelated,
    error: errorRelated,
  } = useQuery({
    queryKey: ["relatedServices", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/services/related/${id}`);
      return res.data.relatedServices;
    },
    enabled: !!singleServiceData?.category, // Only fetch if category exists
  });

  if (isLoading || isLoadingRelated)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 animate-bounce"></div>
          <p className="text-xl font-medium text-gray-600">Loading...</p>
        </div>
      </div>
    );

  if (error || errorRelated)
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <p className="text-2xl font-semibold text-red-600">
          Error loading service details. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            images || "https://via.placeholder.com/1200x400"
          })`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay for black opacity */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center pt-24 pb-6">
          <h1 className="text-white text-5xl font-extrabold uppercase tracking-wide">
            {name || "Service Name"}
          </h1>
          <p className="text-white mt-4 text-lg text-center max-w-2xl">
            {description?.slice(0, 100) ||
              "Short description about the service goes here..."}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto mt-10 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 flex gap-20 flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0">
          <div className="flex-shrink-0 overflow-hidden border-2 border-gray-200">
            <img
              src={images}
              alt="About Image"
              className="object-cover h-80 w-80 transform transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{`About ${name}`}</h2>
            <p className="text-gray-600 leading-8 text-lg mb-6">
              {description}
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <button
                onClick={AddBookServices}
                className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 hover:scale-105 transition-all transform"
              >
                Book Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Services Section */}
      <div className="container mx-auto mt-16 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Explore Related Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedServices.length > 0 ? (
            relatedServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-md shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <img
                  src={service.images || "https://via.placeholder.com/400x200"}
                  alt="Related Service"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-700">
                    {service.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {service.description.slice(0, 100)}
                  </p>
                  <Link to={`/details/${service.id}`}>
                    <button className="mt-4 block text-purple-600 font-medium hover:underline">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No related services available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
