"use client";

import React, { useState } from "react";
import BookingForm from "./BookingForm";
import BookingSummary from "./BookingSummary";
// Assuming these imports are correct based on your file structure
import { roomsData } from "@/data/rooms";
import { vehicleData } from "@/data/vehical";

// --- State Interfaces for clarity and correctness ---

interface RoomSelectionState {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
}

interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  bookingFor: string;
  workTravel: string;
  room: string;
  vehicleNeeded: string;
  vehicleType: string;
  arrivalTime: string;
  specialRequest: string;
  // Note: The vehicles property needs a type definition if you use it in other components
  vehicles: any[]; 
}

// --- Component ---

export default function BookingPage() {
  // Use the defined interfaces for useState
  const [formData, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    bookingFor: "",
    workTravel: "",
    room: "",
    vehicleNeeded: "no",
    vehicleType: "",
    arrivalTime: "",
    specialRequest: "",
    vehicles: [],
  });

  const [roomSelection, setRoomSelection] = useState<RoomSelectionState>({
    startDate: new Date(),
    endDate: new Date(),
    key: "room",
  });

  const selectedRoom = roomsData.find((r) => r.id === Number(formData.room));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-green-50">
      {/* Left Panel - Summary */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r">
        <BookingSummary
          selectedRoom={selectedRoom}
          roomSelection={roomSelection}
          formData={formData}
        />
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-2/3 p-4 md:p-6">
        <BookingForm
          formData={formData}
          setFormData={setFormData} 
          roomSelection={roomSelection}
          setRoomSelection={setRoomSelection} 
        />
      </div>
    </div>
  );
}