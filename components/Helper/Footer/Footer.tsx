"use client";

import React from "react";
import { FaPhoneAlt, FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // <-- added

const Footer: React.FC = () => {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/admin"); // hide footer on admin pages

  if (hideFooter) return null; // <-- hide footer

  return (
    <footer className="bg-white w-full py-16">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center text-[#003b14]"
      >
        Scenic Cottage
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-lg md:text-xl text-gray-600 mt-2"
      >
        Where nature, comfort, and warm Sri Lankan hospitality meet.
      </motion.p>

      {/* Contact Info */}
      <div className="flex flex-col items-center justify-center gap-4 text-[#007326] text-sm md:text-lg mt-6">
        <div className="flex items-center gap-2">
          <IoLocationSharp />
          <span>Sigiriya Road, Inamaluwa, 21124 Sigiriya, Sri Lanka</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhoneAlt />
          <span>+9474 055 8858</span>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="w-10/12 mx-auto h-[1px] bg-gray-300 my-6"></div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row items-center justify-between w-10/12 mx-auto text-sm md:text-base text-gray-600 gap-4 md:gap-0">
        {/* Copyright */}
        <p>© 2026 Scenic Cottage</p>

        {/* Links */}
        <div className="flex gap-6 text-[#007326]">
          {["Home", "Booking", "Nearby Places", "About Us"].map((link, idx) => (
            <motion.a
              key={idx}
              href="#"
              whileHover={{ y: -2, color: "#005a1b" }}
              className="cursor-pointer transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-3">
          {[FaTiktok, FaFacebookF, FaInstagram].map((Icon, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.2, y: -2 }}
              className="p-2 border border-gray-200 rounded-full cursor-pointer"
            >
              <Icon className="text-[#007326]" />
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
