"use client";

import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { getData } from "country-list";

interface Vehicle {
  type: string;
  quantity: number;
  startDate: string;
  endDate: string;
}

// Mock Data
const hotelInfo = {
  name: "The Grand London",
  image:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  contact: "+1 234 567 8900",
  address: "123 Luxury Street, London, UK",
  description: "Experience luxury and comfort at The Grand London",
};

const roomsData = [
  {
    id: 1,
    name: "Deluxe Suite",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    beds: "King Bed",
    capacity: 2,
    price: "150",
    features: [
      { name: "Bed", detail: "King Bed" },
      { name: "Capacity", detail: "2 Adults" },
      { name: "Air Conditioning", detail: "Yes" },
      { name: "Hot Water", detail: "Yes" },
      { name: "Wi-Fi", detail: "Yes" },
      { name: "Special", detail: "City View" },
    ],
  },
  {
    id: 2,
    name: "Executive Room",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    beds: "Queen Bed",
    capacity: 2,
    price: "120",
    features: [
      { name: "Bed", detail: "Queen Bed" },
      { name: "Capacity", detail: "2 Adults" },
      { name: "Air Conditioning", detail: "Yes" },
      { name: "Wi-Fi", detail: "Yes" },
    ],
  },
  {
    id: 3,
    name: "Family Suite",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    beds: "2 Queen Beds",
    capacity: 4,
    price: "200",
    features: [
      { name: "Bed", detail: "2 Queen Beds" },
      { name: "Capacity", detail: "4 Adults" },
      { name: "Air Conditioning", detail: "Yes" },
      { name: "Kitchen", detail: "Yes" },
      { name: "Wi-Fi", detail: "Yes" },
      { name: "Special", detail: "Balcony" },
    ],
  },
];

const vehicleData = [
  { id: 1, type: "Car - 4 seats", price: "20" },
  { id: 2, type: "Tuk Tuk", price: "10" },
  { id: 3, type: "Safari", price: "100" },
  { id: 4, type: "Bike", price: "15" },
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Sri Lanka",
  "India",
];

