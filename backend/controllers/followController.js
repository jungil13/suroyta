// back/controllers/followController.js
const db = require('../config/db'); // Adjust the path as necessary

exports.followUser = async (req, res) => {
    const { followedId } = req.body; // ID of the user to be followed
    const followerId = req.user.user_id; // Assuming you have user ID in req.user

    console.log('Follower ID:', followerId); // Debugging
    console.log('Followed ID:', followedId); // Debugging

    if (!followedId) {
        return res.status(400).json({ message: "Followed user ID is required." });
    }

    try {
        // Insert a new follow relationship
        await db.promise().query(`
            INSERT INTO followers (follower_id, followed_id) 
            VALUES (?, ?)`, [followerId, followedId]);

        res.status(200).json({ message: "Successfully followed the user." });
    } catch (error) {
        console.error("Error following user:", error);
        res.status(500).json({ message: "Error following user", error: error.message });
    }
};

exports.getFollowers = async (req, res) => {
    const userId = req.user.user_id; // Get the user ID from the authenticated user

    try {
        const [followers] = await db.promise().query(`
            SELECT u.user_id, u.username, u.profile_photo
            FROM followers f
            JOIN users u ON f.follower_id = u.user_id
            WHERE f.followed_id = ?`, [userId]);

        res.status(200).json(followers);
    } catch (error) {
        console.error("Error fetching followers:", error);
        res.status(500).json({ message: "Error fetching followers", error: error.message });
    }
};