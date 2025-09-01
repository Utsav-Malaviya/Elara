import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Heart, ShoppingBag, User, Menu, X, Search } from "lucide-react"

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleNavigation = (path) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-amber-50/95 backdrop-blur-sm border-b border-amber-200/50 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Main navigation */}
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 navigation-container">
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden p-1.5 sm:p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>

          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <h1 className="text-lg sm:text-xl md:text-2xl font-light text-foreground tracking-wider">
              ELARA
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("/best-seller")}
              className={`text-sm font-medium transition-colors ${
                isActive("/best-seller") 
                  ? "text-foreground border-b-2 border-foreground" 
                  : "text-gray-600 hover:text-foreground"
              }`}
            >
              BEST SELLER
            </button>
            <button
              onClick={() => handleNavigation("/collections")}
              className={`text-sm font-medium transition-colors ${
                isActive("/collections") 
                  ? "text-foreground border-b-2 border-foreground" 
                  : "text-gray-600 hover:text-foreground"
              }`}
            >
              COLLECTIONS
            </button>
            <button
              onClick={() => handleNavigation("/bangles")}
              className={`text-sm font-medium transition-colors ${
                isActive("/bangles") 
                  ? "text-foreground border-b-2 border-foreground" 
                  : "text-gray-600 hover:text-foreground"
              }`}
            >
              BANGLES
            </button>
            <button
              onClick={() => handleNavigation("/ear-ring")}
              className={`text-sm font-medium transition-colors ${
                isActive("/ear-ring") 
                  ? "text-foreground border-b-2 border-foreground" 
                  : "text-gray-600 hover:text-foreground"
              }`}
            >
              EAR RINGS
            </button>
            <button
              onClick={() => handleNavigation("/pendant")}
              className={`text-sm font-medium transition-colors ${
                isActive("/pendant") 
                  ? "text-foreground border-b-2 border-foreground" 
                  : "text-gray-600 hover:text-foreground"
              }`}
            >
              PENDANTS
            </button>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            {/* Search button */}
            <Button variant="ghost" size="sm" className="p-1.5 sm:p-2">
              <Search className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </Button>

            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1.5 sm:p-2 relative"
              onClick={() => handleNavigation("/wishlist")}
            >
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 hover:fill-black hover:text-black transition-colors" />
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1.5 sm:p-2 relative"
              onClick={() => handleNavigation("/cart")}
            >
              <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </Button>

            {/* Profile */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1.5 sm:p-2"
              onClick={() => handleNavigation("/profile")}
            >
              <User className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/20 mobile-menu animate-fade-in-up bg-amber-50/95 backdrop-blur-sm">
            <div className="px-3 sm:px-4 py-2 sm:py-3 space-y-2 sm:space-y-3">
              <button
                onClick={() => handleNavigation("/")}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  isActive("/") 
                    ? "bg-foreground text-background" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                HOME
              </button>
              <button
                onClick={() => handleNavigation("/best-seller")}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  isActive("/best-seller") 
                    ? "bg-foreground text-background" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                BEST SELLER
              </button>
              <button
                onClick={() => handleNavigation("/collections")}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  isActive("/collections") 
                    ? "bg-foreground text-background" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                COLLECTIONS
              </button>
              <button
                onClick={() => handleNavigation("/bangles")}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  isActive("/bangles") 
                    ? "bg-foreground text-background" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                BANGLES
              </button>
              <button
                onClick={() => handleNavigation("/ear-ring")}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  isActive("/ear-ring") 
                    ? "bg-foreground text-background" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                EAR RINGS
              </button>
              <button
                onClick={() => handleNavigation("/pendant")}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  isActive("/pendant") 
                    ? "bg-foreground text-background" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                PENDANTS
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
