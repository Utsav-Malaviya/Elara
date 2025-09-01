import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, CheckCircle, CreditCard, Truck, Shield, Tag } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useScrollToTop } from "../hooks/useScrollToTop"

// Mock order data
const mockOrderItems = [
  {
    id: 1,
    name: "Luxury Diamond Tote Bag",
    price: 285000,
    quantity: 1,
    image: "/src/assets/luxury-black-leather-tote-bag-with-gold-hardware.png",
    size: "Medium",
    color: "Black"
  },
  {
    id: 2,
    name: "Rose Gold Diamond Bracelet",
    price: 375000,
    quantity: 2,
    image: "/src/assets/elegant-rose-gold-diamond-bracelet-luxury-jewelry.png",
    size: "7.5 inches",
    color: "Rose Gold"
  }
]

export default function OrderPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  })
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [discountAmount, setDiscountAmount] = useState(0)
  useScrollToTop()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would process the order
    alert("Order placed successfully! You will receive a confirmation email shortly.")
    navigate("/")
  }

  const calculateSubtotal = () => {
    return mockOrderItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal - discountAmount
  }

  const handleApplyCoupon = () => {
    const coupons = {
      "WELCOME10": { discount: 0.10, type: "percentage", description: "10% off on your first order" },
      "SAVE500": { discount: 500, type: "fixed", description: "₹500 off on orders above ₹10,000" },
      "FREESHIP": { discount: 0, type: "shipping", description: "Free shipping on all orders" },
      "DIAMOND20": { discount: 0.20, type: "percentage", description: "20% off on diamond jewelry" }
    }
    
    const coupon = coupons[couponCode.toUpperCase()]
    if (coupon) {
      setAppliedCoupon(coupon)
      if (coupon.type === "percentage") {
        setDiscountAmount(calculateSubtotal() * coupon.discount)
      } else if (coupon.type === "fixed") {
        setDiscountAmount(coupon.discount)
      }
    } else {
      alert("Invalid coupon code. Please try again.")
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setDiscountAmount(0)
    setCouponCode("")
  }

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-full px-4 py-2 shadow-lg border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">Shipping Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <Input
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <Input
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">Payment Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <Input
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <Input
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <Input
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-4">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {mockOrderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                </div>
                
                {/* Coupon Section */}
                <div className="space-y-3">
                  {!appliedCoupon ? (
                    <div className="flex space-x-2">
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1"
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        className="px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 disabled:bg-gray-300"
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-800">{couponCode.toUpperCase()}</p>
                          <p className="text-xs text-green-600">{appliedCoupon.description}</p>
                        </div>
                      </div>
                      <Button
                        onClick={handleRemoveCoupon}
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-800"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="text-green-600 font-medium">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button 
                onClick={handleSubmit}
                className="w-full mt-6 bg-foreground text-background hover:bg-black h-12 text-lg"
              >
                Place Order
              </Button>

              {/* Security Features */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <span>Multiple payment options</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-orange-500" />
                  <span>Free worldwide shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Lifetime warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
