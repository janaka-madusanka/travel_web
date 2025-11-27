import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const fromDate = searchParams.get("from"); // YYYY-MM-DD
    const toDate = searchParams.get("to");     // YYYY-MM-DD

    if (!roomId || !fromDate || !toDate) {
      return NextResponse.json(
        { error: "roomId, from, and to dates are required" },
        { status: 400 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        roomId: Number(roomId),
        OR: [
          {
            checkIn: {
              lte: new Date(toDate),
            },
            checkOut: {
              gte: new Date(fromDate),
            },
          },
        ],
      },
      select: {
        checkIn: true,
        checkOut: true,
      },
    });

    // Return booked slots
    return NextResponse.json({ bookedSlots: bookings });
  } catch (err) {
    console.error("Fetch available dates error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
