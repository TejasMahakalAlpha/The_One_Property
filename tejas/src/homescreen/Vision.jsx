import React from 'react';
import visionIllustration from "../assets/mission1.png"

const Vision = () => {
  return (
    // CHANGE: py-12/16 se py-4/8 kar diya spacing kam karne ke liye
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-4 md:py-8">
      <div 
        // Gap ko md:gap-12 tak badhaya
        className="flex flex-col items-center gap-8 md:flex-row md:gap-12"
      >
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={visionIllustration}
            alt="Illustration representing the company's vision"
            className="w-full max-w-sm sm:max-w-md h-auto object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2">
          {/* Inner Card style update kiya */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-10 shadow-lg">
            
            <h2 className="font-serif text-3xl font-bold text-[#623654] md:text-4xl">
              Our Vision
            </h2>
            
            <p className="mt-4 font-serif text-base leading-relaxed text-gray-700 md:text-lg">
              To become the most trusted platform for property discovery,
              bridging the gap between developers and buyers, while empowering
              people to make confident and informed real estate decisions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Vision;