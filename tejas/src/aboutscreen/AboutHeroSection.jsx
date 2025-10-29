import React from 'react';

import aboutherovideo from "../assets/about/aboutherovideo.mp4";

export const AboutHeroSection = () => {
  return (
    <section className="bg-white w-full">
      <video 
      
        src={aboutherovideo}
        alt="Promotional video for the company"
        className="w-full h-screen object-cover"
        autoPlay
        loop
        muted
        playsInline 
      >
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default AboutHeroSection;

