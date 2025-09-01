const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config({ path: './config.env' });

const sampleProducts = [
  {
    name: "Diamond Encrusted Infinity Ring",
    description: "Elegant infinity ring with diamond accents, perfect for daily wear",
    price: 3569,
    originalPrice: 4500,
    discount: 21,
    category: "rings",
    style: "daily-wear",
    material: "18k-gold",
    size: "M",
    gemstone: "diamond",
    images: [
      "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      "/src/assets/luxury-diamond-necklace-featured.png"
    ],
    thumbnail: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
    rating: 4.8,
    reviews: 156,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 25,
    weight: 2.5,
    tags: ["diamond", "infinity", "daily-wear", "gold"]
  },
  {
    name: "Twinkling Cluster Ring",
    description: "Stunning cluster ring with multiple diamonds arranged beautifully",
    price: 4999,
    originalPrice: 6500,
    discount: 23,
    category: "rings",
    style: "party",
    material: "platinum",
    size: "L",
    gemstone: "diamond",
    images: [
      "/src/assets/sparkling-diamond-earrings.png",
      "/src/assets/luxury-diamond-solitaire-ring-platinum.png"
    ],
    thumbnail: "/src/assets/sparkling-diamond-earrings.png",
    rating: 4.9,
    reviews: 89,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 18,
    weight: 3.2,
    tags: ["diamond", "cluster", "party", "platinum"]
  },
  {
    name: "Pink Heart Diamond Halo Ring",
    description: "Romantic heart-shaped ring with diamond halo, perfect for gifting",
    price: 5149,
    originalPrice: 7200,
    discount: 28,
    category: "rings",
    style: "gifting",
    material: "rose-gold",
    size: "S",
    gemstone: "diamond",
    images: [
      "/src/assets/luxury-diamond-necklace-featured.png",
      "/src/assets/luxury-diamond-heart-pendant-rose-gold.png"
    ],
    thumbnail: "/src/assets/luxury-diamond-necklace-featured.png",
    rating: 4.7,
    reviews: 203,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 32,
    weight: 2.8,
    tags: ["diamond", "heart", "gifting", "rose-gold"]
  },
  {
    name: "Matching Heart Stud Earrings",
    description: "Classic heart stud earrings perfect for everyday elegance",
    price: 3899,
    originalPrice: 5200,
    discount: 25,
    category: "earrings",
    style: "daily-wear",
    material: "18k-gold",
    size: "free-size",
    gemstone: "diamond",
    images: [
      "/src/assets/gold-bracelet-luxury-featured.png",
      "/src/assets/sparkling-diamond-earrings.png"
    ],
    thumbnail: "/src/assets/gold-bracelet-luxury-featured.png",
    rating: 4.6,
    reviews: 178,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 45,
    weight: 1.8,
    tags: ["diamond", "stud", "daily-wear", "gold"]
  },
  {
    name: "Heart Pendant Necklace",
    description: "Delicate heart pendant necklace with diamond accent",
    price: 4299,
    originalPrice: 5800,
    discount: 26,
    category: "pendants",
    style: "gifting",
    material: "white-gold",
    size: "free-size",
    gemstone: "diamond",
    images: [
      "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      "/src/assets/luxury-diamond-necklace-featured.png"
    ],
    thumbnail: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
    rating: 4.5,
    reviews: 134,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 28,
    weight: 2.1,
    tags: ["diamond", "pendant", "gifting", "white-gold"]
  },
  {
    name: "Luxury Gold Bracelet",
    description: "Premium gold bracelet with intricate design and premium finish",
    price: 6799,
    originalPrice: 8500,
    discount: 20,
    category: "bracelets",
    style: "party",
    material: "18k-gold",
    size: "M",
    gemstone: "none",
    images: [
      "/src/assets/luxury-custom-engagement-ring-design.png",
      "/src/assets/gold-bracelet-luxury-featured.png"
    ],
    thumbnail: "/src/assets/luxury-custom-engagement-ring-design.png",
    rating: 4.8,
    reviews: 167,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 22,
    weight: 4.5,
    tags: ["gold", "bracelet", "party", "luxury"]
  },
  {
    name: "Platinum Diamond Ring",
    description: "Sophisticated platinum ring with solitaire diamond",
    price: 7299,
    originalPrice: 9200,
    discount: 21,
    category: "rings",
    style: "work",
    material: "platinum",
    size: "L",
    gemstone: "diamond",
    images: [
      "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      "/src/assets/luxury-diamond-solitaire-ring-platinum.png"
    ],
    thumbnail: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
    rating: 4.9,
    reviews: 98,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 15,
    weight: 3.8,
    tags: ["diamond", "platinum", "work", "solitaire"]
  },
  {
    name: "Emerald Cut Diamond Ring",
    description: "Stunning emerald cut diamond ring with vintage appeal",
    price: 9499,
    originalPrice: 12000,
    discount: 21,
    category: "rings",
    style: "party",
    material: "platinum",
    size: "M",
    gemstone: "diamond",
    images: [
      "/src/assets/sparkling-diamond-earrings.png",
      "/src/assets/luxury-diamond-necklace-featured.png"
    ],
    thumbnail: "/src/assets/sparkling-diamond-earrings.png",
    rating: 5.0,
    reviews: 67,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 12,
    weight: 4.2,
    tags: ["diamond", "emerald-cut", "party", "platinum"]
  },
  {
    name: "Diamond Tennis Bracelet",
    description: "Classic tennis bracelet with continuous diamond line",
    price: 8999,
    originalPrice: 11500,
    discount: 22,
    category: "bracelets",
    style: "party",
    material: "white-gold",
    size: "M",
    gemstone: "diamond",
    images: [
      "/src/assets/luxury-diamond-necklace-featured.png",
      "/src/assets/luxury-diamond-solitaire-ring-platinum.png"
    ],
    thumbnail: "/src/assets/luxury-diamond-necklace-featured.png",
    rating: 4.7,
    reviews: 145,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 19,
    weight: 5.1,
    tags: ["diamond", "tennis", "party", "white-gold"]
  },
  {
    name: "Rose Gold Baguette Ring",
    description: "Modern baguette ring with rose gold setting",
    price: 4599,
    originalPrice: 6100,
    discount: 25,
    category: "rings",
    style: "daily-wear",
    material: "rose-gold",
    size: "S",
    gemstone: "diamond",
    images: [
      "/src/assets/gold-bracelet-luxury-featured.png",
      "/src/assets/luxury-custom-engagement-ring-design.png"
    ],
    thumbnail: "/src/assets/gold-bracelet-luxury-featured.png",
    rating: 4.4,
    reviews: 112,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 35,
    weight: 2.3,
    tags: ["diamond", "baguette", "daily-wear", "rose-gold"]
  },
  {
    name: "Fashionable Leaf Style Ring",
    description: "Nature-inspired leaf ring with organic design",
    price: 3669,
    originalPrice: 4900,
    discount: 25,
    category: "rings",
    style: "college",
    material: "silver",
    size: "M",
    gemstone: "none",
    images: [
      "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      "/src/assets/luxury-diamond-heart-pendant-rose-gold.png"
    ],
    thumbnail: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
    rating: 4.3,
    reviews: 89,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 42,
    weight: 1.9,
    tags: ["leaf", "nature", "college", "silver"]
  },
  {
    name: "Luxe Leaflet Diamond Ring",
    description: "Luxurious leaflet design with diamond accents",
    price: 3529,
    originalPrice: 4700,
    discount: 25,
    category: "rings",
    style: "college",
    material: "18k-gold",
    size: "S",
    gemstone: "diamond",
    images: [
      "/src/assets/luxury-custom-engagement-ring-design.png",
      "/src/assets/sparkling-diamond-earrings.png"
    ],
    thumbnail: "/src/assets/luxury-custom-engagement-ring-design.png",
    rating: 4.2,
    reviews: 76,
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true,
    stock: 38,
    weight: 1.7,
    tags: ["diamond", "leaflet", "college", "gold"]
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elara-jewelry');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Create indexes for better performance
    await Product.createIndexes();
    console.log('Created database indexes');

    console.log('Product seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedProducts();
}

module.exports = { seedProducts, sampleProducts };
