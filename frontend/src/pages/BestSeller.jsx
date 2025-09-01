import { useNavigate } from "react-router-dom"
import { useScrollToTop } from "../hooks/useScrollToTop"
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useProducts } from "../hooks/useProducts"
import apiService from "../services/api"

export default function BestSellerPage() {
  const navigate = useNavigate()
  useScrollToTop()
  
  // Use custom hook for products
  const {
    products: bestSellerProducts,
    loading,
    error,
    filters,
    pagination,
    filterOptions,
    updateFilter,
    updateFilters,
    clearFilters,
    sortProducts,
    fetchBestSellers
  } = useProducts({ isBestSeller: true, limit: 12 });

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 13999 })
  const [selectedStyles, setSelectedStyles] = useState([])
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [isPriceOpen, setIsPriceOpen] = useState(true)
  const [isStyleOpen, setIsStyleOpen] = useState(true)
  const [isMaterialOpen, setIsMaterialOpen] = useState(true)
  const [isSizeOpen, setIsSizeOpen] = useState(true)

  // Initialize best sellers on mount
  useEffect(() => {
    fetchBestSellers(12);
  }, [fetchBestSellers]);

  // Update price range filter
  const handlePriceChange = () => {
    updateFilters({
      minPrice: priceRange.min,
      maxPrice: priceRange.max
    });
  };

  // Handle style selection
  const handleStyleToggle = (style) => {
    const newStyles = selectedStyles.includes(style)
      ? selectedStyles.filter(s => s !== style)
      : [...selectedStyles, style];
    
    setSelectedStyles(newStyles);
    updateFilter('style', newStyles.length > 0 ? newStyles.join(',') : undefined);
  };

  // Handle material selection
  const handleMaterialToggle = (material) => {
    const newMaterials = selectedMaterials.includes(material)
      ? selectedMaterials.filter(m => m !== material)
      : [...selectedMaterials, material];
    
    setSelectedMaterials(newMaterials);
    updateFilter('material', newMaterials.length > 0 ? newMaterials.join(',') : undefined);
  };

  // Handle size selection
  const handleSizeToggle = (size) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(newSizes);
    updateFilter('size', newSizes.length > 0 ? newSizes.join(',') : undefined);
  };

  // Handle sort change
  const handleSortChange = (event) => {
    const [sortBy, sortOrder] = event.target.value.split('-');
    sortProducts(sortBy, sortOrder);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setPriceRange({ min: 0, max: 13999 });
    setSelectedStyles([]);
    setSelectedMaterials([]);
    setSelectedSizes([]);
    clearFilters();
  };

  // Apply filters
  const handleApplyFilters = () => {
    handlePriceChange();
    setIsFilterOpen(false);
  };

  // Filter Sidebar Content (for reuse in desktop and mobile)
  const FilterSidebar = (
    <div className="w-80 max-w-full bg-white rounded-lg shadow-lg border border-gray-100 p-6 h-fit md:sticky md:top-24 flex flex-col">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">FILTER</h2>
        <button 
          onClick={() => setIsFilterOpen(false)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-3"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <h3 className="font-semibold text-gray-900">PRICE</h3>
          {isPriceOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {isPriceOpen && (
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-2 items-center">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                className="col-span-2 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="₹ 0"
              />
              <span className="col-span-1 text-center text-sm text-gray-600">to</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 0 }))}
                className="col-span-2 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="₹ 13,999"
              />
            </div>
            <p className="text-xs text-gray-500">The highest price is ₹ 13,999</p>
          </div>
        )}
      </div>

      {/* Style Section */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-3"
          onClick={() => setIsStyleOpen(!isStyleOpen)}
        >
          <h3 className="font-semibold text-gray-900">STYLE</h3>
          {isStyleOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {isStyleOpen && (
          <div className="space-y-2">
            {filterOptions.styles?.map((style) => (
              <label key={style} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedStyles.includes(style)}
                  onChange={() => handleStyleToggle(style)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700">{style.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Material Section */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-3"
          onClick={() => setIsMaterialOpen(!isMaterialOpen)}
        >
          <h3 className="font-semibold text-gray-900">MATERIAL</h3>
          {isMaterialOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {isMaterialOpen && (
          <div className="space-y-2">
            {filterOptions.materials?.map((material) => (
              <label key={material} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material)}
                  onChange={() => handleMaterialToggle(material)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700">{material.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size Section */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-3"
          onClick={() => setIsSizeOpen(!isSizeOpen)}
        >
          <h3 className="font-semibold text-gray-900">SIZE</h3>
          {isSizeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {isSizeOpen && (
          <div className="space-y-2">
            {filterOptions.sizes?.map((size) => (
              <label key={size} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeToggle(size)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700">{size === 'free-size' ? 'Free Size' : size}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mt-auto">
        <button 
          onClick={handleApplyFilters}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          APPLY FILTERS
        </button>
        <button 
          onClick={handleClearFilters}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          CLEAR ALL
        </button>
      </div>
    </div>
  )

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading best sellers...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
            <button 
              onClick={() => fetchBestSellers(12)}
              className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BEST SELLER</h1>
          <div className="w-16 h-0.5 bg-amber-500 mb-6"></div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-4 p-3 sm:p-4 lg:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
          {/* Left Side - Filter Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              className="flex items-center space-x-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
              onClick={() => setIsFilterOpen((prev) => !prev)}
            >
              <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm lg:text-base font-medium">FILTER</span>
            </button>
          </div>
          
          {/* Right Side - Item Count and Sort */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
              {pagination.totalProducts} ITEMS
            </span>
            <div className="relative">
              <select 
                className="appearance-none h-8 sm:h-10 lg:h-12 w-32 sm:w-40 lg:w-48 px-3 sm:px-4 lg:px-6 pr-8 sm:pr-10 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                onChange={handleSortChange}
                value={`${filters.sortBy || 'createdAt'}-${filters.sortOrder || 'desc'}`}
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Content with Filter Sidebar */}
        <div className="flex md:flex-row flex-col md:space-x-0 space-x-0 space-y-0 md:space-y-0 mt-0">
          {/* Desktop Filter Sidebar */}
          {isFilterOpen && (
            <div className="hidden md:block" style={{marginTop: "-100px"}}>
              {FilterSidebar}
            </div>
          )}
          
          {/* Mobile Filter Overlay */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-end md:hidden bg-black/40" onClick={() => setIsFilterOpen(false)}>
              <div className="w-full h-full bg-white overflow-y-auto animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
                {FilterSidebar}
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="w-full">
            {bestSellerProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bestSellerProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {/* Bestseller Tag */}
                      {product.isBestSeller && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
                          Bestseller
                        </div>
                      )}
                      {/* Sale Tag */}
                      {product.isOnSale && product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h4>
                      
                      {/* Material */}
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-yellow-400 border border-gray-300"></div>
                          <div className="w-3 h-3 rounded-full bg-pink-300 border border-gray-300"></div>
                          <div className="w-3 h-3 rounded-full bg-gray-300 border border-gray-300"></div>
                        </div>
                        <span className="text-xs text-gray-600">{product.material?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹ {product.price?.toLocaleString()}
                        </p>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-sm text-gray-500 line-through">
                            ₹ {product.originalPrice?.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found with the current filters.</p>
                <button 
                  onClick={handleClearFilters}
                  className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
