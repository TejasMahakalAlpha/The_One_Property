import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 🛑 IMPORTANT: AnimationStyles component yahan se hata diya gaya hai.
// Iska CSS code aapko neeche di gayi 'index.css' file mein paste karna hoga.

export const Highlight = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlightedProperties = async () => {
      if (!API_BASE_URL) {
        console.error("API Base URL is not defined.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/properties`);
        setProperties(response.data || []);
      } catch (error) {
        console.error("Failed to fetch highlighted properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightedProperties();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-8 bg-white overflow-hidden text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Loading Highlights...
        </h2>
      </section>
    );
  }

  // Logic for Infinite Scroll Duplication (using max 10 properties)
  const propertiesToScroll = properties.slice(0, 10);

  if (propertiesToScroll.length < 2) {
    return null;
  }

  const duplicatedProperties = [
    ...propertiesToScroll,
    ...propertiesToScroll,
    ...propertiesToScroll,
  ];

  // Total Container Width: (30 items * 316px)
  const totalContainerWidth = duplicatedProperties.length * 316; // 9480px

  return (
    <section className="w-full py-8 bg-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Highlighted Properties
        </h2>
      </div>

      {/* Outer container: overflow-hidden scrollbar hide karne ke liye */}
      <div className="group w-full overflow-hidden">
        {/* Inner container: animation class aur width set karein */}
        <div
          className="flex flex-shrink-0 animate-scroll-final"
          style={{ width: `${totalContainerWidth}px` }}
        >
          {duplicatedProperties.map((property, index) => (
            <Link
              key={`${property._id || property.id}-${index}`}
              to={`/property/${property._id || property.id}`}
              className="flex-shrink-0 w-[300px] mx-2 block"
            >
              {/* Card Content with Image Fix */}
              <div className="bg-white border-2 border-blue-600 rounded-xl p-4 transition-shadow hover:shadow-xl h-full">
                
                <img
                  src={
                    property.mainImage ||
                    property.thumbnailImages?.[0] ||
                    "https://placehold.co/400/5f3754/ffffff?text=Property+Highlight"
                  }
                  alt={property.title || "Property"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {property.title || "Property Title"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {property.location || "Location not available"}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    ₹{property.price || property.priceRange || "N/A"}
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