// app/rooms/page.tsx
import React from 'react';
import Image from 'next/image';
import RoomList from '@/components/Rooms/RoomList';
import NewsletterSignup from '@/components/Home/NewsletterSignup/NewsletterSignup';
import { getRoomsForUI } from '@/lib/getRooms'; // Import the helper we created

// ✅ 1. Make the component async
const RoomsPage = async () => {
  
  // ✅ 2. Fetch data directly on the server (No API call needed)
  const rooms = await getRoomsForUI();

  return (
    <div className="overflow-hidden">
      
      {/* ============ HERO SECTION ============ */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
           <Image 
            src="/images/Rooms/IMG_0004.JPG"
            alt="Rooms Hero Sanctuary"
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-[10vh]">
          <p className="text-white/90 text-sm sm:text-base font-sfpro font-bold uppercase tracking-[0.3em] mb-6">
            The Ultimate Escape
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-medium mb-8 leading-tight drop-shadow-lg">
            Find Your Sanctuary
          </h1>
        </div>
      </div>

      {/* ============ ROOM LIST SECTION ============ */}
      {/* ✅ 3. Pass the fetched rooms as a prop */}
      <RoomList initialRooms={rooms} />

      <NewsletterSignup />

    </div>
  );
};

export default RoomsPage;