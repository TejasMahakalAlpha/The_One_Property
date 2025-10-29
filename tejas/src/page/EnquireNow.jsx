import React, { useState } from "react";
import axios from 'axios'; 
import home1 from "../assets/house.png";
import home2 from "../assets/apartment.png";
import home3 from "../assets/modern-villa.png";

// 💡 Environment variable ko load karein
// Agar Vite use kar rahe hain (Most likely):
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// Agar Create React App (CRA) use kar rahe hain, toh is line ko uncomment karein:
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EnquiryNow = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    propertyType: "", 
    message: "",
  });

  const [errors, setErrors] = useState({});
  
  const [formStatus, setFormStatus] = useState({
    loading: false,
    submitted: false,
    error: null,
  });

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (value && !/^[A-Za-z\s]+$/.test(value)) {
          error = "Only alphabets and spaces are allowed.";
        }
        break;
      case "phone":
        if (value && !/^\d+$/.test(value)) {
          error = "Only numbers are allowed.";
        }
        break;
      case "email":
        if (value && !/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "message":
        if (value && value.length < 10) {
          error = "Message must be at least 10 characters long.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'propertyType') { 
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setFormStatus({ loading: true, submitted: false, error: null });

      const dataToSend = {
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        email: formData.email,
        message: `Property Type: ${formData.propertyType || 'N/A'}\n\nMessage: ${formData.message}`,
        formType: 'GeneralEnquiry',
      };

        // ⚠️ Safety check
        if (!API_BASE_URL) {
            console.error("API Base URL is not defined. Check your .env file and prefix.");
            setFormStatus({ loading: false, submitted: false, error: 'Configuration Error: API endpoint not found.' });
            return;
        }

      try {
        // ✅ Hardcoded URL ko Environment Variable se replace kiya gaya hai
        await axios.post(`${API_BASE_URL}/api/form/send-email`, dataToSend);
        
        setFormStatus({ loading: false, submitted: true, error: null });
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          propertyType: "",
          message: "",
        });

      } catch (error) {
        console.error("Form submission error:", error);
        setFormStatus({ loading: false, submitted: false, error: 'Failed to send enquiry. Please try again.' });
      }

    } else {
      console.log("Form has errors:", newErrors);
    }
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 px-6 items-start">
        <div>
          <h2 className="text-4xl mb-8 text-gray-800">Enquiry Form</h2>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            
            <div>
              <label htmlFor="firstName" className="block text-sm text-gray-700 mb-1">Your First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Your First Name"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-md p-3 bg-gray-100 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm text-gray-700 mb-1">Your Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Your Last Name"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-md p-3 bg-gray-100 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-md p-3 bg-gray-100 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your E-mail address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-md p-3 bg-gray-100 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                 <label htmlFor="selectProperty" className="block text-sm text-gray-700 mb-1">Select Property</label>
                 <input id="selectProperty" type="text" className="w-full border border-gray-300 rounded-md p-3 bg-gray-100" />
            </div>

            <div>
              <label htmlFor="propertyType" className="block text-sm text-gray-700 mb-1">Property Type</label>
              <input
                type="text"
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                placeholder="e.g., 2BHK, Villa, Plot"
                className="w-full border border-gray-300 rounded-md p-3 bg-gray-100"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-md p-3 bg-gray-100 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={formStatus.loading}
              className="w-full bg-[#4a1d33] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
            >
              {formStatus.loading ? 'Submitting...' : 'Submit'}
            </button>
            
            {formStatus.submitted && (
              <p className="text-lg text-green-600">Enquiry sent successfully! We will contact you soon.</p>
            )}
            {formStatus.error && (
              <p className="text-lg text-red-600">{formStatus.error}</p>
            )}
          </form>
        </div>

        {/* --- Image section (unchanged) --- */}
        <div className="relative w-full h-[500px] hidden lg:block">
          <img src={home1} alt="Building 1" className="absolute top-0 left-0 w-[65%] rounded-xl shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" />
          <img src={home2} alt="Building 2" className="absolute top-[90px] right-0 w-[50%] rounded-xl shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" />
          <img src={home3} alt="Building 3" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] rounded-xl shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" />
        </div>
      </div>
    </section>
  );
};

export default EnquiryNow;