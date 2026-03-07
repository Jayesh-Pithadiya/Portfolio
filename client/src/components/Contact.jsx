import React, { useState, useRef, useEffect } from 'react';

const Contact = () => {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const statusTimeoutRef = useRef(null);

    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            if (statusTimeoutRef.current) {
                clearTimeout(statusTimeoutRef.current);
            }
        };
    }, []);

    const API_BASE = process.env.NODE_ENV === 'production' 
        ? 'https://your-api-domain.com' 
        : 'http://localhost:5000';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const response = await fetch(`${API_BASE}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                // Clear any existing timeout before setting a new one
                if (statusTimeoutRef.current) {
                    clearTimeout(statusTimeoutRef.current);
                }
                statusTimeoutRef.current = setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
                console.error('Server error:', data.message);
            }
        } catch (err) {
            setStatus('error');
            console.error('Network error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact-section section">
            <div className="container">
                <div className="section-header reveal reveal-zoom active">
                    <h2>Get In <span>Touch</span></h2>
                </div>
                <div className="contact-content">
                    <div className="contact-info reveal reveal-left active">
                        <h3>Building Reliable & Scalable Backend Solutions</h3>
                        <p>I am a backend developer with 6 months of internship experience, working on Node.js, Django,
                            and PostgreSQL projects. I enjoy building clean, maintainable, and scalable backend
                            solutions while continuously learning and improving my skills.</p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>jayeshpithadiya385@gmail.com</span>
                            </div>
                            <div className="contact-item">
                                <i className="fab fa-linkedin"></i>
                                <span>linkedin.com/in/jayesh-pithadiya</span>
                            </div>
                        </div>
                    </div>
                    <form className="contact-form reveal reveal-right active" id="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message" 
                                rows="5" 
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                        <div className={`form-message ${status === 'success' ? 'visible' : ''}`}>
                            Message sent successfully!
                        </div>
                        <div className={`form-message error ${status === 'error' ? 'visible' : ''}`}>
                            Failed to send message. Please try again.
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
