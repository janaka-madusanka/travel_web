import React from 'react';
import { hotelsData } from '@/data/data'; 
import RoomCard from './RoomCard';

const RoomList = () => {
  return (
    <section className="bg-gray-50 pb-20">
      <div className="w-[90%] md:w-[85%] xl:w-[80%] mx-auto flex flex-col gap-12 mt-16">
        {/* Loop through hotelsData instead of roomsData */}
        {hotelsData.map((hotel, index) => (
          <RoomCard key={hotel.id} room={hotel} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RoomList;