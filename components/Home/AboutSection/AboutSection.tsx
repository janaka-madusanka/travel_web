"use client";
import Image from "next/image";
import React from "react";
import { aboutImages } from "@/data/imageGrid"; // ✅ Import your dataset

// TypeScript interface for image card props
interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
}

// ✅ Reusable Card Component
const ImageCard: React.FC<ImageCardProps> = ({ src, alt, className }) => (
  <div
    className={`relative w-full h-full overflow-hidden rounded-xl shadow-lg transition-transform duration-500 hover:scale-[1.02] ${className}`}
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
    />
  </div>
);

const AboutSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-16 font-inter">
      <div className="max-w-full px-4 lg:px-20 mx-auto">
        {/* ✅ Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-12 border-b pb-8 border-gray-200">
          <div className="md:col-span-2">
            <h2
              className="text-5xl font-extrabold mb-4 tracking-tight
               bg-gradient-to-r from-[#252525] to-[#e9e4e4]
               bg-clip-text text-transparent"
            >
              About Our Hidden Haven
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              At our Sigiriya cabana hotel, we offer a peaceful escape surrounded by nature.
              Every stay is designed with comfort, warmth, and true Sri Lankan hospitality.
            </p>
          </div>

          <div className="flex md:justify-end justify-start items-center pt-4">
            <h3 className="text-6xl font-bold text-[#007326] tracking-wide">
              Since 2020
            </h3>
          </div>
        </div>

        {/* ✅ Responsive Image Grid using your dataset */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 lg:grid-rows-3 gap-4 md:h-[700px]">

          {/* ✅ Mapping 8 images and applying custom layout pattern */}
          {aboutImages.map((item, index) => {
            const layoutClasses = [
              "col-span-2 row-span-2", // 1
              "col-span-1 row-span-2", // 2
              "col-span-2 row-span-1", // 3
              "col-span-2 row-span-3", // 4
              "col-span-2 row-span-1", // 5
              "col-span-1 row-span-1", // 6
              "col-span-1 row-span-1", // 7
              "col-span-3 row-span-1", // 8
            ];

            return (
              <ImageCard
                key={item.id}
                src={item.image}
                alt={`About gallery image ${item.id}`}
                className={layoutClasses[index] || "col-span-1 row-span-1"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
