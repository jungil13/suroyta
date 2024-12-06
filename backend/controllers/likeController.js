// server/controllers/likeController.js
const Like = require('../models/likeModel');
exports.toggleLikePost = (req, res) => {
  const { promotionId, postId } = req.body; // Get promotionId or postId from the request
  const userId = req.user.user_id; // Assuming user ID is stored in req.user after authentication

  // Determine the entity type and ID
  const entityType = promotionId ? 'promotion' : postId ? 'post' : null;
  const entityId = promotionId || postId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (!entityType || !entityId) {
    return res.status(400).json({ message: 'Invalid request. Missing entityId or entityType.' });
  }

  // Handle toggling the like
  Like.checkIfLiked(entityType, entityId, userId, (err, alreadyLiked) => {
    if (err) {
      console.error(`Error checking like for ${entityType}:`, err);
      return res.status(500).json({ message: 'Error checking like', error: err });
    }

    const toggleAction = alreadyLiked ? 'removeLike' : 'addLike';

    Like[toggleAction](entityType, entityId, userId, (err) => {
      if (err) {
        console.error(`Error ${toggleAction} for ${entityType}:`, err);
        return res.status(500).json({ message: `Error ${toggleAction} like`, error: err });
      }

      // Get the updated like count
      Like.countLikes(entityType, entityId, (err, likeCount) => {
        if (err) {
          console.error(`Error counting likes for ${entityType}:`, err);
          return res.status(500).json({ message: 'Error counting likes', error: err });
        }

        const actionMessage = alreadyLiked ? 'Like removed successfully' : 'Like added successfully';
        res.json({ message: actionMessage, likeCount });
      });
    });
  });
};


