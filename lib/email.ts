import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendBookingNotification(
  customerName: string,
  roomName: string,
  checkIn: string,
  checkOut: string,
   customerPhone: string
) {
  // Extract date and time
  const checkInDate = checkIn.split("T")[0];
  const checkInTime = checkIn.split("T")[1]?.substring(0, 5);

  const checkOutDate = checkOut.split("T")[0];
  const checkOutTime = checkOut.split("T")[1]?.substring(0, 5);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Booking - ${customerName}`,
    text: `
New Booking Received

Customer: ${customerName}
Phone: ${customerPhone}
Room: ${roomName}
Check-In: ${checkInDate} at ${checkInTime}
Check-Out: ${checkOutDate} at ${checkOutTime}
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw error;
  }
}
