import React from 'react';
import { LuShieldCheck, LuSearch, LuAward, LuHeartHandshake } from 'react-icons/lu';
import coreValuesDiagram from '../assets/core-values-diagram.png'; 

const valuesData = [
  {
    icon: <LuShieldCheck className="h-6 w-6 text-yellow-600" />,
    title: 'Trust',
    description: 'Verified listings only - every property is checked and approved by our admin team.',
  },
  {
    icon: <LuSearch className="h-6 w-6 text-gray-700" />,
    title: 'Transparency',
    description: 'Authentic and clear details for both buyers and builders.',
  },
  {
    icon: <LuAward className="h-6 w-6 text-yellow-600" />,
    title: 'Responsibility',
    description: 'Providing equal support and guidance to all stakeholders in the ecosystem.',
  },
  {
    icon: <LuHeartHandshake className="h-6 w-6 text-gray-700" />,
    title: 'Integrity',
    description: 'Upholding honest practices to build long-term and reliable relationships.',
  },
];

const CoreValues = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      
      <div className="container mx-auto max-w-6xl px-8 sm:px-10 lg:px-12">
        
        {/* 'font-serif' क्लास हटाया गया */}
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
          Core Values
        </h2>

        <div className="mt-10 flex flex-col items-center gap-12 md:flex-row md:gap-16">
          
          <div className="w-full space-y-8 md:w-3/5">
            {valuesData.map((value) => (
              <div key={value.title} className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">{value.icon}</div>
                <div>
                  {/* 'font-serif' क्लास हटाया गया */}
                  <h4 className="font-bold text-gray-800">{value.title}</h4>
                  {/* 'font-serif' क्लास हटाया गया */}
                  <p className="mt-1 text-gray-600">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-2/5">
            <img
              src={coreValuesDiagram}
              alt="Core Values Diagram"
              className="mx-auto w-full max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;