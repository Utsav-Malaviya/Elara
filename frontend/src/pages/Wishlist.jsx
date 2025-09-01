import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Trash2, ShoppingBag, Heart } from "lucide-react"
import { Button } from "../components/ui/button"
import { useScrollToTop } from "../hooks/useScrollToTop"

// Mock wishlist data
const mockWishlistItems = [
  {
    id: 1,
    name: "Luxury Diamond Tote Bag",
    price: 285000,
    originalPrice: 320000,
    image: "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
    size: "Medium",
    color: "Black"
  },
  {
    id: 2,
    name: "Rose Gold Diamond Bracelet",
    price: 375000,
    originalPrice: 420000,
    image: "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
    size: "7.5 inches",
    color: "Rose Gold"
  },
  {
    id: 3,
    name: "Evening Clutch",
    price: 85000,
    originalPrice: 95000,
    image: "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
    size: "Standard",
    color: "Champagne"
  },
  {
    id: 4,
    name: "Platinum Diamond Pendant",
    price: 295000,
    originalPrice: 350000,
    image: "/src/assets/luxury-platinum-diamond-pendant-necklace-star-desi.png",
    size: "18 inches",
    color: "Platinum"
  }
]

export default function WishlistPage() {
  const navigate = useNavigate()
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  useScrollToTop()

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const addToCart = (item) => {
    // In a real app, this would add the item to cart
    alert(`${item.name} added to cart!`)
  }

  const moveAllToCart = () => {
    if (wishlistItems.length === 0) {
      alert("Your wishlist is empty!")
      return
    }
    alert("All items moved to cart!")
    navigate("/cart")
  }

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 text-foreground hover:text-white hover:bg-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>

          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-light text-foreground mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">Start adding items to your wishlist to save them for later.</p>
            <Button 
              onClick={() => navigate("/")}
              className="bg-foreground text-background hover:bg-black"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-full px-4 py-2 shadow-lg border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 overflow-hidden">
          {/* Wishlist Items */}
          <div className="xl:col-span-3 space-y-6 overflow-hidden">
            <div className="flex items-center justify-between" style={{overflow: 'hidden'}}>
              <h1 className="text-3xl font-light text-foreground">My Wishlist</h1>
              <Button
                onClick={moveAllToCart}
                className="bg-foreground text-background hover:bg-black whitespace-nowrap max-w-fit text-sm px-3 py-2 overflow-hidden"
              >
                <ShoppingBag className="w-4 h-4 mr-2 flex-shrink-0" />
                Move All to Cart
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm border overflow-hidden">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3 overflow-hidden">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 overflow-hidden">
                      <Button
                        onClick={() => addToCart(item)}
                        className="flex-1 bg-foreground text-background hover:bg-black overflow-hidden"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2 flex-shrink-0" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-red-600 hover:text-red-700 overflow-hidden"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="xl:col-span-1 overflow-hidden">
            <div className="bg-white rounded-lg p-6 shadow-sm border overflow-hidden">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Wishlist Summary</h2>

              <div className="space-y-4 overflow-hidden">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-medium">{wishlistItems.length}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Value</span>
                  <span className="font-medium">
                    {formatPrice(wishlistItems.reduce((total, item) => total + item.price, 0))}
                  </span>
                </div>

                {wishlistItems.some(item => item.originalPrice > item.price) && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Total Savings</span>
                    <span className="text-green-600 font-medium">
                      {formatPrice(wishlistItems.reduce((total, item) => total + (item.originalPrice - item.price), 0))}
                    </span>
                  </div>
                )}
              </div>

              <Button 
                onClick={moveAllToCart}
                className="w-full mt-6 bg-foreground text-background hover:bg-black h-12 text-lg overflow-hidden"
              >
                <ShoppingBag className="w-4 h-4 mr-2 flex-shrink-0" />
                Move All to Cart
              </Button>

              <div className="mt-4 space-y-2 text-sm text-gray-600 overflow-hidden">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Save items for later</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Get notified of price drops</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Easy access to favorites</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
