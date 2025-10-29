import React, { useState } from 'react';
import axios from 'axios';
import contact1 from "../assets/contact1.png";
import contact2 from "../assets/contact2.png";
import contact3 from "../assets/contact3.png";
import { LuMapPin, LuPhone, LuMail } from 'react-icons/lu';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    submitted: false,
    error: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, submitted: false, error: null });

    const dataToSend = {
      ...formData,
      formType: 'Contact',
    };

    try {
      await axios.post('http://localhost:5000/api/form/send-email', dataToSend);
      setFormStatus({ loading: false, submitted: true, error: null });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        loading: false,
        submitted: false,
        error: 'Failed to send message. Please try again.',
      });
    }
  };

  return (
    <>
      {/* 🎯 यहाँ से [font-family:'Inria_Serif',serif] क्लास हटाई गई है */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left side - Contact Form */}
            <div className="space-y-12">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-8">
                  Contact Us
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                      Your First Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your First Name"
                      className="mt-2 w-full p-4 bg-slate-100 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="+91"
                      className="mt-2 w-full p-4 bg-slate-100 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email address"
                      className="mt-2 w-full p-4 bg-slate-100 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Message"
                      className="mt-2 w-full p-4 bg-slate-100 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formStatus.loading}
                      className="w-full py-4 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition text-lg disabled:bg-gray-400"
                    >
                      {formStatus.loading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>

                  {formStatus.submitted && (
                    <p className="text-lg text-green-600">Message sent successfully! We will get back to you soon.</p>
                  )}
                  {formStatus.error && (
                    <p className="text-lg text-red-600">{formStatus.error}</p>
                  )}
                </form>
              </div>

              <div className="mt-12">
                <h2 className="text-3xl font-bold text-blue-700 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <p className="flex items-center gap-4">
                    <LuMapPin className="text-blue-600" size={24} />
                    <span>Address: Mary Villa, Badalepada, Giriz, Vasai West</span>
                  </p>
                  <p className="flex items-center gap-4">
                    <LuPhone className="text-blue-600" size={24} />
                    <span>Phone: +91 93223 42225</span>
                  </p>
                  <p className="flex items-center gap-4">
                    <LuMail className="text-blue-600" size={24} />
                    <span>Email: info@theoneproperty.com</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Images */}
            <div className="h-[600px] grid grid-cols-2 grid-rows-3 gap-4">
              <div className="col-span-2 row-span-2">
                <img src={contact1} alt="Modern house at dusk" className="w-full h-full object-cover rounded-lg shadow-lg" />
              </div>
              <div className="col-span-1 row-start-3">
                <img src={contact2} alt="Suburban home exterior" className="w-full h-full object-cover rounded-lg shadow-lg" />
              </div>
              <div className="col-start-2 row-start-2 row-span-2">
                <img src={contact3} alt="House with a beautiful lawn" className="w-full h-full object-cover rounded-lg shadow-lg" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
