const express = require('express');
const router = express.Router();

// Basic auth routes (placeholder for now)
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working' });
});

module.exports = router;
