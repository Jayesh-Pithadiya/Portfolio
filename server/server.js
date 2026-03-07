import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';

const app = express();

// Trust proxy (important for deployment behind reverse proxy)
app.set('trust proxy', 1);

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = config.NODE_ENV === 'production'
            ? [config.CLIENT_URL, 'https://jayeshpithadiya.com', 'https://www.jayeshpithadiya.com']
            : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Body parser with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // XSS Protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    // Referrer Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Remove X-Powered-By header
    res.removeHeader('X-Powered-By');

    // Content Security Policy (adjust as needed)
    if (config.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }

    next();
});

// Request logging (development only)
if (config.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
        next();
    });
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.NODE_ENV
    });
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Redirect /admin to the React dashboard path (/login/private)
app.get('/admin', (req, res) => {
    res.redirect('/login/private');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// The catchall handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res, next) => {
    // Check if it's an API request first to avoid sending index.html for missing API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({
            success: false,
            message: 'API route not found',
            path: req.path
        });
    }
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    // Log error
    console.error('Error:', {
        message: err.message,
        stack: config.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // CORS error
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS policy violation'
        });
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: err.errors
        });
    }

    // Default error response
    res.status(err.status || 500).json({
        success: false,
        message: config.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
        ...(config.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
    console.log(`\n${signal} received. Starting graceful shutdown...`);

    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('Forced shutdown after timeout');
        process.exit(1);
    }, 10000);
};

// Start server
const server = app.listen(config.PORT, () => {
    console.log('\n🚀 Server started successfully!');
    console.log(`📍 Port: ${config.PORT}`);
    console.log(`🌍 Environment: ${config.NODE_ENV}`);
    console.log(`🔗 API: http://localhost:${config.PORT}`);
    console.log(`✅ Server is ready to accept requests\n`);
});

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default app;
