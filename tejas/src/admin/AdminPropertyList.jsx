import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Fetch all properties when the component loads

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // 💡 FIX 1: Fetch all properties API call
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/properties`
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []); // Function to handle deleting a property

  const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const token = localStorage.getItem("token");
        // 💡 FIX 2: Delete property API call
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/properties/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ); // Remove the deleted property from the list without reloading the page

        setProperties(properties.filter((p) => p._id !== id));
        alert("Property deleted successfully!");
      } catch (err) {
        alert("Failed to delete property.");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading properties...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
                 {" "}
      <div className="max-w-7xl mx-auto">
                       {" "}
        <div className="flex justify-between items-center mb-6">
                             {" "}
          <h2 className="text-3xl font-bold text-gray-800">
            Manage Properties 📊
          </h2>
                             {" "}
          <Link
            to="/admin/add-property"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
                                    + Add New Property                    {" "}
          </Link>
                         {" "}
        </div>
                                       {" "}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                             {" "}
          <table className="w-full text-left table-auto">
                                   {" "}
            <thead>
                                         {" "}
              <tr className="bg-gray-100 border-b">
                                               {" "}
                <th className="p-4 font-semibold">Image</th>                   
                            <th className="p-4 font-semibold">Title</th>       
                                       {" "}
                <th className="p-4 font-semibold">Price Range</th>             
                                 {" "}
                <th className="p-4 font-semibold">Location</th>                 
                              <th className="p-4 font-semibold">Actions</th>   
                                       {" "}
              </tr>
                                     {" "}
            </thead>
                                   {" "}
            <tbody>
                                         {" "}
              {properties.map((property) => (
                <tr key={property._id} className="border-b hover:bg-gray-50">
                                                     {" "}
                  <td className="p-4">
                                                           {" "}
                    <img
                      src={property.mainImage}
                      alt={property.title}
                      className="w-20 h-16 object-cover rounded-md"
                    />
                                                       {" "}
                  </td>
                                                     {" "}
                  <td className="p-4 font-medium text-gray-800">
                    {property.title}
                  </td>
                                                     {" "}
                  <td className="p-4 text-gray-600">{property.priceRange}</td> 
                                                   {" "}
                  <td className="p-4 text-gray-600">{property.address}</td>     
                                               {" "}
                  <td className="p-4">
                                                           {" "}
                    <div className="flex items-center gap-4">
                                                                 {" "}
                      {/* Link to a future Edit page */}                       
                                         {" "}
                      <Link
                        to={`/admin/edit-property/${property._id}`}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                                                                        Edit ✏️
                                                                   {" "}
                      </Link>
                                                                 {" "}
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="text-red-600 hover:underline font-semibold"
                      >
                                                                        Delete
                        🗑️                                            {" "}
                      </button>
                                                             {" "}
                    </div>
                                                       {" "}
                  </td>
                                                 {" "}
                </tr>
              ))}
                                     {" "}
            </tbody>
                               {" "}
          </table>
                         {" "}
        </div>
                   {" "}
      </div>
             {" "}
    </div>
  );
};

export default AdminPropertyList;
