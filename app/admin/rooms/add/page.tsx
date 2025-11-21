"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../dashboard/Sidebar";

export default function AddRoomPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    beds: 1,
    adults: 1,
    ac: "AC",
    wifi: "YES",
    size: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files).slice(0, 4); // max 4 images
    setImages(filesArray);

    // Preview
    const previews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("adminToken");

      const imagesBase64: Record<string, string> = {};
      for (let i = 0; i < images.length; i++) {
        imagesBase64[`img${i + 1}`] = await fileToBase64(images[i]);
      }

      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, ...imagesBase64 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("Room created successfully!");
      router.push("/admin/rooms");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Room</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto flex flex-col gap-4"
        >
          {/* Room Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Room Name</label>
            <input
              type="text"
              name="name"
              placeholder="Room Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          {/* Beds & Adults */}
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-semibold">Number of Beds</label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                min={1}
                required
                className="p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-semibold">Number of Adults</label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min={1}
                required
                className="p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
          </div>

          {/* AC & Wifi */}
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-semibold">AC</label>
              <select
                name="ac"
                value={formData.ac}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              >
                <option value="AC">AC</option>
                <option value="NonAC">NonAC</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-semibold">Wifi</label>
              <select
                name="wifi"
                value={formData.wifi}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              >
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
          </div>

          {/* Room Size */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Room Size</label>
            <input
              type="text"
              name="size"
              placeholder="Room Size (e.g., 25m²)"
              value={formData.size}
              onChange={handleChange}
              required
              className="p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Upload Images (max 4)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="p-2 border rounded"
            />
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img key={idx} src={src} alt={`Preview ${idx}`} className="w-24 h-24 object-cover rounded" />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4"
          >
            {loading ? "Creating..." : "Create Room"}
          </button>
        </form>
      </div>
    </div>
  );
}
