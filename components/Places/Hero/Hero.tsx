import React from 'react'

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

        {/* === Heading === */}
        <div className="flex flex-col space-y-8 max-w-[900px] items-center">
          <h1
          className="font-poppins font-medium text-[96px] leading-[1.1] max-w-[900px]"
        >
          Discover Wonders <br />
          Around <span className="text-[#4CFF88]">Sigiriya</span>
        </h1>
        </div>

        {/* === Right Column Text (moved down and responsive) === */}
        <div className="mt-10 lg:mt-0 lg:absolute lg:right-20 lg:bottom-24 max-w-md border-l-4 border-green-500 pl-6 space-y-4">
          
          <p className="font-sfpro font-bold text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-snug drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Explore the best attractions and hidden gems around Sigiriya for locals and tourists alike.
          </p>

        

        </div>

      </div>

    </div>
  )
}

export default Hero
