const multer = require('multer');
const path = require('path');
const Promotion = require('../models/promotionModel');

// Configure multer for image uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}-${file.originalname}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB per file
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
    }
    cb(null, true);
  },
}).array('images', 5); // Max 5 images

// Middleware for handling uploads
exports.uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error', error: err.message });
    }
    if (err) {
      return res.status(400).json({ message: 'Invalid file format', error: err.message });
    }
    next();
  });
};

// Create Promotion
exports.createPromotion = (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: "Unauthorized: Invalid user" });
    }

    const { title, description, startDate, endDate, destination, latitude, longitude } = req.body;
    const authorId = req.user.user_id;

    if (!title || !description || !startDate || !endDate || !destination) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate latitude and longitude (optional: customize validation)
    if (
      latitude == null || longitude == null ||
      isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))
    ) {
      return res.status(400).json({ message: "Invalid latitude or longitude" });
    }

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

    // Save promotion with latitude and longitude
    Promotion.createPromotion(
      {
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        destination,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        author_id: authorId,
      },
      imageUrls,
      (err, promotionId) => {
        if (err) {
          return res.status(500).json({ message: "Error creating promotion", error: err.message });
        }
        res.status(201).json({ message: "Promotion created successfully", promotionId });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Error creating promotion", error: err.message });
  }
};

// Get All Promotions
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await new Promise((resolve, reject) => {
      Promotion.getAllPromotions((err, promotions) => {
        if (err) {
          console.error('Error fetching promotions:', err);
          return reject(err);
        }
        resolve(promotions);
      });
    });

    if (!promotions || promotions.length === 0) {
      return res.status(404).json({ message: 'No promotions found' });
    }

    res.status(200).json(promotions);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({
      message: 'Error retrieving promotions',
      error: err.message,
    });
  }
};


exports.getPromotionById = (req, res) => {
  const { id } = req.params;

  Promotion.getPromotionById(id, (err, promotion) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving promotion', error: err.message });
    }

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    res.status(200).json(promotion);
  });
};

exports.getPromotionsByAuthorId = async (req, res) => {
  const { author_id } = req.params;

  try {
    const promotions = await Promotion.getPromotionsByAuthorId(author_id);

    // Check if the user has any promotions
    if (promotions.length === 0) {
      return res.status(404).json({ message: "No promotions found for this user." });
    }

    res.status(200).json(promotions);
  } catch (error) {
    console.error("Error fetching promotions by author:", error.message);
    res.status(500).json({ error: "Failed to fetch promotions.", details: error.message });
  }
};

