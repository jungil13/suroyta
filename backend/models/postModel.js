const db = require('../config/db');

const createPost = (user_id, title, content, category_id, image_urls, destination, latitude, longitude) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO posts (user_id, title, content, category_id, image_url, destination, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [user_id, title, content, category_id, image_urls, destination, latitude, longitude], (err, results) => {
            if (err) {
                return reject({ message: 'Error creating post', error: err });
            }
            resolve(results.insertId); // Return the ID of the newly created post
        });
    });
};

const findByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM posts WHERE user_id = ?';
        db.query(sql, [userId], (err, results) => {
            if (err) return reject({ message: 'Error fetching posts', error: err });
            resolve(results);
        });
    });
};

const deletePost = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM posts WHERE post_id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error('Error deleting post:', err); // Log the error for debugging
                return reject({ message: 'Error deleting post', error: err });
            }
            if (results.affectedRows === 0) {
                return reject({ message: 'Post not found' });
            }
            resolve({ message: 'Post deleted successfully', affectedRows: results.affectedRows });
        });
    });
};


const updatePost = (id, updates) => {
    return new Promise((resolve, reject) => {
        // Construct the SQL query dynamically
        let sql = 'UPDATE posts SET ';
        const params = [];
        const fields = [];

        // Check which fields are provided and add them to the query
        if (updates.title) {
            fields.push('title = ?');
            params.push(updates.title);
        }
        if (updates.content) {
            fields.push('content = ?');
            params.push(updates.content);
        }
        if (updates.category_name) {
            fields.push('category_id = (SELECT category_id FROM categories WHERE name = ?)');
            params.push(updates.category_name);
        }
        
        // Only update image_url if new images are provided
        if (updates.image_urls && updates.image_urls.length > 0) {
            const imageUrlString = updates.image_urls.join(','); // Join array into a comma-separated string
            fields.push('image_url = ?');
            params.push(imageUrlString);
        }

        if (updates.destination) {
            fields.push('destination = ?');
            params.push(updates.destination);
        }

        // If no fields to update, reject the promise
        if (fields.length === 0) {
            return reject({ message: 'No fields to update' });
        }

        // Complete the SQL query
        sql += fields.join(', ') + ' WHERE post_id = ?';
        params.push(id); // Add the post ID to the parameters

        // Execute the query
        db.query(sql, params, (err, results) => {
            if (err) return reject({ message: 'Error updating post', error: err });
            if (results.affectedRows === 0) {
                return reject({ message: 'Post not found' });
            }
            resolve({ message: 'Post updated successfully', affectedRows: results.affectedRows });
        });
    });
};

const getPostsByDestination = async (destinationName) => {
    const query = `
      SELECT 
        p.*,
        u.username,
        u.profile_photo,
        COUNT(co.comment_id) AS commentCount,  -- Count the number of comments for each post
        COUNT(l.like_id) AS likeCount  -- Count the number of likes for each post
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.user_id
      LEFT JOIN comments co ON p.post_id = co.post_id  -- Join the comments table
      LEFT JOIN likes l ON p.post_id = l.post_id  -- Join the likes table
      WHERE p.destination = ?
      GROUP BY p.post_id, u.username, u.profile_photo  -- Group by post and user details
      ORDER BY p.created_at DESC
    `;
    
    return new Promise((resolve, reject) => {
      db.query(query, [destinationName], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  };
  
const getPostsByCategory = async (categoryName) => {
  const query = `
    SELECT 
      p.*, 
      u.username, 
      u.profile_photo,
      COUNT(co.comment_id) AS commentCount,  -- Count the number of comments for each post
      COUNT(l.like_id) AS likeCount  -- Count the number of likes for each post
    FROM posts p
    LEFT JOIN users u ON p.user_id = u.user_id
    LEFT JOIN comments co ON p.post_id = co.post_id  -- Join the comments table
    LEFT JOIN likes l ON p.post_id = l.post_id  -- Join the likes table
    WHERE p.category_id = (SELECT category_id FROM categories WHERE name = ?)
    GROUP BY p.post_id, u.username, u.profile_photo  -- Group by post and user details
    ORDER BY p.created_at DESC
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [categoryName], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


module.exports = {
    createPost,
    findByUserId,
    deletePost,
    updatePost,
    getPostsByDestination,
    getPostsByCategory,
};