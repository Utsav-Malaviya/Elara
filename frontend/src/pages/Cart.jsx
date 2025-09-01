import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "../components/ui/button"
import { useScrollToTop } from "../hooks/useScrollToTop"

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    name: "Luxury Diamond Tote Bag",
    price: 285000,
    originalPrice: 320000,
    image: "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
    quantity: 1,
    size: "Medium",
    color: "Black"
  },
  {
    id: 2,
    name: "Rose Gold Diamond Bracelet",
    price: 375000,
    originalPrice: 420000,
    image: "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
    quantity: 2,
    size: "7.5 inches",
    color: "Rose Gold"
  },
  {
    id: 3,
    name: "Evening Clutch",
    price: 85000,
    originalPrice: 95000,
    image: "/src/assets/luxury-champagne-satin-evening-clutch-with-pearls.png",
    quantity: 1,
    size: "Standard",
    color: "Champagne"
  }
]

export default function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(mockCartItems)
  useScrollToTop()

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0)
  }

  const calculateTotal = () => {
    return calculateSubtotal()
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!")
      return
    }
    navigate("/order")
  }

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 sm:mb-8 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-full px-4 py-2 shadow-lg border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>

          <div className="text-center py-12 sm:py-16 lg:py-20">
            <ShoppingBag className="h-16 sm:h-24 w-16 sm:w-24 text-gray-400 mx-auto mb-4 sm:mb-6" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 sm:mb-6">
              Your Cart is Empty
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="bg-foreground text-background hover:bg-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 sm:mb-8 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-full px-4 py-2 shadow-lg border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-3 space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl font-light text-foreground">Shopping Cart</h1>
            
            <div className="space-y-4 sm:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">{item.name}</h3>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-base sm:text-lg font-semibold text-gray-900">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right w-full sm:w-auto">
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.originalPrice > item.price && (
                        <p className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border sticky top-4">
              <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6">Order Summary</h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
                  <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                </div>

                {calculateDiscount() > 0 && (
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-green-600">Discount</span>
                    <span className="text-green-600 font-medium">-{formatPrice(calculateDiscount())}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between text-lg sm:text-xl font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                className="w-full mt-4 sm:mt-6 bg-foreground text-background hover:bg-black h-12 text-base sm:text-lg"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free worldwide shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Lifetime warranty included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure packaging & delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
