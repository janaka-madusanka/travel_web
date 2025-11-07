"use client";
import { navLinks } from '@/constant/constant'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaBed } from 'react-icons/fa'
import { HiBars3BottomRight } from 'react-icons/hi2'

type Props = {
  openNav: () => void
}

const Nav = ({ openNav }: Props) => {

  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      setNavBg(window.scrollY >= 90);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className={`${navBg ? 'bg-blue-950 shadow-md' : 'bg-transparent'} transition-all duration-200 fixed top-0 w-full z-[1000]`}>
      <div className='flex items-center justify-between h-[10vh] sm:h-[12vh] w-[92%] md:w-[88%] xl:w-[80%] mx-auto'>

        {/* ✅ Logo – responsive text size */}
        <div className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl flex items-baseline">
          Scenic
          <span className="font-normal ml-1 text-sm sm:text-base md:text-xl lg:text-2xl">
            Cottage
          </span>
        </div>

        {/* ✅ Desktop Navigation Links */}
        <div className='hidden lg:flex items-center space-x-8 xl:space-x-12'>
          {navLinks.map((link) => (
            <Link href={link.url} key={link.id} className="group">
              <p className="relative text-white text-sm md:text-base font-medium
                after:block after:content-[''] after:absolute after:-bottom-[3px] after:left-0
                after:h-[2px] after:bg-gray-400 after:w-0 after:transition-all after:duration-300
                group-hover:after:w-full">
                {link.label}
              </p>
            </Link>
          ))}
        </div>

        {/* ✅ Buttons Section */}
        <div className='flex items-center space-x-3 sm:space-x-5'>
          
          {/* Book Now Button */}
          <button
            className="flex items-center gap-1 sm:gap-2 border border-white text-white text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 rounded-full 
            hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
          >
            Book Now 
            <span className="hidden sm:block"><FaBed /></span>
          </button>

          {/* Mobile Hamburger */}
          <HiBars3BottomRight
            onClick={openNav}
            className='w-7 h-7 sm:w-8 sm:h-8 cursor-pointer text-white lg:hidden'
          />
        </div>

      </div>
    </div>
  )
}

export default Nav;
