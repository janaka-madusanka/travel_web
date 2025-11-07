"use client";

import React from "react";
import Image from "next/image";

interface Place {
  id: number;
  name: string;
  image: string;
  mapUrl: string;
}

interface Props {
  place: Place;
}

export default function PlaceMapCard({ place }: Props) {
  return (
    <div className="w-full lg:w-2/3 flex flex-col gap-6">
      {/* Place Image */}
      <div className="relative w-full h-56 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow-md">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Map */}
      <div className="relative w-full h-56 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow-md">
        <Image
          src={place.mapUrl}
          alt={place.name + ' map'}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
        📍 {place.name}
      </h3>
    </div>
  );
}
