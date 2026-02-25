import express from 'express';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, '../data.json');

const router = express.Router();

// Helper functions
const readData = () => {
    try {
        if (!existsSync(DATA_FILE)) {
            const initialData = { skills: [], projects: [], contacts: [] };
            writeData(initialData);
            return initialData;
        }
        const data = readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return { skills: [], projects: [], contacts: [] };
    }
};

const writeData = (data) => {
    try {
        writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data:', err);
    }
};

/**
 * GET /api/public/data
 * Get all public data (skills and projects)
 */
router.get('/data', (req, res) => {
    try {
        const data = readData();
        // Don't expose contacts to public
        res.json({
            skills: data.skills || [],
            projects: data.projects || []
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * POST /api/public/contact
 * Submit contact form
 */
router.post('/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
        const data = readData();
        const newContact = { 
            id: Date.now(), 
            name: name.trim(), 
            email: email.trim(), 
            message: message.trim(),
            createdAt: new Date().toISOString(),
            status: 'unread'
        };
        
        if (!data.contacts) data.contacts = [];
        data.contacts.push(newContact);
        writeData(data);
        
        console.log(`📧 New contact message from: ${email}`);
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
