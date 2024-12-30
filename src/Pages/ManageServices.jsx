import React from "react";
import useServices from "../comonents/Hooks/useServices";
import useAxiosPublic from "../comonents/Hooks/useAxiosPublic";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageServices = () => {
  const [services, refetch] = useServices();
  const axiosPublic = useAxiosPublic();
  const handleDeleteServices = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/services/${item.id}`); // Use 'item.id' from the database
          if (res.data.deletedCount > 0) {
            refetch(); // Refresh the list after deletion
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${item.name} has been deleted successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          console.error("Error deleting service:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete service",
            text: "An error occurred while deleting the service. Please try again later.",
          });
        }
      }
    });
  };
  
  return (
    <div className="min-h-screen w-full px-6 bg-gradient-to-tr from-cyan-100 to-white border-2xl ">
      <div className="flex justify-center mb-5 p-6">
        <h3 className="bg-purple-300 w-32 py-1 rounded-full text-center text-purple-600">
          Services
        </h3>
      </div>
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold">Manage Services</h1>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-center mb-5">
          Current Services: {services.length}
        </h3>
      </div>
      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="hover:bg-purple-200">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>description</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item, index) => (
                <tr className="hover:bg-red-700" key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <Link to={`/updateServices/${item.id}`}>
                      <button className="btn btn-ghost btn-md btn-circle bg-orange-600 hover:bg-red-600">
                        <FaEdit className="text-white text-2xl hover:bg-red-600"></FaEdit>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteServices(item)}
                      className="btn btn-ghost btn-circle btn-md hover:bg-gray-800"
                    >
                      <FaTrash className="text-red-500 text-2xl"></FaTrash>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;
