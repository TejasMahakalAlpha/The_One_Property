// src/admin/ProtectedRoute.jsx (Updated)

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // हम मान रहे हैं कि लॉगिन होने पर 'token' नाम से localStorage में टोकन सेव होता है।
  const token = localStorage.getItem("token"); 

  // अगर token मौजूद है, तो protected content (children) दिखाएं
  if (token) {
    return children;
  }

  // अगर token मौजूद नहीं है, तो लॉगिन पेज पर रीडायरेक्ट करें
  // 'replace' prop सुनिश्चित करता है कि यूज़र वापस डैशबोर्ड URL पर नहीं जा सकता
  return <Navigate to="/admin/login" replace />; 
};

export default ProtectedRoute;