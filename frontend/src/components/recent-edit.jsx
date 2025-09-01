import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function RecentEdit() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  const products = [
    {
      id: 1,
      name: "Diamond Solitaire Ring",
      material: "18k Gold Vermeil",
      price: "₹ 8,999",
      mainImage: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      thumbnail: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      route: "/product/1"
    },
    {
      id: 2,
      name: "Princess-Cut Diamond Earrings",
      material: "18k Gold Vermeil",
      price: "₹ 7,169",
      mainImage: "/src/assets/sparkling-diamond-earrings.png",
      thumbnail: "/src/assets/sparkling-diamond-earrings.png",
      route: "/product/2"
    },
    {
      id: 3,
      name: "Chain-Link Diamond Ring",
      material: "18k Gold Vermeil",
      price: "₹ 6,479",
      mainImage: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      thumbnail: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      route: "/product/3"
    },
    {
      id: 4,
      name: "Rose Gold Baguette Ring",
      material: "18k Gold Vermeil",
      price: "₹ 5,929",
      mainImage: "/src/assets/luxury-custom-engagement-ring-design.png",
      thumbnail: "/src/assets/luxury-custom-engagement-ring-design.png",
      route: "/product/4"
    },
    {
      id: 5,
      name: "Elegant Diamond Pendant",
      material: "18k Gold Vermeil",
      price: "₹ 4,999",
      mainImage: "/src/assets/luxury-diamond-necklace-featured.png",
      thumbnail: "/src/assets/luxury-diamond-necklace-featured.png",
      route: "/product/5"
    },
    {
      id: 6,
      name: "Luxury Gold Bracelet",
      material: "18k Gold Vermeil",
      price: "₹ 9,499",
      mainImage: "/src/assets/gold-bracelet-luxury-featured.png",
      thumbnail: "/src/assets/gold-bracelet-luxury-featured.png",
      route: "/product/6"
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 3)) % Math.max(1, products.length - 3))
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + 4)

  return (
    <section className="py-6 sm:py-8 md:py-12 bg-amber-50/30 w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10">
          
                     {/* Left Section - Text Only */}
           <div className="lg:w-1/3 flex items-center justify-center">
             <div className="text-center lg:text-left">
               {/* ELARA RECENT EDIT - Above Fresh Picks in Desktop */}
               <h2 className="text-base sm:text-lg md:text-xl lg:text-3xl font-black text-gray-800 uppercase tracking-wider mb-1 sm:mb-2 lg:mb-3">
                 ELARA RECENT EDIT
               </h2>
               <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                 Fresh Picks
               </h3>
               <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                 Exquisitely Chosen, Every Seven Days
               </p>
             </div>
           </div>

          {/* Right Section - Product Carousel */}
          <div className="lg:w-2/3 w-full">
            {/* Navigation Arrows */}
            <div className="flex justify-end mb-4 sm:mb-6">
              <div className="flex space-x-1 sm:space-x-2">
                <button
                  onClick={prevSlide}
                  className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Next products"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Product Cards */}
            <div className="flex space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide pb-4">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0 cursor-pointer w-[200px] lg:w-[280px] flex-shrink-0"
                  onClick={() => navigate(product.route)}
                >
                  {/* Main Product Image */}
                  <div className="relative aspect-square overflow-hidden rounded-t-lg sm:rounded-t-xl">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Thumbnail Overlay */}
                    <div className="absolute bottom-2 right-2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-md shadow-sm overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-2 sm:p-3 md:p-4 lg:p-6">
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 mb-1.5 sm:mb-2 lg:mb-3 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {/* Material Options */}
                    <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3 mb-2 sm:mb-3 lg:mb-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-full bg-yellow-400 border border-gray-300"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-full bg-pink-300 border border-gray-300"></div>
                      </div>
                      <span className="text-xs sm:text-sm md:text-base lg:text-base text-gray-600">{product.material}</span>
                    </div>
                    
                    {/* Price */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
