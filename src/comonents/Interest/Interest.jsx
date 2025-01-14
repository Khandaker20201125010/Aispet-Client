import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useBookingServices from "../Hooks/useBookingServices";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Interest = () => {
  const [bookingServices, refetch] = useBookingServices();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const handelCancleBooking = async (id) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // If user confirms
    if (result.isConfirmed) {
      try {
        // Make the delete request to the backend
        const response = await axiosPublic.delete(`/bookServices/${id}`);

        if (response.status === 200) {
          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "Your booking has been cancelled.",
            icon: "success",
          });
         
          queryClient.invalidateQueries(["bookedServices"]);
        } else {
          // Show error message if deletion fails
          Swal.fire({
            title: "Error!",
            text: "There was an issue cancelling your booking. Please try again.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the booking. Please try again later.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 min-h-screen py-10 px-4">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-700">
          My Booked Services
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Explore the services you've booked so far. Click on a service for more
          details.
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {bookingServices.length ? (
          bookingServices.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Service Image */}
              <div className="p-2">
                <img
                  className="h-48 w-full object-cover"
                  src={service.images}
                  alt=""
                />
              </div>

              {/* Service Details */}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 truncate">
                  {service.name || "Service Name"}
                </h2>
                <p className="text-gray-600 mt-2">
                  {service.description?.slice(0, 100) ||
                    "Short description about the service goes here..."}
                </p>
              </div>

              {/* View Details Button */}
              <div className="p-4 bg-gray-100 flex gap-2 justify-between items-center">
                <p className="text-indigo-500 font-semibold">
                  Booked By: {service.email}
                </p>
                <button
                  onClick={() => handelCancleBooking(service.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            <p className="text-lg">
              No services booked yet. Start booking now!
            </p>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="text-center mt-12">
        <Link to="/services">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-purple-500 hover:to-blue-500 transition-transform transform hover:scale-105">
            Check More Bookings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Interest;
