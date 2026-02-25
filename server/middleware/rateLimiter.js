import rateLimit from 'express-rate-limit';

/**
 * Rate Limiting Middleware for Login Route
 * Prevents brute force attacks by limiting login attempts
 * Max 5 attempts per 15 minutes per IP
 */

export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many login attempts. Please try again after 15 minutes.'
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
    
    // Skip successful requests (only count failed attempts)
    skipSuccessfulRequests: true,
    
    // Custom handler for rate limit exceeded
    handler: (req, res) => {
        console.warn(`⚠️ Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many login attempts. Please try again after 15 minutes.',
            retryAfter: '15 minutes'
        });
    }
});
