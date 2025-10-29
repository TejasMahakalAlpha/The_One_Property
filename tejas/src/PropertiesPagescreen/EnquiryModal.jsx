import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnquiryModal = ({ isOpen, onClose, property }) => {
  // Form fields aur success/loading status ke liye state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    propertyType: '',
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    submitted: false,
    error: null,
  });

  // Input change ko handle karne ke liye function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form submit function
  const handleSubmit = async (e) => {
    e.preventDefault(); // <-- YEH HAI MAIN FIX: Page reload rokta hai!
    setFormStatus({ loading: true, submitted: false, error: null });

    // Simple client-side validation (minimum required fields)
    if (!formData.name || !formData.email || !formData.phone) {
        setFormStatus({ loading: false, submitted: false, error: 'Please fill out Name, Email, and Phone.' });
        return; 
    }

    // Backend ke liye data taiyaar kiya
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      propertyName: property?.title || 'N/A', 
      formType: 'PropertyEnquiry', 
      message: `
        Enquiry for Property: ${property?.title || 'N/A'}
        User Location: ${formData.location || 'Not provided'}
        Desired Property Type: ${formData.propertyType || 'Not specified'}
      `,
    };

    try {
      await axios.post('http://localhost:5000/api/form/send-email', dataToSend);
      
      // Success
      setFormStatus({ loading: false, submitted: true, error: null });
      // Form fields reset
      setFormData({ name: '', email: '', phone: '', location: '', propertyType: '' });
      
      // 2 second baad modal band kar do
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Modal form submission error:', error);
      // Backend se 500 error aane par
      setFormStatus({ 
        loading: false, 
        submitted: false, 
        error: 'Failed to send enquiry. Please check the network and try again.' 
      });
    }
  };

  // Jab bhi modal band ho, ya fir successful submit ho jaaye,
  // tab useEffect se 3 second baad status reset kar do.
  useEffect(() => {
    if (!isOpen) {
      // Jab modal band ho, form status bhi reset ho jaye
      setFormStatus({ loading: false, submitted: false, error: null });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative p-6">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Enquire Now</h2>

        {/* Success Message Display */}
        {formStatus.submitted ? (
          <div className="text-center p-8">
            <h3 className="text-2xl font-semibold text-green-600 mb-2">Thank You!</h3>
            <p className="text-gray-700">Your enquiry has been sent successfully. We will contact you soon.</p>
          </div>
        ) : (
          // Form
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border rounded-md p-3"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded-md p-3"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full border rounded-md p-3"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full border rounded-md p-3"
              value={formData.location}
              onChange={handleChange}
            />
            <input
              type="text"
              name="propertyType"
              placeholder="Property Type (e.g., 2BHK, Villa)"
              className="w-full border rounded-md p-3"
              value={formData.propertyType}
              onChange={handleChange}
            />

            <p className="text-sm">
              I am interested in a{" "}
              <strong>{property?.title || "property"}</strong>
            </p>

            <button
              type="submit"
              disabled={formStatus.loading}
              className="bg-[#5f3754] hover:bg-purple-900 text-white px-6 py-3 rounded-md w-full font-semibold disabled:bg-gray-400"
            >
              {formStatus.loading ? 'Submitting...' : 'Submit'}
            </button>

            {/* Error Message */}
            {formStatus.error && (
              <p className="text-sm text-red-600 mt-2">{formStatus.error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;