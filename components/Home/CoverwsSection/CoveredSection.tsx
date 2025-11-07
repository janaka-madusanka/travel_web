"use client";
import React from "react";
import {
  FaShieldAlt,
  FaCar,
  FaCompass,
  FaTruckMoving,
  FaHandHoldingHeart,
} from "react-icons/fa";


interface Item {
  icon: React.ReactNode;
  title: string;
  description: string;
}


export default function CoveredSection() {
  const items: Item[] = [
    {
      icon: <FaShieldAlt size={40} />,
      title: "Safety First",
      description:
        "Your security is our priority. Stay worry-free with our safe and well-managed environment.",
    },
    {
      icon: <FaCar size={40} />,
      title: "Vehicle Rental Support",
      description:
        "Easily rent cars, bikes, or tuk-tuks to explore Sigiriya and surrounding areas.",
    },
    {
      icon: <FaCompass size={40} />,
      title: "Guide Support",
      description:
        "Local guides available to help you discover hidden gems and cultural experiences.",
    },
    {
      icon: <FaTruckMoving size={40} />,
      title: "Additional Support",
      description:
        "From luggage help to on-demand assistance, we’re here to make your stay smooth and comfortable.",
    },
    {
      icon: <FaHandHoldingHeart size={40} />,
      title: "Friendly Environment",
      description:
        "Experience warm Sri Lankan hospitality with a welcoming and relaxed atmosphere.",
    },
  ];

  return (
    <section className="bg-[#0A4A2C] text-white py-16 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-6xl font-bold mb-12">
        We've Got You Covered
      </h2>

      {/* First Row (3 Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
        {items.slice(0, 3).map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center max-w-xs text-center space-y-4"
          >
            <div className="text-white">{item.icon}</div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-200 text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Second Row (2 Items) */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-12 justify-items-center">
        {items.slice(3).map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center max-w-xs text-center space-y-4"
          >
            <div className="text-white">{item.icon}</div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-200 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
