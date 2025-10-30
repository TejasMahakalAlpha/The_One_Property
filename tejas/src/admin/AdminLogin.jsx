import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 💡 FIX: Using VITE_API_BASE_URL environment variable for the deployed backend URL
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, // <--- Yahan Badlav Kiya Gaya Hai
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Login Error:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
           {" "}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
               {" "}
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>   
            {error && <p className="text-red-500 text-center mb-4">{error}</p>} 
             {" "}
        <form onSubmit={handleSubmit} className="space-y-4">
                   {" "}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
                   {" "}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
                   {" "}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
                        Login          {" "}
          </button>
                 {" "}
        </form>
             {" "}
      </div>
           {" "}
    </div>
  );
};

export default AdminLogin;
