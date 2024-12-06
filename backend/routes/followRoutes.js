
const express = require('express');
const followController = require('../controllers/followController')
const authenticateToken = require('../middleware/authMiddleware'); // Import the auth middleware


const router = express.Router();

// Apply the auth middleware to protect the route
router.post('/follow', authenticateToken, followController.followUser);

router.get('/followers', authenticateToken, followController.getFollowers);



module.exports = router;