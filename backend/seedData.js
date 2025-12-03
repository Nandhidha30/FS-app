const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const sampleProducts = [
  {
    name: "Golden Barrel Cactus",
    description: "A stunning spherical cactus with golden spines that catches sunlight beautifully.",
    price: 29.99,
    category: "cactus",
    subcategory: "barrel",
    images: ["/images/products/golden-barrel-cactus.jpg"],
    stock: 15,
    featured: true,
    careInstructions: {
      light: "Bright, direct sunlight",
      water: "Water sparingly, every 2-3 weeks",
      temperature: "65-80°F (18-27°C)",
      humidity: "Low humidity preferred",
      soil: "Well-draining cactus soil"
    },
    specifications: {
      size: "6-8 inches",
      potSize: "6 inch pot",
      origin: "Mexico",
      difficulty: "Easy"
    }
  },
  {
    name: "Jade Plant",
    description: "A classic succulent with thick, glossy leaves. Perfect for beginners.",
    price: 19.99,
    category: "succulent",
    subcategory: "jade",
    images: ["/images/products/jade-plant.jpg"],
    stock: 25,
    featured: true,
    careInstructions: {
      light: "Bright, indirect light",
      water: "Water when soil is dry",
      temperature: "65-75°F (18-24°C)",
      humidity: "Average humidity",
      soil: "Well-draining potting mix"
    },
    specifications: {
      size: "4-6 inches",
      potSize: "4 inch pot",
      origin: "South Africa",
      difficulty: "Easy"
    }
  },
  {
    name: "Prickly Pear Cactus",
    description: "Iconic flat-padded cactus that produces beautiful yellow flowers.",
    price: 24.99,
    category: "cactus",
    subcategory: "prickly-pear",
    images: ["/images/products/prickly-pear-cactus.jpg"],
    stock: 12,
    careInstructions: {
      light: "Full sun to partial shade",
      water: "Water deeply but infrequently",
      temperature: "60-85°F (15-29°C)",
      humidity: "Low humidity",
      soil: "Sandy, well-draining soil"
    },
    specifications: {
      size: "8-10 inches",
      potSize: "8 inch pot",
      origin: "Americas",
      difficulty: "Easy"
    }
  },
  {
    name: "Echeveria Elegans",
    description: "Beautiful rosette succulent with blue-green leaves and pink edges.",
    price: 16.99,
    category: "succulent",
    subcategory: "echeveria",
    images: ["/images/products/echeveria-elegans.jpg"],
    stock: 30,
    featured: true,
    careInstructions: {
      light: "Bright light with some direct sun",
      water: "Water when soil is completely dry",
      temperature: "65-80°F (18-27°C)",
      humidity: "Low to moderate humidity",
      soil: "Cactus and succulent potting mix"
    },
    specifications: {
      size: "3-4 inches",
      potSize: "4 inch pot",
      origin: "Mexico",
      difficulty: "Easy"
    }
  },
  {
    name: "Ceramic Planter Set",
    description: "Set of 3 beautiful ceramic planters in different sizes with drainage holes.",
    price: 39.99,
    category: "accessories",
    subcategory: "planters",
    images: ["/images/products/ceramic-planter-set.jpg"],
    stock: 20,
    specifications: {
      size: "Small: 4\", Medium: 6\", Large: 8\"",
      origin: "Handcrafted"
    }
  },
  {
    name: "Succulent Care Kit",
    description: "Complete care kit including specialized soil, fertilizer, and watering tools.",
    price: 34.99,
    category: "accessories",
    subcategory: "care-tools",
    images: ["/images/products/succulent-care-kit.jpg"],
    stock: 18,
    featured: true
  }
];

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    
    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@cactushaven.com',
      password: 'admin123',
      role: 'admin'
    });
    
    // Create sample user
    const sampleUser = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password123',
      role: 'user'
    });
    
    // Create products
    const products = await Product.insertMany(sampleProducts);
    
    console.log('Sample data created successfully!');
    console.log(`Created ${products.length} products`);
    console.log('Admin login: admin@cactushaven.com / admin123');
    console.log('User login: user@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();