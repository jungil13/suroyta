// server/controllers/commentController.js
const Comment = require("../models/commentModel");

exports.addComment = async (req, res) => {
  const userId = req.user.user_id; // Retrieved from the authenticated user
  const { postId } = req.params; // Extract postId from URL
  const { content } = req.body; // Extract content from request body

  // Validate Required Fields
  if (!postId || !content) {
    return res
      .status(400)
      .json({ error: "Missing required fields: postId or content" });
  }

  try {
    // Call the model function and get the result
    const result = await Comment.addComment(postId, userId, content);

    // Validate the operation
    if (result.affectedRows === 0) {
      return res
        .status(500)
        .json({ error: "Failed to add comment to the database" });
    }

    // Respond with success
    res.status(201).json({
      commentId: result.insertId,
      postId,
      userId,
      content,
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res
      .status(500)
      .json({ error: "Failed to add comment", details: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error retrieving comments:", error.message);
    res.status(500).json({ error: "Failed to retrieve comments" });
  }

};

exports.updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.user_id; // Retrieved from the authenticated user

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    try {
        // Fetch the comment to check ownership
        const comment = await Comment.getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Ensure the property name matches your database schema
        if (comment.user_id !== userId) { // Use user_id if that's the column name
            return res.status(403).json({ error: "You can only update your own comments" });
        }

        const result = await Comment.updateComment(commentId, content);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        console.error("Error updating comment:", error.message);
        res.status(500).json({ error: "Failed to update comment" });
    }
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.user_id; // Retrieved from the authenticated user

    try {
        // Fetch the comment to check ownership
        const comment = await Comment.getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Ensure the property name matches your database schema
        if (comment.user_id !== userId) { // Use user_id if that's the column name
            return res.status(403).json({ error: "You can only delete your own comments" });
        }

        const result = await Comment.deleteComment(commentId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error.message);
        res.status(500).json({ error: "Failed to delete comment" });
    }
};

exports.getAllComments = (req, res) => {
  Comment.getAllComments((err, comments) => {
    if (err) {
      console.error('Error fetching comments:', err);
      return res.status(500).json({ message: 'Error fetching comments', error: err });
    }
    res.json(comments);
  });
};

exports.deleteComment = (req, res) => {
  const { id } = req.params;
  Comment.deleteCommentById(id, (err) => {
    if (err) {
      console.error(`Error deleting comment with ID ${id}:`, err);
      return res.status(500).json({ message: 'Error deleting comment', error: err });
    }
    res.status(204).send(); // No content
  });
};

exports.postComment = async (req, res) => {
  const userId = req.user.user_id; // Retrieved from the authenticated user
  const { promotionid } = req.params; // Extract promotionid from URL
  const { content } = req.body; // Extract content from request body

  if (!promotionid || !content) {
    return res.status(400).json({
      error: "Missing required fields: promotionid or content",
    });
  }

  try {
    const result = await Comment.addPromotionComment(promotionid, userId, content);

    if (!result || result.affectedRows === 0) {
      return res.status(500).json({ error: "Failed to add comment to the database" });
    }

    res.status(201).json({
      commentId: result.insertId,
      promotionid,
      userId,
      content,
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
};

exports.getCommentsByPromotion = async (req, res) => {
  const { promotionid } = req.params; // Extract promotionid from the URL parameters
  console.log("Fetching comments for promotion ID:", promotionid); // Log the promotion ID

  try {
    // Retrieve comments for the specific promotion
    const comments = await Comment.getCommentsByPromotion(promotionid);
    console.log("Comments retrieved:", comments); // Log the retrieved comments

    // Ensure the response is always an array
    res.status(200).json({ comments: Array.isArray(comments) ? comments : [comments] });
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ error: "Failed to fetch comments", details: error.message });
  }
};
