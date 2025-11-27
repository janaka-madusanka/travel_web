"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../dashboard/Sidebar";
import { useRouter } from "next/navigation";

// ------------------------------
// TYPES
// ------------------------------
interface Room {
  id: number;
  name: string;
  beds: number;
  adults: number;
  ac: "AC" | "NonAC";
  wifi: "YES" | "NO";
  size: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
}

interface FetchRoomsResponse {
  rooms: Room[];
  error?: string;
}

// ------------------------------
// COMPONENT
// ------------------------------

export default function ViewRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ------------------------------
  // FETCH ROOMS
  // ------------------------------

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data: FetchRoomsResponse = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch rooms");
      setRooms(data.rooms);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // DELETE ROOM
  // ------------------------------

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/rooms?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data: { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete room");

      alert("Room deleted successfully");
      fetchRooms();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ------------------------------
  // FETCH ROOMS ON MOUNT
  // ------------------------------
  useEffect(() => {
    fetchRooms();
  }, []);

  // ------------------------------
  // RENDER
  // ------------------------------
  if (loading) return <p className="p-6">Loading rooms...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-6">All Rooms</h1>

        {rooms.length === 0 ? (
          <p>No rooms found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="border rounded shadow p-4 flex flex-col"
              >
                {/* Room Image */}
                {room.img1 ? (
                  <img
                    src={room.img1}
                    alt={room.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
                    No Image
                  </div>
                )}

                <h2 className="text-xl font-bold mb-2">{room.name}</h2>
                <p>Beds: {room.beds}</p>
                <p>Adults: {room.adults}</p>
                <p>AC: {room.ac}</p>
                <p>WiFi: {room.wifi}</p>
                <p>Size: {room.size}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/rooms/edit/${room.id}`)
                    }
                    className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
