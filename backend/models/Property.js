const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({

    title: { type: String, required: true },
    priceRange: { type: String, required: true },
    mainImage: { type: String, required: true },
    thumbnailImages: { type: [String] },

    
    configuration: { type: String }, 
    size: { type: String }, 
    price: { type: String }, 
    possessionBy: { type: String },
    developer: { type: String },
    carpetArea: { type: String },

    // More Details
    floor: { type: String },
    status: { type: String, default: 'Ready to Move' },
    facing: { type: String },
    lifts: { type: Number },
    furnishedStatus: { type: String },

    // Location
    address: { type: String, required: true },
    landmark: { type: String },

    // Amenities
    amenities: { type: [String] }, 
    
    
    estimatedEMI: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);