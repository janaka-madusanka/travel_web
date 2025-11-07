"use client";

import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-green-900 py-10 border-t border-gray-200 w-full">
      
      {/* Title + Subtitle */}
      <div className="text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold">Scenic Cottage</h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Where nature, comfort, and warm Sri Lankan hospitality meet.
        </p>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 text-green-800 text-sm px-6">
        <div className="flex items-center gap-2 text-center">
          <IoLocationSharp className="text-lg" />
          <span>Sigiriya Road, Inamaluwa, 21124 Sigiriya, Sri Lanka</span>
        </div>

        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-sm" />
          <span>+9474 055 8858</span>
        </div>
      </div>

      <hr className="border-gray-200 my-6 w-10/12 mx-auto" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-11/12 mx-auto text-sm text-gray-600 px-6">

        {/* Copyright */}
        <p className="mb-3 md:mb-0 text-center md:text-left">
          © 2026 Scenic Cottage
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-6 justify-center">
          <a href="#" className="hover:text-green-700 transition">Home</a>
          <a href="#" className="hover:text-green-700 transition">Booking</a>
          <a href="#" className="hover:text-green-700 transition">Nearby Places</a>
          <a href="#" className="hover:text-green-700 transition">About Us</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 mt-3 md:mt-0 justify-center">
          <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-green-50 transition">
            <FaTiktok className="text-green-700" />
          </a>
          <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-green-50 transition">
            <FaFacebookF className="text-green-700" />
          </a>
          <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-green-50 transition">
            <FaInstagram className="text-green-700" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
