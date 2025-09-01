import { useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Heart, Plus, Minus, ShoppingCart, Truck, Shield, Award, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"

// Sample product data with categories - in a real app, this would come from a database
const products = [
  {
    id: "1",
    name: "Luxury Diamond Tote Bag",
    price: "₹2,85,000",
    originalPrice: "₹3,20,000",
    discount: 11,
    rating: 4.8,
    reviews: 234,
    category: "bags",
    description: "Exquisite handcrafted tote bag featuring premium leather with diamond-studded hardware.",
    images: [
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
      "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
    ],
    specifications: {
      Material: "Premium Italian Leather",
      Hardware: "Diamond-studded Gold",
      Dimensions: "35cm x 28cm x 15cm",
      Weight: "1.2kg",
    },
  },
  {
    id: "2",
    name: "Rose Gold Diamond Bracelet",
    price: "₹3,75,000",
    originalPrice: "₹4,20,000",
    discount: 11,
    rating: 4.9,
    reviews: 187,
    category: "bangles",
    description: "Stunning rose gold bracelet adorned with brilliant cut diamonds.",
    images: [
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
    ],
    specifications: {
      Material: "18K Rose Gold",
      Diamonds: "2.5 Carat Total Weight",
      Length: "18cm",
      Width: "8mm",
    },
  },
  {
    id: "3",
    name: "Gold Diamond Bangle",
    price: "₹2,95,000",
    originalPrice: "₹3,50,000",
    discount: 16,
    rating: 4.7,
    reviews: 156,
    category: "bangles",
    description: "Elegant gold bangle with diamond accents.",
    images: [
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
    ],
    specifications: {
      Material: "18K Gold",
      Diamonds: "1.8 Carat Total Weight",
      Length: "18cm",
      Width: "6mm",
    },
  },
  {
    id: "4",
    name: "Platinum Diamond Earrings",
    price: "₹4,25,000",
    originalPrice: "₹4,80,000",
    discount: 11,
    rating: 4.8,
    reviews: 203,
    category: "earrings",
    description: "Sophisticated platinum earrings with brilliant diamonds.",
    images: [
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    ],
    specifications: {
      Material: "Platinum",
      Diamonds: "3.2 Carat Total Weight",
      Style: "Stud Earrings",
      Back: "Push Back",
    },
  },
  {
    id: "5",
    name: "Diamond Pendant Necklace",
    price: "₹3,15,000",
    originalPrice: "₹3,60,000",
    discount: 13,
    rating: 4.6,
    reviews: 178,
    category: "pendants",
    description: "Timeless diamond pendant on a delicate chain.",
    images: [
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    ],
    specifications: {
      Material: "18K White Gold",
      Diamond: "2.1 Carat Center Stone",
      Chain: "18 inches",
      Clasp: "Lobster Clasp",
    },
  },
  {
    id: "6",
    name: "Silver Bangle Set",
    price: "₹1,85,000",
    originalPrice: "₹2,20,000",
    discount: 16,
    rating: 4.5,
    reviews: 142,
    category: "bangles",
    description: "Beautiful set of silver bangles with traditional designs.",
    images: [
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
      "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
    ],
    specifications: {
      Material: "925 Silver",
      Design: "Traditional Indian",
      Set: "6 Pieces",
      Weight: "45g",
    },
  },
  {
    id: "7",
    name: "Emerald Gold Ring",
    price: "₹2,45,000",
    originalPrice: "₹2,90,000",
    discount: 15,
    rating: 4.7,
    reviews: 165,
    category: "rings",
    description: "Stunning emerald ring set in 18K gold with diamond accents.",
    images: [
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
      "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    ],
    specifications: {
      Material: "18K Gold",
      Gemstone: "Natural Emerald",
      Diamonds: "0.8 Carat Accent Stones",
      Size: "US 7",
    },
  },
]

export default function ProductDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const carouselRef = useRef(null)
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Find product by ID
  const product = products.find((p) => p.id === id) || products[0]

  // Get related products (all products except current one)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleOrderNow = () => {
    navigate("/order")
  }

  const handleAddToCart = () => {
    navigate("/cart")
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const getCategoryName = (category) => {
    const categoryNames = {
      bangles: "Bangles",
      earrings: "Earrings", 
      pendants: "Pendants",
      bags: "Bags",
      rings: "Rings"
    }
    return categoryNames[category] || category
  }

  const nextSlide = () => {
    const maxSlide = Math.max(0, Math.ceil(relatedProducts.length / 4) - 1)
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide))
  }

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }

  // Ensure we have 6 gallery images and present them in a 2-column grid
  const galleryImages = [...product.images]
  while (galleryImages.length < 6) {
    galleryImages.push(product.images[galleryImages.length % product.images.length])
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="w-full h-full">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 z-10 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-full px-4 py-2 shadow-lg border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full pt-16">
          {/* Product Gallery - 6 images, 2 per row */}
          <div className="p-4 lg:p-8 overflow-hidden">
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.slice(0, 6).map((image, index) => (
                <div key={index} className="aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6 p-4 lg:p-8 bg-white overflow-hidden">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-black mb-2">{product.name}</h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-light text-foreground">{product.price}</p>
            </div>

            <p className="text-foreground/70 leading-relaxed text-sm sm:text-base">{product.description}</p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded">
                <Truck className="w-4 h-4 text-gray-700" />
                <span>Free insured shipping</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded">
                <Shield className="w-4 h-4 text-gray-700" />
                <span>Lifetime warranty</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded">
                <Award className="w-4 h-4 text-gray-700" />
                <span>Certified authenticity</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded">
                <ShoppingCart className="w-4 h-4 text-gray-700" />
                <span>Secure checkout</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseQuantity}
                    className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-black hover:text-white"
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 text-foreground font-medium text-sm sm:text-base">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={increaseQuantity}
                    className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-black hover:text-white"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleOrderNow}
                  className="w-full bg-foreground text-background hover:bg-black h-10 sm:h-12 text-sm sm:text-base"
                >
                  Order Now
                </Button>
                <div className="flex space-x-2 sm:space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleAddToCart}
                    className="flex-1 h-10 sm:h-12 bg-transparent hover:bg-black hover:text-white text-sm sm:text-base"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Add to Cart
                  </Button>
                                     <Button
                     variant="outline"
                     size="icon"
                     onClick={() => setIsLiked(!isLiked)}
                     className={`h-10 w-10 sm:h-12 sm:w-12 hover:bg-black hover:text-white ${isLiked ? "bg-black border-black" : ""}`}
                   >
                     <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? "fill-black text-black" : ""}`} />
                   </Button>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="border-t pt-4">
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">Specifications</h3>
              <div className="space-y-2 sm:space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-foreground/70 text-xs sm:text-sm">{key}:</span>
                    <span className="text-foreground font-medium text-xs sm:text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* More Details */}
            <div className="border-t pt-4">
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">More Details</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                <li>Premium craftsmanship with attention to detail</li>
                <li>Nickel-free, hypoallergenic metal composition</li>
                <li>Complimentary gift packaging included</li>
                <li>Easy 7-day return and exchange policy</li>
                <li>Care: Store in a dry place, avoid chemicals and moisture</li>
              </ul>
            </div>
          </div>
        </div>

        {/* You May Also Like - Slider */}
        {relatedProducts.length > 0 && (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-black">YOU MAY ALSO LIKE</h2>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="h-10 w-10 rounded-full disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    disabled={currentSlide >= Math.max(0, Math.ceil(relatedProducts.length / 4) - 1)}
                    className="h-10 w-10 rounded-full disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-foreground hover:text-black hover:bg-gray-100"
                >
                  View all products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Slider Container */}
            <div className="relative overflow-hidden">
              <div 
                ref={sliderRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="w-full"
                  >
                    <div
                      onClick={() => handleProductClick(relatedProduct.id)}
                      className="cursor-pointer group bg-white rounded-lg h-full"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="mt-3">
                        <h3 className="text-base font-medium text-black truncate">{relatedProduct.name}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex space-x-1">
                            <span className="w-3 h-3 rounded-full bg-yellow-400 border border-gray-300 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-pink-300 border border-gray-300 inline-block"></span>
                          </div>
                          <span className="text-xs text-gray-600">18k Gold Vermeil</span>
                        </div>
                        <div className="mt-1 text-foreground text-base">{relatedProduct.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
