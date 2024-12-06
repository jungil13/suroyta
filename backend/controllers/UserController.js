const User = require('../models/User');
const db = require('../config/db'); // Ensure you have the database connection
const UserModel = require('../models/UserModel')

class UserController {
    static async getUserProfile(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);
            const followers = await User.findAllFollowers(userId);
            res.json({ user, followers });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user profile', error });
        }
    }

    static getAllBios(req, res) {
        User.getAllBios((error, bios) => {
            if (error) {
                console.error('Error fetching bios:', error.message);
                return res.status(500).json({ message: 'Error fetching bios', error: error.message });
            }
            res.json(bios);
        });
    }
    

    static async getAuthorProfile(req, res) {
        const { authorId } = req.params; // Extracts the authorId from the request parameters
    
        try {
            // Calls the UserModel's getAuthorProfile method with the authorId
            const profile = await UserModel.getAuthorProfile(authorId);
    
            if (!profile) {
                // If no profile is found, sends a 404 response
                return res.status(404).json({ message: 'Author not found' });
            }
    
            // Sends a 200 response with the profile data if found
            res.status(200).json({ profile });
        } catch (error) {
            // Logs the error to the server console and sends a 500 response
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching the profile' });
        }
    }
    
    // Get bio by user_id
    static async getBioById(req, res) {
        const userId = req.params.user_id; // Get user_id from the request parameters
        try {
            const bio = await User.getBioById(userId);
            if (!bio) {
                return res.status(404).json({ message: 'Bio not found' });
            }
            res.json(bio);
        } catch (error) {
            console.error('Error fetching bio by user_id:', error);
            res.status(500).json({ message: 'Error fetching bio', error: error.message });
        }
    }

    static async createUser(req, res) {
        const userData = req.body;
        try {
            const userId = await User.create(userData);
            res.status(201).json({ message: 'User created', userId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }

    // Update user bio
    static async updateBio(req, res) {
        try {
            console.log('Request user:', req.user); // Log the user object
            const userId = req.user.user_id; // Use `user_id` from the token
            const { bio } = req.body;

            // Validate inputs
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            if (bio === undefined) {
                return res.status(400).json({ message: 'Bio is required' });
            }

            // Set `bio` to `null` if it's an empty string
            const bioToUpdate = bio.trim() === '' ? null : bio;

            // Execute the query
            const result = await db.execute('UPDATE users SET bio = ? WHERE user_id = ?', [bioToUpdate, userId]);
            console.log('Database result:', result); // Log the result

            // Check if the result is in the expected format
            if (Array.isArray(result) && result[0].affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'Bio updated successfully' });
        } catch (error) {
            console.error('Error updating bio:', error);
            res.status(500).json({ message: 'Error updating bio', error: error.message });
        }
    }
    
}

module.exports = UserController;