import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'jayesh@gmail.com',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'jayesh001'
};

export default config;
