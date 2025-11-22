import React from 'react';
import RoomList from '@/components/Rooms/RoomList';
import ResponsiveNav from '@/components/Helper/Navbar/ResponsiveNav'; 

const RoomsPage = () => {
  return (
    <div className="overflow-hidden">
      
      {/* Navigation */}
      <ResponsiveNav />

      {/* ============ HERO SECTION ============ */}
      <div className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Rooms/R3.png')" }}
        >
          {/* Dark Overlay - Increased opacity for better text readablity */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Hero Text - ✅ FIXED: Added 'pt-[10vh]' to push text down away from Nav */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-[10vh]">
          <p className="text-white/90 text-sm sm:text-base font-bold uppercase tracking-[0.3em] mb-6">
            The Ultimate Escape
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-medium mb-8 leading-tight drop-shadow-lg">
            Find Your Sanctuary
          </h1>
        </div>
      </div>

      {/* ============ ROOM LIST SECTION ============ */}
      <RoomList />

    </div>
  );
};

export default RoomsPage;