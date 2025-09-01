const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { body, validationResult, query } = require('express-validator');

// Validation middleware
const validateProductQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('sortBy').optional().isIn(['price', 'name', 'rating', 'createdAt', 'discount']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
  query('category').optional().isIn(['rings', 'earrings', 'necklaces', 'bracelets', 'pendants', 'bangles']).withMessage('Invalid category'),
  query('style').optional().custom(value => {
    if (value) {
      const styles = value.split(',').map(s => s.trim());
      const validStyles = ['daily-wear', 'party', 'work', 'gifting', 'college', 'festive'];
      return styles.every(style => validStyles.includes(style));
    }
    return true;
  }).withMessage('Invalid style values'),
  query('material').optional().custom(value => {
    if (value) {
      const materials = value.split(',').map(m => m.trim());
      const validMaterials = ['18k-gold', 'platinum', 'silver', 'rose-gold', 'white-gold'];
      return materials.every(material => validMaterials.includes(material));
    }
    return true;
  }).withMessage('Invalid material values'),
  query('gemstone').optional().custom(value => {
    if (value) {
      const gemstones = value.split(',').map(g => g.trim());
      const validGemstones = ['diamond', 'ruby', 'emerald', 'sapphire', 'pearl', 'none'];
      return gemstones.every(gemstone => validGemstones.includes(gemstone));
    }
    return true;
  }).withMessage('Invalid gemstone values'),
  query('size').optional().custom(value => {
    if (value) {
      const sizes = value.split(',').map(s => s.trim());
      const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'free-size'];
      return sizes.every(size => validSizes.includes(size));
    }
    return true;
  }).withMessage('Invalid size values'),
  query('isBestSeller').optional().isBoolean().withMessage('isBestSeller must be true or false'),
  query('isOnSale').optional().isBoolean().withMessage('isOnSale must be true or false'),
  query('search').optional().isString().trim().isLength({ min: 1 }).withMessage('Search query cannot be empty')
];

// Get all products with advanced filtering, sorting, and pagination
router.get('/', validateProductQuery, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      minPrice,
      maxPrice,
      category,
      style,
      material,
      gemstone,
      size,
      isBestSeller,
      isOnSale,
      search
    } = req.query;

    // Build filter object
    const filter = {};

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Style filter (handle multiple values)
    if (style) {
      const styles = style.split(',').map(s => s.trim());
      if (styles.length === 1) {
        filter.style = styles[0];
      } else {
        filter.style = { $in: styles };
      }
    }

    // Material filter (handle multiple values)
    if (material) {
      const materials = material.split(',').map(m => m.trim());
      if (materials.length === 1) {
        filter.material = materials[0];
      } else {
        filter.material = { $in: materials };
      }
    }

    // Gemstone filter (handle multiple values)
    if (gemstone) {
      const gemstones = gemstone.split(',').map(g => g.trim());
      if (gemstones.length === 1) {
        filter.gemstone = gemstones[0];
      } else {
        filter.gemstone = { $in: gemstones };
      }
    }

    // Size filter (handle multiple values)
    if (size) {
      const sizes = size.split(',').map(s => s.trim());
      if (sizes.length === 1) {
        filter.size = sizes[0];
      } else {
        filter.size = { $in: sizes };
      }
    }

    // Best seller filter
    if (isBestSeller !== undefined) {
      filter.isBestSeller = isBestSeller === 'true';
    }

    // On sale filter
    if (isOnSale !== undefined) {
      filter.isOnSale = isOnSale === 'true';
    }

    // Search filter (text search across name, description, and tags)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v')
      .lean();

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    // Calculate pagination info
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      status: 'success',
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalProducts,
          hasNextPage,
          hasPrevPage,
          limit: parseInt(limit)
        },
        filters: {
          applied: Object.keys(filter).filter(key => key !== '$or'),
          search: search || null
        }
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// Get best seller products
router.get('/best-sellers', async (req, res) => {
  try {
    const { limit = 12 } = req.query;
    
    const bestSellers = await Product.find({ isBestSeller: true })
      .sort({ rating: -1, reviews: -1 })
      .limit(parseInt(limit))
      .select('-__v')
      .lean();

    res.status(200).json({
      status: 'success',
      data: {
        products: bestSellers,
        count: bestSellers.length
      }
    });

  } catch (error) {
    console.error('Error fetching best sellers:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    // Validate category
    const validCategories = ['rings', 'earrings', 'necklaces', 'bracelets', 'pendants', 'bangles'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid category'
      });
    }

    const filter = { category };
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v')
      .lean();

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    res.status(200).json({
      status: 'success',
      data: {
        products,
        category,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalProducts,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).select('-__v').lean();

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Get filter options (for filter sidebar)
router.get('/filters/options', async (req, res) => {
  try {
    // Get unique values for filter options
    const [categories, styles, materials, gemstones, sizes, priceRange] = await Promise.all([
      Product.distinct('category'),
      Product.distinct('style'),
      Product.distinct('material'),
      Product.distinct('gemstone'),
      Product.distinct('size'),
      Product.aggregate([
        {
          $group: {
            _id: null,
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' }
          }
        }
      ])
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        categories,
        styles,
        materials,
        gemstones,
        sizes,
        priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 }
      }
    });

  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
