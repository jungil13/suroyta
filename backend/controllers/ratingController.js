// controllers/ratingController.js
const ratingModel = require('../models/ratingModel');

// Controller function for fetching top-rated destinations
const getTopDestinations = async (req, res) => {
    try {
      const destinations = await ratingModel.getTopDestinations();
      if (!destinations || destinations.length === 0) {
        return res.status(404).json({ message: 'No top-rated destinations found' });
      }
      res.status(200).json(destinations);
    } catch (err) {
      console.error("Error fetching top-rated destinations:", err);
      res.status(500).send('Error fetching top-rated destinations');
    }
  };
  
  // Controller function for fetching top-rated promotions with full info
  const getTopPromotions = async (req, res) => {
    try {
      const promotions = await ratingModel.getTopPromotions();
      if (!promotions || promotions.length === 0) {
        return res.status(404).json({ message: 'No top-rated promotions found' });
      }
      res.status(200).json(promotions);
    } catch (err) {
      console.error("Error fetching top-rated promotions:", err);
      res.status(500).send('Error fetching top-rated promotions');
    }
  };

module.exports = { getTopDestinations, getTopPromotions };
