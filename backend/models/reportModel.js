// models/reportModel.js
const db = require('../config/db');

const createReport = async (user_id, post_id, comment_id, promotion_id, reason) => {
    try {
        const query = `
            INSERT INTO reports (user_id, post_id, comment_id, promotion_id, reason)
            VALUES (?, ?, ?, ?, ?)
        `;
        // Use null for missing fields
        const result = await db.execute(query, [
            user_id, 
            post_id || null,  
            comment_id || null, 
            promotion_id || null, 
            reason
        ]);

        console.log("Database execution result:", result);

        // If result is not an array, handle accordingly
        if (Array.isArray(result)) {
            const [insertResult] = result;
            return insertResult;
        }
        // If result is already the desired object
        return result;
    } catch (err) {
        throw new Error('Failed to create report: ' + err.message);
    }
};

  
const getReportsByItem = (item_id, item_type) => {
    let field = '';

    // Determine the correct field based on item_type
    if (item_type === 'post') {
      field = 'post_id';
    } else if (item_type === 'comment') {
      field = 'comment_id';
    } else if (item_type === 'promotion') {
      field = 'promotion_id';
    } else {
      return Promise.reject(new Error('Invalid item type'));
    }

    const sql = `
      SELECT * FROM reports WHERE ${field} = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [item_id], (err, results) => {
        if (err) {
          reject(new Error('Failed to fetch reports: ' + err.message));
        } else {
          resolve(results);  // Return the results from the query
        }
      });
    });
  }
  
  const getAllReports = (limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          reports.report_id,
          users.username,
          promotion.title AS promotion_title,
          posts.title AS post_title,
          comments.content AS comment_content,
          reports.reason,
          reports.status,
          reports.created_at,
          reports.updated_at
        FROM reports
        LEFT JOIN users ON reports.user_id = users.user_id
        LEFT JOIN promotion ON reports.promotion_id = promotion.id
        LEFT JOIN posts ON reports.post_id = posts.post_id
        LEFT JOIN comments ON reports.comment_id = comments.comment_id
        LIMIT ? OFFSET ?;
      `;
      db.query(query, [limit, offset], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  };
  
  
  
module.exports = { createReport, getReportsByItem, getAllReports };
