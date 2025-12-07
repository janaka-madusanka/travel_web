"use client";

import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { BackendRoom } from "@/types/BackendRoom";

export default function RoomList() {
  const [rooms, setRooms] = useState<BackendRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms"); // ✅ Using Next.js API route
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch rooms");
        setRooms(data.rooms);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-32">
      {/* The Spinner Animation */}
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-green-600 mb-4"></div>
      
      {/* The Text */}
      <div className="text-xl font-semibold">
        Loading rooms details...
      </div>
    </div>
    );

  if (error)
    return (
      <div className="text-center py-32 text-xl font-semibold text-red-500">
        {error}
      </div>
    );

  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="w-[90%] md:w-[85%] xl:w-[75%] mx-auto flex flex-col gap-20 md:gap-28">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-3">
            Handpicked Comfort
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
            Our Suites & Rooms
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {rooms.map((room, index) => (
          <RoomCard key={room.id} room={room} index={index} />
        ))}
      </div>
    </section>
  );
}
