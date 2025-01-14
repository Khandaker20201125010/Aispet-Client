import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../comonents/Navbar/Navbar";
import Footer from "../comonents/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signUp");
  return (
    <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto">
    {!noHeaderFooter && <Navbar />}
    {/* Main Content */}
    <div className="flex-grow">
      <Outlet />
    </div>
    {/* Footer */}
    {!noHeaderFooter && <Footer />}
  </div>
  );
};

export default Main;
