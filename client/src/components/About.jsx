import React from 'react';

const About = () => {
    return (
        <section id="about" className="about-section section">
            <div className="container">
                <div className="section-header reveal reveal-zoom active">
                    <h2>About <span>Me</span></h2>
                </div>
                <div className="about-content">
                    <div className="about-image reveal reveal-left active">
                        <div className="image-wrapper shadow-glow">
                            <img src="/assets/profile.jpeg" alt="Jayesh Pithadiya" className="profile-img" />
                            <div className="image-experience-badge">
                                <span>6+ Months</span>
                                <small>Hands-on Experience</small>
                            </div>
                        </div>
                    </div>
                    <div className="about-text reveal reveal-right active">
                        <h3 className="gradient-text">Jayesh Pithadiya</h3>
                        <div className="professional-summary">
                            <p><strong>Backend Developer:</strong> Building scalable and secure applications using
                                Node.js and Django with strong JavaScript fundamentals.</p>

                        </div>

                        <div className="about-highlights">
                            <div className="highlight-item">
                                <i className="fas fa-microchip"></i>
                                <div>
                                    <h4>Backend Development</h4>
                                    <p>Building REST APIs and server-side logic using Node.js and Django.</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <i className="fas fa-database"></i>
                                <div>
                                    <h4>Database Handling</h4>
                                    <p>Working with databases, CRUD operations, and basic schema design.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="internship-milestones reveal active">
                    <h3>Professional Evolution: Nexa Infoech</h3>
                    <div className="milestones-grid">
                        <div className="milestone">
                            <span className="milestone-label">Phase I: Python/Django</span>
                            <p>Mastered the fundamentals of MVC architecture and server-side rendering, building modular
                                backend components.</p>
                        </div>
                        <div className="milestone">
                            <span className="milestone-label">Phase II: Node.js/Full-Stack</span>
                            <p>Transitioned to asynchronous JS environments, engineering real-time APIs and mastering
                                Mongoose ODM patterns.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
