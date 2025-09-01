const express = require('express');
const router = express.Router();

// Basic categories routes (placeholder for now)
router.get('/test', (req, res) => {
  res.json({ message: 'Categories route working' });
});

module.exports = router;
