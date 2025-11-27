"use client";
import React, { useEffect, useState } from "react"; // <-- add React here
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Sidebar from "../dashboard/Sidebar";

interface Customer {
  id: number;
  name: string;
  passportNumber: string;
  nicNumber: string;
  address: string;
  contactNumber: string;
}

interface Room {
  id: number;
  name: string;
  beds: number;
  adults: number;
  ac: string;
  wifi: string;
  size: string;
}

interface OtherDetails {
  id: number;
  vehicleSupport: string;
  meal: string;
  guide: string;
  vehicleType?: string;
  vehicleNumber?: number;
  driver?: string;
}

interface Booking {
  id: number;
  room: Room;
  customer: Customer;
  checkIn: string;
  checkOut: string;
  otherDetails?: OtherDetails;
}

export default function BookingListPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null); // For dropdown
  const router = useRouter();

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch bookings");
      setBookings(data.bookings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete booking
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete booking");
      alert(data.message);
      fetchBookings();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Edit booking
  const handleEdit = (id: number) => {
    router.push(`/admin/bookings/edit/${id}`);
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-6">All Bookings</h1>

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Room</th>
              <th className="border px-4 py-2">Check-In</th>
              <th className="border px-4 py-2">Check-Out</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <React.Fragment key={booking.id}>
                <tr
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                >
                  <td className="border px-4 py-2">{booking.id}</td>
                  <td className="border px-4 py-2">{booking.customer.name}</td>
                  <td className="border px-4 py-2">{booking.room.name}</td>
                  <td className="border px-4 py-2">{format(new Date(booking.checkIn), "yyyy-MM-dd")}</td>
                  <td className="border px-4 py-2">{format(new Date(booking.checkOut), "yyyy-MM-dd")}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(booking.id);
                      }}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(booking.id);
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Expanded dropdown row */}
                {expandedId === booking.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold">Customer Info:</h4>
                          <p>Name: {booking.customer.name}</p>
                          <p>Passport: {booking.customer.passportNumber}</p>
                          <p>NIC: {booking.customer.nicNumber}</p>
                          <p>Address: {booking.customer.address}</p>
                          <p>Contact: {booking.customer.contactNumber}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Room Info:</h4>
                          <p>Name: {booking.room.name}</p>
                          <p>Beds: {booking.room.beds}</p>
                          <p>Adults: {booking.room.adults}</p>
                          <p>AC: {booking.room.ac}</p>
                          <p>WiFi: {booking.room.wifi}</p>
                          <p>Size: {booking.room.size}</p>
                        </div>
                        {booking.otherDetails && (
                          <div className="col-span-2 mt-2">
                            <h4 className="font-semibold">Other Details:</h4>
                            <p>Vehicle Support: {booking.otherDetails.vehicleSupport}</p>
                            <p>Vehicle Type: {booking.otherDetails.vehicleType || "-"}</p>
                            <p>Vehicle Number: {booking.otherDetails.vehicleNumber || "-"}</p>
                            <p>Meal: {booking.otherDetails.meal}</p>
                            <p>Guide: {booking.otherDetails.guide}</p>
                            <p>Driver: {booking.otherDetails.driver || "-"}</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
