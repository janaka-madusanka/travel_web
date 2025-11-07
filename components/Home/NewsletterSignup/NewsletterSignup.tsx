"use client";

import React from "react";
import Image from "next/image";
import { NewslwtterSignup } from "@/data/data"; // ✅ Import data

const NewsletterSignup: React.FC = () => {
  const scenicImg = NewslwtterSignup[0]?.image; // Get image from data

  return (
    <div className="relative bg-[#021303] text-white w-full overflow-hidden py-20 px-6 md:px-16 lg:px-24">

      {/* ✅ Content Box */}
      <div className="relative z-10 max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay in the Loop
        </h2>

        <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
          Sign up to hear from us! Get exclusive offers, updates,
          and insider tips for your perfect Sigiriya getaway.
        </p>

        {/* ✅ Email Form - Responsive */}
        <form className="flex flex-col sm:flex-row gap-3 mb-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full sm:w-80 px-4 py-2 bg-[#f1f1f1] text-black placeholder-gray-500 rounded-lg outline-none"
            required
          />
          <button
            type="submit"
            className="bg-[#29c46b] hover:bg-[#21a95d] text-black font-semibold px-6 py-2 rounded-lg transition"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-gray-500">
          You can opt out anytime. See our{" "}
          <a href="/privacy" className="underline text-green-600 hover:text-white">
            privacy statement.
          </a>
        </p>
      </div>

      {/* ✅ Rotated Responsive Image */}
      <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 rotate-[-20deg] opacity-95">
        <Image
          src={scenicImg}
          alt="Scenic Cottage"
          width={450}
          height={450}
          className="hidden sm:block w-[280px] md:w-[420px] lg:w-[500px] object-contain"
        />
      </div>
    </div>
  );
};

export default NewsletterSignup;
