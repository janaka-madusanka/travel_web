import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface RoomCardProps {
  room: {
    id: number;
    image: string;
    name: string;
    location: string;
    rating: number;
    reviews: string;
    price: string;
  };
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-[260px] sm:w-[300px] md:w-[340px] flex-shrink-0">
      {/* HOTEL IMAGE */}
      <Image
        src={room.image}
        alt={room.name}
        width={350}
        height={250}
        className="object-cover w-full h-[180px] sm:h-[200px] md:h-[220px]"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{room.name}</h3>
        <p className="text-gray-500 text-sm">{room.location}</p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mt-2">
          <FaStar className="text-yellow-500" />
          <span className="font-semibold">{room.rating}</span>
          <span className="text-gray-400 text-sm">({room.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-3 font-bold text-[18px] text-green-700">
          ${room.price} / night
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
