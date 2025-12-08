import React from "react";
import RoomCarouselClient from "./RoomCarouselClient";
import { getRoomsForUI } from "@/lib/getRooms"; // Use the helper we created earlier

// ✅ Async Server Component
const RoomCarousel = async () => {
  // ✅ Fetch data on server (Instant, No API calls)
  const rooms = await getRoomsForUI();

  return <RoomCarouselClient rooms={rooms} />;
};

export default RoomCarousel;