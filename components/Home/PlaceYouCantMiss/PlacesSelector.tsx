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
      <div className="space-y-4 text-left w-full lg:w-1/3">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Places You Can’t Miss
        </h2>

        {places.map((place) => (
          <button
            key={place.id}
            onClick={() => setActivePlace(place)}
            className={`w-fit block text-left cursor-pointer transition-all font-medium ${
              activePlace.id === place.id
                ? "text-green-700 border-l-2 border-green-600 pl-2"
                : "text-gray-700 hover:text-green-600"
            }`}
          >
            {place.name}
          </button>
        ))}

        <p className="text-green-700 font-semibold cursor-pointer mt-4 hover:underline">
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
