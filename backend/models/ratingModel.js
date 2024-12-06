// models/ratingModel.js
const db = require('../config/db'); // Import the database connection

// Function to fetch top-rated destinations
const getTopDestinations = () => {
    const query = `
      SELECT 
        p.post_id, 
        p.title AS post_title, 
        p.content AS post_content, 
        p.destination AS post_destination, 
        p.latitude AS post_latitude, 
        p.longitude AS post_longitude, 
        p.likes, 
        p.views, 
        COALESCE(AVG(r.rating_value), 0) AS avg_rating, 
        GROUP_CONCAT(p.image_url) AS post_images
      FROM posts p
      LEFT JOIN ratings r ON r.post_id = p.post_id
      GROUP BY p.post_id
      HAVING avg_rating > 0
      ORDER BY avg_rating DESC, p.views DESC
      LIMIT 5;
    `;
  
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          reject(err);
        } else {
          console.log("Fetched destinations:", results); // Debugging log
          resolve(results);
        }
      });
    });
  };
  
  
  // Function to fetch top-rated promotions with full info
  const getTopPromotions = () => {
    const query = `
      SELECT 
        p.id, 
        p.title AS promotion_title, 
        p.description AS promotion_description, 
        p.start_date, 
        p.end_date, 
        p.destination AS promotion_destination,
        p.latitude AS promotion_latitude,
        p.longitude AS promotion_longitude,
        AVG(r.rating_value) AS avg_rating,
        GROUP_CONCAT(pi.image_url) AS promotion_images
      FROM promotion p
      LEFT JOIN ratings r ON r.promotion_id = p.id
      LEFT JOIN promotion_images pi ON pi.promotion_id = p.id
      GROUP BY p.id
      HAVING AVG(r.rating_value) > 0
      ORDER BY avg_rating DESC
      LIMIT 5;
    `;
  
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          reject(err);
        } else {
          console.log("Fetched promotions:", results); // Debugging log
          resolve(results);
        }
      });
    });
  };
  

module.exports = { getTopDestinations, getTopPromotions };
