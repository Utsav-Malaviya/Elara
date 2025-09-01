import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Heart } from "lucide-react"
import i1 from "../assets/i1.png"

export function LifestyleProductSection() {
  const navigate = useNavigate()
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [likedProducts, setLikedProducts] = useState(new Set())

  const products = [
    {
      id: 1,
      name: "Pink Heart Diamond Halo Ring",
      material: "18k Gold Vermeil",
      price: "₹ 5,149",
      image: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      route: "/product/1",
      position: { top: "45%", left: "25%" }
    },
    {
      id: 2,
      name: "Matching Heart Stud Earrings",
      material: "18k Gold Vermeil",
      price: "₹ 3,899",
      image: "/src/assets/sparkling-diamond-earrings.png",
      route: "/product/2",
      position: { top: "35%", left: "75%" }
    },
    {
      id: 3,
      name: "Heart Pendant Necklace",
      material: "18k Gold Vermeil",
      price: "₹ 4,299",
      image: "/src/assets/luxury-diamond-necklace-featured.png",
      route: "/product/3",
      position: { top: "90%", left: "55%" }
    }
  ]

  const handleProductClick = (productId) => {
    setSelectedProduct(productId - 1)
  }

  const toggleLike = (productId) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-amber-50 to-orange-50 w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-center">
          
          {/* Left Side - Lifestyle Image (60%) */}
          <div className="lg:w-[60%] relative">
            <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
              <img
                src={i1}
                alt="Lifestyle"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              
              {/* Interactive Jewelry Hotspots */}
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className={`absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 z-10 ${
                    selectedProduct === index ? 'ring-2 sm:ring-3 md:ring-4 ring-pink-300 scale-110' : ''
                  }`}
                  style={{
                    top: product.position.top,
                    left: product.position.left,
                    transform: selectedProduct === index ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%)'
                  }}
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-700" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details (40%) */}
          <div className="lg:w-[40%] space-y-3 sm:space-y-4 md:space-y-6">
            {/* Product Card */}
            <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100 max-w-sm mx-auto">
              <div className="text-center">
                {/* Product Image */}
                <div className="relative mb-3 sm:mb-4 md:mb-6">
                  <img
                    src={products[selectedProduct].image}
                    alt={products[selectedProduct].name}
                    className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-lg sm:rounded-xl"
                  />
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(products[selectedProduct].id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
                      likedProducts.has(products[selectedProduct].id)
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        likedProducts.has(products[selectedProduct].id) ? 'fill-current' : ''
                      }`} 
                    />
                  </button>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {products[selectedProduct].name}
                </h3>

                {/* Material Options */}
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 border-2 border-white shadow-sm"></div>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 border-2 border-white shadow-sm ring-2 ring-pink-300"></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {products[selectedProduct].material}
                  </span>
                </div>

                {/* Price */}
                <p className="text-2xl font-bold text-gray-900 mb-6">
                  {products[selectedProduct].price}
                </p>

                {/* Action Button */}
                <button
                  onClick={() => navigate(products[selectedProduct].route)}
                  className="w-full bg-gray-50 text-gray-800 py-4 px-6 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl text-lg border border-gray-200"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Product Navigation Dots */}
            <div className="flex justify-center space-x-3" style={{overflow: 'hidden'}}>
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedProduct(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedProduct 
                      ? 'bg-amber-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Select product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
