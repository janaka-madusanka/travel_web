// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendBookingNotification } from "@/lib/email";

// ---------------- CREATE BOOKING ----------------
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { customer, roomId, checkIn, checkOut, otherDetails } = data;

    if (!customer || !roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "Customer info, roomId, checkIn, and checkOut are required" },
        { status: 400 }
      );
    }

    // 1️⃣ Check if room exists
    const roomExists = await prisma.room.findUnique({ where: { id: roomId } });
    if (!roomExists) {
      return NextResponse.json(
        { error: `Room with id ${roomId} does not exist` },
        { status: 400 }
      );
    }

    // 2️⃣ Check for booking conflicts
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        roomId,
        OR: [
          {
            checkIn: { lte: new Date(checkOut) },
            checkOut: { gte: new Date(checkIn) },
          },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        {
          error: `Room is already booked from ${conflictingBooking.checkIn.toISOString()} to ${conflictingBooking.checkOut.toISOString()}`,
        },
        { status: 400 }
      );
    }

    // 3️⃣ Check if customer exists by NIC or passportNumber
    let customerRecord = await prisma.customer.findFirst({
      where: {
        OR: [
          { nicNumber: customer.nicNumber },
          { passportNumber: customer.passportNumber },
        ],
      },
    });

    if (!customerRecord) {
      customerRecord = await prisma.customer.create({ data: customer });
    }

    // 4️⃣ Create booking with otherDetails if provided
    const booking = await prisma.booking.create({
      data: {
        roomId,
        customerId: customerRecord.id,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        otherDetails: otherDetails
          ? {
              create: {
                vehicleSupport: otherDetails.vehicleSupport, // YesNo enum: "YES"/"NO"
                meal: otherDetails.meal, // YesNo enum: "YES"/"NO"
                guide: otherDetails.guide, // YesNo enum: "YES"/"NO"
                vehicleType: otherDetails.vehicleType, // VehicleType enum
                vehicleNumber: otherDetails.vehicleNumber,
                driver: otherDetails.driver, // YesNo enum
              },
            }
          : undefined,
      },
      include: { customer: true, room: true, otherDetails: true },
    });
    await sendBookingNotification(
      customer.name,
      roomExists.name,
      checkIn,
      checkOut
    );

    return NextResponse.json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    console.error("Booking creation error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
// ---------------- GET ALL BOOKINGS ----------------
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        customer: true,
        room: true,
        otherDetails: true,
      },
      orderBy: {
        checkIn: "asc", // Orders bookings by check-in date
      },
    });

    // Optional: convert dates to ISO strings for JSON
    const bookingsFormatted = bookings.map((b) => ({
      ...b,
      checkIn: b.checkIn.toISOString(),
      checkOut: b.checkOut.toISOString(),
    }));

    return NextResponse.json({ bookings: bookingsFormatted });
  } catch (err) {
    console.error("Fetch bookings error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
// ---------------- DELETE BOOKING ----------------
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Booking id is required" },
        { status: 400 }
      );
    }

    // Check if booking exists
    const bookingExists = await prisma.booking.findUnique({
      where: { id: Number(id) },
    });

    if (!bookingExists) {
      return NextResponse.json(
        { error: `Booking with id ${id} does not exist` },
        { status: 404 }
      );
    }

    // Delete the booking (also deletes otherDetails because of Prisma relation)
    await prisma.booking.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Delete booking error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
