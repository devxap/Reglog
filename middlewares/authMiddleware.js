const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({ message: "Authentication Token not found" });
    }

    try {
        const decodedData = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(500).json({ message: "Invalid Token" });
    }
}

module.exports = authMiddleware;