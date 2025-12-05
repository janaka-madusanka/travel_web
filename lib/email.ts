import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
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
  checkOut: string
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Booking - ${customerName}`,
    text: `
New Booking Received

Customer: ${customerName}
Room: ${roomName}
Check-In: ${checkIn}
Check-Out: ${checkOut}
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error; // This will show the error in terminal
  }
}