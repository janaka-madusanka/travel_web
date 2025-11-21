"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../../../dashboard/Sidebar";

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams(); // get room id from URL
  const roomId = params.id;

  const [formData, setFormData] = useState({
    name: "",
    beds: 1,
    adults: 1,
    ac: "AC",
    wifi: "YES",
    size: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch room data
  useEffect(() => {
    async function fetchRoom() {
      try {
        const res = await fetch(`/api/rooms?id=${roomId}`);
        const data = await res.json();
        if (res.ok && data.room) {
          const room = data.room;
          setFormData({
            name: room.name,
            beds: room.beds,
            adults: room.adults,
            ac: room.ac,
            wifi: room.wifi,
            size: room.size,
          });
          setExistingImages([room.img1, room.img2, room.img3, room.img4].filter(Boolean));
        } else {
          setError(data.error || "Room not found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRoom();
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages(filesArray.slice(0, 4)); // max 4 images
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("adminToken");

      // Convert new images to Base64
      const imagesBase64: Record<string, string> = {};
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const base64 = await fileToBase64(file);
        imagesBase64[`img${i + 1}`] = base64;
      }

      const res = await fetch("/api/rooms", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: Number(roomId), ...formData, ...imagesBase64 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("Room updated successfully!");
      router.push("/admin/rooms");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-6">Edit Room</h1>

        <form className="flex flex-col gap-4 max-w-md" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Room Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />

          <input
            type="number"
            name="beds"
            placeholder="Number of Beds"
            value={formData.beds}
            onChange={handleChange}
            min={1}
            required
            className="p-2 border rounded"
          />

          <input
            type="number"
            name="adults"
            placeholder="Number of Adults"
            value={formData.adults}
            onChange={handleChange}
            min={1}
            required
            className="p-2 border rounded"
          />

          <select name="ac" value={formData.ac} onChange={handleChange} className="p-2 border rounded">
            <option value="AC">AC</option>
            <option value="NonAC">NonAC</option>
          </select>

          <select name="wifi" value={formData.wifi} onChange={handleChange} className="p-2 border rounded">
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>

          <input
            type="text"
            name="size"
            placeholder="Room Size"
            value={formData.size}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />

          <label className="block">
            Existing Images:
            <div className="flex gap-2 mt-2 mb-4">
              {existingImages.map((img, idx) => (
                <img key={idx} src={img} alt={`img${idx + 1}`} className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
          </label>

          <label className="block">
            Upload New Images (max 4):
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-2"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {saving ? "Saving..." : "Update Room"}
          </button>
        </form>
      </div>
    </div>
  );
}
