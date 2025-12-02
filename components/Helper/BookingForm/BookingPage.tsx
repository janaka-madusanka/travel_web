"use client";

import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { getData } from "country-list";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSearchParams } from 'next/navigation';


interface Vehicle {
  type: string;
  quantity: number;
  startDate: string;
  endDate: string;
}
interface BookedSlot {
  checkIn: string;
  checkOut: string;
}

interface BookingPayload {
  customer: {
    title: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    country: string;
    contactNumber: string;
    passportType: string;
    nicNumber?: string;
    passportNumber?: string;
  };
  roomId: number;
  checkIn: string;
  checkOut: string;
  otherDetails?: {
    vehicleSupport: "YES" | "NO";
    meal: "YES" | "NO";
    guide: "YES" | "NO";
    vehicleType?: string;
    vehicleNumber?: string;
    driver?: "YES" | "NO";
  };
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
  { id: "BIKE", type: "Bike" },
  { id: "CAR", type: "Car - 4 seats" },
  { id: "VAN", type: "Safari" },
  { id: "SUV", type: "Tuk Tuk" },
];

export default function BookingSystem() {
   const searchParams = useSearchParams();
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
    address: string; //
    passportType: string;
    passportNumber: string;
    room: string;
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    vehicleNeeded: boolean;
    vehicles: Vehicle[];
    meal: boolean;
    guide: boolean;
    driver: boolean;
  }>({
    title: "Mr",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    country: "",
    countryCode: "+44",
    contactNumber: "",
    address: "",
    passportType: "Passport",
    passportNumber: "",
    room: "1",
    checkInDate: "",
    checkInTime: "",
    checkOutDate: "",
    checkOutTime: "",
    vehicleNeeded: false,
    vehicles: [],
    meal: false,
    guide: false,
    driver: false,
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [detectedCountry, setDetectedCountry] = useState<string>("GB");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [rooms, setRooms] = useState(roomsData); // Initialize with hardcoded data as fallback
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);

    useEffect(() => {
    const roomIdFromUrl = searchParams.get('roomId');
    if (roomIdFromUrl) {
      setFormData(prev => ({
        ...prev,
        room: roomIdFromUrl
      }));
    }
  }, [searchParams]);


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoadingRooms(true);
        const response = await fetch("/api/rooms");
        const data = await response.json();

        if (data.rooms && data.rooms.length > 0) {
          const transformedRooms = data.rooms.map((room: any) => ({
            id: room.id,
            name: room.name,
            image:
              room.img1 ||
              "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
            beds: room.bedrooms[0]?.bedType || "King Bed",
            capacity: room.capacity,
            price: room.cost.toString(),
            features: [
              { name: "Bed", detail: room.bedrooms[0]?.bedType || "King Bed" },
              { name: "Capacity", detail: `${room.capacity} Adults` },
              { name: "Size", detail: room.size || "N/A" },
              { name: "Air Conditioning", detail: room.ac || "No" },
              {
                name: "Hot Water",
                detail: room.bathrooms[0]?.hotWater || "No",
              },
              { name: "Wi-Fi", detail: room.wifi || "No" },
              {
                name: "Special",
                detail:
                  room.gardenView === "YES"
                    ? "Garden View"
                    : room.balcony === "YES"
                    ? "Balcony"
                    : "N/A",
              },
            ].filter((f) => f.detail !== "N/A"), // Remove N/A features
          }));

          setRooms(transformedRooms);
          // Set first room as default if no room is selected
          if (!formData.room) {
            setFormData((prev) => ({
              ...prev,
              room: transformedRooms[0]?.id.toString() || "1",
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        // Keep using hardcoded data on error
      } finally {
        setIsLoadingRooms(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          setFormData((prev) => ({
            ...prev,
            country: data.country_name || "",
          }));
          // Set the detected country code for PhoneInput
          setDetectedCountry(data.country_code || "GB");
        }
      })
      .catch((err) => console.log("Could not detect country:", err));
  }, []);

  useEffect(() => {
    const fetchBookedDates = async () => {
      if (!formData.room) return;

      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `/api/bookings/available?roomId=${formData.room}&from=${today}`
        );
        const data = await response.json();

        if (data.bookedSlots) {
          setBookedSlots(data.bookedSlots);

          if (formData.checkInDate && formData.checkOutDate) {
            const isCheckInBooked = data.bookedSlots.some(
              (slot: BookedSlot) => {
                return (
                  formData.checkInDate >= slot.checkIn &&
                  formData.checkInDate <= slot.checkOut
                );
              }
            );

            const isCheckOutBooked = data.bookedSlots.some(
              (slot: BookedSlot) => {
                return (
                  formData.checkOutDate >= slot.checkIn &&
                  formData.checkOutDate <= slot.checkOut
                );
              }
            );

            if (isCheckInBooked || isCheckOutBooked) {
              setFormData((prev) => ({
                ...prev,
                checkInDate: "",
                checkOutDate: "",
              }));
              alert(
                "Your selected dates are not available for this room. Please select new dates."
              );
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch booked dates:", error);
      }
    };

    fetchBookedDates();
  }, [formData.room]);

  // Check if a date falls within any booked range
  const isDateBooked = (date: Date) => {
    // Format date to YYYY-MM-DD in local timezone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const checkDate = `${year}-${month}-${day}`;

    return bookedSlots.some((slot) => {
      // Date is booked if it falls within the range (inclusive)
      return checkDate >= slot.checkIn && checkDate <= slot.checkOut;
    });
  };

  // Check if selected date range crosses any booked slots
  const isDateRangeCrossingBooking = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return false;

    return bookedSlots.some((slot) => {
      // Check if the selected range overlaps with any booked slot
      return checkIn <= slot.checkOut && checkOut >= slot.checkIn;
    });
  };

  const selectedRoom = rooms.find((r) => r.id === Number(formData.room));

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

  const roomCost = calculateRoomCost();

  const serviceCharge = roomCost * 0.05;
  const grandTotal = roomCost + serviceCharge;

  const handleChange = (field: keyof typeof formData, value: any) => {
    if (field === "vehicleNeeded" && value === true) {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        vehicles: [{ type: "2", quantity: 1, startDate: "", endDate: "" }], // Changed from "1" to "2" (CAR)
      }));
    } else if (field === "vehicleNeeded" && value === false) {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        vehicles: [],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };
  const addVehicle = () => {
    setFormData((prev) => ({
      ...prev,
      vehicles: [
        ...prev.vehicles,
        { type: "2", quantity: 1, startDate: "", endDate: "" }, // Changed from "1" to "2" (CAR)
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
  const handleSubmit = async () => {
    // Validation
    if (!isContactComplete || !isBookingComplete) {
      alert("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare customer data matching backend Customer model
      const customerData = {
        name: `${formData.title} ${formData.firstName} ${formData.lastName}`.trim(),
        passportNumber:
          formData.passportType === "Passport" ? formData.passportNumber : "",
        nicNumber:
          formData.passportType === "NIC" ? formData.passportNumber : "",
        address: formData.address || "N/A",
        contactNumber: formData.contactNumber,
      };

      // Prepare the payload matching backend structure
      const payload: any = {
        customer: customerData,
        roomId: Number(formData.room),
        checkIn: `${formData.checkInDate}T${
          formData.checkInTime || "14:00"
        }:00.000Z`,
        checkOut: `${formData.checkOutDate}T${
          formData.checkOutTime || "11:00"
        }:00.000Z`,
      };

      // Add vehicle details if needed
      if (formData.vehicleNeeded && formData.vehicles.length > 0) {
        const firstVehicle = formData.vehicles[0];

        // Map numeric ID to string ID for backend
        let vehicleTypeId = "CAR";
        if (firstVehicle.type === "1") vehicleTypeId = "BIKE";
        else if (firstVehicle.type === "2") vehicleTypeId = "CAR";
        else if (firstVehicle.type === "3") vehicleTypeId = "VAN";
        else if (firstVehicle.type === "4") vehicleTypeId = "SUV";

        payload.otherDetails = {
          vehicleSupport: "YES",
          meal: formData.meal ? "YES" : "NO",
          guide: formData.guide ? "YES" : "NO",
          vehicleType: vehicleTypeId,
          vehicleNumber: parseInt(firstVehicle.quantity) || 1,
          driver: formData.driver ? "YES" : "NO",
        };
      }

      console.log("Sending payload:", payload);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(`Error: ${result.error}`);
        setIsSubmitting(false);
        return;
      }

      alert("Booking completed successfully!");
      console.log("Booking created:", result.booking);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const countryOptions = getData().map((country) => ({
    value: country.code,
    label: country.name,
  }));

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 py-4 px-2 md:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center mt-8 mb-4">
          Booking Details
        </h1>

        {/* Room Description Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[300px]">
            {/* Room Image */}
            <div className="relative">
              <img
                src={selectedRoom ? selectedRoom.image : hotelInfo.image}
                alt={selectedRoom ? selectedRoom.name : "Hotel"}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
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
              <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-1">
                Room Description
              </h2>
              <h3 className="text-lg md:text-xl text-green-500 mb-3">
                {selectedRoom ? selectedRoom.name : "The Grand London"}
              </h3>

              {selectedRoom ? (
                <div className="space-y-2 pl-3 pr-4">
                  <div className="grid grid-cols-2 gap-6 border-b pb-1 mb-1">
                    <span className="font-semibold text-gray-700 text-sm">
                      Feature
                    </span>
                    <span className="font-semibold text-gray-700 text-sm">
                      Detail
                    </span>
                  </div>
                  <div className="min-h-40">
                    {selectedRoom.features.map((feature, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-6 text-sm">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          {/* Contact Information Tab */}
          <button
            className={`${
              isContactComplete
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 border-2 border-green-500"
            } rounded-lg py-3 px-4 flex items-center gap-2 transition shadow-md hover:shadow-lg`}
          >
            <div
              className={`w-6 h-6 rounded-full ${
                isContactComplete ? "bg-white" : "border-2 border-green-500"
              } flex items-center justify-center shrink-0`}
            >
              <span
                className={`${
                  isContactComplete ? "text-green-500" : "text-gray-400"
                } font-bold text-xs`}
              >
                {isContactComplete ? <CheckIcon fontSize="small" /> : null}
              </span>
            </div>
            <span className="text-sm font-semibold">Contact Information</span>
          </button>

          {/* Booking Information Tab */}
          <button
            className={`${
              isBookingComplete
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 border-2 border-green-500"
            } rounded-lg py-3 px-4 flex items-center gap-2 transition shadow-md hover:shadow-lg`}
          >
            <div
              className={`w-6 h-6 rounded-full ${
                isBookingComplete ? "bg-white" : "border-2 border-green-500"
              } flex items-center justify-center shrink-0`}
            >
              <span
                className={`${
                  isBookingComplete ? "text-green-500" : "text-gray-400"
                } font-bold text-xs`}
              >
                {isBookingComplete ? <CheckIcon fontSize="small" /> : null}
              </span>
            </div>
            <span className="text-sm font-semibold">Booking Information</span>
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Contact Header */}
              <div className="bg-white py-2 px-4 border-b">
                <h3 className="text-sm font-bold text-gray-800">
                  Contact Details
                </h3>
              </div>

              {/* Contact Form */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="relative">
                    <select
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
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
                    className="px-2.5 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                    defaultCountry={detectedCountry}
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value || "");
                      handleChange("contactNumber", value || "");
                    }}
                    className="flex w-full [&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry]:py-2.5 [&_.PhoneInputCountry]:border [&_.PhoneInputCountry]:border-gray-300 [&_.PhoneInputCountry]:rounded-l-md [&_.PhoneInputCountry]:bg-white [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:py-2.5 [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:border [&_.PhoneInputInput]:border-gray-300 [&_.PhoneInputInput]:rounded-r-md [&_.PhoneInputInput:focus]:ring-2 [&_.PhoneInputInput:focus]:ring-green-500 [&_.PhoneInputInput:focus]:border-transparent [&_.PhoneInputInput]:outline-none"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="relative">
                    <select
                      value={formData.passportType}
                      onChange={(e) =>
                        handleChange("passportType", e.target.value)
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
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
                    className="md:col-span-2 px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Booking Information Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Booking Header */}
              <div className="bg-white py-2 px-4 border-b">
                <h3 className="text-sm font-bold text-gray-800">
                  Booking Details
                </h3>
              </div>

              {/* Booking Form */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50">
                    <span className="text-gray-600">Room</span>
                  </div>
                  <div className="relative">
                    <select
                      value={formData.room}
                      onChange={(e) => handleChange("room", e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                      {rooms.map((room) => (
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
                    <div className="w-full relative">
                      <DatePicker
                        selected={
                          formData.checkInDate
                            ? new Date(formData.checkInDate + "T00:00:00")
                            : null
                        }
                        onChange={(date) => {
                          if (date) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const day = String(date.getDate()).padStart(2, "0");
                            const selectedDate = `${year}-${month}-${day}`;

                            // Check if the range crosses any booking
                            if (
                              formData.checkOutDate &&
                              isDateRangeCrossingBooking(
                                selectedDate,
                                formData.checkOutDate
                              )
                            ) {
                              alert(
                                "Your selected date range includes booked dates. Please choose different dates."
                              );
                              handleChange("checkInDate", selectedDate);
                              handleChange("checkOutDate", ""); // Clear checkout date
                              return;
                            }

                            handleChange("checkInDate", selectedDate);
                          } else {
                            handleChange("checkInDate", "");
                          }
                        }}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Check-In Date"
                        minDate={new Date()}
                        filterDate={(date) => !isDateBooked(date)}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        wrapperClassName="w-full"
                        popperProps={{
                          strategy: "fixed",
                        }}
                        popperPlacement="bottom-start"
                      />
                      <CalendarTodayIcon
                        sx={{ fontSize: 16 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      To
                    </label>
                    <div className="w-full relative">
                      <DatePicker
                        selected={
                          formData.checkOutDate
                            ? new Date(formData.checkOutDate + "T00:00:00")
                            : null
                        }
                        onChange={(date) => {
                          if (date) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const day = String(date.getDate()).padStart(2, "0");
                            const selectedDate = `${year}-${month}-${day}`;

                            // Check if the range crosses any booking
                            if (
                              formData.checkInDate &&
                              isDateRangeCrossingBooking(
                                formData.checkInDate,
                                selectedDate
                              )
                            ) {
                              alert(
                                "Your selected date range includes booked dates. Please choose a different checkout date."
                              );
                              return;
                            }

                            handleChange("checkOutDate", selectedDate);
                          } else {
                            handleChange("checkOutDate", "");
                          }
                        }}
                        minDate={
                          formData.checkInDate
                            ? new Date(formData.checkInDate + "T00:00:00")
                            : new Date()
                        }
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Check-Out Date"
                        filterDate={(date) => !isDateBooked(date)}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        wrapperClassName="w-full"
                        popperProps={{
                          strategy: "fixed",
                        }}
                        popperPlacement="bottom-start"
                      />
                      <CalendarTodayIcon
                        sx={{ fontSize: 16 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Check-In
                    </label>
                    <div className="w-full relative">
                      <DatePicker
                        selected={
                          formData.checkInTime
                            ? new Date(`2000-01-01T${formData.checkInTime}`)
                            : null
                        }
                        onChange={(date) =>
                          handleChange(
                            "checkInTime",
                            date ? date.toTimeString().slice(0, 5) : ""
                          )
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select Time"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        wrapperClassName="w-full"
                        popperProps={{
                          strategy: "fixed",
                        }}
                        popperPlacement="bottom-start"
                      />
                      <AccessTimeIcon
                        sx={{ fontSize: 16 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Check-Out
                    </label>
                    <div className="w-full relative">
                      <DatePicker
                        selected={
                          formData.checkOutTime
                            ? new Date(`2000-01-01T${formData.checkOutTime}`)
                            : null
                        }
                        onChange={(date) =>
                          handleChange(
                            "checkOutTime",
                            date ? date.toTimeString().slice(0, 5) : ""
                          )
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select Time"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        wrapperClassName="w-full"
                        popperProps={{
                          strategy: "fixed",
                        }}
                        popperPlacement="bottom-start"
                      />
                      <AccessTimeIcon
                        sx={{ fontSize: 16 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Section */}
                <div className="border-t pt-5">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-sm font-bold text-gray-800">Vehicle</h3>
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
                            <div className="flex items-center px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50">
                              <span className="text-gray-600">
                                Select Vehicle
                              </span>
                            </div>

                            <div className="relative">
                              <select
                                value={vehicle.type}
                                onChange={(e) =>
                                  updateVehicle(index, "type", e.target.value)
                                }
                                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
                              >
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

                            {/* <input
                              type="text"
                              placeholder="Car"
                              value={
                                vehicleData
                                  .find((v) => v.id === Number(vehicle.type))
                                  ?.type.split(" - ")[0] || ""
                              }
                              readOnly
                              className="px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-white"
                            /> */}

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
                                className="w-20 px-3 py-2.5 text-sm border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                              />
                              <button
                                onClick={() => removeVehicle(index)}
                                className="text-gray-400 hover:text-red-500 text-xl font-bold ml-auto"
                              >
                                <CloseIcon fontSize="small" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                From
                              </label>
                              <div className="w-full relative">
                                <DatePicker
                                  selected={
                                    vehicle.startDate
                                      ? new Date(vehicle.startDate)
                                      : null
                                  }
                                  onChange={(date) =>
                                    updateVehicle(
                                      index,
                                      "startDate",
                                      date
                                        ? date.toISOString().split("T")[0]
                                        : ""
                                    )
                                  }
                                  dateFormat="yyyy-MM-dd"
                                  placeholderText="Select Start Date"
                                  minDate={new Date()}
                                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                  wrapperClassName="w-full"
                                  popperProps={{
                                    strategy: "fixed",
                                  }}
                                  popperPlacement="bottom-start"
                                />
                                <CalendarTodayIcon
                                  sx={{ fontSize: 16 }}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                To
                              </label>
                              <div className="w-full relative">
                                <DatePicker
                                  selected={
                                    vehicle.endDate
                                      ? new Date(vehicle.endDate)
                                      : null
                                  }
                                  onChange={(date) =>
                                    updateVehicle(
                                      index,
                                      "endDate",
                                      date
                                        ? date.toISOString().split("T")[0]
                                        : ""
                                    )
                                  }
                                  dateFormat="yyyy-MM-dd"
                                  placeholderText="Select End Date"
                                  minDate={
                                    vehicle.startDate
                                      ? new Date(vehicle.startDate)
                                      : new Date()
                                  }
                                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                  wrapperClassName="w-full"
                                  popperProps={{
                                    strategy: "fixed",
                                  }}
                                  popperPlacement="bottom-start"
                                />
                                <CalendarTodayIcon
                                  sx={{ fontSize: 16 }}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                                />
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
          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4">
              {/* Summary Header */}
              <div className="bg-green-500 text-white text-center py-3">
                <h2 className="text-lg font-semibold">Summary</h2>
              </div>

              <div className="p-4 space-y-3">
                {/* Room Name */}
                <div className="bg-gray-100 rounded-lg p-2.5 text-center">
                  <p className="text-gray-700 font-medium text-sm truncate">
                    {selectedRoom
                      ? `Scenic Cottage - ${selectedRoom.name} Room`
                      : "Scenic Cottage - The Grand London Room"}
                  </p>
                </div>

                {/* Guest Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-600 flex-shrink-0">Name</span>
                    <span className="text-gray-900 truncate text-right">
                      {formData.title}. {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-600 flex-shrink-0">
                      Contact:
                    </span>
                    <span className="text-gray-900 truncate text-right">
                      {formData.contactNumber}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-600 flex-shrink-0">Email:</span>
                    <span className="text-gray-900 truncate text-right">
                      {formData.email}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-600 flex-shrink-0">
                      {formData.passportType}
                    </span>
                    <span className="text-gray-900 truncate text-right">
                      {formData.passportNumber}
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-green-500 my-3"></div>

                {/* Pricing */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <span className="text-gray-700 text-sm truncate">
                        Room Charge
                      </span>
                      {roomCost > 0 && (
                        <span className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                          {Math.ceil(
                            (new Date(formData.checkOutDate) -
                              new Date(formData.checkInDate)) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days
                        </span>
                      )}
                    </div>
                    <span className="text-gray-800 font-medium text-sm flex-shrink-0">
                      USD {roomCost}
                    </span>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <span className="text-gray-700 text-sm truncate">
                        Service Charge
                      </span>
                      <span className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                        5%
                      </span>
                    </div>
                    <span className="text-gray-800 font-medium text-sm flex-shrink-0">
                      USD {serviceCharge.toFixed(0)}
                    </span>
                  </div>

                  <div className="border-t-2 border-gray-300 pt-2.5 flex justify-between items-center gap-2">
                    <span className="text-lg font-bold text-gray-800">
                      TOTAL
                    </span>
                    <span className="text-lg font-bold text-gray-800 flex-shrink-0">
                      USD {grandTotal.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Complete Booking Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 text-white py-3.5 font-bold text-base hover:bg-green-600 transition"
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
