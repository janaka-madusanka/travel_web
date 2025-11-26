"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../dashboard/Sidebar";

// ---------------------- TYPES ----------------------

type YesNo = "YES" | "NO";

interface Bedroom {
  bedType: string;
  count: number;
}

interface Bathroom {
  shower: YesNo;
  slipper: YesNo;
  soap: YesNo;
  bidet: YesNo;
  towels: YesNo;
  toiletPaper: YesNo;
  hotWater: YesNo;
  privateBathroom: YesNo;
}

interface Kitchen {
  diningTable: YesNo;
  gasCooker: YesNo;
  riceCooker: YesNo;
  woodStove: YesNo;
  fridge: YesNo;
  electricKettle: YesNo;
  waterBottle: YesNo;
}

interface FormState {
  name: string;
  cost: string;
  offer: string;
  size: string;
  ac: YesNo;
  wifi: YesNo;
  fan: YesNo;
  balcony: YesNo;
  gardenView: YesNo;
  tv: YesNo;
  iron: YesNo;
  locker: YesNo;
  parking: YesNo;
  sittingArea: YesNo;
  dryingRack: YesNo;
  clothRack: YesNo;
}

// ---------------------- COMPONENT ----------------------

export default function AddRoomPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormState>({
    name: "",
    cost: "",
    offer: "",
    size: "",
    ac: "YES", // mapped later to ACType
    wifi: "YES",
    fan: "NO",
    balcony: "NO",
    gardenView: "NO",
    tv: "NO",
    iron: "NO",
    locker: "NO",
    parking: "NO",
    sittingArea: "NO",
    dryingRack: "NO",
    clothRack: "NO",
  });

  const [bedrooms, setBedrooms] = useState<Bedroom[]>([{ bedType: "SINGLE", count: 1 }]);
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([
    { shower: "YES", slipper: "YES", soap: "YES", bidet: "NO", towels: "YES", toiletPaper: "YES", hotWater: "YES", privateBathroom: "YES" },
  ]);
  const [kitchen, setKitchen] = useState<Kitchen>({
    diningTable: "NO",
    gasCooker: "NO",
    riceCooker: "NO",
    woodStove: "NO",
    fridge: "NO",
    electricKettle: "NO",
    waterBottle: "NO",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------------- INPUT HANDLERS ------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 4);
    setImages(files);
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });

  // ---------------- SUBMIT --------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      // Convert images → Base64
      const imagesBase64: Record<string, string> = {};
      for (let i = 0; i < images.length; i++) {
        imagesBase64[`img${i + 1}`] = await fileToBase64(images[i]);
      }

      // Only send kitchen if at least one YES
      const kitchenPayload = Object.values(kitchen).some((v) => v === "YES") ? kitchen : undefined;

      // Map AC field to Prisma enum ACType
      const acEnum = formData.ac === "YES" ? "AC" : "NonAC";

      const payload = {
        ...formData,
        ac: acEnum,
        cost: Number(formData.cost),
        offer: formData.offer ? Number(formData.offer) : null,
        bedrooms,
        bathrooms,
        kitchen: kitchenPayload,
        ...imagesBase64,
      };

      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create room");

      alert("Room created successfully!");
      router.push("/admin/rooms");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RENDER --------------------------

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Room</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto flex flex-col gap-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <Input label="Room Name" name="name" value={formData.name} onChange={handleChange} />
            <Input type="number" label="Cost" name="cost" value={formData.cost} onChange={handleChange} />
            <Input type="number" label="Offer (%)" name="offer" value={formData.offer} onChange={handleChange} />
            <Input label="Room Size" name="size" value={formData.size} onChange={handleChange} />
          </div>

          {/* Amenities */}
          <h2 className="text-xl font-semibold">Amenities</h2>
          <div className="grid grid-cols-3 gap-4">
            {(
              [
                "ac","wifi","fan","balcony","gardenView","tv","iron","locker","parking","sittingArea","dryingRack","clothRack",
              ] as (keyof FormState)[]
            ).map((key) => (
              <SelectYesNo key={key} label={key} name={key} value={formData[key]} onChange={handleChange} />
            ))}
          </div>

          {/* Bedrooms */}
          <h2 className="text-xl font-semibold">Bedrooms</h2>
          {bedrooms.map((b, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 border p-4 rounded">
              <div>
                <label className="font-semibold">Bed Type</label>
                <select
                  value={b.bedType}
                  onChange={(e) => {
                    const beds = [...bedrooms];
                    beds[i].bedType = e.target.value;
                    setBedrooms(beds);
                  }}
                  className="border p-2 rounded w-full"
                >
                  <option value="SINGLE">Single</option>
                  <option value="DOUBLE">Double</option>
                  <option value="QUEEN">Queen</option>
                  <option value="KING">King</option>
                  <option value="TWIN">Twin</option>
                  <option value="DOUBLE_ROOM">Double Room</option>
                  <option value="TRIPLE">Triple</option>
                  <option value="FAMILY">Family</option>
                </select>
              </div>
              <Input type="number" label="Count" value={b.count} onChange={(e) => {
                const beds = [...bedrooms];
                beds[i].count = Number(e.target.value);
                setBedrooms(beds);
              }} />
            </div>
          ))}
          <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setBedrooms([...bedrooms, { bedType: "SINGLE", count: 1 }])}>
            + Add Bedroom
          </button>

          {/* Bathrooms */}
          <h2 className="text-xl font-semibold">Bathrooms</h2>
          {bathrooms.map((b, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 border p-4 rounded">
              {(Object.keys(b) as (keyof Bathroom)[]).map((key) => (
                <SelectYesNo key={key} label={key} name={key} value={b[key]} onChange={(e) => {
                  const list = [...bathrooms];
                  list[i][key] = e.target.value as YesNo;
                  setBathrooms(list);
                }} />
              ))}
            </div>
          ))}
          <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() =>
            setBathrooms([...bathrooms, { shower: "YES", slipper: "YES", soap: "YES", bidet: "NO", towels: "YES", toiletPaper: "YES", hotWater: "YES", privateBathroom: "YES" }])
          }>
            + Add Bathroom
          </button>

          {/* Kitchen */}
          <h2 className="text-xl font-semibold">Kitchen</h2>
          <div className="grid grid-cols-3 gap-4">
            {(Object.keys(kitchen) as (keyof Kitchen)[]).map((key) => (
              <SelectYesNo key={key} label={key} name={key} value={kitchen[key]} onChange={(e) => setKitchen({ ...kitchen, [key]: e.target.value as YesNo })} />
            ))}
          </div>

          {/* Images */}
          <div>
            <label className="font-semibold">Upload Images (max 4)</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="block" />
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, i) => (
                <img key={i} src={src} className="w-20 h-20 rounded object-cover" />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button className="bg-green-600 text-white px-6 py-3 rounded text-lg" disabled={loading}>
            {loading ? "Saving..." : "Create Room"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------- REUSABLE COMPONENTS ----------------------

interface InputProps {
  label: string;
  name?: string;
  value: any;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function Input({ label, name, value, onChange, type = "text" }: InputProps) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="border p-2 rounded" />
    </div>
  );
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

function SelectYesNo({ label, name, value, onChange }: SelectProps) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold">{label}</label>
      <select name={name} value={value} onChange={onChange} className="border p-2 rounded">
        <option value="YES">YES</option>
        <option value="NO">NO</option>
      </select>
    </div>
  );
}
