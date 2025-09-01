const express = require('express');
const router = express.Router();

// Basic users routes (placeholder for now)
router.get('/test', (req, res) => {
  res.json({ message: 'Users route working' });
});

module.exports = router;
