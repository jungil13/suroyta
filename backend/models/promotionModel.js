const db = require("../config/db");

const Promotion = {
  getAllPromotions(callback) {
    const query = `
          SELECT 
            p.id, 
            p.title, 
            p.description, 
            p.start_date, 
            p.end_date, 
            p.destination,
            IFNULL(GROUP_CONCAT(pi.image_url), '') AS images,
            u.username AS author_username, 
            u.profile_photo AS author_profile_photo
          FROM promotion p
          LEFT JOIN promotion_images pi ON p.id = pi.promotion_id
          LEFT JOIN users u ON p.author_id = u.user_id
          GROUP BY p.id
        `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return callback(err);
      }

      const promotions = results.map((promo) => ({
        ...promo,
        images: promo.images ? promo.images.split(",") : [], // Always return an array
        author: {
          username: promo.author_username || "Unknown",
          profilePhoto:
            promo.author_profile_photo || "/path/to/default-avatar.jpg", // Fallback if no photo
        },
      }));

      callback(null, promotions);
    });
  },

  createPromotion: (data, imageUrls, callback) => {
    const {
      title,
      description,
      start_date,
      end_date,
      destination,
      author_id,
      latitude,
      longitude,
    } = data;

    // Insert promotion details
    db.query(
      `INSERT INTO promotion (title, description, start_date, end_date, destination, author_id, latitude, longitude) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        start_date,
        end_date,
        destination,
        author_id,
        latitude,
        longitude,
      ],
      (err, result) => {
        if (err) return callback(err);

        const promotionId = result.insertId;

        // Insert associated images if any
        if (imageUrls && imageUrls.length) {
          const imageInserts = imageUrls.map((url) => [promotionId, url]);
          db.query(
            "INSERT INTO promotion_images (promotion_id, image_url) VALUES ?",
            [imageInserts],
            (err) => {
              if (err) return callback(err);
              callback(null, promotionId);
            }
          );
        } else {
          callback(null, promotionId);
        }
      }
    );
  },

  updatePromotion: (id, data, imageUrls, callback) => {
    const { title, description, start_date, end_date } = data;
    db.query(
      "UPDATE promotion SET title = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?",
      [title, description, start_date, end_date, id],
      (err) => {
        if (err) return callback(err);

        if (imageUrls && imageUrls.length) {
          db.query(
            "DELETE FROM promotion_images WHERE promotion_id = ?",
            [id],
            (err) => {
              if (err) return callback(err);

              const imageInserts = imageUrls.map((url) => [id, url]);
              db.query(
                "INSERT INTO promotion_images (promotion_id, image_url) VALUES ?",
                [imageInserts],
                (err) => {
                  if (err) return callback(err);
                  callback(null, true);
                }
              );
            }
          );
        } else {
          callback(null, true);
        }
      }
    );
  },

  deletePromotion: (id, callback) => {
    db.query("DELETE FROM promotion WHERE id = ?", [id], (err) => {
      if (err) return callback(err);
      callback(null, true);
    });
  },
};

Promotion.getPromotionsByAuthorId = (author_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
  p.id, 
  p.title, 
  p.description, 
  p.start_date, 
  p.end_date, 
  p.created_at, 
  p.updated_at, 
  p.destination, 
  p.latitude, 
  p.longitude,
  u.username AS author_name,
  u.profile_photo AS author_photo,
  GROUP_CONCAT(pi.image_url) AS promotion_images
FROM 
  promotion AS p
JOIN 
  users AS u ON p.author_id = u.user_id
LEFT JOIN 
  promotion_images AS pi ON p.id = pi.promotion_id
WHERE 
  p.author_id = ?
GROUP BY 
  p.id;

    `;

    db.query(query, [author_id], (err, results) => {
      if (err) {
        console.error("Error querying promotions by author:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};


Promotion.getPromotionById = (id, callback) => {
  const query = `
    SELECT 
      p.id, 
      p.title, 
      p.description, 
      p.start_date, 
      p.end_date, 
      p.destination, 
      p.latitude, 
      p.longitude, 
      IFNULL(GROUP_CONCAT(DISTINCT pi.image_url), '') AS images,
      u.username AS author_username, 
      u.profile_photo AS author_profile_photo,
      COUNT(DISTINCT c.comment_id) AS commentCount,  
      COUNT(DISTINCT l.like_id) AS likeCount       
    FROM promotion p
    LEFT JOIN comments c ON p.id = c.promotionid  
    LEFT JOIN likes l ON p.id = l.promotion_id          
    LEFT JOIN promotion_images pi ON p.id = pi.promotion_id
    LEFT JOIN users u ON p.author_id = u.user_id
    WHERE p.id = ?                                   
    GROUP BY 
      p.id, 
      p.title, 
      p.description, 
      p.start_date, 
      p.end_date, 
      p.destination, 
      p.latitude, 
      p.longitude, 
      u.username, 
      u.profile_photo;
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err);
    }

    if (!results.length) {
      console.warn("Promotion not found with ID:", id);
      return callback(null, null);
    }

    const result = results[0]; // Get the first row (grouped by promotion ID)

    const promotion = {
      id: result.id,
      title: result.title,
      description: result.description,
      start_date: result.start_date,
      end_date: result.end_date,
      destination: result.destination,
      latitude: result.latitude,
      longitude: result.longitude,
      images: result.images ? result.images.split(',') : [], // Split image URLs into an array
      author_username: result.author_username,
      author_profile_photo: result.author_profile_photo,
      commentCount: result.commentCount, // Include comment count
      likeCount: result.likeCount,       // Include like count
    };

    callback(null, promotion); // Pass the constructed promotion object to the callback
  });
};


module.exports = Promotion;
