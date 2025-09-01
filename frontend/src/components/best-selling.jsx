import { useNavigate } from "react-router-dom"
import { Sparkles } from "lucide-react"

export function BestSelling() {
  const navigate = useNavigate()

  const products = [
    {
      id: 1,
      name: "Diamond Encrusted Infinity Ring",
      material: "18k Gold Vermeil",
      price: "₹ 3,569",
      image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      route: "/product/1",
      isBestseller: true
    },
    {
      id: 2,
      name: "Fashionable Leaf Style Ring",
      material: "18k Gold Vermeil",
      price: "₹ 3,669",
      image: "/src/assets/luxury-custom-engagement-ring-design.png",
      route: "/product/2",
      isBestseller: false
    },
    {
      id: 3,
      name: "Twinkling Cluster Ring",
      material: "18k Gold Vermeil",
      price: "₹ 4,999",
      image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      route: "/product/3",
      isBestseller: true
    },
    {
      id: 4,
      name: "Luxe Leaflet Diamond Ring",
      material: "18k Gold Vermeil",
      price: "₹ 3,529",
      image: "/src/assets/luxury-custom-engagement-ring-design.png",
      route: "/product/4",
      isBestseller: false
    },
    {
      id: 5,
      name: "Diamond Necklace",
      material: "18k Gold Vermeil",
      price: "₹ 4,369",
      image: "/src/assets/luxury-diamond-necklace-featured.png",
      route: "/product/5",
      isBestseller: true
    },
    {
      id: 6,
      name: "Elegant Diamond Pendant",
      material: "18k Gold Vermeil",
      price: "₹ 5,299",
      image: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      route: "/product/6",
      isBestseller: false
    },
    {
      id: 7,
      name: "Luxury Gold Bracelet",
      material: "18k Gold Vermeil",
      price: "₹ 6,799",
      image: "/src/assets/gold-bracelet-luxury-featured.png",
      route: "/product/7",
      isBestseller: true
    },
    {
      id: 8,
      name: "Sparkling Diamond Earrings",
      material: "18k Gold Vermeil",
      price: "₹ 3,899",
      image: "/src/assets/sparkling-diamond-earrings.png",
      route: "/product/8",
      isBestseller: false
    },
    {
      id: 9,
      name: "Rose Gold Baguette Ring",
      material: "18k Gold Vermeil",
      price: "₹ 4,599",
      image: "/src/assets/luxury-custom-engagement-ring-design.png",
      route: "/product/9",
      isBestseller: true
    },
    {
      id: 10,
      name: "Platinum Diamond Ring",
      material: "18k Gold Vermeil",
      price: "₹ 7,299",
      image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      route: "/product/10",
      isBestseller: false
    },
    {
      id: 11,
      name: "Diamond Tennis Bracelet",
      material: "18k Gold Vermeil",
      price: "₹ 8,999",
      image: "/src/assets/gold-bracelet-luxury-featured.png",
      route: "/product/11",
      isBestseller: true
    },
    {
      id: 12,
      name: "Emerald Cut Diamond Ring",
      material: "18k Gold Vermeil",
      price: "₹ 9,499",
      image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      route: "/product/12",
      isBestseller: false
    },
    {
      id: 13,
      name: "Heart Diamond Halo Ring",
      material: "18k Gold Vermeil",
      price: "₹ 5,149",
      image: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      route: "/product/13",
      isBestseller: true
    },
    {
      id: 14,
      name: "Matching Heart Stud Earrings",
      material: "18k Gold Vermeil",
      price: "₹ 3,899",
      image: "/src/assets/sparkling-diamond-earrings.png",
      route: "/product/14",
      isBestseller: false
    },
    {
      id: 15,
      name: "Heart Pendant Necklace",
      material: "18k Gold Vermeil",
      price: "₹ 4,299",
      image: "/src/assets/luxury-diamond-necklace-featured.png",
      route: "/product/15",
      isBestseller: true
    },
    {
      id: 16,
      name: "Luxury Platinum Ring",
      material: "18k Gold Vermeil",
      price: "₹ 6,299",
      image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      route: "/product/16",
      isBestseller: false
    }
  ]

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 w-full relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-to-tr from-pink-200/20 to-rose-200/20 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-200/15 to-amber-200/15 rounded-full blur-lg sm:blur-xl md:blur-2xl"></div>
      </div>

      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            BEST SELLER
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Discover our most popular jewelry pieces loved by customers worldwide
          </p>
        </div>

        {/* Product Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer border border-white/20"
              onClick={() => navigate(product.route)}
            >
              {/* Bestseller Tag with Sparkle Icon */}
              {product.isBestseller && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium font-serif z-10 flex items-center space-x-1 shadow-md" style={{backgroundColor: '#FFF8EC'}}>
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" style={{color: 'black'}} />
                  <span style={{color: 'black'}}>Bestseller</span>
                </div>
              )}

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Details */}
              <div className="p-2 sm:p-3 md:p-4 lg:p-6">
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {product.name}
                </h3>
                
                {/* Material Options */}
                <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 mb-1.5 sm:mb-2 md:mb-3">
                  <div className="flex space-x-0.5 sm:space-x-1">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 border-2 border-white shadow-sm"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 border-2 border-white shadow-sm"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 border-2 border-white shadow-sm"></div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{product.material}</span>
                </div>
                
                {/* Price */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {product.price}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6 sm:mt-8 md:mt-10">
          <button 
            onClick={() => navigate('/collections/best-seller')}
            className="inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-xs sm:text-sm md:text-base"
          >
            View All Best Sellers
          </button>
        </div>
      </div>
    </section>
  )
}
