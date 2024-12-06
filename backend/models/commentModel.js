const db = require('../config/db');

class Comment {
 // commentModel.js
static async addComment(postId, userId, content) {
    const query = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
    try {
        // Using a Promise-based query
        const [result] = await db.promise().query(query, [postId, userId, content]);
        return result; // Return the actual result object (not wrapped in an array)
    } catch (error) {
        throw new Error('Error adding comment to the database');
    }
}

static async addPromotionComment(promotionid, userId, content) {
  const query = 'INSERT INTO comments (promotionid, user_id, content) VALUES (?, ?, ?)';
  try {
    const [result] = await db.promise().query(query, [promotionid, userId, content]);
    return result;
  } catch (error) {
    throw new Error('Error adding comment: ' + error.message);
  }
}

static async getCommentsByPromotion(promotionid) {
  const query = `
    SELECT 
      c.comment_id, 
      c.post_id, 
      c.user_id, 
      c.content, 
      c.created_at AS comment_created_at, 
      c.promotionid, 
      u.username, 
      u.profile_photo AS profile_photo 
    FROM 
      comments AS c
    LEFT JOIN 
      users AS u 
    ON 
      c.user_id = u.user_id
    WHERE 
      c.promotionid = ?`;

  return new Promise((resolve, reject) => {
    db.execute(query, [promotionid], (err, results) => {
      if (err) {
        reject(new Error('Error fetching comments: ' + err.message));
      } else {
        console.log("Query results:", results); // Log the query results
        resolve(results); // Resolve the enriched results
      }
    });
  });
}


static async getCommentsByPostId(postId) {
    const query = `
        SELECT 
            c.comment_id AS commentId,
            c.content,
            c.created_at AS dateCreated,
            u.user_id AS userId,
            u.username,
            u.profile_photo AS profilePhoto
        FROM 
            comments c
        INNER JOIN 
            users u 
        ON 
            c.user_id = u.user_id
        WHERE 
            c.post_id = ?
        ORDER BY 
            c.created_at DESC
    `;
    try {
        const [comments] = await db.promise().query(query, [postId]);
        return comments;
    } catch (error) {
        console.error('Database error:', error.message);
        throw new Error('Error retrieving comments from the database');
    }
}

static async updateComment(commentId, content) {
    const query = 'UPDATE comments SET content = ? WHERE comment_id = ?';
    const [result] = await db.promise().query(query, [content, commentId]);
    return result;
}

static async deleteComment(commentId) {
    const query = 'DELETE FROM comments WHERE comment_id = ?';
    const [result] = await db.promise().query(query, [commentId]);
    return result;
}

static async getCommentById(commentId) {
    const query = 'SELECT * FROM comments WHERE comment_id = ?'; // Corrected SQL query to fetch by comment_id
    const [comments] = await db.promise().query(query, [commentId]); // Corrected promise handling
    return comments[0]; // Return the first comment found
}

static async getAllComments(callback) {
    const query = `
      SELECT 
        comments.comment_id, 
        comments.content, 
        comments.created_at, 
        users.username AS commenter_name, 
        posts.title AS post_title 
      FROM comments
      JOIN users ON comments.user_id = users.user_id
      JOIN posts ON comments.post_id = posts.post_id
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }

  static async deleteCommentById(commentId, callback) {
    db.query('DELETE FROM comments WHERE comment_id = ?', [commentId], (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }
    
}

module.exports = Comment;
