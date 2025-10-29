import React from 'react';
import axis from "../assets/bank/axis.png";
import icici from "../assets/bank/icici.png";
import bom from "../assets/bank/bom.png";
import sbi from "../assets/bank/sbi.png";
import hdfc from "../assets/bank/hdfc.png";
import bob from "../assets/bank/bob.png";
import uco from "../assets/bank/uco.png";
import canara from "../assets/bank/canera.png";

const collaborationLogos = [
  { name: "Axis Bank", src: axis, width: 256 }, // width added for calc
  { name: "ICICI Bank", src: icici, width: 256 },
  { name: "Bank of Maharashtra", src: bom, width: 256 },
  { name: "SBI", src: sbi, width: 256 },
  { name: "HDFC Bank", src: hdfc, width: 256 },
  { name: "Bank of Baroda", src: bob, width: 256 },
  { name: "UCO Bank", src: uco, width: 256 },
  { name: "Canara Bank", src: canara, width: 256 },
];

const BankAnimationStyles = () => {
    // Number of unique items
    const numItems = collaborationLogos.length;
    // Single item width (w-64 = 256px) + margin (mx-4 = 16px left + 16px right = 32px) => Total 288px.
    // To make it seamless, calculate translation distance for ONE set of logos.
    const scrollDistance = numItems * 288; 

    return (
        <style>
            {`
                /* 40 seconds mein ek set scroll hoga */
                .animate-bank-scroll {
                    animation: bankScroll 40s linear infinite;
                }
                
                @keyframes bankScroll {
                    0% {
                        transform: translateX(0);
                    }
                    /* Translate by the full width of the first set of logos */
                    100% {
                        transform: translateX(-${scrollDistance}px); 
                    }
                }
            `}
        </style>
    );
};


export const Bank = () => {
    // Seamless loop ke liye array ko teen baar copy kiya gaya
    const duplicatedLogos = [...collaborationLogos, ...collaborationLogos, ...collaborationLogos];

    return (
        <section className="bg-slate-100 py-12">
            {/* ✅ FIX: AnimationStyles render kiya gaya */}
            <BankAnimationStyles />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center [font-family:'Inria_Serif',serif]">
                    Home Loan Collaboration
                </h2>
                
                {/* Outer Wrapper (overflow hidden) */}
                <div 
                    className="w-full overflow-hidden relative group" // 'group' added for hover pause
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
                    }}
                >
                    {/* Inner Animating DIV */}
                    <div className="flex w-max animate-bank-scroll group-hover:animation-play-state:paused">
                        
                        {/* Array ko do baar map karne ke bajaye, teen baar map kiya hai jisse loop aur smooth lage */}
                        {duplicatedLogos.map((logo, index) => (
                            <div
                                key={`${logo.name}-${index}`} 
                                className="flex-shrink-0 w-64 h-40 mx-4 bg-white rounded-xl shadow-md p-6 
                                                flex items-center justify-center"
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