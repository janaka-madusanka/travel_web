import React from 'react';
import Image from 'next/image';
import { FaArrowRight, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

// ✅ 1. Define the Prop Type based on your new Data Structure
type Props = {
  room: {
    id: number;
    image: string[]; // Note: This is now an array
    name: string;
    location: string;
    rating: number;
    reviews: string;
    price: string;
  };
  index: number;
};

const RoomCard = ({ room, index }: Props) => {
  // Logic: Zig-Zag pattern (Left-Right-Left)
  const isReversed = index % 2 !== 0;

  return (
    <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className={`flex flex-col lg:flex-row ${isReversed ? 'lg:flex-row-reverse' : ''} min-h-[450px]`}>
        
        {/* ============ IMAGE SECTION (50%) ============ */}
        <div className="w-full lg:w-1/2 relative h-[300px] lg:h-auto group overflow-hidden">
          {/* We take the first image from the array: room.image[0] */}
          <Image
            src={room.image[0]} 
            alt={room.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Optional: Overlay for price */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-900 shadow-sm">
            ${room.price} <span className="font-normal text-gray-500">/ night</span>
          </div>
        </div>

        {/* ============ TEXT SECTION (50%) ============ */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 bg-white">
          
          {/* Rating Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
              <FaStar />
              {room.rating}
            </div>
            <span className="text-gray-400 text-sm">({room.reviews} reviews)</span>
          </div>

          {/* Title (Name) */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4 leading-tight">
            {room.name}
          </h3>

          {/* Location (replaces description) */}
          <div className="flex items-start gap-2 text-gray-500 text-base sm:text-lg mb-8 font-light">
            <FaMapMarkerAlt className="mt-1 text-orange-500 shrink-0" />
            <p>{room.location}</p>
          </div>

          {/* Generated Description since data doesn't have one */}
          <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
            Experience luxury living at {room.name}. Located in the heart of {room.location}, 
            this room offers exceptional comfort with a {room.rating}-star rating from over {room.reviews} happy guests.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-auto">
            <button className="px-8 py-3 bg-gray-900 text-white uppercase tracking-wider text-sm font-medium hover:bg-orange-600 transition-all duration-300 rounded-sm">
              Book Now
            </button>
            
            <button className="flex items-center gap-2 text-gray-900 text-sm font-semibold hover:text-orange-600 transition-colors group">
              View Gallery 
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoomCard;