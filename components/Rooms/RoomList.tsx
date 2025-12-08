// components/Rooms/RoomList.tsx
"use client";

import React from "react";
import RoomCard from "./RoomCard";
import { BackendRoom } from "@/types/BackendRoom";

type Props = {
  initialRooms: any[];
};

export default function RoomList({ initialRooms }: Props) {
  
  if (!initialRooms || initialRooms.length === 0) {
    return (
      <div className="text-center py-32 text-xl font-semibold text-gray-500">
        No rooms currently available.
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="w-[90%] md:w-[85%] xl:w-[75%] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* --- Header Section --- */}
        <div className="text-center">
          <p className="text-green-600 font-bold uppercase tracking-widest text-sm mb-3">
            Handpicked Comfort
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
            Our Suites & Rooms
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* --- NEW: Check Availability Bar --- */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col lg:flex-row items-end lg:items-center justify-between gap-6 w-full max-w-5xl mx-auto -mt-4 relative z-10">
            
            {/* Check In Input */}
            <div className="w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Check In
                </label>
                <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors bg-gray-50 hover:bg-white cursor-pointer"
                />
            </div>

            {/* Check Out Input */}
            <div className="w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Check Out
                </label>
                <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors bg-gray-50 hover:bg-white cursor-pointer"
                />
            </div>

            {/* Search Button */}
            <div className="w-full lg:w-auto">
                <label className="block text-sm font-bold text-transparent mb-2 select-none hidden lg:block">
                    Search
                </label>
                <button className="w-full lg:w-auto bg-green-600 text-white font-semibold py-3.5 px-8 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2">
                    Check Availabile Rooms
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
        </div>

        {/* --- Room Cards Grid/List --- */}
        <div className="flex flex-col gap-20 md:gap-28 mt-4">
            {initialRooms.map((room, index) => (
            <RoomCard key={room.id} room={room as unknown as BackendRoom} index={index} />
            ))}
        </div>

      </div>
    </section>
  );
}