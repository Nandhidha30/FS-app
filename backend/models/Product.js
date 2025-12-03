const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['cactus', 'succulent', 'accessories']
  },
  subcategory: String,
  images: [{ type: String }],
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  careInstructions: {
    light: String,
    water: String,
    temperature: String,
    humidity: String,
    soil: String
  },
  specifications: {
    size: String,
    potSize: String,
    origin: String,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] }
  },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);