import { navLinks } from '@/constant/constant'
import Link from 'next/link'
import React from 'react'
import { CgClose } from 'react-icons/cg'
import { VscChromeClose } from 'react-icons/vsc'

type Props = {
  showNav: boolean;
  closeNav: ()=> void;
}

const MobileNav = ({closeNav , showNav}:Props) => {

  const navOpen = showNav?"translate-x-0":"translate-x-[-100%]"

  return (
    <div>
      {/* Overlay */}
      <div className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[1002] bg-black opacity-75 w-full h-screen`}></div>

      {/* navLinks */}
      <div className={`text-white ${navOpen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-rose-900 space-y-6 z-[1050]`}>
        {navLinks.map((link) => (
          <Link key={link.id} href={link.url}>
            <p className='text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]'>
              {link.label}
            </p>
          </Link>
        ))}
        {/* close button */}

        <CgClose onClick={closeNav} className='absolute top-[1.4rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 cursor-pointer' />
      </div>

    </div>
  )
}

export default MobileNav
