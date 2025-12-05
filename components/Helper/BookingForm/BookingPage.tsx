"use client";

import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { getData } from "country-list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  User,
  CheckCircle,
  Car,
  BedDouble,
  CreditCard,
  Clock,
  Utensils,
  Map,
  UserCheck,
  MapPin,
  Phone,
  Info,
} from "lucide-react";

// --- Types ---
interface BookedSlot {
  checkIn: string;
  checkOut: string;
}

// --- Constants ---
const vehicleOptions = [
  { value: "BIKE", label: "Bike ($15)" },
  { value: "CAR", label: "Car ($45)" },
  { value: "VAN", label: "Van ($65)" },
  { value: "SUV", label: "SUV ($20)" },
];

const vehiclePrices: Record<string, number> = {
  BIKE: 15,
  CAR: 45,
  VAN: 65,
  SUV: 20,
};

const hotelInfo = {
  name: "Scenic Cottage",
  image: "/images/BookingPage/IMG_9964.JPG",
  contact: "+94 74 055 8858",
  address: "Sigiriya Road, Inamaluwa, 21124 Sigiriya, Sri Lanka",
  description: "Experience tranquility and natural beauty at Scenic Cottage.",
  promoText:
    "Escape to a sanctuary where nature hugs luxury. Nestled in the heart of Sigiriya, Scenic Cottage offers you a peaceful retreat away from the chaos.",
};

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"contact" | "booking">("contact");
  const [isExiting, setIsExiting] = useState(false);

  // --- Form State ---
  const [formData, setFormData] = useState({
    // Customer
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    contactNumber: "",
    /*     address: "",
     */ passportType: "Passport",
    passportNumber: "",

    // Booking
    room: "",
    checkInDate: "",
    checkInTime: "14:00",
    checkOutDate: "",
    checkOutTime: "11:00",

    // Other Details
    vehicleNeeded: false,
    /* vehicleType: "CAR", // Default
    driver: false, */
    meal: false,
    guide: false,
  });

  const [rooms, setRooms] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [detectedCountry, setDetectedCountry] = useState<string>("GB");

  // --- Initialization ---
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoadingRooms(true);
        const res = await fetch("/api/rooms");
        const data = await res.json();
        if (data.rooms) {
          setRooms(data.rooms);
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const checkInFromUrl = searchParams.get("checkIn");
    const checkOutFromUrl = searchParams.get("checkOut");
    const roomIdFromUrl = searchParams.get("roomId");

    setFormData((prev) => ({
      ...prev,
      checkInDate: checkInFromUrl || prev.checkInDate,
      checkOutDate: checkOutFromUrl || prev.checkOutDate,
      room: roomIdFromUrl || prev.room,
    }));
  }, [searchParams]);

  // Fetch Availability
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
              (slot: BookedSlot) =>
                formData.checkInDate >= slot.checkIn &&
                formData.checkInDate <= slot.checkOut
            );
            const isCheckOutBooked = data.bookedSlots.some(
              (slot: BookedSlot) =>
                formData.checkOutDate >= slot.checkIn &&
                formData.checkOutDate <= slot.checkOut
            );

            if (isCheckInBooked || isCheckOutBooked) {
              setFormData((prev) => ({
                ...prev,
                checkInDate: "",
                checkOutDate: "",
              }));
              alert("Selected dates are not available.");
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch booked dates:", error);
      }
    };
    fetchBookedDates();
  }, [formData.room, formData.checkInDate, formData.checkOutDate]);

  const isDateBooked = (date: Date) => {
    if (!formData.room) return false;

    // Get local date string properly (avoid timezone issues)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const checkDate = `${year}-${month}-${day}`;

    return bookedSlots.some(
      (slot) => checkDate >= slot.checkIn && checkDate <= slot.checkOut
    );
  };

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          setFormData((prev) => ({
            ...prev,
            country: data.country_name || "",
          }));
          setDetectedCountry(data.country_code || "GB");
        }
      })
      .catch((err) => console.error("Could not detect country:", err));
  }, []);

  // --- Calculations ---
  const selectedRoom =
    rooms.find((r) => r.id.toString() === formData.room.toString()) || null;

  const calculateDays = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const start = new Date(formData.checkInDate);
    const end = new Date(formData.checkOutDate);
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const days = calculateDays();
  const roomCost = selectedRoom ? days * Number(selectedRoom.cost) : 0;

  // Vehicle Cost
  const vehicleCost = formData.vehicleNeeded
    ? (vehiclePrices[formData.vehicleType] || 0) * (days || 1)
    : 0;

  const serviceCharge = (roomCost + vehicleCost) * 0.05;
  const grandTotal = roomCost + vehicleCost + serviceCharge;

  const isContactComplete =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.country &&
    formData.contactNumber;
  const isBookingComplete =
    formData.room && formData.checkInDate && formData.checkOutDate;

  // --- Handlers ---
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }, 600);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!isContactComplete || !isBookingComplete) {
      alert("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Prepare Customer Data
      const customerData = {
        name: `${formData.title} ${formData.firstName} ${formData.lastName}`.trim(),
        passportNumber:
          formData.passportType === "Passport" ? formData.passportNumber : "",
        nicNumber:
          formData.passportType === "NIC" ? formData.passportNumber : "",
        address: formData.country || "N/A",
        contactNumber: formData.contactNumber,
        // Note: Your backend schema (Customer model) doesn't have email/country,
        // so we don't send them or they get ignored. If you update Prisma, add them here.
      };

      // 2. Prepare Booking Payload
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

      // 3. Add Other Details (Matches your Prisma Schema)
      // Only add 'otherDetails' if at least one option is selected
      if (formData.vehicleNeeded || formData.meal || formData.guide) {
        payload.otherDetails = {
          vehicleSupport: formData.vehicleNeeded ? "YES" : "NO",
          meal: formData.meal ? "YES" : "NO",
          guide: formData.guide ? "YES" : "NO",

          /*  // Only include vehicle specifics if vehicleSupport is YES
          ...(formData.vehicleNeeded && {
            vehicleType: formData.vehicleType, // BIKE, CAR, VAN, SUV
            vehicleNumber: 1, // Hardcoded as per your request (no quantity input)
            driver: formData.driver ? "YES" : "NO",
          }), */
        };
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Booking failed");
      }

      alert("Booking completed successfully!");
      router.push("/");
    } catch (error: any) {
      console.error("Booking error:", error);
      alert(error.message || "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  const countryOptions = getData().map((country) => ({
    value: country.code,
    label: country.name,
  }));

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{
              scale: 0.5,
              opacity: 0,
              rotate: -15,
              transition: { duration: 0.5, ease: "anticipate" },
            }}
            className="bg-white w-full max-w-[1400px] h-[90vh] rounded-[2rem] shadow-2xl relative flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-[100] p-2 bg-white/80 backdrop-blur hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-full shadow-md transition-all border border-gray-100"
            >
              <X size={24} />
            </button>

            {/* LEFT SIDE: Form */}
            <div className="flex-1 p-6 md:p-12 lg:p-16 bg-white lg:overflow-y-auto lg:h-full custom-scrollbar">
              <div className="p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
                <div className="mb-10">
                  <h1 className="text-4xl md:text-5xl font-serif text-[#003b14] font-bold mb-3">
                    Secure Your Stay
                  </h1>
                  <p className="text-gray-500 text-lg">
                    Complete the details below to confirm your reservation.
                  </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-gray-100 rounded-xl mb-8 w-full shadow-inner">
                  <button
                    onClick={() => setActiveTab("contact")}
                    // Fixed: Reduced padding (px-2) and text size (text-xs) on mobile to prevent overlap
                    className={`flex-1 py-3 px-2 md:px-4 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === "contact"
                        ? "bg-white text-[#007326] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <User size={18} /> Contact Info
                  </button>
                  <button
                    onClick={() => setActiveTab("booking")}
                    // Fixed: Reduced padding (px-2) and text size (text-xs) on mobile to prevent overlap
                    className={`flex-1 py-3 px-2 md:px-4 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === "booking"
                        ? "bg-white text-[#007326] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Calendar size={18} /> Booking Details
                  </button>
                </div>

                <div className="space-y-6 pb-10">
                  <AnimatePresence mode="wait">
                    {/* CONTACT TAB */}
                    {activeTab === "contact" && (
                      <motion.div
                        key="contact"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-5"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-1">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              Title
                            </label>
                            <select
                              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007326] outline-none"
                              value={formData.title}
                              onChange={(e) =>
                                handleChange("title", e.target.value)
                              }
                            >
                              <option>Mr</option>
                              <option>Mrs</option>
                              <option>Ms</option>
                              <option>Dr</option>
                            </select>
                          </div>
                          <div className="md:col-span-3">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007326] outline-none"
                              placeholder="Enter your First Name here..."
                              value={formData.firstName}
                              onChange={(e) =>
                                handleChange("firstName", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007326] outline-none"
                            placeholder="Enter your Last Name here..."
                            value={formData.lastName}
                            onChange={(e) =>
                              handleChange("lastName", e.target.value)
                            }
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              Phone Number
                            </label>
                            {/*  <PhoneInput international defaultCountry="GB" value={formData.contactNumber} onChange={(val) => handleChange("contactNumber", val)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#007326] outline-none flex" /> */}
                            <PhoneInput
                              international
                              defaultCountry={detectedCountry}
                              value={phoneNumber}
                              onChange={(value) => {
                                setPhoneNumber(value || "");
                                handleChange("contactNumber", value || "");
                              }}
                              className="w-full [&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry]:py-2.5 [&_.PhoneInputCountry]:border [&_.PhoneInputCountry]:border-gray-200 [&_.PhoneInputCountry]:rounded-l-xl [&_.PhoneInputCountry]:bg-gray-50 [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:py-2.5 [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:border [&_.PhoneInputInput]:border-gray-200 [&_.PhoneInputInput]:rounded-r-xl [&_.PhoneInputInput:focus]:ring-2 [&_.PhoneInputInput:focus]:ring-[#007326] [&_.PhoneInputInput:focus]:border-transparent [&_.PhoneInputInput]:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007326] outline-none"
                              placeholder="Enter your email here..."
                              value={formData.email}
                              onChange={(e) =>
                                handleChange("email", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              Nationality
                            </label>
                            <Select
                              options={countryOptions}
                              value={countryOptions.find(
                                (c) => c.label === formData.country
                              )}
                              placeholder="Select Country"
                              onChange={(opt) =>
                                handleChange("country", opt?.label)
                              }
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  padding: "6px",
                                  borderRadius: "0.75rem",
                                  border: "1px solid #e5e7eb",
                                }),
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              ID Number
                            </label>
                            <div className="flex gap-2">
                              <select
                                className="w-1/3 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                                value={formData.passportType}
                                onChange={(e) =>
                                  handleChange("passportType", e.target.value)
                                }
                              >
                                <option>Passport</option>
                                <option>NIC</option>
                              </select>
                              <input
                                type="text"
                                className="w-2/3 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007326] outline-none"
                                placeholder="Number"
                                value={formData.passportNumber}
                                onChange={(e) =>
                                  handleChange("passportNumber", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveTab("booking")}
                          className="w-full py-4 mt-4 bg-[#007326] text-white font-bold rounded-xl shadow-lg hover:bg-[#005a1e] transition-transform active:scale-95"
                        >
                          Next: Booking Details
                        </button>
                      </motion.div>
                    )}

                    {/* BOOKING TAB */}
                    {activeTab === "booking" && (
                      <motion.div
                        key="booking"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-5"
                      >
                        {/* Room Select */}
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                            Select Room
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar">
                            {loadingRooms ? (
                              <p className="text-sm text-gray-400">
                                Loading rooms...
                              </p>
                            ) : (
                              rooms.map((room: any) => (
                                <div
                                  key={room.id}
                                  onClick={() =>
                                    handleChange("room", room.id.toString())
                                  }
                                  className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                                    formData.room === room.id.toString()
                                      ? "border-[#007326] bg-green-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <BedDouble
                                      className={
                                        formData.room === room.id.toString()
                                          ? "text-[#007326]"
                                          : "text-gray-400"
                                      }
                                    />
                                    <span className="text-xs font-bold bg-white px-2 py-1 rounded shadow-sm">
                                      ${room.cost}
                                    </span>
                                  </div>
                                  <p className="font-bold text-sm text-gray-800">
                                    {room.name}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {room.capacity} Guests
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              Check-in
                            </label>
                            <DatePicker
                              selected={
                                formData.checkInDate
                                  ? new Date(formData.checkInDate + "T00:00:00")
                                  : null
                              }
                              onChange={(date) => {
                                if (date) {
                                  const year = date.getFullYear();
                                  const month = String(
                                    date.getMonth() + 1
                                  ).padStart(2, "0");
                                  const day = String(date.getDate()).padStart(
                                    2,
                                    "0"
                                  );
                                  handleChange(
                                    "checkInDate",
                                    `${year}-${month}-${day}`
                                  );
                                } else {
                                  handleChange("checkInDate", "");
                                }
                              }}
                              placeholderText="Select Date"
                              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007326] outline-none"
                              minDate={new Date()}
                              filterDate={(date) => !isDateBooked(date)}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              Check-out
                            </label>
                            <DatePicker
                              selected={
                                formData.checkOutDate
                                  ? new Date(
                                      formData.checkOutDate + "T00:00:00"
                                    )
                                  : null
                              }
                              onChange={(date) => {
                                if (date) {
                                  const year = date.getFullYear();
                                  const month = String(
                                    date.getMonth() + 1
                                  ).padStart(2, "0");
                                  const day = String(date.getDate()).padStart(
                                    2,
                                    "0"
                                  );
                                  handleChange(
                                    "checkOutDate",
                                    `${year}-${month}-${day}`
                                  );
                                } else {
                                  handleChange("checkOutDate", "");
                                }
                              }}
                              placeholderText="Select Date"
                              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007326] outline-none"
                              minDate={
                                formData.checkInDate
                                  ? new Date(formData.checkInDate + "T00:00:00")
                                  : new Date()
                              }
                              filterDate={(date) => !isDateBooked(date)}
                            />
                          </div>
                        </div>

                        {/* Times */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              Check-in Time
                            </label>
                            <div className="relative">
                              <DatePicker
                                selected={
                                  formData.checkInTime
                                    ? new Date(
                                        `2000-01-01T${formData.checkInTime}`
                                      )
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
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007326] outline-none"
                              />
                              <Clock
                                size={16}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                              Check-out Time
                            </label>
                            <div className="relative">
                              <DatePicker
                                selected={
                                  formData.checkOutTime
                                    ? new Date(
                                        `2000-01-01T${formData.checkOutTime}`
                                      )
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
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007326] outline-none"
                              />
                              <Clock
                                size={16}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Add-ons Section */}
                        <div className="pt-4 border-t border-gray-100">
                          <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">
                            Extra Services
                          </label>

                          {/* 1. Meal */}
                          <div className="flex justify-between items-center mb-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                                <Utensils size={16} />
                              </div>
                              <span className="font-semibold text-gray-700 text-sm">
                                Meals?
                              </span>
                            </div>
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                              checked={formData.meal}
                              onChange={(e) =>
                                handleChange("meal", e.target.checked)
                              }
                            />
                          </div>

                          {/* 2. Guide */}
                          <div className="flex justify-between items-center mb-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Map size={16} />
                              </div>
                              <span className="font-semibold text-gray-700 text-sm">
                                Need a Guide?
                              </span>
                            </div>
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                              checked={formData.guide}
                              onChange={(e) =>
                                handleChange("guide", e.target.checked)
                              }
                            />
                          </div>

                          {/* 3. Vehicle */}
                          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                  <Car size={16} />
                                </div>
                                <span className="font-semibold text-gray-700 text-sm">
                                  Vehicle Rental?
                                </span>
                              </div>
                              <input
                                type="checkbox"
                                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                                checked={formData.vehicleNeeded}
                                onChange={(e) =>
                                  handleChange(
                                    "vehicleNeeded",
                                    e.target.checked
                                  )
                                }
                              />
                            </div>

                            {/* Vehicle Options (Only if checked) */}
                            {/* {formData.vehicleNeeded && (
                                <div className="mt-3 space-y-3 pl-2 border-l-2 border-gray-200 ml-4">
                                   <div>
                                      <label className="text-xs font-bold text-gray-500 block mb-1">Vehicle Type</label>
                                      <select value={formData.vehicleType} onChange={(e) => handleChange("vehicleType", e.target.value)} className="w-full p-2 text-sm border rounded-lg outline-none focus:border-green-500">
                                         {vehicleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                      </select>
                                   </div>
                                   <div className="flex justify-between items-center">
                                      <span className="text-sm text-gray-600">Need a Driver?</span>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-gray-400">{formData.driver ? "Yes" : "No"}</span>
                                        <input type="checkbox" className="w-4 h-4" checked={formData.driver} onChange={(e) => handleChange("driver", e.target.checked)} />
                                      </div>
                                   </div>
                                </div>
                             )} */}
                          </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={() => setActiveTab("contact")}
                            // Fixed: Added bg-gray-100 so it is not white
                            className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            // Fixed: Increased py-4 to py-5 to give it more height
                            className="flex-[2] py-5 bg-[#007326] text-white font-bold rounded-xl shadow-lg hover:bg-[#005a1e] transition-transform active:scale-95 flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? "Processing..." : "Confirm Booking"}{" "}
                            <CheckCircle size={18} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Sticky Summary */}
            <div className="w-full lg:w-[450px] bg-[#003b14] text-white p-8 overflow-hidden relative lg:h-full h-auto flex-shrink-0 order-last">
              <div className="h-full flex flex-col">
                <h2 className="text-2xl font-serif font-bold border-b border-green-800 pb-4 mb-6">
                  Your Stay
                </h2>
                <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
                  {selectedRoom ? (
                    <div className="flex flex-col gap-4">
                      <div className="w-full h-48 bg-green-800 rounded-xl overflow-hidden relative shadow-lg">
                        <img
                          src={
                            selectedRoom.image ||
                            selectedRoom.img1 ||
                            "/placeholder.png"
                          }
                          alt="Room"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-2xl font-serif">
                          {selectedRoom.name}
                        </p>
                        <p className="text-sm text-green-300 mt-1">
                          {selectedRoom.capacity} Guests • {selectedRoom.beds}
                        </p>
                      </div>
                      <div className="bg-[#004d1a] rounded-xl p-5 flex justify-between items-center text-sm border border-green-800/50 shadow-inner">
                        <div>
                          <p className="text-green-300 text-xs uppercase font-bold tracking-wider">
                            Check-In
                          </p>
                          <p className="font-medium text-lg mt-1">
                            {formData.checkInDate || "--"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-300 text-xs uppercase font-bold tracking-wider">
                            Check-Out
                          </p>
                          <p className="font-medium text-lg mt-1">
                            {formData.checkOutDate || "--"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3 pt-4 border-t border-green-800">
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Room ({days} nights)</span>
                          <span>${roomCost}</span>
                        </div>
                        {vehicleCost > 0 && (
                          <div className="flex justify-between text-sm text-gray-300">
                            <span>Vehicles</span>
                            <span>${vehicleCost}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Service Charge (5%)</span>
                          <span>${serviceCharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold text-white pt-4 border-t border-green-800 mt-2">
                          <span>Total</span>
                          <span>${grandTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6 animate-fadeIn">
                      <div className="w-full h-52 bg-green-800 rounded-xl overflow-hidden relative shadow-lg">
                        <img
                          src={hotelInfo.image}
                          alt="Cottage"
                          className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-serif font-bold text-white">
                          {hotelInfo.name}
                        </h3>
                        <div className="flex items-center gap-2 text-green-300 text-sm">
                          <MapPin size={16} />
                          <p>{hotelInfo.address}</p>
                        </div>
                        <div className="flex items-center gap-2 text-green-300 text-sm">
                          <Phone size={16} />
                          <p>{hotelInfo.contact}</p>
                        </div>
                      </div>
                      <div className="bg-[#004d1a] p-6 rounded-xl border-l-4 border-green-500">
                        <p className="text-white/90 italic leading-relaxed text-base">
                          "{hotelInfo.promoText}"
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-green-400/60 mt-auto pt-10">
                        <Info size={16} />
                        <span className="text-xs uppercase tracking-widest">
                          Select a room to begin
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-auto pt-6 border-t border-green-800 flex items-center gap-3 text-xs text-green-300/60">
                  <CreditCard size={16} />
                  <p>No payment required today. Pay at property.</p>
                  <p>Extra charges will be charged for Extra services.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
