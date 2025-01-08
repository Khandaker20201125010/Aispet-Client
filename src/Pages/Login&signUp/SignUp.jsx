import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import useAxiosPublic from "../../comonents/Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../comonents/Hooks/useAuth";
import loginsignin from "../../assets/images/login&signin.png";
const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile, googleSignIn } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.photoURL[0] };
    try {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      createUser(data.email, data.password).then((result) => {
        updateUserProfile(data.name, res.data.data.display_url).then(() => {
          axiosPublic.post("/users", {
            name: data.name,
            email: data.email,
            photo: res.data.data.display_url,
          });
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/", { replace: true });
        });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  const handeleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/", { replace: true });
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Google Sign-In failed.",
        });
      });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="container mx-auto">
      <div className="md:flex flex-1 flex-row-reverse">
        <div className="md:px-44 md:py-5">
          <div ref={cardRef} className="m-auto w-[22.5rem] shadow-2xl rounded-lg relative">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body bg-transparent p-5"
            >
              <h3 className="text-3xl font-bold text-center mb-4">Sign Up</h3>
              {/* Name Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered bg-transparent"
                />
                {errors.name && (
                  <span className="text-red-700 font-bold">
                    Name is required
                  </span>
                )}
              </div>
              {/* Photo Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Upload Photo</span>
                </label>
                <input
                  type="file"
                  {...register("photoURL", { required: true })}
                  className="file-input file-input-bordered file-input-secondary  w-full max-w-xs "
                />
                {errors.photoURL && (
                  <span className="text-red-700 font-bold">
                    Photo is required
                  </span>
                )}
              </div>
              {/* Email Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="input input-bordered bg-transparent"
                />
                {errors.email && (
                  <span className="text-red-700 font-bold">
                    Email is required
                  </span>
                )}
              </div>
              {/* Password Field */}
              <div className="form-control mb-6 relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Password"
                  className="input input-bordered bg-transparent pr-10"
                />
                <div
                  className="absolute inset-y-14 right-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
                {errors.password && (
                  <span className="text-red-700 font-bold">
                    Password must include uppercase, lowercase, number, and special character
                  </span>
                )}
              </div>
              {/* Submit Button */}
              <input
                type="submit"
                className="btn bg-purple-900 w-full hover:bg-purple-600 text-white font-bold"
                value="Sign Up"
              />
            </form>
            {/* Google Sign-In */}
            <div className="flex px-5 justify-center mt-4">
              <button
                onClick={handeleGoogleSignIn}
                className="btn w-full text-xl hover:bg-purple-600 bg-purple-900 text-white"
              >
                <BsGoogle />
              </button>
            </div>
            <div className="mt-4 text-sm text-center p-2 mb-2">
              Don't have an account?{" "}
              <Link to="/login" className="text-purple-600 underline">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="m-auto">
          <img src={loginsignin} alt="SignUp Illustration" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
