const express = require('express');
const router = express.Router();

// Basic orders routes (placeholder for now)
router.get('/test', (req, res) => {
  res.json({ message: 'Orders route working' });
});

module.exports = router;
