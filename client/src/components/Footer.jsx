import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="social-links">
                        <a href="https://github.com/Jayesh-Pithadiya"><i className="fab fa-github"></i></a>
                        <a href="https://linkedin.com/in/jayesh-pithadiya"><i className="fab fa-linkedin"></i></a>
                    </div>
                    <p>&copy; 2024 Jayesh Pithadiya. All rights reserved.</p>
                    <a href="#hero" className="back-to-top"><i className="fas fa-arrow-up"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
