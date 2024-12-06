const db = require('../config/db');

class Like {
  static addLike(entityType, entityId, userId, callback) {
    const createdAt = new Date().toISOString();
    const query = entityType === 'post'
      ? 'INSERT INTO likes (post_id, user_id, created_at) VALUES (?, ?, ?)'
      : 'INSERT INTO likes (promotion_id, user_id, created_at) VALUES (?, ?, ?)';

    db.query(query, [entityId, userId, createdAt], callback);
  }

  static removeLike(entityType, entityId, userId, callback) {
    const query = entityType === 'post'
      ? 'DELETE FROM likes WHERE post_id = ? AND user_id = ?'
      : 'DELETE FROM likes WHERE promotion_id = ? AND user_id = ?';

    db.query(query, [entityId, userId], callback);
  }

  static countLikes(entityType, entityId, callback) {
    const query = entityType === 'post'
      ? 'SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?'
      : 'SELECT COUNT(*) AS likeCount FROM likes WHERE promotion_id = ?';

    db.query(query, [entityId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].likeCount);
    });
  }

  static checkIfLiked(entityType, entityId, userId, callback) {
    const query = entityType === 'post'
      ? 'SELECT COUNT(*) AS likeExists FROM likes WHERE post_id = ? AND user_id = ?'
      : 'SELECT COUNT(*) AS likeExists FROM likes WHERE promotion_id = ? AND user_id = ?';

    db.query(query, [entityId, userId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].likeExists > 0); // Returns true if the like exists
    });
  }
}

module.exports = Like;
