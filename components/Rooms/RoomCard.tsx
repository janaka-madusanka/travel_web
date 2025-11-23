"use client";
import React from 'react';
import Image from 'next/image';
import { FaArrowRight, FaStar, FaMapMarkerAlt, FaBed, FaUserFriends, FaCheck, FaVectorSquare } from 'react-icons/fa';

// ✅ IMPORT FIX: Since you have 'export interface HotelRoom' in 'data/rooms.ts', 
// we can import it directly here.
import { HotelRoom } from '@/data/data'; 

type Props = {
  room: HotelRoom;
  index: number;
};

const RoomCard = ({ room, index }: Props) => {
  // Logic: Zig-Zag pattern (Left-Right-Left)
  const isReversed = index % 2 !== 0;

  return (
    <div className="group w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
      <div className={`flex flex-col lg:flex-row ${isReversed ? 'lg:flex-row-reverse' : ''} min-h-[500px]`}>
        
        {/* ============ IMAGE SECTION (55%) ============ */}
        <div className="w-full lg:w-[55%] relative h-[350px] lg:h-auto overflow-hidden">
          {/* Main Image - Using the first image in the array */}
          <Image
            src={room.image[0]} 
            alt={room.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Price Overlay */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg z-10 border-l-4 border-orange-500">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Starting from</p>
            <p className="text-2xl font-serif text-gray-900 font-bold">
              ${room.price} <span className="text-sm font-sans font-medium text-gray-400">/night</span>
            </p>
          </div>
        </div>

        {/* ============ CONTENT SECTION (45%) ============ */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center p-8 sm:p-10 lg:p-14 bg-white relative">
          
          {/* Top Row: Rating & Reviews */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 text-orange-500">
              <FaStar className="text-sm" />
              <span className="font-bold text-gray-900">{room.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-sm hover:text-orange-500 cursor-pointer transition-colors">
              {room.reviews} reviews
            </span>
          </div>

          {/* Room Name */}
          <h3 className="text-3xl sm:text-4xl font-serif font-medium text-gray-900 mb-3 leading-tight">
            {room.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-500 mb-8 text-sm uppercase tracking-wide">
            <FaMapMarkerAlt className="text-orange-500" />
            {room.location}
          </div>

          {/* Capacity, Beds & Size Info*/}
          <div className="flex items-center gap-6 py-6 border-t border-b border-gray-100 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-full text-orange-600">
                <FaUserFriends />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Capacity</p>
                <p className="text-sm font-bold text-gray-800">{room.capacity} Guests</p>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-gray-100"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                <FaBed />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Bedding</p>
                <p className="text-sm font-bold text-gray-800">{room.beds}</p>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-gray-100"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                <FaVectorSquare />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Size</p>
                <p className="text-sm font-bold text-gray-800">{room.size}</p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="flex flex-wrap gap-3 mb-10">
            {/* Explicitly typed map arguments to ensure TS compliance */}
            {room.features.map((feature: string, i: number) => (
              <span key={i} className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                <FaCheck className="text-green-500 text-[10px]" /> {feature}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button className="flex-1 px-8 py-3.5 bg-gray-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors duration-300 rounded-sm shadow-lg shadow-gray-200">
              Book Now
            </button>
            <button className="flex-1 px-8 py-3.5 border border-gray-200 text-gray-900 text-sm font-bold uppercase tracking-wider hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 rounded-sm flex items-center justify-center gap-2">
              Details <FaArrowRight />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoomCard;