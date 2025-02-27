import React from "react";
import useAxiosPublic from "../comonents/Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

const AddServices = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // Upload image to imgbb
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        // Construct service object
        const service = {
          name: data.name,
          image: res.data.data.display_url, // Get the URL from the image hosting service
          description: data.description,
          category: data.category,
        };

        // Save service to database
        const serviceRes = await axiosPublic.post("/services", service);
        if (serviceRes.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${data.name} has been added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          throw new Error("Failed to save service.");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Service</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Service Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Service Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Service name is required" })}
            placeholder="Enter service name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="form-control w-full  my-6">
            <div className="label">
              <span className="label-text ">Category</span>
            </div>
            <select
              {...register("category")}
              className="select select-warning w-full"
            >
              <option disabled value="default">
                Select a category
              </option>
              <option value="popular">Popular</option>
              <option value="regular">Regular</option>
            </select>
          </label>
        </div>

        {/* Service Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter service description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Service Image */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            {...register("image", { required: "Please upload an image" })}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
