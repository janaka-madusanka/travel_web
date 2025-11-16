"use client";

import { navLinks } from "@/constant/navLinks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBed } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import { motion } from "motion/react";
import svgPaths from "./svgpath"; // Ensure default export

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [scrolled, setScrolled] = useState(false);

  const bookingLink = navLinks.find((link) => link.url === "/booking")?.url || "/booking";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkTextClass = scrolled ? "text-[#003b14]" : "text-white";
  const linkHoverClass = scrolled
    ? "border-[#003b14] text-[#003b14] hover:bg-[#003b14] hover:text-white"
    : "border-white text-white hover:bg-white hover:text-black";

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-[1000] transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10 flex items-center justify-between h-[10vh] sm:h-[12vh] w-[92%] md:w-[88%] xl:w-[80%] mx-auto transition-colors duration-300">
        {/* Logo */}
        <motion.div
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <span className={linkTextClass}>Scenic</span>
          <span className={`ml-1 font-normal text-sm sm:text-base md:text-xl lg:text-2xl ${linkTextClass}`}>
            Cottage
          </span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
          {navLinks.map((link) => (
            <Link href={link.url} key={link.id} className="group">
              <p
                className={`relative text-sm md:text-base font-medium cursor-pointer transition-colors ${linkTextClass} 
                after:block after:content-[''] after:absolute after:-bottom-[3px] after:left-0
                after:h-[2px] after:bg-[#007326] after:w-0 after:transition-all after:duration-300
                group-hover:after:w-full`}
              >
                {link.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Book Now Button + Mobile Menu */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={bookingLink} className={`flex items-center gap-2 border-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors duration-200 ${linkHoverClass}`}>
              Book Now <FaBed />
            </Link>
          </motion.div>

          <HiBars3BottomRight
            onClick={openNav}
            className={`w-7 h-7 sm:w-8 sm:h-8 cursor-pointer transition-colors duration-200 ${linkTextClass} lg:hidden`}
          />
        </div>
      </div>

     {/* Curved SVG Background */}
<div className="absolute top-0 left-1/2 -translate-x-1/2 h-full -z-1000">
  <svg
    className="w-[750px] h-[90px]"
    viewBox="0 0 1007 108"
    fill="none"
    preserveAspectRatio="none"
  >
    <path
      d={svgPaths.p1c2d4700} // Make sure this key exists
      fill={scrolled ? "rgba(255,255,255,0.95)" : "transparent"}
    />
  </svg>
</div>

    </motion.div>
  );
};

export default Nav;
