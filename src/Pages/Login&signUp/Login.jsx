import React, { useState } from "react";
import loginsignin from "../../assets/images/login&signin.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../comonents/Hooks/useAxiosPublic";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../comonents/Hooks/useAuth";
import { GrGoogle } from "react-icons/gr";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login failed",
          text: "Invalid email or password.",
          showConfirmButton: true,
        });
      });
  };

  const handeleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo: result.user?.photoURL,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container mx-auto">
      <div className="md:flex flex-1 ">
        <div className="md:px-44 md:py-5">
          <div className="m-auto w-[22.5rem] shadow-2xl rounded-lg relative">
            <form
              onSubmit={handleLogin}
              className="card-body bg-transparent p-5"
            >
              <h3 className="text-3xl font-bold text-center mb-4">Login</h3>
              {/* Email Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered bg-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {/* Password Field */}
              <div className="form-control mb-6 relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered bg-transparent pr-10"
                  placeholder="Enter your password"
                  required
                />
                <div
                  className="absolute inset-y-14 right-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              {/* Submit Button */}
              <input
                type="submit"
                className="btn bg-purple-900 w-full hover:bg-purple-600 text-white font-bold"
                value="Login"
              />
            </form>
            {/* Google Sign-In */}
            <div className="flex px-5 justify-center mt-4">
              <button
                onClick={handeleGoogleSignIn}
                className="btn bg-purple-900 w-full  hover:bg-purple-600 text-2xl text-white font-bold"
              >
                <GrGoogle></GrGoogle>
              </button>
            </div>
            <div className="mt-4 text-sm text-center p-2 mb-2">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-purple-600 underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className="m-auto">
          <img src={loginsignin} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
