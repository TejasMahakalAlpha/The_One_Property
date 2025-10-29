import React, { useState, useEffect } from 'react';
// import EmiCalculator from './EmiCalculator';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Building, Droplet, Trees, ParkingCircle, Car } from 'lucide-react';

// 💡 Environment variable ko load karein
// Agar Vite use kar rahe hain (Most likely):
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// Agar Create React App (CRA) use kar rahe hain, toh is line ko uncomment karein:
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const AmenityIcon = ({ name }) => {
  const iconMap = {
    'Rain Water Harvesting': <Droplet />,
    'Park': <Trees />,
    'Reserved Parking': <ParkingCircle />,
    'Intercom Facility': <Building />,
    'Visitor Parking': <Car />,
    'Private Terrace/Garden': <Trees />,
  };
  return <div className="text-blue-600">{iconMap[name] || <Building />}</div>;
};


const DetailItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-semibold text-gray-800">{value}</span>
    </div>
);

export const PropertyDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            // ⚠️ Safety check
            if (!API_BASE_URL) {
                console.error("API Base URL is not defined. Check your .env file and prefix.");
                setLoading(false);
                return;
            }

            try {
                // ✅ Hardcoded URL ko Environment Variable se replace kiya gaya hai
                const response = await axios.get(`${API_BASE_URL}/api/properties/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error("Failed to fetch property:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    
    const handleCheckEMI = () => {
        navigate('./EmiCalculator');
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading Property Details...</p></div>;
    }

    if (!property) {
        return <div className="flex justify-center items-center h-screen"><p className="text-xl">Property Not Found.</p></div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <img 
                                src={property.mainImage} 
                                alt={property.title} 
                                className="w-full h-auto object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                {property.thumbnailImages && property.thumbnailImages.map((img, index) => (
                                    <img 
                                        key={index}
                                        src={img} 
                                        alt={`Thumbnail ${index + 1}`} 
                                        className="w-full h-28 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                                    />
                                ))}
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900">{property.title}</h1>
                            <p className="text-3xl font-bold text-blue-600">{property.priceRange}</p>
                            <div className="border-t border-b border-gray-200 py-4">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Property Highlight</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    <DetailItem label="Configuration" value={property.configuration} />
                                    <DetailItem label="Size" value={property.size} />
                                    <DetailItem label="Price" value={property.price} />
                                    <DetailItem label="Possession By" value={property.possessionBy} />
                                    <DetailItem label="Developer" value={property.developer} />
                                    <DetailItem label="Carpet Area" value={property.carpetArea} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">More Details</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4 bg-slate-50 rounded-lg">
                                <DetailItem label="Floor" value={property.floor} />
                                <DetailItem label="Status" value={property.status} />
                                <DetailItem label="Facing" value={property.facing} />
                                <DetailItem label="Lifts" value={property.lifts} />
                                <DetailItem label="Furnished Status" value={property.furnishedStatus} />
                            </div>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">Address</h3>
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <p className="text-gray-700 flex items-center gap-2"><MapPin size={16} className="text-blue-600" /> {property.address}</p>
                                <p className="text-gray-600 mt-2"><strong>Landmark:</strong> {property.landmark}</p>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                                {property.amenities && property.amenities.map((amenityName) => (
                                    <div key={amenityName} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                                        <AmenityIcon name={amenityName} />
                                        <span className="text-gray-700 font-medium">{amenityName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
                           <p className="text-gray-600">Loan Offered</p>
                           <p className="text-xl font-semibold text-gray-800">Estimated EMI: {property.estimatedEMI || 'N/A'}</p>
                           
                           <button 
                             onClick={handleCheckEMI}
                             className="mt-3 py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                           >
                              Check Estimate EMI
                           </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};