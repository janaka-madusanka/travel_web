"use client";

import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FaBed, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link"; // ✅ Import Link
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
      className="relative h-[350px] rounded-[24px] overflow-hidden group cursor-pointer shadow-md bg-white"
    >
      <div className="h-full">
        <Slider {...sliderSettings} className="h-full">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-[350px]">
              <Image
                src={img}
                alt={`${name}-${idx}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Favorite Icon */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFavorited(!isFavorited)}
        className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center cursor-pointer z-10"
      >
        <svg
          className="w-6 h-6"
          fill={isFavorited ? "#ff6b6b" : "none"}
          stroke="#ffffff"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={svgpath.pea4b2f0}
          />
        </svg>
      </motion.div>

      {/* Slider Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, dot) => (
          <motion.span
            key={dot}
            className={`block w-1.5 h-1.5 rounded-full transition-all ${
              activeSlide === dot ? "bg-white w-6" : "bg-white/60"
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
  id: number; // ✅ Added ID to props
  name: string;
  beds: string;
  capacity: string | number;
  price: string;
}> = ({ id, name, beds, capacity, price }) => {
  
  const formattedCapacity = typeof capacity === 'number' 
    ? `${capacity} Adult${capacity > 1 ? 's' : ''}` 
    : capacity;

  return (
    <div className="mt-4 flex gap-4 bg-transparent">
      {/* Left Column - Room Name and Details */}
      <div className="flex-1 flex flex-col gap-2.5">
        
        {/* ✅ Room Name wrapped in Link */}
        <Link href={`/rooms#room-${id}`} scroll={true}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors cursor-pointer">
            {name}
          </h3>
        </Link>
        
        {/* Bed & Capacity Info */}
        <div className="flex flex-col gap-1.5 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FaBed className="text-gray-400" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="text-gray-400" />
            <span>{formattedCapacity}</span>
          </div>
        </div>
      </div>

      {/* Right Column - Price */}
      <div className="flex flex-col items-end justify-start pt-1">
        <span className="text-2xl text-[#C49C74]">$ {price}</span>
        <span className="text-xs text-gray-400 whitespace-nowrap">per day</span>
      </div>
    </div>
  );
};

// ==================== MAIN ROOM CARD ====================
const RoomCard: React.FC<RoomCardProps> = ({ room, index }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  if (!room || !room.image || room.image.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-[320px] shrink-0 relative"
    >
      {/* Image Section */}
      <RoomImageSection
        images={room.image}
        name={room.name}
        isFavorited={isFavorited}
        setIsFavorited={setIsFavorited}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />

      {/* Data Section */}
      <RoomDataSection
        id={room.id} // ✅ Passing ID to the data section
        name={room.name}
        beds={room.beds}
        capacity={room.capacity}
        price={room.price}
      />
    </motion.div>
  );
};

export default RoomCard;