const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized: Token is invalid', error: err.message });
        }
        console.log('Decoded token:', decoded); // Log the decoded token
        req.user = decoded; // Ensure this contains the user ID
        next();
    });
};

module.exports = authenticateToken;