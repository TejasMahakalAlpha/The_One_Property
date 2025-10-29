import React from 'react';
import desc1 from "../assets/Desc1.png";
import desc2 from "../assets/Desc2.png";

const Description = () => {
  return (
    <section className="bg-white py-4 md:py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-6">
          
          <div className="w-full text-center font-serif lg:w-7/12 lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Description
            </h2>
            
            <p className="mt-2 text-lg font-medium text-gray-700 md:text-xl">
              A trusted, admin-verified platform connecting builders and buyers for seamless property discovery
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-600">
              TheOneProperty is more than just a real estate listing portal – it is a trusted bridge between builders, buyers, and investors. Our platform is fully managed by an expert admin team to ensure every property you see is authentic, verified, and up to date. We bring together reputed builders who want to showcase their projects and genuine buyers who are searching for the right property,
              {/* <a href="#" className="ml-1 whitespace-nowrap font-medium text-blue-600 hover:underline">
                READ MORE
              </a> */}
            </p>
          </div>

          <div className="relative h-64 w-full min-h-[250px] lg:w-5/12">
            <img 
              src={desc1} 
              alt="Isometric modern house"
              className="absolute top-0 right-0 w-2/3 max-w-xs rounded-lg shadow-xl transition-transform hover:scale-105"
            />
            <img 
              src={desc2} 
              alt="Cozy modern house illustration"
              className="absolute bottom-0 left-0 w-4/5 max-w-sm rounded-lg shadow-xl transition-transform hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Description;
