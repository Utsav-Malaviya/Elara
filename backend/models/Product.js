const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    index: true
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['rings', 'earrings', 'necklaces', 'bracelets', 'pendants', 'bangles'],
    index: true
  },
  style: {
    type: String,
    required: true,
    enum: ['daily-wear', 'party', 'work', 'gifting', 'college', 'festive'],
    index: true
  },
  material: {
    type: String,
    required: true,
    enum: ['18k-gold', 'platinum', 'silver', 'rose-gold', 'white-gold'],
    index: true
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'free-size']
  },
  gemstone: {
    type: String,
    enum: ['diamond', 'ruby', 'emerald', 'sapphire', 'pearl', 'none']
  },
  images: [{
    type: String,
    required: true
  }],
  thumbnail: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  isBestSeller: {
    type: Boolean,
    default: false,
    index: true
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    min: 0,
    default: 0
  },
  weight: {
    type: Number,
    min: 0
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound indexes for better query performance
productSchema.index({ category: 1, style: 1, price: 1 });
productSchema.index({ style: 1, material: 1, price: 1 });
productSchema.index({ isBestSeller: 1, category: 1, price: 1 });

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
  if (this.originalPrice && this.discount > 0) {
    return this.originalPrice - (this.originalPrice * this.discount / 100);
  }
  return this.price;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.price < this.originalPrice) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return this.discount;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
