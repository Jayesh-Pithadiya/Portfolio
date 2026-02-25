import express from 'express';
import config from '../config/config.js';

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
        return res.json({
            success: true,
            message: 'Login successful',
            user: { email: config.ADMIN_EMAIL, role: 'admin' }
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
    });
});

export default router;
