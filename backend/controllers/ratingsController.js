const RatingsModel = require('../models/ratingsModel');

// Add a rating
exports.addRating = async (req, res) => {
    const { post_id, promotion_id, rating_value } = req.body;
  
    // Validate input
    if (!rating_value || (!post_id && !promotion_id)) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
  
    const user_id = req.user && req.user.user_id; // Get the user ID from the decoded token
  
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is missing from token.' });
    }
  
    try {
      const result = await RatingsModel.addRating(user_id, post_id, promotion_id, rating_value);
      res.status(201).json({ message: 'Rating added successfully.', rating_id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add rating.' });
    }
  };


// Get average rating for a post
exports.getPostRating = async (req, res) => {
  const { postId } = req.params;

  try {
    const ratingData = await RatingsModel.getPostRating(postId);
    res.status(200).json(ratingData || { post_id: postId, average_rating: 0, total_ratings: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve post rating.' });
  }
};

// Get average rating for a promotion
exports.getPromotionRating = async (req, res) => {
  const { promotionId } = req.params;

  try {
    const ratingData = await RatingsModel.getPromotionRating(promotionId);
    res.status(200).json(ratingData || { promotion_id: promotionId, average_rating: 0, total_ratings: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve promotion rating.' });
  }
};
