import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../comonents/Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

const UpdateServices = ({id,onClose,updateServiceInState}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  // Fetching the service data
  const { data: singleservicesData = {}, isLoading } = useQuery({
    queryKey: ["services", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/services/${id}`);
      return res.data;
    },
  });

  // Resetting form values when data is fetched
  useEffect(() => {
    if (singleservicesData && singleservicesData.name) {
      reset({
        name: singleservicesData.name || "",
        description: singleservicesData.description || "",
        category: singleservicesData.category || "default", // Default value for category
      });

      // Set the image field to display the existing image (not set as default value)
      // For image, we don't use defaultValue but display it separately
    }
  }, [singleservicesData, reset]);

  const onSubmit = async (data) => {
    try {
        let imageUrl = data.image; // Default to the existing image URL
        if (data.image && typeof data.image === "object") {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                imageUrl = res.data.data.display_url; // Update image URL
            } else {
                throw new Error("Image upload failed");
            }
        }

        const updateservices = {
            name: data.name,
            image: imageUrl,
            description: data.description,
            category: data.category,
        };

        const servicesRes = await axiosPublic.patch(
            `/services/${id}`, // PATCH request to update the service
            updateservices
        );

        console.log("Service Update Response:", servicesRes); // Log the response for debugging

        if (servicesRes.data.updatedCount > 0) {
            reset();
            onClose();
            updateServiceInState(servicesRes.data);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${data.name} has been updated successfully`,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            throw new Error("Update failed");
        }
    } catch (error) {
        console.error("Error updating service:", error); // Log the error details
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while updating the service. Please try again later.",
        });
    }
};




  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Update Service</h2>
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

        {/* Category */}
        <div className="w-1/2 mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            {...register("category")}
            className="select select-warning w-full mt-1 block border-gray-300 rounded-md"
            defaultValue={singleservicesData.category || "default"}
          >
            <option disabled value="default">
              Select a category
            </option>
            <option value="popular">Popular</option>
            <option value="regular">Regular</option>
          </select>
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
          {singleservicesData.image && (
            <div className="mb-2">
              <img
                src={singleservicesData.image}
                alt="Service"
                className="max-w-xs h-auto rounded-md border"
              />
              <p className="text-sm text-gray-500">Current Image</p>
            </div>
          )}
          <input
            type="file"
            id="image"
            {...register("image")}
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
            Update Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateServices;
