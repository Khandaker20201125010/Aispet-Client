import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { SlMenu } from "react-icons/sl";
import { NavLink } from "react-router-dom";

import { Link} from "react-router-dom";
import useAuth from "../Hooks/useAuth";
const Navbar = () => {
  const {user,logOut} = useAuth();
  const [click, setClick] = useState(false);
  const [isNavbarAtTop, setIsNavbarAtTop] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMenu = () => {
    setClick(false);
  };

  const handelSignOut = () => {
    logOut()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Get the current scroll position
      setIsNavbarAtTop(scrollY === 0); // Navbar is at the top if scrollY is 0
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "g-card px-2 py-1 font-semibold text-blue-600"
              : "font-bold text-sky-950 hover:text-blue-300"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "g-card px-2 py-1 font-semibold text-blue-600"
              : "font-bold text-sky-950 hover:text-blue-300"
          }
          to="/services"
        >
          Services
        </NavLink>
      </li>
      <div className="flex-none">
        <ul className="flex  menu-horizontal px-1">
         
          <li>
            <details>
              <summary className="font-bold text-sky-950 cursor-pointer">
                Dashboard
              </summary>
              <ul className="bg-white shadow-md rounded-lg mt-1 p-2 w-40">
                <li className="px-4 py-2 hover:bg-blue-100">
                  <NavLink
                    to="/addServices"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    Add Services
                  </NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100">
                  <NavLink
                    to="/manageServices"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    Manage Services
                  </NavLink>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="navbar-start md:hidden lg:hidden  z -30">
            <div className="flex mx-10 gap-5 lg:gap-10 justify-center items-center">
              {/* Burger Icon */}
              <div onClick={handleClick} className="icon-wrapper">
                {click ? (
                  <AiOutlineClose
                    size={30}
                    className="text-xl text-blue-300 lg:text-2xl cursor-pointer"
                  />
                ) : (
                  <SlMenu
                    size={30}
                    className="text-xl lg:text-2xl text-blue-300 font-bold cursor-pointer"
                  />
                )}
              </div>
            </div>

            {/* Menu Items */}
            <div
              className={`fixed top-0 left-0 w-[550px] max-sm:w-[320px] h-full bg-base-200 transition-transform duration-500 ease-in-out z-50 ${
                click ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              {/* Fixed Header in Burger Menu */}
              <div className="sticky top-0 bg-base-100  px-4 py-3 md:py-4 border-b border-blue-500 ">
                <div className="text-2xl font-bold flex justify-between items-center">
                  <a
                    onClick={closeMenu}
                    className="hover:text-orange-500 cursor-pointer border-2 border-green-500"
                  >
                    <LiaTimesSolid className="text-xl lg:text-2xl cursor-pointer text-blue-500" />
                  </a>
                </div>
              </div>

              {/* Scrollable Content with Hidden Scrollbar */}
              <ul
                className="overflow-y-scroll p-4 space-y-6 text-center text-3xl min-h-screen bg-base-100 "
                style={{
                  maxHeight: "calc(100vh - 64px)",
                  scrollbarWidth: "none" /* For Firefox */,
                  msOverflowStyle: "none" /* For Internet Explorer and Edge */,
                }}
              >
                {/* Hide Scrollbar for WebKit Browsers */}
                <style>{`
                ul::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
                {links}
              </ul>
            </div>

            {/* Background Shadow (Overlay) */}
            {click && (
              <div
                className="min-h-screen fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"
                onClick={closeMenu} // Close menu when clicking on the overlay
              ></div>
            )}
          </div>
          <a className="text-3xl font-bold mx-2">
            <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text">
              Ai
            </span>
            spet
          </a>
        </div>

        {/* Navbar Center (with fixed <ul>) */}
        <div className="navbar-center max-sm:hidden">
          <ul className="text-lg  menu-horizontal px-10 flex justify-center items-center space-x-6 fixed top-0 left-1/2 transform -translate-x-1/2 bg-background backdrop-blur-lg bg-opacity-75 py-3 rounded-full  shadow-bottom-shadow border-b-2 border-gray-200">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
         {
          user?
           <button onClick={handelSignOut} className="btn bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded shadow-lg hover:bg-green-600">
             Log Out
           </button>
          :
           <Link to='/login'>
             <button className="btn bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded shadow-lg hover:bg-green-600">
            Login
           </button>
           </Link>
         }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
