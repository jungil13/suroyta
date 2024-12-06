const db = require('../config/db');

class UserModel {
    static async getAuthorProfile(authorId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT user_id, username, email, profile_photo, bio FROM users WHERE user_id = ?',
                [authorId],
                (error, results) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        return reject(error); // Reject the promise if there's an error
                    }

                    if (results.length === 0) {
                        return resolve(null); // Resolve with null if no results are found
                    }

                    resolve(results[0]); // Resolve with the first result (author profile)
                }
            );
        });
    }
}

module.exports = UserModel;
