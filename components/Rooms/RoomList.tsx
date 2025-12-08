// components/Rooms/RoomList.tsx
"use client";
import { useState, useEffect } from "react";
import React from "react";
import RoomCard from "./RoomCard";
import { BackendRoom } from "@/types/BackendRoom";
import CustomAlert from "@/components/Common/CustomAlert";

type Props = {
  initialRooms: any[];
};

export default function RoomList({ initialRooms }: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(initialRooms);
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const isRoomAvailable = (
    roomId: string,
    bookings: Array<{ checkIn: string; checkOut: string }>
  ) => {
    if (!checkIn || !checkOut) return true;

    const selectedCheckIn = new Date(checkIn);
    const selectedCheckOut = new Date(checkOut);

    // Check if any booking overlaps with the selected dates
    for (const booking of bookings) {
      const bookedCheckIn = new Date(booking.checkIn);
      const bookedCheckOut = new Date(booking.checkOut);

      if (
        selectedCheckIn <= bookedCheckOut &&
        selectedCheckOut >= bookedCheckIn
      ) {
        return false; // Room is not available (dates overlap)
      }
    }

    return true; // Room is available
  };

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) {
      setFilteredRooms(initialRooms); // Show all rooms if no dates
      return;
    }

    if (new Date(checkIn) > new Date(checkOut)) {
      showAlert(
        "Invalid Dates",
        "Check-out date cannot be before check-in date",
        "warning"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/bookings/all?from=${checkIn}`);
      const data = await response.json();

      if (response.ok) {
        const { bookingsByRoom } = data;

        // Filter rooms based on availability
        const availableRooms = initialRooms.filter((room) => {
          const roomBookings = bookingsByRoom[room.id] || [];
          return isRoomAvailable(room.id, roomBookings);
        });

        setFilteredRooms(availableRooms);
      } else {
        console.error("Error fetching bookings:", data.error);
        showAlert(
          "Error",
          "Failed to check availability. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      showAlert(
        "Error",
        "Failed to check availability. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setAlert({ isOpen: true, title, message, type });
  };

  const closeAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  useEffect(() => {
    if (!checkIn && !checkOut) {
      setFilteredRooms(initialRooms);
    }
  }, [checkIn, checkOut, initialRooms]);

  if (!initialRooms || initialRooms.length === 0) {
    return (
      <div className="text-center py-32 text-xl font-semibold text-gray-500">
        No rooms currently available.
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="w-[90%] md:w-[85%] xl:w-[75%] mx-auto flex flex-col gap-16 md:gap-24">
        {/* --- Header Section --- */}
        <div className="text-center">
          <p className="text-green-600 font-bold uppercase tracking-widest text-sm mb-3">
            Handpicked Comfort
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
            Our Suites & Rooms
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* --- NEW: Check Availability Bar --- */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col lg:flex-row items-end lg:items-center justify-between gap-6 w-full max-w-5xl mx-auto -mt-4 relative z-10">
          {/* Check In Input */}
          <div className="w-full">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Check In
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors bg-gray-50 hover:bg-white cursor-pointer"
            />
          </div>

          {/* Check Out Input */}
          <div className="w-full">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Check Out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors bg-gray-50 hover:bg-white cursor-pointer"
            />
          </div>

          {/* Search Button */}
          <div className="w-full lg:w-auto">
            <label className="block text-sm font-bold text-transparent mb-2 select-none hidden lg:block">
              Search
            </label>
            <button
              onClick={handleCheckAvailability}
              disabled={isLoading}
              className="w-full lg:w-auto bg-green-600 text-white font-semibold py-3.5 px-8 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Checking..." : "Check Available Rooms"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* --- Room Cards Grid/List --- */}
        <div className="flex flex-col gap-20 md:gap-28 mt-4">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room as unknown as BackendRoom}
                index={index}
              />
            ))
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="text-2xl font-semibold mb-2">No rooms available</p>
              <p className="text-sm">
                Try different dates or clear the filters to see all rooms.
              </p>
            </div>
          )}
        </div>
      </div>
      <CustomAlert
        isOpen={alert.isOpen}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </section>
  );
}
