import React from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="glass fixed w-full z-50 top-0 left-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="font-serif text-2xl font-bold text-primary tracking-wide">
              Thapasya 
              <span className="text-gray-800 font-light text-xl ml-2 hidden sm:inline-block">School of Arts</span>
            </span>
          </div>

          {/* Right Action */}
          <div className="flex items-center space-x-4">
            <Link 
              to="enquiry-form" 
              spy={true} 
              smooth={true} 
              offset={-80} 
              duration={500}
              className="cursor-pointer text-gray-600 hover:text-primary font-medium transition-colors hidden sm:block mr-2"
            >
              Enquiry
            </Link>
            <Link 
              to="program-booking" 
              spy={true} 
              smooth={true} 
              offset={-80} 
              duration={500}
              className="cursor-pointer text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Program Booking
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
