const db = require('../config/db');

class RatingsModel {
    static addRating(user_id, post_id, promotion_id, rating_value) {
        return new Promise((resolve, reject) => {
          // First, check if the user has already rated the post or promotion
          const checkRatingSql = `
            SELECT * FROM ratings
            WHERE user_id = ? AND (post_id = ? OR promotion_id = ?)
          `;
          
          db.query(checkRatingSql, [user_id, post_id, promotion_id], (err, results) => {
            if (err) return reject(err);
            
            // If a rating already exists, update the rating value
            if (results.length > 0) {
              const updateRatingSql = `
                UPDATE ratings
                SET rating_value = ?
                WHERE user_id = ? AND (post_id = ? OR promotion_id = ?)
              `;
              db.query(updateRatingSql, [rating_value, user_id, post_id, promotion_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
              });
            } else {
              // If no rating exists, insert a new rating
              const insertRatingSql = `
                INSERT INTO ratings (user_id, post_id, promotion_id, rating_value)
                VALUES (?, ?, ?, ?)
              `;
              db.query(insertRatingSql, [user_id, post_id, promotion_id, rating_value], (err, results) => {
                if (err) return reject(err);
                resolve(results);
              });
            }
          });
        });
      }
      

  static getPostRating(postId) {
    const sql = `
      SELECT 
        post_id, 
        COALESCE(AVG(rating_value), 0) AS average_rating, 
        COUNT(rating_id) AS total_ratings
      FROM ratings
      WHERE post_id = ?
      GROUP BY post_id
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [postId], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static getPromotionRating(promotionId) {
    const sql = `
      SELECT 
        promotion_id, 
        COALESCE(AVG(rating_value), 0) AS average_rating, 
        COUNT(rating_id) AS total_ratings
      FROM ratings
      WHERE promotion_id = ?
      GROUP BY promotion_id
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [promotionId], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = RatingsModel;
