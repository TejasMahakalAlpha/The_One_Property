import React from 'react';
import missionIllustration from "../assets/vision12.webp"

const Mission = () => {
  return (
    // CHANGE: py-12/16 se py-4/8 kar diya spacing kam karne ke liye
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-4 md:py-8"> 
      
      {/* Gap ko md:gap-12 tak badhaya */}
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:gap-12">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2"> 
          {/* Card style update kiya */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-10 shadow-lg">
            
            <h2 className="font-serif text-3xl font-bold text-[#623654] md:text-4xl">
              Our Mission
            </h2>
            
            <p className="mt-4 font-serif text-base leading-relaxed text-gray-700 md:text-lg">
              To simplify real estate discovery by creating a secure and transparent marketplace 
              where builders can showcase their projects and buyers can find reliable property 
              information in one place.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={missionIllustration}
            alt="Illustration representing the company's mission"
            className="w-full max-w-sm sm:max-w-md h-auto object-contain" 
          />
        </div>
        
      </div>
    </div>
  );
};

export default Mission;