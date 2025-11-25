"use client";

import React from "react";
import dynamic from "next/dynamic";

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
  place: Place;
}

// Dynamically import Leaflet map (SSR disabled)
const DynamicPlaceMap = dynamic<{ place: Place }>(
  () => import("./PlaceMap").then((mod) => mod.default),
  { ssr: false }
);

export default function PlaceMapCard({ place }: Props) {
  return (
    <div
      className="relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto rounded-xl shadow-lg overflow-hidden"
      style={{ height: "min(70vh, 600px)" }}
    >
      {/* Title Overlay */}
      <h3 className="absolute bottom-4 left-4 sm:left-6 text-lg sm:text-xl md:text-2xl font-semibold text-white bg-black/60 px-3 sm:px-4 py-1 rounded z-[550] truncate max-w-[90%]">
        📍 {place.name}
      </h3>

      {/* Leaflet Map */}
      <DynamicPlaceMap place={place} />
    </div>
  );
}
