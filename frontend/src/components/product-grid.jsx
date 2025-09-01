import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heart, Star } from "lucide-react"
import { Button } from "./ui/button"

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: "Luxury Diamond Tote Bag",
    price: 285000,
    originalPrice: 320000,
    image: "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
    images: [
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    ],
    rating: 4.8,
    reviews: 234,
    inStock: true,
  },
  {
    id: 2,
    name: "Elegant Rose Gold Diamond Bracelet",
    price: 375000,
    originalPrice: 420000,
    image: "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
    images: [
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    ],
    rating: 4.9,
    reviews: 187,
    inStock: true,
  },
  {
    id: 3,
    name: "Luxury Champagne Evening Clutch",
    price: 85000,
    originalPrice: 95000,
    image: "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
    images: [
      "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    ],
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: 4,
    name: "Platinum Diamond Pendant Necklace",
    price: 295000,
    originalPrice: 350000,
    image: "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    images: [
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
    ],
    rating: 4.8,
    reviews: 203,
    inStock: true,
  },
  {
    id: 5,
    name: "Diamond Stud Earrings",
    price: 185000,
    originalPrice: 220000,
    image: "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
    images: [
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    ],
    rating: 4.8,
    reviews: 156,
    inStock: true,
  },
  {
    id: 6,
    name: "Traditional Gold Bangles Set",
    price: 125000,
    originalPrice: 150000,
    image: "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
    images: [
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    ],
    rating: 4.7,
    reviews: 134,
    inStock: true,
  },
  {
    id: 7,
    name: "Rose Gold Heart Pendant",
    price: 125000,
    originalPrice: 150000,
    image: "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
    images: [
      "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    ],
    rating: 4.6,
    reviews: 98,
    inStock: true,
  },
  {
    id: 8,
    name: "Platinum Star Pendant",
    price: 285000,
    originalPrice: 320000,
    image: "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    images: [
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
    ],
    rating: 4.9,
    reviews: 187,
    inStock: true,
  },
]

export function ProductGrid() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(itemId => itemId !== id))
    } else {
      setWishlist(prev => [...prev, id])
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-2 sm:mb-3 md:mb-4">
            Featured Collections
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Discover our handpicked selection of the finest jewelry pieces, each crafted with precision 
            and adorned with the most precious stones.
          </p>
        </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-4 sm:px-6">
          {mockProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    addToWishlist(product.id)
                  }}
                  className={`absolute top-2 right-2 h-8 w-8 p-0 rounded-full transition-all duration-200 ${
                    wishlist.includes(product.id)
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-white/80 text-gray-600 hover:bg-white hover:scale-110'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-white text-white' : ''}`} />
                </Button>
                
                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Out of Stock</span>
                  </div>
                )}
              </div>

                             {/* Product Details */}
               <div className="p-2 sm:p-3 md:p-4">
                 <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                   {product.name}
                 </h3>

                 {/* Rating */}
                 <div className="flex items-center space-x-1 mb-2">
                   <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                   <span className="text-xs sm:text-sm font-medium text-gray-900">{product.rating}</span>
                   <span className="text-xs sm:text-sm text-gray-500">({product.reviews})</span>
                 </div>

                 {/* Discount Badge */}
                 {product.originalPrice > product.price && (
                   <div className="mb-2">
                     <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                       {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                     </span>
                   </div>
                 )}

                 {/* Price */}
                 <div className="flex items-center space-x-2 mt-2">
                   <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
                     {formatPrice(product.price)}
                   </span>
                   {product.originalPrice > product.price && (
                     <span className="text-xs sm:text-sm text-gray-500 line-through">
                       {formatPrice(product.originalPrice)}
                     </span>
                   )}
                 </div>
               </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 md:mt-12 lg:mt-16 px-4 sm:px-6">
          <Button
            onClick={() => navigate("/collections")}
            variant="outline"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium transition-all duration-300"
          >
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  )
}
