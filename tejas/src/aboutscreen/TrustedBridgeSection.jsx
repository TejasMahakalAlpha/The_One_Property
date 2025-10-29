import React from 'react';

export const TrustedBridgeSection = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      
      <div className="w-full px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto text-left">
        
        {/* H2 से Inria_Serif क्लास हटाई गई */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Role as Trusted Bridge
        </h2>
        
        {/* P से Inria_Serif क्लास हटाई गई */}
        <p className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed">
          We serve as a reliable bridge between builders and buyers by fostering smooth communication, verified information, and transparent transactions. Our platform ensures that both parties connect with confidence, reducing risks and building trust at every step.
        </p>
        
      </div>
    </section>
  );
};

export default TrustedBridgeSection;