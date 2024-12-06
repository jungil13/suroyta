// back/routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/UserController');
const authenticateToken = require('../middleware/authMiddleware'); // Import the auth middleware


const router = express.Router();

// Apply the auth middleware to protect the route
router.put('/profile/bio', authenticateToken, UserController.updateBio);

// New route to get all bios
router.get('/profile/bios', UserController.getAllBios);

// New route to get bio by user_id
router.get('/profile/bios/:user_id', UserController.getBioById);

router.get('/profile/author/:authorId', UserController.getAuthorProfile);




module.exports = router;