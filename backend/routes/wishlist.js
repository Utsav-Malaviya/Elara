const express = require('express');
const router = express.Router();

// Basic wishlist routes (placeholder for now)
router.get('/test', (req, res) => {
  res.json({ message: 'Wishlist route working' });
});

module.exports = router;
