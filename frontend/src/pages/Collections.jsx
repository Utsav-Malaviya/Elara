import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useScrollToTop } from "../hooks/useScrollToTop"

// Categories data
const categories = [
  {
    id: 1,
    title: "BANGLES",
    description: "Traditional and contemporary bangle designs in precious metals",
    image: "/src/assets/luxury-gold-bangles.png",
    route: "/bangles"
  },
  {
    id: 2,
    title: "EAR RINGS",
    description: "Elegant earrings from studs to chandelier styles",
    image: "/src/assets/sparkling-diamond-earrings.png",
    route: "/ear-ring"
  },
  {
    id: 3,
    title: "PENDANTS",
    description: "Delicate pendants and statement necklaces",
    image: "/src/assets/luxury-diamond-heart-pendant-rose-gold.png",
    route: "/pendant"
  },
  {
    id: 4,
    title: "RINGS",
    description: "Engagement rings, wedding bands, and fashion rings",
    image: "/src/assets/luxury-diamond-solitaire-ring-platinum.png",
    route: "/rings"
  },
  {
    id: 5,
    title: "BRACELETS",
    description: "Tennis bracelets and charm collections",
    image: "/src/assets/luxury-tennis-bracelet-diamonds-platinum.png",
    route: "/bracelets"
  },
  {
    id: 6,
    title: "NECKLACES",
    description: "Statement necklaces and delicate chains",
    image: "/src/assets/luxury-diamond-necklace-featured.png",
    route: "/necklaces"
  },
  {
    id: 7,
    title: "BRIDAL COLLECTION",
    description: "Complete wedding jewelry sets for your special day",
    image: "/src/assets/luxury-bridal-set-diamonds-white-gold.png",
    route: "/bridal-collection"
  },
  {
    id: 8,
    title: "MEN'S COLLECTION",
    description: "Sophisticated jewelry designed for modern gentlemen",
    image: "/src/assets/luxury-mens-watch-gold-leather.png",
    route: "/mens-collection"
  },
  {
    id: 9,
    title: "GEMSTONE JEWELRY",
    description: "Precious and semi-precious stones in exquisite settings",
    image: "/src/assets/luxury-gemstone-collection-ruby-emerald.png",
    route: "/gemstone-jewelry"
  },
  {
    id: 10,
    title: "PEARL COLLECTION",
    description: "Lustrous pearls in timeless and contemporary designs",
    image: "/src/assets/luxury-pearl-necklace-diamond-clasp.png",
    route: "/pearl-collection"
  },
  {
    id: 11,
    title: "VINTAGE INSPIRED",
    description: "Art Deco and vintage-style pieces with modern craftsmanship",
    image: "/src/assets/vintage-art-deco-necklace-diamonds.png",
    route: "/vintage-inspired"
  },
  {
    id: 12,
    title: "CUSTOM JEWELRY",
    description: "Bespoke pieces crafted to your unique specifications",
    image: "/src/assets/luxury-custom-engagement-ring-design.png",
    route: "/custom-jewelry"
  }
]

export default function CollectionsPage() {
  const navigate = useNavigate()
  useScrollToTop()

  const handleCategoryClick = (route) => {
    navigate(route)
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4 sm:mb-6">
            ELARA COLLECTIONS
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of fine jewelry, where timeless craftsmanship meets contemporary elegance
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group cursor-pointer bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              onClick={() => handleCategoryClick(category.route)}
            >
                             <div className="relative overflow-hidden aspect-square">
                 <img
                   src={category.image}
                   alt={category.title}
                   className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 
                 {/* Overlay on hover */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </div>
               
               <div className="p-3 sm:p-4 lg:p-6 flex flex-col flex-1">
                 <div className="text-center flex flex-col flex-1">
                   <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-wide text-foreground mb-2 sm:mb-3 flex-shrink-0">
                     {category.title}
                   </h3>
                   <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4 flex-1">
                     {category.description}
                   </p>
                   
                   {/* Explore Button - Bottom of card */}
                   <div className="text-xs sm:text-sm lg:text-base font-medium tracking-wide text-foreground/70 hover:text-foreground transition-colors border-b border-transparent hover:border-foreground/30 inline-flex items-center group-hover:border-foreground/30 flex-shrink-0 mt-auto">
                     EXPLORE COLLECTION
                     <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform group-hover:translate-x-1" />
                   </div>
                 </div>
               </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-12 lg:p-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 sm:mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
              Our expert jewelers can create custom pieces tailored to your unique style and preferences.
            </p>
            <button className="bg-foreground text-background hover:bg-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
              Contact Our Designers
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
