import React from "react";

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Properties", href: "/contact" },
    { name: "Contact Us", href: "/properties" },
  ];

  const socialMediaPlatforms = [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Youtube", href: "#" },
    // { name: "Twitter/X", href: "#" },
  ];

  return (
    <footer className="w-full bg-[#faebfa] px-6 py-16 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 lg:flex-row lg:gap-16">
       
        <div className="flex w-full flex-col items-start gap-4 lg:w-2/5">
          <div>
            <h3 className="font-serif text-2xl font-bold">
              <span className="text-[#2264ac]">TheOne</span>
              <span className="text-black">Property</span>
            </h3>
            <p className="mt-2 text-base text-gray-700">
              TheOneProperty is a trusted real estate platform that connects
              builders, buyers, and investors through admin-verified property
              listings.
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-serif text-lg font-bold">Copyright Line</h4>
            <p className="text-base text-gray-700">
              © 2025 TheOneProperty. All Rights Reserved.
            </p>
          </div>
        </div>

      
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:w-3/5">
         
          <div>
            <h4 className="font-serif text-lg font-bold text-[#2264ac]">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-base text-black transition-colors hover:text-[#2264ac]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h4 className="font-serif text-lg font-bold text-[#2264ac]">
              Contact Information
            </h4>
            
            <div className="mt-4 space-y-3 text-base text-black">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 h-4 w-4 flex-shrink-0 text-gray-600" />
                <span>Mary Villa, Badalepada, Giriz, Vasai West</span>
              </div>
              <a href="tel:+919322342225" className="flex items-start gap-3 transition-colors hover:text-[#2264ac]">
                <FaPhoneAlt className="mt-1 h-4 w-4 flex-shrink-0 text-gray-600" />
                <span>+91 93223 42225</span>
              </a>
              <a href="mailto:info@theoneproperty.com" className="flex items-start gap-3 transition-colors hover:text-[#2264ac]">
                <FaEnvelope className="mt-1 h-4 w-4 flex-shrink-0 text-gray-600" />
                <span>info@theoneproperty.com</span>
              </a>
            </div>
          </div>

        
          <div>
            <h4 className="font-serif text-lg font-bold text-[#2264ac]">
              Social Media
            </h4>
            <ul className="mt-4 space-y-2">
              {socialMediaPlatforms.map((platform) => (
                <li key={platform.name}>
                  <a href={platform.href} className="text-base text-black transition-colors hover:text-[#2264ac]">
                    {platform.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;