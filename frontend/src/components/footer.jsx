import { useNavigate } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-light tracking-wider">ELARA</h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
              Crafting timeless elegance through exceptional jewelry designs. 
              Every piece tells a story of luxury, beauty, and sophistication.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4 pt-3 sm:pt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-medium">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
              <li>
                <button 
                  onClick={() => navigate("/")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/collections")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Collections
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/bangles")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Bangles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/ear-ring")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ear Rings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/pendant")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pendants
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-medium">Customer Service</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Shipping Info
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Size Guide
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Care Instructions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Contact Us</h4>
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Luxury Street, Mumbai, Maharashtra 400001, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">info@elara.com</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-4">
              <h5 className="text-sm font-medium mb-2">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-white text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-r-md hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Elara Luxury Jewelry. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
