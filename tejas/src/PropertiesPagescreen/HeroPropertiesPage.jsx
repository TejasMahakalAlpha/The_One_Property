import React from 'react';
import heroImage from '../assets/HeroPropertiesPage.png'; 

const HeroPropertiesPage = () => {
  return (
    <div>
      
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={heroImage}
          alt="Properties Hero Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Properties Page</h1>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          At TheOneProperty, every property listing is carefully verified by our admin team to ensure authenticity and trust.
          Each property card provides a quick snapshot with the project name, location, price, property type, and key highlights such as
          availability, loan options, or possession status. Buyers can easily browse through listings in grid or list view, apply filters for location, budget, or property type, and explore the most relevant options.
          Clicking on a property opens the detailed page, where users can view a complete overview of the project, photo galleries, floor plans, amenities, and builder information.
          To make the process seamless, every property detail page also includes a simple enquiry form, allowing interested buyers
          to share their details and connect directly with the admin and builders.
        </p>
      </div>
    </div>
  );
};

export default HeroPropertiesPage;
