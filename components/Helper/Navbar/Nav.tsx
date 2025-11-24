"use client";

import { navLinks } from "@/constant/navLinks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBed } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import { motion } from "motion/react";
import svgPaths from "./svgpath";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const bookingLink =
    navLinks.find((link) => link.url === "/booking")?.url || "/booking";

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect window width
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Responsive font sizes
  const getLinkFontSize = () => {
 if (windowWidth > 1600) return "1.1rem";   // Very large screens
  if (windowWidth > 1400) return "0.9rem";   // Large screens
  if (windowWidth > 1254) return "0.8rem";     // Desktop
  if (windowWidth > 1030) return "0.7rem";  // Small desktop
  if (windowWidth > 768) return "0.6rem";   // Tablet
  return "0.75rem";                           // Mobile
  };

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
          <span
            className={`ml-1 font-normal text-sm sm:text-base md:text-xl lg:text-2xl ${linkTextClass}`}
          >
            Cottage
          </span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div
          className="hidden lg:flex 
    items-center justify-center absolute left-1/2 -translate-x-[45%]"
          style={{
            gap: scrolled ? "3rem" : "1.5rem",
          }}
        >
          {navLinks.map((link) => (
            <Link href={link.url} key={link.id} className="group">
              <p
                className={`relative font-medium cursor-pointer transition-all duration-[1200ms] ${linkTextClass} 
                after:block after:content-[''] after:absolute after:-bottom-[3px] after:left-0
                after:h-[2px] after:bg-[#007326] after:w-0 after:transition-all after:duration-300
                group-hover:after:w-full whitespace-nowrap`}
                style={{
                  fontSize: getLinkFontSize(), // RESPONSIVE FONT SIZE
                }}
              >
                {link.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Book Now + Mobile Menu */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={bookingLink}
              className={`flex items-center gap-2 border-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors duration-200 ${linkHoverClass}`}
            >
              Book Now <FaBed />
            </Link>
          </motion.div>

          <HiBars3BottomRight
            onClick={openNav}
            className={`w-7 h-7 sm:w-8 sm:h-8 cursor-pointer 
              ${linkTextClass}
              lg:hidden
              max-[1254px]:block
              min-[1255px]:block`}
          />
        </div>
      </div>

      {/* Curved SVG Background */}
      <div className="absolute top-0 left-0 w-full overflow-visible -z-50 pointer-events-none hidden lg:block">
        <svg
          className="hidden 
            lg:block 
            max-[1254px]:hidden
            min-[1255px]:hidden
            absolute top-0 left-0 w-full overflow-visible -z-50 pointer-events-none"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: scrolled ? "250%" : "40%",
            height: scrolled ? "108px" : "90px",
            transition: "width 1200ms ease, height 1200ms ease",
          }}
          viewBox="0 0 1007 108"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d={svgPaths.p1c2d4700}
            fill={scrolled ? "#ffffff" : "rgba(255,255,255,0.1)"}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default Nav;
