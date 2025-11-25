"use client";
import React from "react";
import { placesToVisit } from "@/data/destination";


interface ImageCardProps {
  src: string;
  alt: string;
  className?: string; // Optional prop
  index?: number;     // Optional prop, typically a number
}


const ImageCard: React.FC<ImageCardProps> = ({ src, alt, className, index }) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 ${className}`}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index ? index * 0.1 : 0}s backwards`,
      }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

const AboutSection = () => {
  // Ensure we always have 8 images
  const images = [...placesToVisit];
  while (images.length < 8) {
    // repeat images from the start to fill 8
    images.push(placesToVisit[images.length % placesToVisit.length]);
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200">
            <div className="lg:col-span-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 tracking-tight bg-gradient-to-r from-gray-800 to-gray-400 bg-clip-text text-transparent">
                About Our Hidden Haven
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                At our Sigiriya cabana hotel, we offer a peaceful escape surrounded by nature.
                Every stay is designed with comfort, warmth, and true Sri Lankan hospitality.
              </p>
            </div>
            <div className="flex lg:justify-end justify-start items-center">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-700 tracking-wide">
                Since 2020
              </h3>
            </div>
          </div>

          {/* Mobile */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {images.map((item, index) => (
              <ImageCard key={index} src={item.image} alt={item.name} className="h-40" index={index} />
            ))}
          </div>

          {/* Tablet */}
          <div className="hidden sm:grid md:hidden grid-cols-3 gap-4">
            <ImageCard src={images[0].image} alt={images[0].name} className="col-span-2 h-64" index={0} />
            <ImageCard src={images[1].image} alt={images[1].name} className="h-64" index={1} />
            <ImageCard src={images[2].image} alt={images[2].name} className="h-48" index={2} />
            <ImageCard src={images[3].image} alt={images[3].name} className="col-span-2 h-48" index={3} />
            <ImageCard src={images[4].image} alt={images[4].name} className="col-span-2 h-56" index={4} />
            <ImageCard src={images[5].image} alt={images[5].name} className="h-56" index={5} />
            <ImageCard src={images[6].image} alt={images[6].name} className="h-40" index={6} />
            <ImageCard src={images[7].image} alt={images[7].name} className="col-span-2 h-40" index={7} />
          </div>

          {/* Desktop */}
          <div className="hidden md:grid lg:grid-cols-7 lg:grid-rows-3 gap-4 h-[500px] lg:h-[700px]">
            <ImageCard src={images[0].image} alt={images[0].name} className="col-span-2 row-span-2" index={0} />
            <ImageCard src={images[1].image} alt={images[1].name} className="col-span-1 row-span-2" index={1} />
            <ImageCard src={images[2].image} alt={images[2].name} className="col-span-2 row-span-1" index={2} />
            <ImageCard src={images[3].image} alt={images[3].name} className="col-span-2 row-span-3" index={3} />
            <ImageCard src={images[4].image} alt={images[4].name} className="col-span-2 row-span-1" index={4} />
            <ImageCard src={images[5].image} alt={images[5].name} className="col-span-1 row-span-1" index={5} />
            <ImageCard src={images[6].image} alt={images[6].name} className="col-span-1 row-span-1" index={6} />
            <ImageCard src={images[7].image} alt={images[7].name} className="col-span-3 row-span-1" index={7} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
