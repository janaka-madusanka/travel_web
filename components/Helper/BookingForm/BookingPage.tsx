"use client";

import React, { useState } from "react";
import Image from "next/image";
import {roomsData} from "@/data/rooms"; // default export
import {vehicleData} from "@/data/vehical"; // default export

export default function BookingDetailsUI({ roomId = 1, vehicleId = null }) {
  const [activeTab, setActiveTab] = useState("contact");

  const room = roomsData.find((r) => r.id === roomId) || {};
  const vehicle = vehicleData.find((v) => v.id === vehicleId);

  const roomPrice = parseFloat(room.price || 0);
  const vehiclePrice = vehicle ? parseFloat(vehicle.price) : 0;
  const serviceCharge = 10;
  const total = roomPrice + vehiclePrice + serviceCharge;

  return (
    <div className="w-full px-6 py-10 flex flex-col items-center gap-10 bg-gray-50">

      <h1 className="text-3xl font-semibold text-center">Booking Details</h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">

        {/* Room Image */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden relative w-full h-80">
          {room.image?.[0] ? (
            <Image
              src={room.image[0]}
              alt={room.name || "Room"}
              fill
              className="object-cover rounded-2xl"
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded-2xl">
              No Image
            </div>
          )}
        </div>

        {/* Room Details */}
        <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-green-700">Room Description</h2>
          <p className="text-gray-600 text-lg font-medium">{room.name}</p>

          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <p className="font-semibold text-gray-700">Bed</p>
            <p>{room.beds}</p>

            <p className="font-semibold text-gray-700">Capacity</p>
            <p>{room.capacity} Guests</p>

            {room.features?.map((f, i) => (
              <React.Fragment key={i}>
                <p className="font-semibold text-gray-700">{f}</p>
                <p>Included</p>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex gap-6 max-w-4xl w-full justify-center">
        {["contact", "booking", "summary"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full ${
              activeTab === tab
                ? "bg-green-600 text-white shadow"
                : "border border-green-600 text-green-600"
            }`}
          >
            {tab === "contact"
              ? "Contact Information"
              : tab === "booking"
              ? "Booking Information"
              : "Summary"}
          </button>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Contact / Booking Form */}
        {activeTab === "contact" && (
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
            <h3 className="font-semibold text-lg">Contact Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <input className="border p-2 rounded" placeholder="Title" />
              <input className="border p-2 rounded" placeholder="First Name" />
              <input className="border p-2 rounded" placeholder="Last Name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input className="border p-2 rounded" placeholder="Date of Birth" />
              <input className="border p-2 rounded" placeholder="Select Country" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input className="border p-2 rounded" placeholder="Country Code" />
              <input className="border p-2 rounded" placeholder="Contact Number" />
            </div>
            <input className="border p-2 rounded" placeholder="Email Address" />
            <input className="border p-2 rounded" placeholder="NIC / Passport Number" />

            <h3 className="font-semibold text-lg">Booking Details</h3>
            <input className="border p-2 rounded" value={room.name} readOnly />
            <div className="grid grid-cols-2 gap-4">
              <input className="border p-2 rounded" placeholder="From (Date)" />
              <input className="border p-2 rounded" placeholder="To (Date)" />
            </div>
          </div>
        )}

        {/* Summary */}
        {activeTab === "summary" && (
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
            <h3 className="font-semibold text-lg">Summary</h3>
            <div className="flex justify-between text-sm">
              <p>Room Charge</p> <p>USD {roomPrice}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Vehicle Charge</p> <p>USD {vehiclePrice}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Service Charge</p> <p>USD {serviceCharge}</p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <p>Total</p> <p>USD {total}</p>
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700">
              Complete Booking
            </button>
          </div>
        )}

        {/* Booking Information */}
        {activeTab === "booking" && (
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
            <h3 className="font-semibold text-lg">Booking Information</h3>
            <p>Room: {room.name}</p>
            <p>Bed: {room.beds}</p>
            <p>Capacity: {room.capacity} Guests</p>
            <p>Vehicle: {vehicle?.name || "No Vehicle Selected"}</p>
            <p>Total: USD {total}</p>
          </div>
        )}
      </div>
    </div>
  );
}
