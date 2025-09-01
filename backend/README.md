# Elara Jewelry Backend

A robust backend API for the Elara Jewelry Store with advanced filtering, sorting, and pagination capabilities.

## 🚀 Features

### **Advanced Product Management**
- **Comprehensive Product Model**: Includes all jewelry attributes (category, style, material, gemstone, size, price, etc.)
- **Real-time Filtering**: Price range, category, style, material, gemstone, size, best seller status
- **Advanced Sorting**: By price, name, rating, creation date, discount percentage
- **Smart Search**: Text search across product names, descriptions, and tags
- **Pagination**: Efficient pagination with configurable page sizes

### **Performance Optimized**
- **Database Indexes**: Optimized queries with compound indexes
- **Lean Queries**: Reduced memory usage with lean() queries
- **Efficient Filtering**: MongoDB aggregation for dynamic filter options
- **Rate Limiting**: API protection with configurable rate limits

### **Developer Experience**
- **Validation**: Input validation with express-validator
- **Error Handling**: Comprehensive error handling middleware
- **Logging**: Development logging with Morgan
- **Security**: Helmet.js for security headers

## 🛠️ Setup Instructions

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### **1. Install Dependencies**
```bash
cd backend
npm install
```

### **2. Environment Configuration**
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/elara-jewelry
MONGODB_URI_PROD=your_production_mongodb_uri

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# JWT (if implementing auth)
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

### **3. Start MongoDB**
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### **4. Seed Database**
```bash
# Run once to populate with sample products
npm run seed

# Or for development with auto-restart
npm run seed:dev
```

### **5. Start Server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## 📊 API Endpoints

### **Products**
- `GET /api/products` - Get all products with filtering, sorting, pagination
- `GET /api/products/best-sellers` - Get best seller products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/filters/options` - Get available filter options

### **Query Parameters**
```javascript
// Pagination
?page=1&limit=12

// Sorting
?sortBy=price&sortOrder=asc

// Price Filtering
?minPrice=1000&maxPrice=5000

// Category & Style
?category=rings&style=party

// Material & Gemstone
?material=platinum&gemstone=diamond

// Size
?size=M

// Status Filters
?isBestSeller=true&isOnSale=true

// Search
?search=diamond ring

// Combined Example
?page=1&limit=12&sortBy=price&sortOrder=asc&minPrice=1000&maxPrice=5000&category=rings&style=party
```

## 🔍 Filter & Sort Examples

### **Price Range Filter**
```javascript
// Get products between ₹1000 and ₹5000
GET /api/products?minPrice=1000&maxPrice=5000
```

### **Style & Material Filter**
```javascript
// Get party-style platinum rings
GET /api/products?style=party&material=platinum&category=rings
```

### **Sorting Examples**
```javascript
// Price: Low to High
GET /api/products?sortBy=price&sortOrder=asc

// Highest Rated
GET /api/products?sortBy=rating&sortOrder=desc

// Newest First
GET /api/products?sortBy=createdAt&sortOrder=desc
```

### **Search with Filters**
```javascript
// Search for "diamond" in rings category
GET /api/products?search=diamond&category=rings&sortBy=price&sortOrder=asc
```

## 📁 Project Structure

```
backend/
├── models/
│   └── Product.js          # Product schema with indexes
├── routes/
│   └── products.js         # Product API endpoints
├── seeders/
│   └── productSeeder.js    # Database seeder
├── middleware/              # Custom middleware
├── config.env              # Environment variables
├── server.js               # Main server file
└── package.json
```

## 🎯 Sample Data

The seeder creates 12 sample jewelry products with:
- **Categories**: rings, earrings, necklaces, bracelets, pendants, bangles
- **Styles**: daily-wear, party, work, gifting, college, festive
- **Materials**: 18k-gold, platinum, silver, rose-gold, white-gold
- **Gemstones**: diamond, ruby, emerald, sapphire, pearl, none
- **Sizes**: XS, S, M, L, XL, XXL, free-size
- **Price Range**: ₹3,529 - ₹9,499

## 🚦 Testing the API

### **Health Check**
```bash
curl http://localhost:5000/health
```

### **Get All Products**
```bash
curl http://localhost:5000/api/products
```

### **Get Best Sellers**
```bash
curl http://localhost:5000/api/products/best-sellers
```

### **Get Filter Options**
```bash
curl http://localhost:5000/api/products/filters/options
```

## 🔧 Development

### **Adding New Filters**
1. Update the Product model in `models/Product.js`
2. Add validation in `routes/products.js`
3. Update the filter logic in the main query
4. Add to the filter options endpoint

### **Custom Sorting**
1. Add new sort fields to the validation
2. Update the sort logic in the query
3. Test with different sort combinations

## 📱 Frontend Integration

The frontend uses the `useProducts` custom hook which:
- Manages filter state
- Handles API calls
- Provides loading and error states
- Manages pagination
- Caches filter options

## 🚨 Troubleshooting

### **Common Issues**

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network connectivity

2. **Products Not Loading**
   - Run the seeder: `npm run seed`
   - Check browser console for errors
   - Verify API endpoint in frontend

3. **Filters Not Working**
   - Check filter parameter names
   - Verify filter values match enum values
   - Check browser network tab for API calls

### **Debug Mode**
```bash
# Enable detailed logging
NODE_ENV=development npm run dev
```

## 📈 Performance Tips

- Use compound indexes for common filter combinations
- Implement caching for filter options
- Use pagination for large datasets
- Monitor query performance with MongoDB explain()

## 🔐 Security Features

- Rate limiting to prevent abuse
- Input validation and sanitization
- Security headers with Helmet.js
- CORS configuration for frontend access

---

**Happy Coding! 🎉**

For support, check the frontend integration examples or create an issue in the repository.
