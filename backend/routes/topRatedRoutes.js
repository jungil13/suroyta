// routes/topRatedRoutes.js
const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Route to get top-rated destinations
router.get('/destinations/top-destinations', ratingController.getTopDestinations);

// Route to get top-rated promotions
router.get('/destinations/top-promotions', ratingController.getTopPromotions);

module.exports = router;
