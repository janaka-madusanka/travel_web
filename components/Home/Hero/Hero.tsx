import React from 'react'
import BookingForm from './BookingForm'


const Hero = () => {
  return (
    <div className='relative w-full h-[120vh] sm:h-[100vh] overflow-hidden'>

      {/* ✅ VIDEO BACKGROUND */}
      <video
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        preload='metadata'
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* ✅ DARK OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* ✅ MAIN CONTENT */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12 md:px-20 lg:px-32 text-white">

        {/* === Heading + Booking Form === */}
        <div className="flex flex-col space-y-8 max-w-[900px]">
          <h1
            className="font-sfpro font-medium text-2xl sm:text-4xl md:text-7xl lg:text-6xl leading-tight 
            bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text drop-shadow-[0_4px_5px_rgba(0,0,0,0.3)]"
          >
            Your Perfect Getaway <br /> Awaits in Sigiriya
          </h1>

          {/* Booking Form */}
          <div className="w-full max-w-3xl">
            <BookingForm />
          </div>
        </div>

        {/* === Right Column Text (moved down and responsive) === */}
        <div className="mt-10 lg:mt-0 lg:absolute lg:right-20 lg:bottom-24 max-w-md border-l-4 border-green-500 pl-6 space-y-4">
          
          <p className="font-sfpro font-bold text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-snug drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Experience the best cabana lodging near Sigiriya, crafted for your perfect escape.
          </p>

          <p className="font-sfpro font-medium text-sm sm:text-base md:text-[18px] leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            No need to worry, your satisfaction is our top priority.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Hero
