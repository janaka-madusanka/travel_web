"use client";
import React from "react";
import { motion } from "motion/react";
import BookingForm from "./BookingForm";

const Hero = () => {
  return (
    <div className="relative w-full h-[120vh] sm:h-[100vh] overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <video
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12 md:px-20 lg:px-32 text-white">

        {/* === Main Heading === */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-sfpro font-medium text-2xl sm:text-4xl md:text-7xl lg:text-6xl leading-tight 
                     bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text 
                     drop-shadow-[0_4px_5px_rgba(0,0,0,0.3)]"
        >
          Your Perfect Getaway <br /> Awaits in Sigiriya
        </motion.h1>

        {/* === Subtitle / Right Column Text with Animated Green Line === */}
        <motion.div
          className="mt-6 lg:mt-0 lg:absolute lg:right-20 lg:bottom-24 max-w-md flex items-start"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
        {/* Vertical Green Line */}
          <motion.div
            className="w-3.5 bg-green-500 mr-4 origin-bottom h-50" // h-24 defines height
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />


          {/* Text Block */}
          <div className="space-y-4">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="font-sfpro font-bold text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-snug drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              Experience the best cabana lodging near Sigiriya, crafted for your perfect escape.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sfpro font-medium text-sm sm:text-base md:text-[18px] leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              No need to worry, your satisfaction is our top priority.
            </motion.p>
          </div>
        </motion.div>

        {/* === Animated Green Line Under Title === */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "125px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 bg-green-500 mt-4"
        />

        {/* === Booking Form === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 w-full max-w-3xl backdrop-blur-[2px] bg-[rgba(29,29,29,0.61)] rounded-[30px] p-8 flex flex-col gap-6"
        >
          <BookingForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
