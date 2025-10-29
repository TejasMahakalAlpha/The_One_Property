import React, { useState } from "react";
import axios from "axios";

// A list of all possible amenities to generate checkboxes
const AMENITIES_LIST = [
  "Rain Water Harvesting",
  "Park",
  "Reserved Parking",
  "Intercom Facility",
  "Visitor Parking",
  "Private Terrace/Garden",
];

const AdminAddProperty = () => {
  const initialFormState = {
    // Basic Info
    title: "",
    priceRange: "",
    mainImage: "",
    thumbnailImages: "", // Will be stored as a comma-separated string for simplicity
    
    // Property Highlight
    configuration: "", // e.g., 2BHK
    size: "", // e.g., 1200sq.ft
    price: "", // e.g., ₹48.38 Lacs | ₹6,000/sq.ft
    possessionBy: "",
    developer: "",
    carpetArea: "",

    // More Details
    floor: "",
    status: "Ready to Move",
    facing: "East",
    lifts: "",
    furnishedStatus: "Unfurnished",

    // Location
    address: "",
    landmark: "",

    // Amenities
    amenities: [],
  };

  const [form, setForm] = useState(initialFormState);

  // Handles changes for simple text inputs and select dropdowns
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handles changes for the amenities checkboxes
  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the amenity to the array if it's checked
      setForm((prevForm) => ({
        ...prevForm,
        amenities: [...prevForm.amenities, value],
      }));
    } else {
      // Remove the amenity from the array if it's unchecked
      setForm((prevForm) => ({
        ...prevForm,
        amenities: prevForm.amenities.filter((amenity) => amenity !== value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Prepare the data for submission (e.g., split thumbnail string into an array)
      const submissionData = {
        ...form,
        thumbnailImages: form.thumbnailImages.split(',').map(url => url.trim()),
      };

      await axios.post("http://localhost:5000/api/properties", submissionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Property added successfully!");
      setForm(initialFormState); // Reset form to initial state
    } catch (err) {
      console.error("Failed to add property:", err);
      alert("Failed to add property. Check console for details.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
          Add New Property
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Basic Information */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-gray-700 mb-2">Basic Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">Property Title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Green Acres" className="w-full mt-1 p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Price Range</label>
                <input name="priceRange" value={form.priceRange} onChange={handleChange} placeholder="e.g., 50L - 70L" className="w-full mt-1 p-2 border rounded-md" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Main Image URL</label>
              <input name="mainImage" type="url" value={form.mainImage} onChange={handleChange} placeholder="https://example.com/main-image.jpg" className="w-full mt-1 p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Thumbnail Image URLs (comma-separated)</label>
              <input name="thumbnailImages" type="text" value={form.thumbnailImages} onChange={handleChange} placeholder="url1, url2, url3" className="w-full mt-1 p-2 border rounded-md" />
            </div>
          </fieldset>

          {/* Section: Property Highlights */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-gray-700 mb-2">Property Highlights</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input name="configuration" value={form.configuration} onChange={handleChange} placeholder="Configuration (e.g., 2BHK)" className="p-2 border rounded-md" />
              <input name="size" value={form.size} onChange={handleChange} placeholder="Size (e.g., 1200sq.ft)" className="p-2 border rounded-md" />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price Details" className="p-2 border rounded-md" />
              <input name="possessionBy" value={form.possessionBy} onChange={handleChange} placeholder="Possession By" className="p-2 border rounded-md" />
              <input name="developer" value={form.developer} onChange={handleChange} placeholder="Developer" className="p-2 border rounded-md" />
              <input name="carpetArea" value={form.carpetArea} onChange={handleChange} placeholder="Carpet Area" className="p-2 border rounded-md" />
            </div>
          </fieldset>

          {/* Section: More Details */}
          <fieldset className="space-y-4">
             <legend className="text-xl font-semibold text-gray-700 mb-2">More Details</legend>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input name="floor" value={form.floor} onChange={handleChange} placeholder="Floor (e.g., 7 out of 22)" className="p-2 border rounded-md" />
                <input name="lifts" type="number" value={form.lifts} onChange={handleChange} placeholder="Number of Lifts" className="p-2 border rounded-md" />
                <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded-md bg-white">
                    <option>Ready to Move</option>
                    <option>Under Construction</option>
                </select>
                <select name="facing" value={form.facing} onChange={handleChange} className="p-2 border rounded-md bg-white">
                    <option>East</option>
                    <option>West</option>
                    <option>North</option>
                    <option>South</option>
                </select>
                <select name="furnishedStatus" value={form.furnishedStatus} onChange={handleChange} className="p-2 border rounded-md bg-white">
                    <option>Unfurnished</option>
                    <option>Semi-Furnished</option>
                    <option>Furnished</option>
                </select>
             </div>
          </fieldset>
          
          {/* Section: Location */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-gray-700 mb-2">Location</legend>
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Full Address" className="w-full p-2 border rounded-md" rows="3"></textarea>
            <input name="landmark" value={form.landmark} onChange={handleChange} placeholder="Landmark" className="w-full p-2 border rounded-md" />
          </fieldset>

          {/* Section: Amenities */}
          <fieldset>
            <legend className="text-xl font-semibold text-gray-700 mb-4">Amenities</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {AMENITIES_LIST.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={form.amenities.includes(amenity)}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </fieldset>
          
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProperty;