import jwt from 'jsonwebtoken';
import config from '../config/config.js';

/**
 * JWT Authentication Middleware
 * Verifies JWT token from Authorization header
 * Protects admin routes from unauthorized access
 */

export const authenticateToken = (req, res, next) => {
    try {
        // Extract token from Authorization header (Bearer <token>)
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Access token required' 
            });
        }

        // Verify token
        jwt.verify(token, config.JWT_SECRET, (err, user) => {
            if (err) {
                // Token expired or invalid
                return res.status(403).json({ 
                    success: false, 
                    message: 'Invalid or expired token' 
                });
            }

            // Attach user info to request
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Authentication error' 
        });
    }
};
