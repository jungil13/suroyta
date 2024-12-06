// controllers/reportController.js
const reportModel = require('../models/reportModel');
const jwt = require('jsonwebtoken');

// Method to create a new report
const createReport = async (req, res) => {
    const { post_id, comment_id, promotion_id, reason } = req.body;

    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'Unauthorized: Invalid user' });
    }

    if (!reason) {
        return res.status(400).json({ message: 'Reason is required.' });
    }

    if ((post_id && (comment_id || promotion_id)) || 
        (comment_id && (post_id || promotion_id)) || 
        (promotion_id && (post_id || comment_id))) {
        return res.status(400).json({ message: 'Only one of post_id, comment_id, or promotion_id can be provided at a time.' });
    }

    if (!(post_id || comment_id || promotion_id)) {
        return res.status(400).json({ message: 'At least one of post_id, comment_id, or promotion_id must be provided.' });
    }

    try {
        console.log("Input to createReport:", { 
            user_id: req.user.user_id, post_id, comment_id, promotion_id, reason 
        });
        
        const result = await reportModel.createReport(req.user.user_id, post_id, comment_id, promotion_id, reason);
        
        res.status(201).json({ message: 'Report created successfully', reportId: result.insertId });
    } catch (err) {
        console.error("Error in createReport:", err);
        res.status(500).json({ message: 'Error creating report', error: err.message });
    }
};

  

const getReportsByItem = async (req, res) => {
    const { item_id, item_type } = req.params;
  
    // Check if both item_id and item_type are provided in the request params
    if (!item_id || !item_type) {
      return res.status(400).json({ message: 'Item ID and type are required.' });
    }
  
    try {
      console.log("Fetching reports for:", { item_id, item_type });
  
      // Fetch reports using the model
      const reports = await reportModel.getReportsByItem(item_id, item_type);
  
      console.log("Reports fetched:", reports);
  
      if (reports.length > 0) {
        // If reports are found, return them
        res.status(200).json({ reports });
      } else {
        // If no reports are found, return 404
        res.status(404).json({ message: 'No reports found for the given item.' });
      }
    } catch (err) {
      console.error("Error fetching reports:", err.message);
      // Return a 500 error if something goes wrong in the model
      res.status(500).json({ message: 'Error fetching reports', error: err.message });
    }
  };

  const getReports = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; // Default: page 1, 10 reports per page
      const offset = (page - 1) * limit;
  
      const reports = await reportModel.getAllReports(parseInt(limit), parseInt(offset));
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reports', error: error.message });
    }
  };
  


module.exports = { createReport, getReportsByItem, getReports };
