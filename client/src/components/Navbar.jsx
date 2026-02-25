import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header>
            <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
                <div className="container">
                    <div className="logo">JAYESH&nbsp;<span>PITHADIYA</span></div>
                    <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        <li><a href="#hero" onClick={closeMobileMenu}>Home</a></li>
                        <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
                        <li><a href="#skills" onClick={closeMobileMenu}>Skills</a></li>
                        <li><a href="#projects" onClick={closeMobileMenu}>Projects</a></li>
                        <li><a href="#experience" onClick={closeMobileMenu}>Experience</a></li>
                        <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
                    </ul>
                    <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                        <i className={`fas ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
