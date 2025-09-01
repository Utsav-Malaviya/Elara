import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 12
  });
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    styles: [],
    materials: [],
    gemstones: [],
    sizes: [],
    priceRange: { minPrice: 0, maxPrice: 0 }
  });

  // Fetch filter options
  const fetchFilterOptions = useCallback(async () => {
    try {
      const response = await apiService.getFilterOptions();
      if (response.status === 'success') {
        setFilterOptions(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch filter options:', err);
    }
  }, []);

  // Fetch products with current filters
  const fetchProducts = useCallback(async (newFilters = filters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getFilteredProducts(newFilters);
      
      if (response.status === 'success') {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Update filters and refetch products
  const updateFilters = useCallback((newFilters) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1
    setFilters(updatedFilters);
    fetchProducts(updatedFilters);
  }, [filters, fetchProducts]);

  // Update a single filter
  const updateFilter = useCallback((key, value) => {
    updateFilters({ [key]: value });
  }, [updateFilters]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    const clearedFilters = { page: 1, limit: 12, sortBy: 'createdAt', sortOrder: 'desc' };
    setFilters(clearedFilters);
    fetchProducts(clearedFilters);
  }, [fetchProducts]);

  // Change page
  const changePage = useCallback((page) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    fetchProducts(newFilters);
  }, [filters, fetchProducts]);

  // Sort products
  const sortProducts = useCallback((sortBy, sortOrder = 'desc') => {
    updateFilters({ sortBy, sortOrder, page: 1 });
  }, [updateFilters]);

  // Search products
  const searchProducts = useCallback((searchQuery) => {
    if (searchQuery.trim()) {
      updateFilters({ search: searchQuery.trim(), page: 1 });
    } else {
      const { search, ...otherFilters } = filters;
      updateFilters(otherFilters);
    }
  }, [filters, updateFilters]);

  // Get best sellers
  const fetchBestSellers = useCallback(async (limit = 12) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getBestSellers(limit);
      
      if (response.status === 'success') {
        setProducts(response.data.products);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalProducts: response.data.count,
          hasNextPage: false,
          hasPrevPage: false,
          limit
        });
      } else {
        throw new Error(response.message || 'Failed to fetch best sellers');
      }
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch best sellers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get products by category
  const fetchProductsByCategory = useCallback(async (category, categoryFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getProductsByCategory(category, {
        ...filters,
        ...categoryFilters
      });
      
      if (response.status === 'success') {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
        setFilters(prev => ({ ...prev, category }));
      } else {
        throw new Error(response.message || 'Failed to fetch products by category');
      }
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch products by category:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initialize on mount
  useEffect(() => {
    fetchFilterOptions();
    fetchProducts();
  }, []); // Only run on mount

  return {
    // State
    products,
    loading,
    error,
    filters,
    pagination,
    filterOptions,
    
    // Actions
    fetchProducts,
    updateFilters,
    updateFilter,
    clearFilters,
    changePage,
    sortProducts,
    searchProducts,
    fetchBestSellers,
    fetchProductsByCategory,
    
    // Computed values
    hasProducts: products.length > 0,
    totalProducts: pagination.totalProducts,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage
  };
};
