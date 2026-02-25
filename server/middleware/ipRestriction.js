import config from '../config/config.js';

/**
 * IP Restriction Middleware
 * Only allows requests from whitelisted IP addresses
 * Useful for admin panel access control
 */

export const ipRestriction = (req, res, next) => {
    // Skip IP check in development or if no IPs configured
    if (config.NODE_ENV === 'development' || config.ALLOWED_IPS.length === 0) {
        return next();
    }

    // Get client IP address
    const clientIP = req.ip || 
                     req.headers['x-forwarded-for']?.split(',')[0] || 
                     req.connection.remoteAddress;

    // Normalize IPv6 localhost to IPv4
    const normalizedIP = clientIP === '::1' ? '127.0.0.1' : clientIP;

    // Check if IP is whitelisted
    const isAllowed = config.ALLOWED_IPS.some(allowedIP => {
        return normalizedIP.includes(allowedIP) || allowedIP === normalizedIP;
    });

    if (!isAllowed) {
        console.warn(`🚫 Blocked access from IP: ${normalizedIP}`);
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied from your IP address' 
        });
    }

    next();
};
