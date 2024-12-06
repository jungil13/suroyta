// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authenticateToken = require('../middleware/authMiddleware');

// Route to create a new report
router.post('/create',authenticateToken, reportController.createReport);

// Route to get reports by item (post, comment, or promotion)
router.get('/item/:item_type/:item_id', reportController.getReportsByItem);

router.get('/getall', reportController.getReports);

module.exports = router;
