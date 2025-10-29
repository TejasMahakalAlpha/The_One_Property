import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import EnquiryModal from "../PropertiesPagescreen/EnquiryModal";
import axios from 'axios';

// Property card component
const PropertyCard = ({ property, onEnquire }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <img
      src={property.mainImage || 'https://via.placeholder.com/400x300'}
      alt={property.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
      <p className="text-gray-600 mt-1">{property.address}</p>
      <p className="text-2xl font-bold text-blue-600 my-3">₹{property.priceRange}</p>
      <div className="border-t border-gray-200 my-2"></div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{property.configuration}</span>
        <span>{property.size}</span>
        <span>{property.status}</span>
      </div>
      <div className="mt-auto pt-4 flex items-center gap-3">
        <Link
          to={`/property/${property._id}`}
          className="flex-1 py-2 px-2 text-center bg-[#5f3754] text-white font-semibold rounded-md hover:bg-purple-900 transition-colors"
        >
          View Details
        </Link>
        <button
          className="flex-1 py-2 px-2 text-center bg-[#5f3754] text-white font-semibold rounded-md hover:bg-purple-900 transition-colors"
          onClick={() => onEnquire(property)}
        >
          Enquire Now
        </button>
      </div>
    </div>
  </div>
);

export const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleEnquireClick = (property) => {
    setSelectedProperty(property);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading Properties...</p>
      </div>
    );
  }

  return (
    <>
      {/* 🎯 यहाँ से [font-family:'Inria_Serif',serif] क्लास हटाई गई है */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters and Sort UI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {['Location', 'Budget', 'Property Type'].map((label) => (
              <div key={label}>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  {label} <ChevronDown className="h-4 w-4 ml-1" />
                </label>
                <input
                  type="text"
                  placeholder={
                    label === 'Location'
                      ? 'City Area/Pin code'
                      : label === 'Budget'
                      ? 'Min-Max/Max'
                      : 'Flat / Villa / Commercial'
                  }
                  className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            ))}
          </div>

          {/* Sorting Buttons */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-4 mb-10">
            <h3 className="text-lg font-bold text-gray-800 mr-4">Sort By</h3>
            <button className="py-2 px-5 text-sm font-semibold bg-blue-600 text-white rounded-full shadow-sm">
              Newest
            </button>
            <button className="py-2 px-5 text-sm font-semibold bg-gray-100 text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
              Price: Low to High
            </button>
            <button className="py-2 px-5 text-sm font-semibold bg-gray-100 text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
              Price: High to Low
            </button>
            <button className="py-2 px-5 text-sm font-semibold bg-gray-100 text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
              Most Popular
            </button>
          </div>

          {/* Property Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onEnquire={handleEnquireClick}
              />
            ))}
          </div>
        </div>

        {/* Enquiry Modal */}
        {isModalOpen && (
          <EnquiryModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            property={selectedProperty}
          />
        )}
      </div>
    </>
  );
};
