import React, { useState, useEffect } from "react";
import axios from 'axios'; 
// Navigation के लिए Link इम्पोर्ट किया गया
import { Link } from 'react-router-dom'; 

const AnimationStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

      * {
        font-family: 'Inter', sans-serif;
      }

      /* Animation speed ko adjust kiya gaya hai */
      .animate-scroll {
        animation: scroll 30s linear infinite;
      }

      /* Base on 6 cards of ~320px width */
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-320px * 6)); 
        }
      }

      .group:hover .animate-scroll {
        animation-play-state: paused;
      }
    `}
  </style>
);

export const Highlight = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHighlightedProperties = async () => {
      try {
        // PropertiesPage की तरह, सभी प्रॉपर्टीज को fetch करने के लिए
        const response = await axios.get('http://localhost:5000/api/properties');
        
        // डेटा सेट करें
        setProperties(response.data || []); 
        
      } catch (error) {
        console.error("Failed to fetch highlighted properties:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHighlightedProperties();
  }, []); 

  // Loading State
  if (loading) {
      return (
          <section className="w-full py-8 bg-white overflow-hidden text-center">
              <h2 className="text-2xl font-semibold text-gray-800">Loading Highlights...</h2>
          </section>
      );
  }

  // Handle case where no properties are available
  if (properties.length === 0) {
       return null; 
  }
  
  // Duplication for infinite scroll effect (using top 10 properties)
  const propertiesToScroll = properties.slice(0, 10); 
  const duplicatedProperties = [...propertiesToScroll, ...propertiesToScroll, ...propertiesToScroll]; 

  return (
    <section className="w-full py-8 bg-white overflow-hidden">
      <AnimationStyles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Highlighted Properties
        </h2>
      </div>
      
      <div className="group w-full overflow-hidden">
        <div className="flex w-max animate-scroll">
          {duplicatedProperties.map((property, index) => (
            // 🎯 मुख्य बदलाव: Link का 'to' prop अब PropertiesPage के अनुसार है
            <Link 
              // key के लिए property._id और index का इस्तेमाल करें
              key={`${property._id || property.id}-${index}`} 
              // अब 'to' prop `/property/:id` फॉर्मेट इस्तेमाल करेगा
              to={`/property/${property._id || property.id}`} 
              className="flex-shrink-0 w-[300px] sm:w-72 mx-2 sm:mx-4 block" 
            >
              <div className="bg-white border-2 border-blue-600 rounded-xl p-4 transition-shadow hover:shadow-xl h-full">
                <img
                  // Image Source: mainImage या पहली thumbnail
                  src={property.mainImage || property.thumbnailImages?.[0] || "https://via.placeholder.com/400"}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div>
                  <h3 className="text-lg text-gray-900 truncate">{property.title}</h3>
                  <p className="text-xl font-semibold text-gray-900 mt-1">
                    {/* Price या Price Range */}
                    ₹{property.price || property.priceRange}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlight;