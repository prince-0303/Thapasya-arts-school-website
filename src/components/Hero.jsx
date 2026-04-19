import React from 'react';

const Hero = () => {
  return (
    <section 
      id="hero"
      className="relative w-full min-h-[90vh] flex items-center justify-center -mt-20 overflow-hidden" 
    >
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${import.meta.env.VITE_S3_BASE_URL}/hero_bg.png)` }}
      />
      
      {/* Dark Red Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 mt-20 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-2xl mb-6 tracking-wide">
          Where Tradition <br/>
          <span className="text-yellow-100/90 italic font-light relative">Meets Excellence</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/90 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
          Immerse yourself in the timeless beauty of classical Indian arts.
        </p>
      </div>

    </section>
  );
};

export default Hero;
