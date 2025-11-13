import React from 'react';
import RoomList from '@/components/Rooms/RoomList';

const RoomsPage = () => {
  return (
    <div className="overflow-hidden">
      
      {/* ============ PAGE HEADER ============ */}
      {/* This creates a banner at the top of the page */}
      <div className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center">
        {/* Background Image for Header */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          // Replace this URL with one of your uploaded images
          style={{ backgroundImage: "url('/images/Rooms/R2.png')" }} 
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 text-center px-4">
          <p className="text-white text-sm sm:text-base font-bold uppercase tracking-[0.3em] mb-4">
            Luxury Accommodation
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white font-medium">
            Our Rooms & Suites
          </h1>
        </div>
      </div>

      {/* ============ ROOM LIST (The Zig-Zag Design) ============ */}
      <RoomList />

    </div>
  );
};

export default RoomsPage;