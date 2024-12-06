const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/getallpromotions', promotionController.getAllPromotions);
router.get('/getallpromotions/:id', promotionController.getPromotionById);
router.post('/', promotionController.uploadMiddleware, authenticateToken, promotionController.createPromotion);
router.get('/getallpromotions/author/:author_id',authenticateToken,  promotionController.getPromotionsByAuthorId);


module.exports = router;
