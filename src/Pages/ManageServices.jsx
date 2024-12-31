import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateServices from "./UpdateServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../comonents/Hooks/useAxiosPublic";
import useServices from "../comonents/Hooks/useServices";

const ManageServices = () => {
  const [services, setServices] = useServices();  // Getting services from custom hook
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const queryClient = useQueryClient();  // Access the queryClient instance

  // Mutation hook for deleting a service
  const deleteMutation = useMutation({
    mutationFn: async (serviceId) => {
      const response = await axiosPublic.delete(`/services/${serviceId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the services query to refetch after deletion
      queryClient.invalidateQueries("services");
    },
  });

  const handleDeleteService = (item) => {
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
        await deleteMutation.mutateAsync(item.id); // Trigger the delete mutation
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${item.name} has been deleted successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const openModal = (id) => {
    if (id) {
      setSelectedServiceId(id);
      setIsModalOpen(true);
    } else {
      console.error("Service ID is missing");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedServiceId(null);
  };

  const updateServiceInState = (updatedService) => {
    setServices(services.map(service => 
      service.id === updatedService.id ? updatedService : service
    ));
  };

  return (
    <div className="min-h-screen w-full px-6 bg-gradient-to-tr from-cyan-100 to-white border-2xl">
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
            <thead className="hover:bg-purple-200">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item, index) => (
                <tr className="hover:bg-purple-300" key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.images} alt={item.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      onClick={() => openModal(item.id)}
                      className="btn btn-ghost btn-md btn-circle bg-orange-600 hover:bg-purple-600"
                    >
                      <FaEdit className="text-white text-2xl hover:bg-purple-600"></FaEdit>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteService(item)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <UpdateServices 
              id={selectedServiceId} 
              onClose={closeModal} 
              updateServiceInState={updateServiceInState}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
