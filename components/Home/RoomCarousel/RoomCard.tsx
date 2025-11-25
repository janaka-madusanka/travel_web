"use client";

import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FaBed, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import svgpath from "@/components/Helper/Navbar/svgpath";

interface RoomCardProps {
  room: {
    id: number;
    image: string[];
    name: string;
    beds: string;
    capacity: string | number;
    price: string;
  };
  index: number;
}

// ==================== IMAGE SECTION ====================
const RoomImageSection: React.FC<{
  images: string[];
  name: string;
  isFavorited: boolean;
  setIsFavorited: (val: boolean) => void;
  activeSlide: number;
  setActiveSlide: (val: number) => void;
}> = ({ images, name, isFavorited, setIsFavorited, activeSlide, setActiveSlide }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    pauseOnHover: true,
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full h-[220px] sm:h-[260px] md:h-[340px] rounded-[24px] overflow-hidden group cursor-pointer shadow-md bg-white"
    >
    <Slider {...sliderSettings} className="h-full">
  {images.map((img, idx) => (
    <div
      key={idx}
      className="relative w-full h-[220px] sm:h-[250px] md:h-[350px]"
    >
      <Image
        src={img}
        alt={`${name}-${idx}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-[24px]"
      />
    </div>
  ))}
</Slider>

      {/* Favorite Icon */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFavorited(!isFavorited)}
        className="absolute right-3 top-3 sm:right-4 sm:top-4 w-9 h-9 flex items-center justify-center cursor-pointer z-10"
      >
        <svg
          className="w-6 h-6"
          fill={isFavorited ? "#ff6b6b" : "none"}
          stroke="#ffffff"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={svgpath.pea4b2f0} />
        </svg>
      </motion.div>

      {/* Slider Dots */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, dot) => (
          <motion.span
            key={dot}
            className={`block h-1.5 rounded-full transition-all ${
              activeSlide === dot ? "bg-white w-5 sm:w-6" : "bg-white/60 w-1.5"
            }`}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ==================== DATA SECTION ====================
const RoomDataSection: React.FC<{
  name: string;
  beds: string;
  capacity: string | number;
  price: string;
}> = ({ name, beds, capacity, price }) => {
  const formattedCapacity =
    typeof capacity === "number" ? `${capacity} Adult${capacity > 1 ? "s" : ""}` : capacity;

  return (
    <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3">
      {/* Left */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{name}</h3>

        <div className="flex flex-col gap-1 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <FaBed className="text-gray-400" />
            <span>{beds}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FaUsers className="text-gray-400" />
            <span>{formattedCapacity}</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-start sm:items-center justify-start sm:justify-end flex-col sm:flex-row gap-1 sm:gap-2">
        <span className="text-lg sm:text-xl text-[#C49C74]">$ {price}</span>
        <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">per day</span>
      </div>
    </div>
  );
};

// ==================== MAIN ROOM CARD ====================
const RoomCard: React.FC<RoomCardProps> = ({ room, index }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  if (!room || !room.image || room.image.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full shrink-0 relative mx-2 sm:mx-4 md:mx-9"
    >
      <RoomImageSection
        images={room.image}
        name={room.name}
        isFavorited={isFavorited}
        setIsFavorited={setIsFavorited}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />

      <RoomDataSection
        name={room.name}
        beds={room.beds}
        capacity={room.capacity}
        price={room.price}
      />
    </motion.div>
  );
};

export default RoomCard;
