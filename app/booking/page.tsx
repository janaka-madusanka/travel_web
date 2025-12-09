import { Suspense } from "react";
import BookingPage from '@/components/Helper/BookingForm/BookingPage';
import { getRoomsForUI } from "@/lib/getRooms"; // Re-use your helper

// ✅ Async Server Component
export default async function Booking() {
  // ✅ Fetch data directly on the server (No API call)
  const rooms = await getRoomsForUI();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Suspense is required because BookingPage uses useSearchParams */}
      <Suspense fallback={<div className="text-center p-10">Loading booking form...</div>}>
        {/* ✅ Pass the fetched rooms as a prop */}
        <BookingPage initialRooms={rooms} />
      </Suspense>
    </div>
  );
}