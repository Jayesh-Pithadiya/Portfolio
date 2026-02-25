import React, { useState, useEffect } from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
    const [step, setStep] = useState('login');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [activeTab, setActiveTab] = useState('skills');

    const [newSkill, setNewSkill] = useState({ name: '', level: 80, category: '' });
    const [newProject, setNewProject] = useState({ 
        title: '', 
        description: '', 
        technologies: [], 
        liveUrl: '', 
        githubUrl: '' 
    });

    const API_BASE = process.env.NODE_ENV === 'production' 
        ? 'https://your-api-domain.com' 
        : 'http://localhost:5000';

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isLoggedIn === 'true') {
            setStep('dashboard');
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/data`);
            if (response.ok) {
                const data = await response.json();
                setSkills(data.skills || []);
                setProjects(data.projects || []);
                setContacts(data.contacts || []);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem('isAdminLoggedIn', 'true');
                setShowWelcome(true);
                setTimeout(() => {
                    setShowWelcome(false);
                    setStep('dashboard');
                    fetchData();
                }, 2500);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server not running. Start the backend server first.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        setStep('login');
        setFormData({ email: '', password: '' });
        setSkills([]);
        setProjects([]);
        setContacts([]);
    };

    const makeRequest = async (url, options = {}) => {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        return await fetch(url, { ...options, headers });
    };

    const addSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.name.trim()) return;
        
        try {
            const response = await makeRequest(`${API_BASE}/api/skills`, {
                method: 'POST',
                body: JSON.stringify({
                    name: newSkill.name.trim(),
                    level: parseInt(newSkill.level),
                    category: newSkill.category.trim() || 'Other'
                })
            });
            
            if (response.ok) {
                await fetchData();
                setNewSkill({ name: '', level: 80, category: '' });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteSkill = async (id) => {
        if (!window.confirm("Delete this skill?")) return;
        
        try {
            const response = await makeRequest(`${API_BASE}/api/skills/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) await fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addProject = async (e) => {
        e.preventDefault();
        if (!newProject.title.trim() || !newProject.description.trim()) return;
        
        try {
            const response = await makeRequest(`${API_BASE}/api/projects`, {
                method: 'POST',
                body: JSON.stringify({
                    title: newProject.title.trim(),
                    description: newProject.description.trim(),
                    technologies: newProject.technologies,
                    liveUrl: newProject.liveUrl.trim(),
                    githubUrl: newProject.githubUrl.trim()
                })
            });
            
            if (response.ok) {
                await fetchData();
                setNewProject({ title: '', description: '', technologies: [], liveUrl: '', githubUrl: '' });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteProject = async (id) => {
        if (!window.confirm("Delete this project?")) return;
        
        try {
            const response = await makeRequest(`${API_BASE}/api/projects/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) await fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateContactStatus = async (id, status) => {
        try {
            const response = await makeRequest(`${API_BASE}/api/contacts/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            
            if (response.ok) await fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteContact = async (id) => {
        if (!window.confirm("Delete this contact?")) return;
        
        try {
            const response = await makeRequest(`${API_BASE}/api/contacts/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) await fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (showWelcome) {
        return (
            <div className="welcome-screen">
                <div className="welcome-content">
                    <div className="welcome-icon">🎉</div>
                    <h1 className="welcome-title">Welcome Back!</h1>
                    <p className="welcome-subtitle">Loading your dashboard...</p>
                    <div className="welcome-loader"></div>
                </div>
                <div className="particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (step === 'dashboard') {
        return (
            <div className="admin-dashboard">
                {/* Animated Background */}
                <div className="dashboard-bg">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div>

                {/* Sidebar */}
                <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <div className="sidebar-header">
                        <div className="logo">
                            <div className="logo-icon">⚡</div>
                            <span className="logo-text">Admin Panel</span>
                        </div>
                        <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <nav className="sidebar-nav">
                        <button
                            className={`nav-btn ${activeTab === 'skills' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('skills'); setMobileMenuOpen(false); }}
                        >
                            <i className="fas fa-code"></i>
                            <span>Skills</span>
                            <div className="nav-indicator"></div>
                        </button>
                        <button
                            className={`nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
                        >
                            <i className="fas fa-rocket"></i>
                            <span>Projects</span>
                            <div className="nav-indicator"></div>
                        </button>
                        <button
                            className={`nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('contacts'); setMobileMenuOpen(false); }}
                        >
                            <i className="fas fa-envelope"></i>
                            <span>Messages</span>
                            {contacts.filter(c => c.status === 'unread').length > 0 && (
                                <span className="badge">{contacts.filter(c => c.status === 'unread').length}</span>
                            )}
                            <div className="nav-indicator"></div>
                        </button>
                    </nav>

                    <button className="logout-btn" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </aside>

                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                    <i className="fas fa-bars"></i>
                </button>

                {/* Main Content */}
                <main className="main-content">
                    <div className="content-wrapper">
                        {/* Skills Tab */}
                        {activeTab === 'skills' && (
                            <div className="tab-content fade-in">
                                <div className="page-header">
                                    <h1 className="page-title">
                                        <i className="fas fa-code"></i>
                                        Skills Management
                                    </h1>
                                    <p className="page-subtitle">Manage your technical skills</p>
                                </div>

                                <div className="glass-card">
                                    <h3 className="card-title">Add New Skill</h3>
                                    <form onSubmit={addSkill} className="skill-form">
                                        <div className="form-grid">
                                            <div className="form-field">
                                                <label>Skill Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. React"
                                                    value={newSkill.name}
                                                    onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-field">
                                                <label>Level ({newSkill.level}%)</label>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="100"
                                                    value={newSkill.level}
                                                    onChange={e => setNewSkill({ ...newSkill, level: e.target.value })}
                                                    className="range-slider"
                                                />
                                            </div>
                                            <div className="form-field">
                                                <label>Category</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Frontend"
                                                    value={newSkill.category}
                                                    onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-primary">
                                            <i className="fas fa-plus"></i>
                                            Add Skill
                                        </button>
                                    </form>
                                </div>

                                <div className="items-grid">
                                    {skills.map((skill, index) => (
                                        <div key={skill.id} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <div className="skill-header">
                                                <h4>{skill.name}</h4>
                                                <button className="btn-delete" onClick={() => deleteSkill(skill.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                            <div className="skill-progress">
                                                <div className="progress-bar" style={{ width: `${skill.level}%` }}></div>
                                            </div>
                                            <div className="skill-footer">
                                                <span className="skill-category">{skill.category}</span>
                                                <span className="skill-level">{skill.level}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects Tab */}
                        {activeTab === 'projects' && (
                            <div className="tab-content fade-in">
                                <div className="page-header">
                                    <h1 className="page-title">
                                        <i className="fas fa-rocket"></i>
                                        Projects Management
                                    </h1>
                                    <p className="page-subtitle">Showcase your amazing work</p>
                                </div>

                                <div className="glass-card">
                                    <h3 className="card-title">Add New Project</h3>
                                    <form onSubmit={addProject} className="project-form">
                                        <div className="form-grid">
                                            <div className="form-field">
                                                <label>Project Title</label>
                                                <input
                                                    type="text"
                                                    placeholder="My Awesome Project"
                                                    value={newProject.title}
                                                    onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-field">
                                                <label>Technologies</label>
                                                <input
                                                    type="text"
                                                    placeholder="React, Node.js, MongoDB"
                                                    value={newProject.technologies.join(', ')}
                                                    onChange={e => setNewProject({ 
                                                        ...newProject, 
                                                        technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                                                    })}
                                                />
                                            </div>
                                            <div className="form-field">
                                                <label>Live URL</label>
                                                <input
                                                    type="url"
                                                    placeholder="https://example.com"
                                                    value={newProject.liveUrl}
                                                    onChange={e => setNewProject({ ...newProject, liveUrl: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-field">
                                                <label>GitHub URL</label>
                                                <input
                                                    type="url"
                                                    placeholder="https://github.com/user/repo"
                                                    value={newProject.githubUrl}
                                                    onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-field">
                                            <label>Description</label>
                                            <textarea
                                                placeholder="Describe your project..."
                                                value={newProject.description}
                                                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                                rows="4"
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn-primary">
                                            <i className="fas fa-plus"></i>
                                            Add Project
                                        </button>
                                    </form>
                                </div>

                                <div className="items-grid">
                                    {projects.map((project, index) => (
                                        <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <div className="project-header">
                                                <h4>{project.title}</h4>
                                                <button className="btn-delete" onClick={() => deleteProject(project.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                            <p className="project-desc">{project.description}</p>
                                            <div className="project-tech">
                                                {project.technologies?.map((tech, i) => (
                                                    <span key={i} className="tech-tag">{tech}</span>
                                                ))}
                                            </div>
                                            <div className="project-links">
                                                {project.liveUrl && (
                                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                                        <i className="fas fa-external-link-alt"></i> Live
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                                        <i className="fab fa-github"></i> GitHub
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contacts Tab */}
                        {activeTab === 'contacts' && (
                            <div className="tab-content fade-in">
                                <div className="page-header">
                                    <h1 className="page-title">
                                        <i className="fas fa-envelope"></i>
                                        Contact Messages
                                    </h1>
                                    <p className="page-subtitle">Manage incoming messages</p>
                                </div>

                                <div className="contacts-list">
                                    {contacts.map((contact, index) => (
                                        <div key={contact.id} className={`contact-card ${contact.status}`} style={{ animationDelay: `${index * 0.1}s` }}>
                                            <div className="contact-header">
                                                <div className="contact-info">
                                                    <h4>{contact.name}</h4>
                                                    <p>{contact.email}</p>
                                                </div>
                                                <div className="contact-actions">
                                                    <select
                                                        value={contact.status}
                                                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                                                        className="status-select"
                                                    >
                                                        <option value="unread">Unread</option>
                                                        <option value="read">Read</option>
                                                        <option value="replied">Replied</option>
                                                    </select>
                                                    <button className="btn-delete" onClick={() => deleteContact(contact.id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="contact-message">
                                                <p>{contact.message}</p>
                                            </div>
                                            <div className="contact-footer">
                                                <span className="contact-date">
                                                    <i className="fas fa-clock"></i>
                                                    {new Date(contact.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {contacts.length === 0 && (
                                        <div className="empty-state">
                                            <i className="fas fa-inbox"></i>
                                            <h3>No messages yet</h3>
                                            <p>New contact messages will appear here</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="login-screen">
            <div className="login-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
            </div>
            
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-icon">🔐</div>
                        <h1>Admin Portal</h1>
                        <p>Please login to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-field">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="error-alert">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <i className="fas fa-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
