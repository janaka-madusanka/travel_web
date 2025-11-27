"use client";

import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FaBed, FaUsers, FaWifi, FaFan, FaTv, FaParking, FaChair, FaSnowflake } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

import { BackendRoom } from "@/types/BackendRoom";

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
          <div key={idx} className="relative w-full h-[220px] sm:h-[260px] md:h-[340px]">
            <Image
              src={img}
              alt={`${name}-${idx}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-[24px]"
            />
          </div>
        ))}
      </Slider>
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
const RoomDataSection: React.FC<{ room: BackendRoom }> = ({ room }) => {
  const formattedCapacity = `${room.capacity} Adult${room.capacity > 1 ? "s" : ""}`;

  // ✅ Safely handle bedrooms
  const bedInfo =
    room.bedrooms && room.bedrooms.length > 0
      ? room.bedrooms.map(b => `${b.count} ${b.bedType}`).join(" & ")
      : "No bed info";

  // Collect available features safely
  const features = [
    room.ac === "AC" && <FaSnowflake key="ac" title="AC" />,
    room.wifi === "YES" && <FaWifi key="wifi" title="WiFi" />,
    room.fan === "YES" && <FaFan key="fan" title="Fan" />,
    room.tv === "YES" && <FaTv key="tv" title="TV" />,
    room.parking === "YES" && <FaParking key="parking" title="Parking" />,
    room.sittingArea === "YES" && <FaChair key="sitting" title="Sitting Area" />,
  ].filter(Boolean);

  const images = [room.img1, room.img2, room.img3, room.img4].filter(Boolean) as string[];
  const sliderImages = images.length ? images : ["/images/placeholder-room.png"];

  return (
    <div className="mt-4 flex flex-col gap-2.5">
      <Link href={`/rooms#room-${room.id}`} scroll={true}>
        <h3 className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors cursor-pointer">
          {room.name}
        </h3>
      </Link>
      <div className="flex items-center gap-3 text-gray-500 text-sm">
        <FaBed className="text-gray-400" /> {bedInfo}
        <FaUsers className="text-gray-400 ml-2" /> {formattedCapacity}
      </div>
      {features.length > 0 && <div className="flex gap-2 mt-2 text-gray-600">{features}</div>}
      <div className="mt-2 text-right">
        <span className="text-lg sm:text-xl text-[#C49C74]">${room.cost}</span>
        <span className="text-xs sm:text-sm text-gray-400 ml-1">per day</span>
      </div>
    </div>
  );
};

// ==================== MAIN ROOM CARD ====================
const RoomCard: React.FC<{ room: BackendRoom; index: number }> = ({ room, index }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const images = [room.img1, room.img2, room.img3, room.img4].filter(Boolean) as string[];
  const sliderImages = images.length ? images : ["/images/placeholder-room.png"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full shrink-0 relative mx-2 sm:mx-4 md:mx-9"
    >
      <RoomImageSection
        images={sliderImages}
        name={room.name}
        isFavorited={isFavorited}
        setIsFavorited={setIsFavorited}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
      <RoomDataSection room={room} />
    </motion.div>
  );
};

export default RoomCard;