export default function BookingSystem() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState<{
    title: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    country: string;
    countryCode: string;
    contactNumber: string;
    passportType: string;
    passportNumber: string;
    room: string;
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    vehicleNeeded: boolean;
    vehicles: Vehicle[];
  }>({
    title: "Mr",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    country: "",
    countryCode: "+44",
    contactNumber: "",
    passportType: "Passport",
    passportNumber: "",
    room: "",
    checkInDate: "",
    checkInTime: "",
    checkOutDate: "",
    checkOutTime: "",
    vehicleNeeded: false,
    vehicles: [],
  });

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          setFormData((prev) => ({
            ...prev,
            country: data.country_name || "",
          }));
        }
      })
      .catch((err) => console.log("Could not detect country:", err));
  }, []);

  const selectedRoom = roomsData.find((r) => r.id === Number(formData.room));

  // Check if contact details are complete
  const isContactComplete =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.country &&
    formData.contactNumber;

  // Check if booking details are complete
  const isBookingComplete =
    formData.room && formData.checkInDate && formData.checkOutDate;

  // Auto-rotate images
  useEffect(() => {
    if (selectedRoom && selectedRoom.image) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedRoom]);

  // Calculate room cost
  const calculateRoomCost = () => {
    if (!selectedRoom || !formData.checkInDate || !formData.checkOutDate)
      return 0;

    const start = new Date(formData.checkInDate as string);
    const end = new Date(formData.checkOutDate as string);

    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    return days > 0 ? Number(selectedRoom.price) * days : 0;
  };

  // Calculate vehicle costs
  const calculateVehicleCost = () => {
    if (!formData.vehicleNeeded || formData.vehicles.length === 0) return [];

    return formData.vehicles
      .map((v, idx) => {
        const vehicleInfo = vehicleData.find(
          (item) => item.id === Number(v.type)
        );
        if (!vehicleInfo || !v.startDate || !v.endDate) return null;

        const start = new Date(v.startDate);
        const end = new Date(v.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const cost =
          days > 0 ? Number(vehicleInfo.price) * v.quantity * days : 0;

        return {
          name: vehicleInfo.type,
          days,
          cost,
        };
      })
      .filter(Boolean);
  };

  const roomCost = calculateRoomCost();
  const vehicleCosts = calculateVehicleCost();
  const totalVehicleCost = vehicleCosts.reduce((sum, v) => sum + v.cost, 0);
  const serviceCharge = (roomCost + totalVehicleCost) * 0.05;
  const grandTotal = roomCost + totalVehicleCost + serviceCharge;

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addVehicle = () => {
    setFormData((prev) => ({
      ...prev,
      vehicles: [
        ...prev.vehicles,
        { type: "", quantity: 1, startDate: "", endDate: "" },
      ],
    }));
  };

  const updateVehicle = (index: number, field: keyof Vehicle, value: any) => {
    const updated = [...formData.vehicles];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, vehicles: updated }));
  };

  const removeVehicle = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      vehicles: prev.vehicles.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    console.log("Booking submitted:", formData);
    alert("Booking completed successfully!");
  };

  const countryOptions = getData().map((country) => ({
    value: country.code,
    label: country.name,
  }));

  // Update the useEffect for auto-detecting country
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          setFormData((prev) => ({
            ...prev,
            country: data.country_name || "",
          }));
        }
      })
      .catch((err) => console.log("Could not detect country:", err));
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mt-9 mb-8">
          Booking Details
        </h1>

        {/* Room Description Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
            {/* Room Image */}
            <div className="relative">
              <img
                src={selectedRoom ? selectedRoom.image : hotelInfo.image}
                alt={selectedRoom ? selectedRoom.name : "Hotel"}
                className="w-full h-96 object-cover rounded-xl"
              />
              {selectedRoom && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === currentImageIndex
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Room Details */}
            <div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">
                Room Description
              </h2>
              <h3 className="text-2xl font-semibold text-green-500 mb-6">
                {selectedRoom ? selectedRoom.name : "The Grand London"}
              </h3>

              {selectedRoom ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 border-b pb-2 mb-2">
                    <span className="font-semibold text-gray-700">Feature</span>
                    <span className="font-semibold text-gray-700">Detail</span>
                  </div>
                  <div className="min-h-60">
                    {selectedRoom.features.map((feature, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-4">
                        <span className="text-gray-600">{feature.name}</span>
                        <span className="text-gray-800">{feature.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Select a room to view details</p>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Contact Information Tab */}
          <button
            className={`${
              isContactComplete
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 border-2 border-green-500"
            } rounded-xl py-4 px-6 flex items-center gap-3 transition shadow-md hover:shadow-lg`}
          >
            <div
              className={`w-7 h-7 rounded-full ${
                isContactComplete ? "bg-white" : "border-2 border-green-500"
              } flex items-center justify-center flex-shrink-0`}
            >
              <span
                className={`${
                  isContactComplete ? "text-green-500" : "text-gray-400"
                } font-bold text-sm`}
              >
                {isContactComplete ? "✓" : ""}
              </span>
            </div>
            <span className="text-base font-semibold">Contact Information</span>
          </button>

          {/* Booking Information Tab */}
          <button
            className={`${
              isBookingComplete
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 border-2 border-green-500"
            } rounded-xl py-4 px-6 flex items-center gap-3 transition shadow-md hover:shadow-lg`}
          >
            <div
              className={`w-7 h-7 rounded-full ${
                isBookingComplete ? "bg-white" : "border-2 border-green-500"
              } flex items-center justify-center flex-shrink-0`}
            >
              <span
                className={`${
                  isBookingComplete ? "text-green-500" : "text-gray-400"
                } font-bold text-sm`}
              >
                {isBookingComplete ? "✓" : ""}
              </span>
            </div>
            <span className="text-base font-semibold">Booking Information</span>
          </button>

          {/* Summary Tab */}
          {/*  <button className="bg-green-500 text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 transition shadow-md hover:shadow-lg">
            <span className="text-base font-semibold">Summary</span>
          </button> */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Contact Header */}
              <div className="bg-white py-3 px-6 border-b">
                <h3 className="text-base font-bold text-gray-800">
                  Contact Details
                </h3>
              </div>

              {/* Contact Form */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="relative">
                    <select
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option>Title</option>
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                      <option>Dr</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="date"
                      placeholder="Date Of Birth"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleChange("dateOfBirth", e.target.value)
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {/*  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div> */}
                  </div>
                  <div>
                    <Select
                      options={countryOptions}
                      value={countryOptions.find(
                        (c) => c.label === formData.country
                      )}
                      onChange={(option) =>
                        handleChange("country", option?.label || "")
                      }
                      placeholder="Select Country"
                      className="text-sm"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minHeight: "42px",
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#d1d5db" },
                          boxShadow: "none",
                          "&:focus-within": {
                            borderColor: "transparent",
                            boxShadow: "0 0 0 2px #10b981",
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "#10b981"
                            : state.isFocused
                            ? "#d1fae5"
                            : "white",
                          color: state.isSelected ? "white" : "#374151",
                          fontSize: "0.875rem",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          fontSize: "0.875rem",
                          color: "#9ca3af",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          fontSize: "0.875rem",
                        }),
                      }}
                    />
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="relative">
                    <select
                      value={formData.countryCode}
                      onChange={(e) =>
                        handleChange("countryCode", e.target.value)
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option>Country Code</option>
                      <option>+1</option>
                      <option>+44</option>
                      <option>+91</option>
                      <option>+94</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      handleChange("contactNumber", e.target.value)
                    }
                    className="md:col-span-2 px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div> */}
                <div className="flex">
                  <PhoneInput
                    international
                    defaultCountry="GB"
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value || "");
                      handleChange("contactNumber", value || "");
                    }}
                    className="flex w-full [&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry]:py-2.5 [&_.PhoneInputCountry]:border [&_.PhoneInputCountry]:border-r-0 [&_.PhoneInputCountry]:border-gray-300 [&_.PhoneInputCountry]:rounded-l-md [&_.PhoneInputCountry]:bg-white [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:py-2.5 [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:border [&_.PhoneInputInput]:border-gray-300 [&_.PhoneInputInput]:rounded-r-md [&_.PhoneInputInput:focus]:ring-2 [&_.PhoneInputInput:focus]:ring-green-500 [&_.PhoneInputInput:focus]:border-transparent [&_.PhoneInputInput]:outline-none"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="relative">
                    <select
                      value={formData.passportType}
                      onChange={(e) =>
                        handleChange("passportType", e.target.value)
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option>Passport</option>
                      <option>NIC</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="NIC Or Passport Number"
                    value={formData.passportNumber}
                    onChange={(e) =>
                      handleChange("passportNumber", e.target.value)
                    }
                    className="md:col-span-2 px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Booking Information Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Booking Header */}
              <div className="bg-white py-3 px-6 border-b">
                <h3 className="text-base font-bold text-gray-800">
                  Booking Details
                </h3>
              </div>

              {/* Booking Form */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50">
                    <span className="text-gray-600">Room</span>
                  </div>
                  <div className="relative">
                    <select
                      value={formData.room}
                      onChange={(e) => handleChange("room", e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">The Grand London</option>
                      {roomsData.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      From
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.checkInDate}
                        onChange={(e) =>
                          handleChange("checkInDate", e.target.value)
                        }
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Select Date"
                      />
                      {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div> */}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      To
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.checkOutDate}
                        onChange={(e) =>
                          handleChange("checkOutDate", e.target.value)
                        }
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Select Date"
                      />
                      {/*  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Check-In
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={formData.checkInTime}
                        onChange={(e) =>
                          handleChange("checkInTime", e.target.value)
                        }
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Select Time"
                      />
                      {/*  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div> */}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Check-Out
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={formData.checkOutTime}
                        onChange={(e) =>
                          handleChange("checkOutTime", e.target.value)
                        }
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Select Time"
                      />
                      {/*  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Vehicle Section */}
                <div className="border-t pt-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-base font-bold text-gray-800">
                      Vehicle
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.vehicleNeeded}
                        onChange={(e) =>
                          handleChange("vehicleNeeded", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      <span className="ml-2 text-sm font-medium text-gray-700 bg-green-100 px-2 py-0.5 rounded">
                        {formData.vehicleNeeded ? "Yes" : "No"}
                      </span>
                    </label>
                  </div>

                  {formData.vehicleNeeded && (
                    <div className="space-y-4">
                      {formData.vehicles.map((vehicle, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            <div className="relative">
                              <select
                                value={vehicle.type}
                                onChange={(e) =>
                                  updateVehicle(index, "type", e.target.value)
                                }
                                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                              >
                                <option value="">Select Vehicle</option>
                                {vehicleData.map((v) => (
                                  <option key={v.id} value={v.id}>
                                    {v.type}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg
                                  className="w-4 h-4 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>

                            <input
                              type="text"
                              placeholder="Car"
                              value={
                                vehicleData
                                  .find((v) => v.id === Number(vehicle.type))
                                  ?.type.split(" - ")[0] || ""
                              }
                              readOnly
                              className="px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-white"
                            />

                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="1"
                                value={vehicle.quantity}
                                onChange={(e) =>
                                  updateVehicle(
                                    index,
                                    "quantity",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-20 px-3 py-2.5 text-sm border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                              <button
                                onClick={() => removeVehicle(index)}
                                className="text-gray-400 hover:text-red-500 text-xl font-bold ml-auto"
                              >
                                ×
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                From
                              </label>
                              <div className="relative">
                                <input
                                  type="date"
                                  value={vehicle.startDate}
                                  onChange={(e) =>
                                    updateVehicle(
                                      index,
                                      "startDate",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                  placeholder="Select Date"
                                />
                                {/*   <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                  <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div> */}
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                To
                              </label>
                              <div className="relative">
                                <input
                                  type="date"
                                  value={vehicle.endDate}
                                  onChange={(e) =>
                                    updateVehicle(
                                      index,
                                      "endDate",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                  placeholder="Select Date"
                                />
                                {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                  <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={addVehicle}
                        className="text-gray-600 font-medium hover:text-green-600 text-sm"
                      >
                        + Add another Vehicle
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-4">
              {/* Summary Header */}
              <div className="bg-green-500 text-white text-center py-4">
                <h2 className="text-xl font-semibold">Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Room Name */}
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <p className="text-gray-700 font-medium text-sm">
                    {selectedRoom
                      ? `Scenic Cottage - ${selectedRoom.name} Room`
                      : "Scenic Cottage - The Grand London Room"}
                  </p>
                </div>

                {/* Guest Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {formData.title}. {formData.firstName} {formData.lastName}
                    </span>
                    <span className="text-gray-800 font-medium">
                      {formData.country}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact :</span>
                    <span className="text-gray-800">
                      {formData.countryCode} {formData.contactNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Address :</span>
                    <span className="text-gray-800 text-xs break-all">
                      {formData.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passport Number :</span>
                    <span className="text-gray-800">
                      {formData.passportNumber}
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-green-500 my-4"></div>

                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">Room Charge</span>
                      {roomCost > 0 && (
                        <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {Math.ceil(
                            (new Date(formData.checkOutDate) -
                              new Date(formData.checkInDate)) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days
                        </span>
                      )}
                    </div>
                    <span className="text-gray-800 font-medium">
                      USD {roomCost}
                    </span>
                  </div>

                  {formData.vehicleNeeded && vehicleCosts.length > 0 && (
                    <>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">Vehicle Charge</span>
                          {vehicleCosts[0] && (
                            <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
                              {vehicleCosts[0].days} Days
                            </span>
                          )}
                        </div>
                      </div>
                      {vehicleCosts.map((v, idx) => (
                        <div key={idx} className="pl-4 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{v.name}</span>
                            <span className="text-gray-800">USD {v.cost}</span>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-700"></span>
                        <span className="text-gray-800 font-medium">
                          USD {totalVehicleCost}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">Service Charge</span>
                      <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
                        5%
                      </span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      USD {serviceCharge.toFixed(0)}
                    </span>
                  </div>

                  <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">
                      TOTAL
                    </span>
                    <span className="text-xl font-bold text-gray-800">
                      USD {grandTotal.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Complete Booking Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 text-white py-4 font-bold text-lg hover:bg-green-600 transition"
              >
                COMPLETE BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
