"use client";

import Link from "next/link";
import React, { useState } from "react";
import PlaceMapCard from "./PlaceMapCard";
import { Place } from "./PlaceMap";

interface Props {
  places: Place[];
}

export default function PlacesSelector({ places }: Props) {
  const [activePlace, setActivePlace] = useState<Place>(places[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 md:px-12 py-8 max-w-7xl mx-auto">
      
      {/* Left Side: List of Places */}
      <div className="w-full lg:w-1/3 flex flex-col gap-2">
        {places.map((place) => (
          <button
            key={place.id}
            onClick={() => setActivePlace(place)}
            // Reverted text size: text-lg md:text-xl
            className={`text-left w-full px-4 py-3 rounded-xl transition-all duration-200 border-l-4 text-lg md:text-xl font-medium ${
              activePlace.id === place.id
                ? "border-green-600 bg-green-50 text-green-800 font-bold shadow-sm"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:pl-5"
            }`}
          >
            {place.name}
          </button>
        ))}

        <Link
          href="/places"
          className="mt-6 inline-block text-green-700 font-semibold hover:underline hover:text-green-800 transition-colors px-4"
        >
          Explore More Locations →
        </Link>
      </div>

      {/* Right Side: Map */}
      <div className="w-full lg:w-2/3">
        <PlaceMapCard place={activePlace} />
      </div>
      
    </div>
  );
}