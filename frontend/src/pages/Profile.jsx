import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useScrollToTop } from "../hooks/useScrollToTop"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Luxury Street, Mumbai, Maharashtra 400001"
  })

  const [formData, setFormData] = useState(user)
  useScrollToTop()

  const handleEdit = () => {
    setIsEditing(true)
    setFormData(user)
  }

  const handleSave = () => {
    setUser(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData(user)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 sm:mb-0">
              Profile
            </h1>
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                variant="outline"
                className="flex items-center w-full sm:w-auto"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <Button
                  onClick={handleSave}
                  className="flex items-center w-full sm:w-auto"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex items-center w-full sm:w-auto"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground mb-2">
                  Profile Picture
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Upload a new profile picture
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 sm:p-4 bg-gray-50 rounded-md">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <span className="text-sm sm:text-base text-foreground">{user.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Email
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 sm:p-4 bg-gray-50 rounded-md">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <span className="text-sm sm:text-base text-foreground">{user.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Phone
                  </label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 sm:p-4 bg-gray-50 rounded-md">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <span className="text-sm sm:text-base text-foreground">{user.phone}</span>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Address
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="flex items-start space-x-2 p-3 sm:p-4 bg-gray-50 rounded-md">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1" />
                      <span className="text-sm sm:text-base text-foreground">{user.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="border-t pt-6 sm:pt-8 lg:pt-10">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground mb-4 sm:mb-6">
                Recent Orders
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-6 border rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="font-medium text-foreground text-sm sm:text-base">
                        Order #ELARA-001
                      </h4>
                      <p className="text-sm text-gray-600">Luxury Diamond Tote Bag</p>
                      <p className="text-sm sm:text-base font-medium text-foreground">₹2,85,000</p>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full w-fit">
                      Delivered
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 border rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="font-medium text-foreground text-sm sm:text-base">
                        Order #ELARA-002
                      </h4>
                      <p className="text-sm text-gray-600">Rose Gold Diamond Bracelet</p>
                      <p className="text-sm sm:text-base font-medium text-foreground">₹3,75,000</p>
                    </div>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full w-fit">
                      Processing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
