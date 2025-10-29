import React from 'react';
import contactBgVideo from '../assets/about/about.mp4'; 

export const ContactHeroSection = () => {
  return (
    
    <section className="relative w-full h-screen min-h-[400px] overflow-hidden">
      
      {/* Video element remains the same */}
      <video 
        src={contactBgVideo} 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay remains the same */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      
      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 z-20">
        <div className="pb-12 md:pb-16 lg:pb-20">
          {/* 'font-family' क्लास हटाया गया */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 to-green-400 bg-clip-text text-transparent max-w-2xl">
            We'd love to hear from you. Get in touch today.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;