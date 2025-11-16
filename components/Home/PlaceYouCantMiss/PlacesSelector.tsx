"use client";

import React, { useState } from "react";
import PlaceMapCard from "./PlaceMapCard";

interface Place {
  id: number;
  name: string;
  image: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  type: string;
  open: string;
  close: string;
}

interface Props {
  places: Place[];
}

export default function PlacesSelector({ places }: Props) {
  const [activePlace, setActivePlace] = useState<Place>(places[0]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 px-6 md:px-20 py-16">
      {/* Place List */}
      <div className="space-y-5 text-left w-full lg:w-1/3">
  
        {places.map((place) => (
          <button
            key={place.id}
            onClick={() => setActivePlace(place)}
            className={`w-fit block text-left cursor-pointer transition-all font-medium text-lg md:text-xl ${
              activePlace.id === place.id
                ? "text-green-700 border-l-4 border-green-600 pl-3"
                : "text-gray-700 hover:text-green-600"
            }`}
          >
            {place.name}
          </button>
        ))}

        <p className="text-green-700 font-semibold cursor-pointer mt-6 hover:underline text-lg">
          Explore More ...
        </p>
      </div>

      {/* Map + Card */}
      <div className="w-full lg:w-2/3">
        <PlaceMapCard place={activePlace} />
      </div>
    </div>
  );
}