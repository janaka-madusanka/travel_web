"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RoomCard from "@/components/Home/RoomCarousel/RoomCard";
import { hotelsData } from "@/data/data";

const RoomCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? hotelsData.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === hotelsData.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-[#f9f7f4] pt-16 pb-0 rounded-t-[50px] relative overflow-hidden">
      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2 mb-6">
        {hotelsData.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Title */}
      <h2 className="text-center text-3xl font-bold mb-10 px-5">
        Experience Nature’s Comfort in Every Room
      </h2>

      {/* Carousel */}
      <div className="relative flex items-center justify-center px-5 md:px-12">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition z-10 hidden sm:block"
        >
          <FaChevronLeft />
        </button>

        {/* Scrollable list */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 w-full">
          {hotelsData.map((room) => (
            <div key={room.id} className="snap-center flex-shrink-0">
              <RoomCard room={room} />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition z-10 hidden sm:block"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#003B14] text-white mt-16 py-16 px-8 md:px-20 
                      text-center grid md:grid-cols-3 gap-10 md:h-[320px] items-center">
        <div>
          <h3 className="font-bold text-[28px] md:text-[32px] mb-2">
            Experience It All
          </h3>
          <p className="font-semibold text-[16px] md:text-[18px] text-gray-300 leading-relaxed mt-5">
            From peaceful cabanas to scenic nature views, discover Sigiriya’s beauty.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-[28px] md:text-[32px] mb-2">
            Everything You Need
          </h3>
          <p className="font-semibold text-[16px] md:text-[18px] text-gray-300 leading-relaxed mt-5">
            Relax, dine, explore — all with warmth from our friendly team.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-[28px] md:text-[32px] mb-2">
            Exclusive Offers
          </h3>
          <p className="font-semibold text-[16px] md:text-[18px] text-gray-300 leading-relaxed mt-5">
            Book direct for great rates and local experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomCarousel;
