import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-x-4">
        <Link
          to="/admin/add-property"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Property
        </Link>

        
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
