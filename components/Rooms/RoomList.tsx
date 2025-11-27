"use client";
import React from 'react';
import { roomsData } from '@/data/rooms'; 
import RoomCard from './RoomCard';

const RoomList = () => {
  return (
    // ✅ FIX 1: Increased 'py' (vertical padding) to 24/32 to separate from Hero
    <section className="bg-gray-50 py-24 lg:py-32"> 
      
      {/* ✅ FIX 2: Reduced width to 80%/75% so cards don't touch the screen edges */}
      <div className="w-[90%] md:w-[85%] xl:w-[75%] mx-auto flex flex-col gap-20 md:gap-28">
        
        {/* Section Intro */}
        {/* ✅ FIX 3: Added 'mb-16' to push the first card away from the title */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-3">
            Handpicked Comfort
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
            Our Suites & Rooms
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* The List */}
        {roomsData.map((room, index) => (
          <RoomCard key={room.id} room={room} index={index} />
        ))}

      </div>
    </section>
  );
};

export default RoomList;