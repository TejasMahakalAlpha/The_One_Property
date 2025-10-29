import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import EnquiryModal from "../PropertiesPagescreen/EnquiryModal";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Filters
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState({ min: "", max: "" });
  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    const fetchProperties = async () => {
      if (!API_BASE_URL) {
        console.error("API Base URL is not defined.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/properties`);
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // 🧠 FILTER + SORT logic
  useEffect(() => {
    let result = [...properties];

    // Location filter
    if (location.trim() !== "") {
      result = result.filter(
        (p) =>
          p.address?.toLowerCase().includes(location.toLowerCase()) ||
          p.city?.toLowerCase().includes(location.toLowerCase()) ||
          p.pinCode?.toString().includes(location)
      );
    }

    // Budget filter
    if (budget.min || budget.max) {
      result = result.filter((p) => {
        const price = parseFloat(p.priceRange?.replace(/[₹,]/g, "")) || 0;
        const min = budget.min ? parseFloat(budget.min) : 0;
        const max = budget.max ? parseFloat(budget.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Property type filter
    if (type.trim() !== "") {
      result = result.filter((p) =>
        p.type?.toLowerCase().includes(type.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case "Price: Low to High":
        result.sort(
          (a, b) =>
            parseFloat(a.priceRange?.replace(/[₹,]/g, "")) -
            parseFloat(b.priceRange?.replace(/[₹,]/g, ""))
        );
        break;
      case "Price: High to Low":
        result.sort(
          (a, b) =>
            parseFloat(b.priceRange?.replace(/[₹,]/g, "")) -
            parseFloat(a.priceRange?.replace(/[₹,]/g, ""))
        );
        break;
      case "Newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProperties(result);
  }, [location, budget, type, sortBy, properties]);

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
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Location */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center">
                Location <ChevronDown className="h-4 w-4 ml-1" />
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City / Area / Pin code"
                className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center">
                Budget <ChevronDown className="h-4 w-4 ml-1" />
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={budget.min}
                  onChange={(e) =>
                    setBudget({ ...budget, min: e.target.value })
                  }
                  className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={budget.max}
                  onChange={(e) =>
                    setBudget({ ...budget, max: e.target.value })
                  }
                  className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center">
                Property Type <ChevronDown className="h-4 w-4 ml-1" />
              </label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Flat / Villa / Commercial"
                className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Sorting */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-4 mb-10">
            <h3 className="text-lg font-bold text-gray-800 mr-4">Sort By</h3>
            {["Newest", "Price: Low to High", "Price: High to Low"].map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`py-2 px-5 text-sm font-semibold rounded-full shadow-sm transition-colors ${
                  sortBy === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Property Cards */}
          {filteredProperties.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No properties found for your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  onEnquire={handleEnquireClick}
                />
              ))}
            </div>
          )}
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
