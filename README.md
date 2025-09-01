# Elara Jewelry - Full-Stack E-commerce Platform

A luxury jewelry e-commerce website built with React frontend and Node.js backend, featuring advanced filtering, responsive design, and modern UI components.

## ✨ Features

- **Advanced Product Filtering** - Filter by style, material, size, price range
- **Smart Sorting** - Sort by price, popularity, newest arrivals
- **Responsive Design** - Mobile-first approach with desktop optimization
- **Real-time Search** - Fast product search with instant results
- **Shopping Cart** - Full cart functionality with persistent storage
- **Wishlist Management** - Save favorite products for later
- **User Authentication** - Secure login and registration system
- **Product Categories** - Bangles, Earrings, Pendants, Necklaces, Rings
- **Best Sellers** - Curated collection of popular items
- **Mobile Optimized** - Touch-friendly interface for mobile devices

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Custom Hooks** - Reusable logic for products and filters

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Rate Limiting** - API protection
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
elara-jewelry/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   └── assets/         # Images and static files
│   ├── package.json
│   └── vercel.json         # Vercel deployment config
├── backend/                 # Node.js backend API
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   ├── middleware/         # Custom middleware
│   ├── seeders/            # Database seeding scripts
│   └── server.js           # Main server file
├── vercel.json             # Root Vercel configuration
└── LICENSE                 # MIT License
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Utsav-Malaviya/Elara.git
   cd Elara
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp config.production.env config.env
   # Edit config.env with your MongoDB connection string
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

### Development

**Start Frontend (Port 5173)**
```bash
cd frontend
npm run dev
```

**Start Backend (Port 5000)**
```bash
cd backend
npm run dev
```

## 🌐 Deployment

### Vercel Deployment
This project is configured for easy deployment on Vercel:

1. **Push to GitHub** - Your code is already on GitHub
2. **Connect to Vercel** - Import your repository
3. **Set Environment Variables** - Add MongoDB connection string
4. **Deploy** - Vercel handles the rest!

### Manual Deployment
```bash
# Build frontend
cd frontend
npm run build

# Deploy to Vercel
vercel --prod
```

## 📱 Pages & Components

### Main Pages
- **Home** - Hero section, featured products, categories
- **Best Seller** - Curated collection with advanced filters
- **Collections** - Browse all jewelry categories
- **Product Detail** - Detailed product view with image gallery
- **Cart & Checkout** - Shopping cart and order processing
- **User Profile** - Account management and order history

### Key Components
- **Navigation** - Responsive navigation with mobile menu
- **Product Grid** - Flexible product display with filters
- **Filter Sidebar** - Advanced filtering options
- **Hero Section** - Dynamic banner with product showcases
- **Footer** - Company information and links

## 🔧 Configuration

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/elara-jewelry
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/elara-jewelry
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

### Database Schema
- **Products** - Jewelry items with metadata
- **Users** - Customer accounts and preferences
- **Orders** - Purchase history and tracking
- **Categories** - Product organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Utsav Malaviya**
- GitHub: [@Utsav-Malaviya](https://github.com/Utsav-Malaviya)
- Project: [Elara Jewelry](https://github.com/Utsav-Malaviya/Elara)

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for luxury jewelry retail
- Optimized for mobile and desktop users
- Ready for production deployment

---

**Elara Jewelry** - Where elegance meets technology 💎✨
