import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigation } from "./components/navigation"
import { Footer } from "./components/footer"

// Import pages
import HomePage from "./pages/Home"
import BestSellerPage from "./pages/BestSeller"
import CollectionsPage from "./pages/Collections"
import BanglesPage from "./pages/Bangles"
import EarRingPage from "./pages/EarRing"
import PendantPage from "./pages/Pendant"
import CartPage from "./pages/Cart"
import WishlistPage from "./pages/Wishlist"
import ProfilePage from "./pages/Profile"
import ProductDetailPage from "./pages/ProductDetail"
import OrderPage from "./pages/Order"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/best-seller" element={<BestSellerPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/bangles" element={<BanglesPage />} />
          <Route path="/ear-ring" element={<EarRingPage />} />
          <Route path="/pendant" element={<PendantPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
