"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaStar, FaMapMarkerAlt, FaBed, FaUserFriends, FaCheck, FaTimes, FaRulerCombined, FaListUl } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { HotelRoom } from '@/data/data';

type Props = {
  room: HotelRoom;
  index: number;
};

const RoomCard = ({ room, index }: Props) => {
  const isReversed = index % 2 !== 0;
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div 
      id={`room-${room.id}`}
      // ✅ THE FIX: 'scroll-mt-40' (approx 160px) 
      // This forces the browser to stop scrolling *before* the card hits the top, 
      // leaving perfect space for your fixed Navbar.
      className="scroll-mt-40 group w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 relative"
    >
      {/* ✅ Reverted to original min-h-[500px] as requested */}
      <div className={`flex flex-col lg:flex-row ${isReversed ? 'lg:flex-row-reverse' : ''} min-h-[500px]`}>
        
        {/* ============ SLIDER SECTION ============ */}
        <div className="w-full lg:w-[55%] relative h-[500px] lg:h-auto overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait" initial={false}>
            
            {!showDetails ? (
              // IMAGE VIEW
              <motion.div
                key="image"
                className="relative w-full h-full"
                initial={{ x: isReversed ? '100%' : '-100%', opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: isReversed ? '100%' : '-100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                 <Image src={room.image[0]} alt={room.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg z-10 border-l-4 border-orange-500">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Starting from</p>
                  <p className="text-2xl font-serif text-gray-900 font-bold">${room.price} <span className="text-sm font-sans font-medium text-gray-400">/night</span></p>
                </div>
              </motion.div>
            ) : (
              // DETAILS VIEW
              <motion.div
                key="details"
                className="relative w-full h-full p-8 lg:p-14 flex flex-col bg-gray-900 text-white"
                initial={{ x: isReversed ? '-100%' : '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: isReversed ? '-100%' : '100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <button onClick={toggleDetails} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"><FaTimes className="text-white" /></button>
                
                <h4 className="text-3xl font-serif mb-4 text-orange-400">Room Overview</h4>
                <p className="text-gray-300 leading-relaxed mb-8 font-light text-base">{room.description}</p>
                
                {/* AMENITIES LIST */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="flex items-center gap-2 mb-4 text-orange-500 sticky top-0 bg-gray-900 py-2 z-10">
                    <FaListUl />
                    <span className="text-sm font-bold uppercase tracking-wider">Room Amenities</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                    {room.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                         <div className="min-w-[6px] h-[6px] rounded-full bg-orange-500 mt-1.5"></div>
                         {feature}
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ============ STATIC CONTENT ============ */}
        {/* ✅ Reverted to original padding (p-14) so content is centered comfortably */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center p-8 sm:p-10 lg:p-14 bg-white relative">
          
          {/* Room Name */}
          <h3 className="text-4xl sm:text-5xl font-serif font-medium text-gray-900 mb-8 leading-tight">
            {room.name}
          </h3>
          
          {/* Specs Grid - Centered nicely due to flex-col justify-center */}
          <div className="flex items-center gap-4 py-6 border-t border-b border-gray-100 mb-8">
            <div className="flex items-center gap-3"><div className="p-2 bg-orange-50 rounded-full text-orange-600"><FaUserFriends /></div><div><p className="text-xs text-gray-400 uppercase">Capacity</p><p className="text-sm font-bold text-gray-800">{room.capacity} Guests</p></div></div>
            <div className="w-[1px] h-10 bg-gray-100"></div>
            <div className="flex items-center gap-3"><div className="p-2 bg-blue-50 rounded-full text-blue-600"><FaBed /></div><div><p className="text-xs text-gray-400 uppercase">Bedding</p><p className="text-sm font-bold text-gray-800">{room.beds}</p></div></div>
            <div className="w-[1px] h-10 bg-gray-100 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-3"><div className="p-2 bg-green-50 rounded-full text-green-600"><FaRulerCombined /></div><div><p className="text-xs text-gray-400 uppercase">Size</p><p className="text-sm font-bold text-gray-800">{room.size}</p></div></div>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-3 mb-10">
            {room.features.slice(0, 4).map((feature: string, i: number) => (
              <span key={i} className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100"><FaCheck className="text-green-500 text-[10px]" /> {feature}</span>
            ))}
             <span className="text-xs font-medium text-gray-400 px-2 py-1.5">+more</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button className="flex-1 px-8 py-3.5 bg-gray-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors duration-300 rounded-sm shadow-lg shadow-gray-200">Book Now</button>
            <button onClick={toggleDetails} className={`flex-1 px-8 py-3.5 border text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center justify-center gap-2 ${showDetails ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-900 hover:border-gray-900 hover:bg-gray-50'}`}>{showDetails ? 'Close' : 'Details'} {showDetails ? <FaTimes /> : <FaArrowRight />}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoomCard;