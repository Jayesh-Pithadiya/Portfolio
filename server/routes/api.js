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

// GET all data
router.get('/data', (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST contact form
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
        
        console.log(`📧 New contact from: ${email}`);
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST add skill
router.post('/skills', (req, res) => {
    try {
        const { name, level, category } = req.body;
        
        if (!name || !level) {
            return res.status(400).json({ success: false, message: 'Name and level are required' });
        }
        
        const data = readData();
        const newSkill = { 
            id: Date.now(), 
            name: name.trim(), 
            level: parseInt(level), 
            category: category?.trim() || 'Other',
            createdAt: new Date().toISOString()
        };
        
        data.skills.push(newSkill);
        writeData(data);
        res.json({ success: true, skill: newSkill });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE skill
router.delete('/skills/:id', (req, res) => {
    try {
        const skillId = parseInt(req.params.id);
        const data = readData();
        const initialLength = data.skills.length;
        
        data.skills = data.skills.filter(s => s.id !== skillId);
        
        if (data.skills.length === initialLength) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }
        
        writeData(data);
        res.json({ success: true, message: 'Skill deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST add project
router.post('/projects', (req, res) => {
    try {
        const { title, description, technologies, liveUrl, githubUrl } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description are required' });
        }
        
        const data = readData();
        const newProject = { 
            id: Date.now(), 
            title: title.trim(),
            description: description.trim(),
            technologies: technologies || [],
            liveUrl: liveUrl?.trim() || '',
            githubUrl: githubUrl?.trim() || '',
            createdAt: new Date().toISOString()
        };
        
        data.projects.push(newProject);
        writeData(data);
        res.json({ success: true, project: newProject });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE project
router.delete('/projects/:id', (req, res) => {
    try {
        const projectId = parseInt(req.params.id);
        const data = readData();
        const initialLength = data.projects.length;
        
        data.projects = data.projects.filter(p => p.id !== projectId);
        
        if (data.projects.length === initialLength) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        
        writeData(data);
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// PUT update contact status
router.put('/contacts/:id/status', (req, res) => {
    try {
        const contactId = parseInt(req.params.id);
        const { status } = req.body;
        
        const data = readData();
        const contact = data.contacts?.find(c => c.id === contactId);
        
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        
        contact.status = status;
        writeData(data);
        res.json({ success: true, message: 'Status updated successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE contact
router.delete('/contacts/:id', (req, res) => {
    try {
        const contactId = parseInt(req.params.id);
        const data = readData();
        const initialLength = data.contacts?.length || 0;
        
        if (!data.contacts) data.contacts = [];
        data.contacts = data.contacts.filter(c => c.id !== contactId);
        
        if (data.contacts.length === initialLength) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        
        writeData(data);
        res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
