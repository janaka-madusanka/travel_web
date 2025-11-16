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

const DynamicPlaceMap = dynamic<{ place: Place }>(
  () => import("./PlaceMap").then((mod) => mod.default),
  { ssr: false }
);

export default function PlaceMapCard({ place }: Props) {
  return (
    <div
      className="relative w-[85%] ml-20 rounded-xl shadow-lg overflow-hidden"
      style={{ height: "min(70vh, 600px)" }}
    >
      {/* Title Overlay */}
      <h3 className="absolute bottom-4 left-6 text-xl font-semibold text-white bg-black/60 px-4 py-1 rounded z-[550]">
        📍 {place.name}
      </h3>

      {/* Leaflet Map */}
      <DynamicPlaceMap place={place} />
    </div>
  );
}
