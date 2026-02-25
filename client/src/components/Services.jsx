import React from 'react';

const Services = () => {
    return (
        <section id="services" className="services-section section">
            <div className="container">
                <div className="section-header reveal reveal-zoom active">
                    <h2>Development <span>Skills</span></h2>
                </div>
                <div className="services-grid">
                    <div className="service-card reveal reveal-left active">
                        <i className="fas fa-server"></i>
                        <h3>Backend Development</h3>
                        <p>Building server-side applications using Node.js and Django, with focus on clean, maintainable
                            code and core JavaScript & Python fundamentals.</p>
                    </div>
                    <div className="service-card reveal reveal-zoom active">
                        <i className="fas fa-microchip"></i>
                        <h3>API Development</h3>
                        <p>Creating RESTful APIs using Node.js and Django REST Framework, handling requests, and
                            learning best practices for scalable backend design.</p>
                    </div>
                    <div className="service-card reveal reveal-right active">
                        <i className="fas fa-database"></i>
                        <h3>Database Engineering</h3>
                        <p>Working with PostgreSQL and MongoDB, implementing database schemas, optimizing queries, and
                            managing data efficiently.</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Services;
