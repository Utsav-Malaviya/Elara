const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app/api' 
  : 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all products with filtering, sorting, and pagination
  async getProducts(params = {}) {
    const queryParams = new URLSearchParams();
    
    // Add all parameters to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const endpoint = `/products?${queryParams.toString()}`;
    return this.request(endpoint);
  }

  // Get best seller products
  async getBestSellers(limit = 12) {
    const endpoint = `/products/best-sellers?limit=${limit}`;
    return this.request(endpoint);
  }

  // Get products by category
  async getProductsByCategory(category, params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const endpoint = `/products/category/${category}?${queryParams.toString()}`;
    return this.request(endpoint);
  }

  // Get single product by ID
  async getProductById(id) {
    const endpoint = `/products/${id}`;
    return this.request(endpoint);
  }

  // Get filter options
  async getFilterOptions() {
    const endpoint = '/products/filters/options';
    return this.request(endpoint);
  }

  // Search products
  async searchProducts(searchQuery, params = {}) {
    return this.getProducts({
      ...params,
      search: searchQuery
    });
  }

  // Get products with specific filters
  async getFilteredProducts(filters = {}) {
    const {
      minPrice,
      maxPrice,
      category,
      style,
      material,
      gemstone,
      size,
      isBestSeller,
      isOnSale,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = filters;

    const queryParams = {
      page,
      limit,
      sortBy,
      sortOrder
    };

    // Add filters only if they have values
    if (minPrice !== undefined) queryParams.minPrice = minPrice;
    if (maxPrice !== undefined) queryParams.maxPrice = maxPrice;
    if (category) queryParams.category = category;
    if (style) queryParams.style = style;
    if (material) queryParams.material = material;
    if (gemstone) queryParams.gemstone = gemstone;
    if (size) queryParams.size = size;
    if (isBestSeller !== undefined) queryParams.isBestSeller = isBestSeller;
    if (isOnSale !== undefined) queryParams.isOnSale = isOnSale;

    return this.getProducts(queryParams);
  }
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService;
