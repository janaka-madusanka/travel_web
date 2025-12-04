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

    <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-3">ID</th>
          <th className="border px-4 py-3">Customer</th>
          <th className="border px-4 py-3">Room</th>
          <th className="border px-4 py-3">Check-In</th>
          <th className="border px-4 py-3">Check-Out</th>
          <th className="border px-4 py-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {bookings.map((booking) => {
          const isOpen = expandedId === booking.id;

          return (
            <React.Fragment key={booking.id}>
              
              {/* MAIN ROW */}
              <tr className="hover:bg-gray-100">
                <td className="border px-4 py-3">{booking.id}</td>
                <td className="border px-4 py-3">{booking.customer.name}</td>
                <td className="border px-4 py-3">{booking.room.name}</td>
                <td className="border px-4 py-3">
                  {format(new Date(booking.checkIn), "yyyy-MM-dd")}
                </td>
                <td className="border px-4 py-3">
                  {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                </td>

                <td className="border px-4 py-3 flex items-center gap-2">
                  <button
                    onClick={() =>
                      setExpandedId(isOpen ? null : booking.id)
                    }
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
                  >
                    {isOpen ? "Hide Details" : "Show Details"}
                    <span
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  <button
                    onClick={() => handleEdit(booking.id)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>

              {/* EXPANDED ROW */}
              {isOpen && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* CUSTOMER CARD */}
                      <div className="bg-white border rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">👤 Customer Details</h3>
                        <div className="space-y-1 text-gray-700">
                          <p><b>Name:</b> {booking.customer.name}</p>
                          <p><b>Passport:</b> {booking.customer.passportNumber}</p>
                          <p><b>NIC:</b> {booking.customer.nicNumber}</p>
                          <p><b>Address:</b> {booking.customer.address}</p>
                          <p><b>Contact:</b> {booking.customer.contactNumber}</p>
                        </div>
                      </div>

                      {/* ROOM CARD */}
                      <div className="bg-white border rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">🏨 Room Details</h3>
                        <div className="space-y-1 text-gray-700">
                          <p><b>Name:</b> {booking.room.name}</p>
                          <p><b>id:</b> {booking.room.id}</p>
                          
                        </div>
                      </div>

                      {/* OTHER DETAILS CARD */}
                      {booking.otherDetails && (
                        <div className="bg-white border rounded-lg p-4 shadow-sm md:col-span-2">
                          <h3 className="text-lg font-semibold mb-2">🛠️ Additional Details</h3>
                          <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <p><b>Vehicle Support:</b> {booking.otherDetails.vehicleSupport}</p>
                            <p><b>Meal:</b> {booking.otherDetails.meal}</p>
                            <p><b>Guide:</b> {booking.otherDetails.guide}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}

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
