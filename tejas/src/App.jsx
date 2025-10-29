import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // <-- 1. IMPORT KAREIN

// import Text from "../src/page/Text";
import Home from './page/Home';
import AboutUs from './page/AboutUs';
import ContactUs from './page/ContactUs';
import Property from './page/Property';
import EnquireNow from './page/EnquireNow';
import { PropertyDetailsPage } from './PropertiesPagescreen/PropertyDetailsPage';
import EmiCalculator from './PropertiesPagescreen/EmiCalculator'; 
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminAddProperty from './admin/AdminAddProperty';
import AdminPropertyList from './admin/AdminPropertyList';
import ProtectedRoute from './admin/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* <-- 2. YAHAAN ADD KAREIN */}
      <Header />

      <main>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/properties" element={<Property />} />
          <Route path="/enquire" element={<EnquireNow />} />
          
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/property/:id/EmiCalculator" element={<EmiCalculator />} />
          
          {/* <Route path="/text" element={<Text/>}/> */}
          
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ...baaki admin routes... */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-property"
            element={
              <ProtectedRoute>
                <AdminAddProperty />
                <AdminPropertyList/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;