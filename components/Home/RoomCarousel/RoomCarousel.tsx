"use client";

import React, { useRef, useState, useEffect } from "react";
import RoomCard from "@/components/Home/RoomCarousel/RoomCard";
import { roomsData } from "@/data/rooms";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RoomCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Update arrow visibility
  const updateArrows = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // -1 to fix rounding issues
  };

  // Scroll by card width dynamically
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector<HTMLDivElement>(".carousel-card");
    if (!card) return;

    const scrollAmount =
      card.offsetWidth + parseInt(getComputedStyle(card).marginRight || "0", 10);
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Optional: Auto-scroll (every 3s)
  useEffect(() => {
  let animationFrame: number;

  const smoothScroll = () => {
    if (!scrollRef.current || isHovered) return;

    scrollRef.current.scrollLeft += 1; // smooth 1px movement

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 1) {
      scrollRef.current.scrollTo({ left: 0 });
    }

    animationFrame = requestAnimationFrame(smoothScroll);
  };

  animationFrame = requestAnimationFrame(smoothScroll);

  return () => cancelAnimationFrame(animationFrame);
}, [isHovered]);

  // Update arrows on resize
  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  return (
    <div className="bg-[#f9f7f4] pt-12 md:pt-16 pb-0 rounded-t-[50px] relative overflow-hidden">
      {/* Title */}
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-10 px-5 md:px-10">
        Experience Nature's Comfort in Every Room
      </h2>

      {/* Carousel */}
      <div
        className="relative flex items-center justify-center px-4 md:px-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white/80 hover:bg-white shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-[#007326]" />
          </button>
        )}

        {/* Scrollable list */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex gap-4 sm:gap-6 md:gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 w-full"
        >
          {roomsData.map((room, idx) => (
            <div
              key={room.id}
              className="carousel-card snap-center shrink-0 w-[85vw] sm:w-[260px] md:w-[300px] lg:w-[320px]"
            >
              <RoomCard room={room} index={idx} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white/80 hover:bg-white shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-[#007326]" />
          </button>
        )}
      </div>

      {/* Bottom Section */}
      <div className="relative bg-[#003B14] text-white mt-12 md:mt-16 px-4 sm:px-8 md:px-20 pt-12 md:pt-16 pb-28 md:pb-32 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 md:h-[260px] items-start md:items-center text-left md:text-center">
          <div>
            <h3 className="font-bold text-xl md:text-[28px] lg:text-[32px] mb-2">
              Experience It All
            </h3>
            <p className="font-semibold text-[14px] sm:text-[16px] md:text-[18px] text-gray-300 leading-relaxed mt-4 md:mt-5">
              From peaceful cabanas to scenic nature views, discover Sigiriya's beauty.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xl md:text-[28px] lg:text-[32px] mb-2">
              Everything You Need
            </h3>
            <p className="font-semibold text-[14px] sm:text-[16px] md:text-[18px] text-gray-300 leading-relaxed mt-4 md:mt-5">
              Relax, dine, explore — all with warmth from our friendly team.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xl md:text-[28px] lg:text-[32px] mb-2">
              Exclusive Offers
            </h3>
            <p className="font-semibold text-[14px] sm:text-[16px] md:text-[18px] text-gray-300 leading-relaxed mt-4 md:mt-5">
              Book direct for great rates and local experiences.
            </p>
          </div>
        </div>

        {/* Bottom Curve SVG */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[50px] sm:h-[60px] w-full flex justify-center items-center overflow-visible">
          <div className="flex-none rotate-[180deg] overflow-visible">
            <div className="relative h-full w-full max-w-[1057px] flex justify-center items-center overflow-visible">
              <svg
                className="block w-full h-full overflow-visible"
                viewBox="0 0 1057 49"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M0 0H1057V49H0V0Z" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCarousel;
