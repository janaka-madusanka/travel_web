// lib/getRooms.ts
import prisma from "@/lib/prisma";

export async function getRoomsForUI() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        bedrooms: true,
        bathrooms: true,
        kitchen: true,
      },
      orderBy: { id: "asc" },
    });

    // Convert Buffer images to Base64 strings so React can render them
    // Note: We map the data to ensure it matches the Serializable JSON requirement of Next.js
    const serializedRooms = rooms.map((room) => ({
      ...room,
      // Convert Date objects to strings if you have created_at fields, otherwise ignore this comment
      img1: room.img1 ? `data:image/jpeg;base64,${room.img1.toString("base64")}` : null,
      img2: room.img2 ? `data:image/jpeg;base64,${room.img2.toString("base64")}` : null,
      img3: room.img3 ? `data:image/jpeg;base64,${room.img3.toString("base64")}` : null,
      img4: room.img4 ? `data:image/jpeg;base64,${room.img4.toString("base64")}` : null,
      video: null, // Don't send heavy video binary to the list view to save speed
    }));

    return serializedRooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}