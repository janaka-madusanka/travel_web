"use client";

import React from "react";
import RoomCard from "@/components/Home/RoomCarousel/RoomCard";
import { roomsData } from "@/data/rooms";
import svgPaths from "../../Helper/Navbar/svgpath";

const RoomCarousel: React.FC = () => {
  return (
    <div className="bg-[#f9f7f4] pt-16 pb-0 rounded-t-[50px] relative overflow-hidden">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold mb-10 px-5">
        Experience Nature's Comfort in Every Room
      </h2>

      {/* Carousel */}
      <div className="relative flex items-center justify-center px-5 md:px-12">
        {/* Scrollable list */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 w-full">
          {roomsData.map((room, idx) => (
            <div key={room.id} className="snap-center shrink-0">
              <RoomCard room={room} index={idx} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative bg-[#003B14] text-white mt-16 px-8 md:px-20 pt-16 pb-32 text-center">
        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-10 md:h-[260px] items-center">
          {/* Section 1 */}
          <div>
            <h3 className="font-bold text-[28px] md:text-[32px] mb-2">
              Experience It All
            </h3>
            <p className="font-semibold text-[16px] md:text-[18px] text-gray-300 leading-relaxed mt-5">
              From peaceful cabanas to scenic nature views, discover Sigiriya's
              beauty.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="font-bold text-[28px] md:text-[32px] mb-2">
              Everything You Need
            </h3>
            <p className="font-semibold text-[16px] md:text-[18px] text-gray-300 leading-relaxed mt-5">
              Relax, dine, explore — all with warmth from our friendly team.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="font-bold text-[28px] md:text-[32px] mb-2">
              Exclusive Offers
            </h3>
            <p className="font-semibold text-[16px] md:text-[18px] text-gray-300 leading-relaxed mt-5">
              Book direct for great rates and local experiences.
            </p>
          </div>
        </div>

        {/* Bottom Curve SVG */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[60px] w-full flex justify-center items-center overflow-visible">
          <div className="flex-none rotate-[180deg] overflow-visible">
            <div className="relative h-[60px] w-full max-w-[1057px] flex justify-center items-center overflow-visible">
              <svg
                className="block w-full h-full overflow-visible"
                viewBox="0 0 1057 49"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d={svgPaths.p3e25ed70} fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCarousel;