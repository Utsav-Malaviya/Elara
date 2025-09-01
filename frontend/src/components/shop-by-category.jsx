import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function ShopByCategory() {
  const navigate = useNavigate()

  const categories = [
    {
      name: "RINGS",
      image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
      route: "/collections"
    },
    {
      name: "NECKLACES", 
      image: "/src/assets/luxury-diamond-necklace-featured.png",
      route: "/collections"
    },
    {
      name: "BRACELETS",
      image: "/src/assets/gold-bracelet-luxury-featured.png", 
      route: "/collections"
    },
    {
      name: "EARRINGS",
      image: "/src/assets/sparkling-diamond-earrings.png",
      route: "/collections"
    },
    {
      name: "PERSONALIZED",
      image: "/src/assets/luxury-custom-engagement-ring-design.png",
      route: "/collections"
    },
    {
      name: "BANGLES",
      image: "/src/assets/luxury-gold-bangles.png",
      route: "/bangles"
    },
    {
      name: "PENDANTS",
      image: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
      route: "/pendant"
    },
    {
      name: "STUDS",
      image: "/src/assets/classic-diamond-stud-earrings-platinum.png",
      route: "/collections"
    },
  ]

  return (
    <section className="py-6 sm:py-8 md:py-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10">
          <div className="max-w-2xl">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-wide">
              SHOP BY CATEGORY
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Discover our curated collection of exquisite jewelry pieces, crafted for the discerning connoisseur.
            </p>
          </div>
        </div>

        {/* Category Cards - Grid on mobile, horizontal scroll on desktop */}
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Mobile Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 sm:hidden">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all duration-500"
                onClick={() => navigate(category.route)}
              >
                {/* Category Image */}
                <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Frame/Border */}
                  <div className="absolute inset-2 sm:inset-3 md:inset-4 border-2 border-white/80 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-md sm:rounded-lg"></div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
                  
                  {/* Category Name */}
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 text-white">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-xs sm:text-sm font-medium uppercase tracking-wider font-serif">
                        {category.name}
                      </span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Horizontal Scroll */}
          <div className="hidden sm:flex space-x-8 overflow-x-auto scrollbar-hide pb-8">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-xl cursor-pointer flex-shrink-0 shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{ minWidth: '220px', maxWidth: '220px' }}
                onClick={() => navigate(category.route)}
              >
                {/* Category Image */}
                <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Frame/Border */}
                  <div className="absolute inset-4 border-2 border-white/80 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"></div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
                  
                  {/* Category Name */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center space-x-3">
                      <span className="text-base font-medium uppercase tracking-wider font-serif">
                        {category.name}
                      </span>
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
