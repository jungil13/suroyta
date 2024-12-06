const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratingsController');
const authenticateToken = require('../middleware/authMiddleware');

// Add a rating
router.post('/', authenticateToken, ratingsController.addRating);

// Get average rating for a post
router.get('/post/:postId', ratingsController.getPostRating);

// Get average rating for a promotion
router.get('/promotion/:promotionId', ratingsController.getPromotionRating);

module.exports = router;
