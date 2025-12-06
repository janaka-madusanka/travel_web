"use client";

import React from "react";
import Image from "next/image";
import PlaceMap, { Place } from "./PlaceMap";

interface Props {
  place: Place;
}

export default function PlaceMapCard({ place }: Props) {
  return (
    <div className="relative w-full">
      
      {/* Container: Reverted height to h-[450px] */}
      <div className="rounded-3xl w-full h-[450px] overflow-hidden shadow-2xl border-4 border-white/20 bg-black/90 relative group">
        
        {/* The Google Map Iframe */}
        <PlaceMap place={place} />

        {/* THE POPUP CARD (Overlay) */}
        <div className="absolute bottom-4 left-4 z-20 w-[260px] bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out">
          
          {/* Image Area */}
          <div className="relative h-[120px] w-full">
            <Image
              src={place.image}
              alt={place.name}
              fill
              className="object-cover"
              sizes="260px"
              priority
            />
            {/* Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Text Content */}
          <div className="p-4 bg-white">
            <h3 className="text-gray-900 font-bold text-lg leading-tight mb-1">
              {place.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500 text-sm">★ {place.rating}</span>
              <span className="text-gray-400 text-xs">({place.reviews} reviews)</span>
            </div>

            <p className="text-green-600 text-xs font-semibold uppercase tracking-wide mb-3">
              {place.open} - {place.close}
            </p>

            <a
              href={`https://maps.google.com/maps?q=${place.lat},${place.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              View on Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}