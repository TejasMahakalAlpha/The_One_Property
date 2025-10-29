import React from 'react';

const WhoAreWe = () => {
  return (
    // Outer section mein w-full, background color, aur padding hai, jo responsive hai
    <section className="w-full bg-gray-100 py-12 md:py-16">
      
      {/* Container jo content ko center karta hai aur max-width limit karta hai */}
      {/* px-4, sm:px-6, lg:px-8 classes hain taaki padding har device par adjust ho */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Main Heading: Size responsive kiya hai */}
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#623654] mb-8 md:mb-10">
          About Us
        </h2>

        {/* Sub Heading: Size responsive kiya hai */}
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-600">
          Who We Are
        </h3>

        {/* Paragraph: Text size responsive kiya hai */}
        <p className="mt-4 font-serif text-base md:text-lg leading-relaxed text-gray-600">
          TheOneProperty is a trusted real estate platform that connects builders, buyers, and investors through a
          centralized, admin-managed property listing system. Unlike other fragmented portals, every property listed here
          is carefully verified and uploaded by our admin team, ensuring authenticity and transparency.
        </p>

      </div>
    </section>
  );
};

export default WhoAreWe;