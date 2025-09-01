import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import special from "../assets/special.png"

export function ElaraSpecial() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  const products = [
    {
      id: 1,
      name: "Twinkling Cluster Ring",
      material: "18k Gold Vermeil",
      price: "₹ 4,999",
      image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      isBestseller: true,
      route: "/product/1"
    },
    {
      id: 2,
      name: "Luxe Leaflet Diamond Ring",
      material: "18k Gold Vermeil",
      price: "₹ 3,529",
      image: "/src/assets/luxury-custom-engagement-ring-design.png",
      isBestseller: false,
      route: "/product/2"
    },
    {
      id: 3,
      name: "Diamond Necklace",
      material: "18k Gold Vermeil",
      price: "₹ 4,369",
      image: "/src/assets/luxury-diamond-necklace-featured.png",
      isBestseller: true,
      route: "/product/3"
    },
    {
      id: 4,
      name: "Elegant Diamond Pendant",
      material: "18k Gold Vermeil",
      price: "₹ 5,299",
      image: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      isBestseller: false,
      route: "/product/4"
    },
    {
      id: 5,
      name: "Luxury Gold Bracelet",
      material: "18k Gold Vermeil",
      price: "₹ 6,799",
      image: "/src/assets/gold-bracelet-luxury-featured.png",
      isBestseller: true,
      route: "/product/5"
    },
    {
      id: 6,
      name: "Sparkling Diamond Earrings",
      material: "18k Gold Vermeil",
      price: "₹ 3,899",
      image: "/src/assets/sparkling-diamond-earrings.png",
      isBestseller: false,
      route: "/product/6"
    },
    {
      id: 7,
      name: "Rose Gold Baguette Ring",
      material: "18k Gold Vermeil",
      price: "₹ 4,599",
      image: "/src/assets/luxury-custom-engagement-ring-design.png",
      isBestseller: false,
      route: "/product/7"
    },
    {
      id: 8,
      name: "Platinum Diamond Ring",
      material: "18k Gold Vermeil",
      price: "₹ 7,299",
      image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      isBestseller: true,
      route: "/product/8"
    },
    {
      id: 9,
      name: "Diamond Tennis Bracelet",
      material: "18k Gold Vermeil",
      price: "₹ 8,999",
      image: "/src/assets/gold-bracelet-luxury-featured.png",
      isBestseller: false,
      route: "/product/9"
    },
    {
      id: 10,
      name: "Emerald Cut Diamond Ring",
      material: "18k Gold Vermeil",
      price: "₹ 9,499",
      image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      isBestseller: true,
      route: "/product/10"
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 3)) % Math.max(1, products.length - 3))
  }

  return (
    <section className="py-6 sm:py-8 md:py-12 bg-white w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
            ELARA'S SPECIAL
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
          {/* Product Carousel - Takes 70% width */}
          <div className="lg:w-[70%]">
            <div className="flex space-x-3 sm:space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide pb-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex-shrink-0"
                  style={{ minWidth: '220px', maxWidth: '220px' }}
                  onClick={() => navigate(product.route)}
                >
                  {/* Bestseller Tag */}
                  {product.isBestseller && (
                    <div className="absolute top-3 right-3 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded font-medium font-serif">
                      Bestseller
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden rounded-t-lg sm:rounded-t-xl bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-2 sm:p-3 md:p-4">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2 md:mb-3 line-clamp-2 ">
                      {product.name}
                    </h3>
                    
                    {/* Material Options */}
                    <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 mb-1.5 sm:mb-2 md:mb-3">
                      <div className="flex space-x-0.5 sm:space-x-1">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400 border border-gray-300"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-pink-300 border border-gray-300"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-gray-300 border border-gray-300"></div>
                      </div>
                      <span className="text-xs text-gray-600 font-serif">{product.material}</span>
                    </div>
                    
                    {/* Price */}
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 ">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle Image Block - Takes 30% width */}
          <div className="lg:w-[30%]">
            <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg sm:rounded-xl overflow-hidden group cursor-pointer h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] w-full">
              <div className="h-full relative overflow-hidden">
                <img
                  src={special}
                  alt="Special"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
