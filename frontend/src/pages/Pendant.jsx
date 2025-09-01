import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

const Pendant = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Use the useProducts hook for backend integration
  const {
    products: pendantProducts,
    loading,
    error,
    filters,
    pagination,
    filterOptions,
    updateFilter,
    updateFilters,
    clearFilters,
    sortProducts,
    fetchProductsByCategory
  } = useProducts();

  // Local filter state for UI
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Fetch pendants on component mount
  useEffect(() => {
    fetchProductsByCategory('pendants');
  }, [fetchProductsByCategory]);

  // Handle style toggle
  const handleStyleToggle = (style) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  // Handle material toggle
  const handleMaterialToggle = (material) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  // Handle size toggle
  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  // Handle price range change
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    const newFilters = {};
    
    if (selectedStyles.length > 0) {
      newFilters.style = selectedStyles.join(',');
    }
    if (selectedMaterials.length > 0) {
      newFilters.material = selectedMaterials.join(',');
    }
    if (selectedSizes.length > 0) {
      newFilters.size = selectedSizes.join(',');
    }
    if (priceRange.min) {
      newFilters.minPrice = priceRange.min;
    }
    if (priceRange.max) {
      newFilters.maxPrice = priceRange.max;
    }

    updateFilters(newFilters);
    setIsFilterOpen(false);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedStyles([]);
    setSelectedMaterials([]);
    setSelectedSizes([]);
    setPriceRange({ min: '', max: '' });
    clearFilters();
    setIsFilterOpen(false);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    sortProducts(sortBy, sortOrder);
  };

  // Format display names for filter options
  const formatDisplayName = (value) => {
    return value.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Filter Sidebar Component
  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="grid grid-cols-5 gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            className="col-span-2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <span className="col-span-1 text-center text-gray-500">to</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className="col-span-2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Style Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Style</h4>
        <div className="space-y-2">
          {filterOptions.styles?.map((style) => (
            <label key={style} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedStyles.includes(style)}
                onChange={() => handleStyleToggle(style)}
                className="mr-2 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{formatDisplayName(style)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Material</h4>
        <div className="space-y-2">
          {filterOptions.materials?.map((material) => (
            <label key={material} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material)}
                onChange={() => handleMaterialToggle(material)}
                className="mr-2 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{formatDisplayName(material)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Size</h4>
        <div className="space-y-2">
          {filterOptions.sizes?.map((size) => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeToggle(size)}
                className="mr-2 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors"
        >
          APPLY FILTERS
        </button>
        <button
          onClick={handleClearFilters}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        >
          CLEAR ALL
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pendants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading pendants: {error}</p>
          <button
            onClick={() => fetchProductsByCategory('pendants')}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Pendants Collection</h1>
          <p className="text-gray-600 mt-2">Discover our exquisite collection of elegant pendants</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-4 p-3 sm:p-4 lg:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
          {/* Left Side - Filter Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="flex items-center space-x-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm lg:text-base font-medium">FILTER</span>
            </button>
          </div>
          
          {/* Right Side - Item Count and Sort */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">{pagination.totalProducts} ITEMS</span>
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

        {/* Filter Sidebar - Desktop */}
        <div className="hidden lg:block lg:w-1/4 lg:pr-6">
          <div className="sticky top-16">
            <FilterSidebar />
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsFilterOpen(false)} />
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl animate-slide-in-right">
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="lg:ml-auto lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {pendantProducts.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Tags */}
                  {product.isBestSeller && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                      Best Seller
                    </div>
                  )}
                  {product.isOnSale && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Sale
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Message */}
          {pendantProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No pendants found matching your filters.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pendant;
