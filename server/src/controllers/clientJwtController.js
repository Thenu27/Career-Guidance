const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.CLIENT_JWT_SECRET, {
        expiresIn: '7d', 
    });
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Read token from HTTP-only cookie
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).sebd("Unauthorized!");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};    


module.exports = {generateToken,verifyToken};
