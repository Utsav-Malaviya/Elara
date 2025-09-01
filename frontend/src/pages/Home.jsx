import { Navigation } from "../components/navigation"
import { HeroSection } from "../components/hero-section"
import { ShopByStyle } from "../components/shop-by-style"
import { RecentEdit } from "../components/recent-edit"
import { LifestyleProductSection } from "../components/lifestyle-product-section"
import { ElaraSpecial } from "../components/elara-special"
import { ProductGrid } from "../components/product-grid"
import { useScrollToTop } from "../hooks/useScrollToTop"

export default function HomePage() {
  useScrollToTop()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <RecentEdit />
      <LifestyleProductSection />
      <ElaraSpecial />
      <ShopByStyle />
    </main>
  )
}
