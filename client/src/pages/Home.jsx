import React, { useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Cursor from '../components/Cursor';

// Lazy load components for better performance
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Experience = lazy(() => import('../components/Experience'));
const Projects = lazy(() => import('../components/Projects'));
const Services = lazy(() => import('../components/Services'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

// Loading component
const LoadingFallback = () => (
    <div style={{
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)'
    }}>
        <div className="loading-spinner">Loading...</div>
    </div>
);

const Home = () => {
    // Optimized reveal animation with Intersection Observer
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');
        
        if (!revealElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optionally unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));

        return () => {
            revealElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    return (
        <>
            <Cursor />
            <Navbar />
            <main>
                <Hero />
                <Suspense fallback={<LoadingFallback />}>
                    <About />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <Skills />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <Projects />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <Experience />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <Services />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <Contact />
                </Suspense>
            </main>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </>
    );
};

export default Home;
