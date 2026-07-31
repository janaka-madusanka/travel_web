"use client";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

export default function HeroCollage() {
  const images = [
    "/images/About/grid1.JPG",
    "/images/About/grid2.JPG",
    "/images/About/grid3.JPG",
    "/images/About/grid4.JPG",
    "/images/About/grid5.JPG",
    "/images/About/grid6.JPG",
    "/images/About/grid7.JPG",
  ];

  // Define alternating sizes (large / small)
  const sizes = [
    { w: "180px", h: "200px" }, // large
    { w: "120px", h: "120px" }, // small
    { w: "180px", h: "200px" }, // large
    { w: "120px", h: "120px" }, // small
    { w: "180px", h: "200px" }, // large
    { w: "120px", h: "120px" }, // small
    { w: "180px", h: "200px" }, // large
  ];

  return (
    <div className="relative w-[600px] h-[320px] mx-auto">
      {images.map((src, idx) => (
        <div
          key={idx}
          className="absolute rounded-xl overflow-hidden border-4 border-green-400 shadow-xl"
          style={{
            width: sizes[idx].w,
            height: sizes[idx].h,
            top: `${Math.random() * 200}px`,   // random vertical placement
            left: `${idx * 80}px`,             // stagger horizontally
          }}
        >
          <Image src={src} fill className="object-cover" alt={`Grid ${idx}`} />
          <FaHeart className="absolute top-2 right-2 text-white text-xl drop-shadow-md" />
        </div>
      ))}
    </div>
  );
}
