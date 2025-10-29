import React from 'react';
import axis from "../assets/bank/axis.png";
import icici from "../assets/bank/icici.png";
import bom from "../assets/bank/bom.png";
import sbi from "../assets/bank/sbi.png";
import hdfc from "../assets/bank/hdfc.png";
import bob from "../assets/bank/bob.png";
import uco from "../assets/bank/uco.png";
import canara from "../assets/bank/canera.png"; // Aapke original code mein 'canera.png' tha, check kar lena

const collaborationLogos = [
  { name: "Axis Bank", src: axis },
  { name: "ICICI Bank", src: icici },
  { name: "Bank of Maharashtra", src: bom },
  { name: "SBI", src: sbi },
  { name: "HDFC Bank", src: hdfc },
  { name: "Bank of Baroda", src: bob },
  { name: "UCO Bank", src: uco },
  { name: "Canara Bank", src: canara },
];

export const Bank = () => {
  return (
    <section className="bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center [font-family:'Inria_Serif',serif]">
          {/* Title ko text-left se text-center kar diya, marquee ke saath behtar lagega */}
          Home Loan Collaboration
        </h2>
        
        {/* STEP 1: Wrapper DIV. 
          Ye content ko chupa dega (overflow-hidden).
          'mask-image' se side mein fade effect aayega.
        */}
        <div 
          className="w-full overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          {/* STEP 2: Animating DIV. 
            'flex' sabko line mein rakhega.
            'w-max' isse itna chauda banayega jitna content hai.
            'animate-scroll' hamara custom animation hai.
          */}
          <div className="flex w-max animate-scroll">
            
            {/* STEP 3: Sabse Important - Seamless Loop.
              Hum array ko do baar map kar rahe hain [...collaborationLogos, ...collaborationLogos]
              taaki loop continuous lage.
            */}
            {[...collaborationLogos, ...collaborationLogos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`} // Key ko unique banaya
                className="flex-shrink-0 w-64 h-40 mx-4 bg-white rounded-xl shadow-md p-6 
                           flex items-center justify-center"
                // Hover effects hata diye kyunki scroll hote waqt unka sense nahi banta
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="max-h-24 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bank;