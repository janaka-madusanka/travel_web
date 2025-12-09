// app/rooms/page.tsx
import React from "react";
import Image from "next/image";
import RoomList from "@/components/Rooms/RoomList";
import NewsletterSignup from "@/components/Home/NewsletterSignup/NewsletterSignup";
import { getRoomsForUI } from "@/lib/getRooms";

// ✅ SEO Metadata for Rooms Page
export const metadata = {
  metadataBase: new URL("https://www.sceniccottage.com"), // <- added base URL
  title: "Best Rooms in Sigiriya | Affordable & Luxury Hotel Rooms | Scenic Cottage",
  description:
    "Book the best hotel rooms in Sigiriya & Dambulla. Low budget rooms, luxury rooms, family rooms, AC/non-AC. Close to Sigiriya Rock, Pidurangala & Dambulla Temple.",
  keywords: [
    "best rooms in sigiriya",
    "hotel sigiriya",
    "hotel dambulla",
    "cheap hotel sigiriya",
    "low budget rooms sigiriya",
    "luxury hotel sigiriya",
    "best hotel sri lanka",
    "lowbudget hotel sri lanka",
    "luxury rooms sri lanka",
    "sigiriya accommodation",
    "dambulla accommodation",
    "family hotel sri lanka",
    "budget hotel near sigiriya rock",
    "rooms near sigiriya rock",
    "pidurangala hotel",
    "booking affordable hotel sri lanka",
    "cheap rooms sri lanka",
    "best resorts sri lanka",
    "room booking sigiriya",
    "hotel near sigiriya lion rock",
    "shangrilla",
    "cinnamon grand",
    "booking.com hotel sigiriya",
    "agoda sigiriya hotels",
    "sigiriya resort",
    "best stay sigiriya",
    "top hotels sri lanka",
    "hotel deals sri lanka",
    "rooms for honeymoon sri lanka"
  ],
  alternates: {
    canonical: "/rooms", // <- relative URL works with metadataBase
  },
  openGraph: {
    title: "Best Rooms in Sigiriya | Scenic Cottage",
    description:
      "Find top-rated rooms in Sigiriya & Dambulla. Affordable & luxury options available. Book directly for best rates.",
    url: "/rooms", // <- relative URL
    images: [
      {
        url: "/images/Rooms/IMG_0004.JPG", // <- relative image URL
        width: 1200,
        height: 630,
        alt: "Scenic Cottage Rooms Sigiriya",
      },
    ],
  },
};

// =================== PAGE COMPONENT ===================
const RoomsPage = async () => {
  const rooms = await getRoomsForUI();

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/Rooms/IMG_0004.JPG"
            alt="Rooms Hero Sanctuary"
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-[10vh]">
          <p className="text-white/90 text-sm sm:text-base font-bold uppercase tracking-[0.3em] mb-6">
            The Ultimate Escape
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-white mb-8 leading-tight drop-shadow-lg">
            Find Your Sanctuary
          </h1>
        </div>
      </div>

      <RoomList initialRooms={rooms} />
      <NewsletterSignup />
    </div>
  );
};

export default RoomsPage;
