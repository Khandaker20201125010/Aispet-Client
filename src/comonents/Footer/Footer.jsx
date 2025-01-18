import React from "react";
import f1 from "../../assets/images/f1.png";
import { CiFacebook, CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/images/logo.png";
const Footer = () => {
  return (
    <footer
      className=" bg-cover bg-no-repeat bg-center text-gray-600 "
      style={{ backgroundImage: `url(${f1})` }}
    >
      <div className="container mx-auto px-6 py-12">
        {/* Footer Top Section */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-20" />
              <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text">
                Ai<span>spet</span>
              </h2>
            </div>
            <p className="mt-4 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:underline">
                  Our Pricing
                </a>
              </li>
              <li>
                <a href="#news" className="hover:underline">
                  Latest News
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#faq" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:underline">
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="#team" className="hover:underline">
                  Team
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Address Section */}
          <div className="max-sm:text-center">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start max-sm:justify-center ">
                <span className="mr-2">📍</span>
                27 Division St, New York, NY 10002, USA
              </li>
              <li className="flex items-start  max-sm:justify-center">
                <span className="mr-2">📧</span>
                <a href="mailto:spet@gmail.com" className="hover:underline">
                  Aispet@gmail.com
                </a>
              </li>
              <li className="flex items-start  max-sm:justify-center">
                <span className="mr-2">📞</span>
                <a href="tel:+321984754" className="hover:underline">
                  + (321) 984 754
                </a>
              </li>
            </ul>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4  max-sm:justify-center">
              <a href="#facebook" className="hover:text-blue-500">
                <CiFacebook />
              </a>
              <a href="#twitter" className="hover:text-blue-400">
                <FaXTwitter />
              </a>
              <a href="#instagram" className="hover:text-pink-500">
                <CiInstagram />
              </a>
              <a href="#linkedin" className="hover:text-blue-600">
                <CiLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
