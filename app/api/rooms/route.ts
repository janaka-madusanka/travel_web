import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

// Helper to convert base64 string to Buffer for Prisma Bytes
function base64ToBuffer(base64?: string) {
  if (!base64) return undefined;
  const cleanBase64 = base64.split(",")[1] || base64; // remove prefix if exists
  return Buffer.from(cleanBase64, "base64");
}

// ---------------------- GET ROOMS (All or Single by ID) ----------------------
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // GET single room by ID
      const room = await prisma.room.findUnique({
        where: { id: Number(id) },
      });
      if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

      // Convert images to base64 for browser
      const roomWithBase64 = {
        ...room,
        img1: room.img1 ? `data:image/jpeg;base64,${Buffer.from(room.img1).toString("base64")}` : null,
        img2: room.img2 ? `data:image/jpeg;base64,${Buffer.from(room.img2).toString("base64")}` : null,
        img3: room.img3 ? `data:image/jpeg;base64,${Buffer.from(room.img3).toString("base64")}` : null,
        img4: room.img4 ? `data:image/jpeg;base64,${Buffer.from(room.img4).toString("base64")}` : null,
      };

      return NextResponse.json({ room: roomWithBase64 });
    }

    // GET all rooms
    const rooms = await prisma.room.findMany({
      include: { bookings: true },
      orderBy: { id: "asc" },
    });

    const roomsWithBase64 = rooms.map((room) => ({
      ...room,
      img1: room.img1 ? `data:image/jpeg;base64,${Buffer.from(room.img1).toString("base64")}` : null,
      img2: room.img2 ? `data:image/jpeg;base64,${Buffer.from(room.img2).toString("base64")}` : null,
      img3: room.img3 ? `data:image/jpeg;base64,${Buffer.from(room.img3).toString("base64")}` : null,
      img4: room.img4 ? `data:image/jpeg;base64,${Buffer.from(room.img4).toString("base64")}` : null,
    }));

    return NextResponse.json({ rooms: roomsWithBase64 });
  } catch (err) {
    console.error("Fetch rooms error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ---------------------- CREATE ROOM ----------------------
export async function POST(req: NextRequest) {
  const admin = verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();

    const roomData = {
      ...data,
      img1: base64ToBuffer(data.img1),
      img2: base64ToBuffer(data.img2),
      img3: base64ToBuffer(data.img3),
      img4: base64ToBuffer(data.img4),
    };

    const room = await prisma.room.create({ data: roomData });
    return NextResponse.json({ message: "Room created", room });
  } catch (err) {
    console.error("Create room error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ---------------------- UPDATE ROOM ----------------------
export async function PATCH(req: NextRequest) {
  const admin = verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) return NextResponse.json({ error: "Room id is required" }, { status: 400 });

    // Only update images if provided
    const roomData: any = { ...updateData };
    if (updateData.img1) roomData.img1 = base64ToBuffer(updateData.img1);
    if (updateData.img2) roomData.img2 = base64ToBuffer(updateData.img2);
    if (updateData.img3) roomData.img3 = base64ToBuffer(updateData.img3);
    if (updateData.img4) roomData.img4 = base64ToBuffer(updateData.img4);

    const room = await prisma.room.update({
      where: { id: Number(id) },
      data: roomData,
    });

    return NextResponse.json({ message: "Room updated", room });
  } catch (err) {
    console.error("Update room error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ---------------------- DELETE ROOM ----------------------
export async function DELETE(req: NextRequest) {
  const admin = verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Room id is required" }, { status: 400 });

    await prisma.room.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Room deleted" });
  } catch (err) {
    console.error("Delete room error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
