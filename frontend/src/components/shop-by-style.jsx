import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "../assets/special.png"

export function ShopByStyle() {
  const navigate = useNavigate()
  const [hoveredStyle, setHoveredStyle] = useState(0)

  const styles = [
    {
      id: 1,
      name: "Daily Wear",
      secondaryImage: "/src/assets/luxury-diamond-necklace-featured.png",
      route: "/collections/daily-wear"
    },
    {
      id: 2,
      name: "Party",
      secondaryImage: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      route: "/collections/party"
    },
    {
      id: 3,
      name: "Work",
      secondaryImage: "/src/assets/gold-bracelet-luxury-featured.png",
      route: "/collections/work"
    },
    {
      id: 4,
      name: "Gifting",
      secondaryImage: "/src/assets/luxury-custom-engagement-ring-design.png",
      route: "/collections/gifting"
    },
    {
      id: 5,
      name: "College",
      secondaryImage: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      route: "/collections/college"
    },
    {
      id: 6,
      name: "Festive Days",
      secondaryImage: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      route: "/collections/festive"
    }
  ]

  return (
    <section className="py-4 sm:py-6 md:py-8 lg:py-12 bg-white w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Main Content - Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-start">
          
          {/* Left Side - Style Menu - Responsive Width */}
          <div className="w-full lg:w-[35%] xl:w-[30%]">
            <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-md sm:shadow-lg md:shadow-xl p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-100">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-center">
                <span className="block sm:inline">SHOP BY</span>
                <span className="block sm:inline">LIFESTYLE</span>
              </h2>
              
              {/* Style Buttons - Fully Responsive */}
              <div className="flex flex-row space-x-2 sm:space-x-3 md:space-x-4 overflow-x-auto scrollbar-hide pb-2 lg:flex-col lg:space-x-0 lg:space-y-2 lg:space-y-3 lg:overflow-visible">
                {styles.map((style, index) => (
                  <button
                    key={style.id}
                    onMouseEnter={() => setHoveredStyle(index)}
                    onClick={() => navigate(style.route)}
                    className={`flex-shrink-0 px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-full sm:rounded-md md:rounded-lg lg:rounded-xl transition-all duration-300 font-medium text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap ${
                      hoveredStyle === index
                        ? 'bg-amber-500 text-white shadow-md sm:shadow-lg md:shadow-xl'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Content - Responsive Width */}
          <div className="w-full lg:w-[65%] xl:w-[70%]">
            {/* Two Image Layout - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {/* Main Image - Static */}
              <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl">
                <img
                  src={style}
                  alt="Lifestyle"
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 left-2 sm:left-3 md:left-4 lg:left-6 text-white">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">Lifestyle Collection</h3>
                  <p className="text-xs sm:text-sm md:text-base opacity-90">Perfect for every occasion</p>
                </div>
              </div>

              {/* Secondary Image - Dynamic, Changes on Hover */}
              <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl">
                <img
                  src={styles[hoveredStyle].secondaryImage}
                  alt={styles[hoveredStyle].name}
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 left-2 sm:left-3 md:left-4 lg:left-6 text-white">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{styles[hoveredStyle].name}</h3>
                  <p className="text-xs sm:text-sm md:text-base opacity-90">Discover our collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
