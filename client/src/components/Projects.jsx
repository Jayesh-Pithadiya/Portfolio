import React, { useState, useEffect } from 'react';

const projectGalleries = {
    ecommerce: [
        { src: '/assets/Nexa/project1.jpg', caption: 'Full System Architecture' },
        { src: '/assets/Nexa/project2.jpg', caption: 'Login Form' },
        { src: '/assets/Nexa/Admin Panel.jpg', caption: 'Admin panel' },
        { src: '/assets/Nexa/Team Management.jpg', caption: 'Team Management' },
        { src: '/assets/Nexa/update profile.jpg', caption: 'update profile' }
    ],
    taskmanager: [
        { src: '/assets/smarnika/5.jfif', caption: 'Dashboard' },
        { src: '/assets/smarnika/4.jfif', caption: 'All Posts' },
        { src: '/assets/smarnika/3.jfif', caption: 'Admin Login Panel ' },
        { src: '/assets/smarnika/2.jfif', caption: 'New Post uploading....' },
        { src: '/assets/smarnika/1.jfif', caption: 'Post submitted....' }
    ],
    pithadiya: [
        { src: '/assets/Pithadiya/1.png', caption: 'Loader With Animation' },
        { src: '/assets/Pithadiya/2.png', caption: 'Main Page' },
        { src: '/assets/Pithadiya/3.png', caption: 'Collection with options' },
        { src: '/assets/Pithadiya/4.png', caption: 'Mobile Friendly' },
    ]
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentGallery, setCurrentGallery] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/data')
            .then(res => res.json())
            .then(data => {
                if (data.projects) setProjects(data.projects);
            })
            .catch(err => console.error("Failed to fetch projects", err));
    }, []);

    const openLightbox = (galleryKey) => {
        if (projectGalleries[galleryKey]) {
            setCurrentGallery(projectGalleries[galleryKey]);
            setCurrentIndex(0);
            setLightboxOpen(true);
        }
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % currentGallery.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
    };

    useEffect(() => {
        let interval;
        if (lightboxOpen) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % currentGallery.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [lightboxOpen, currentGallery]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen]);

    const visibleProjects = showAll ? projects : projects.slice(0, 4);

    return (
        <section id="projects" className="projects-section section">
            <div className="container">
                <div className="section-header reveal reveal-zoom active">
                    <h2>Recent <span>Projects</span></h2>
                </div>
                <div className="projects-grid" id="projects-grid">
                    {visibleProjects.map(project => (
                        <div className="project-card reveal reveal-left active" key={project.id} onClick={() => openLightbox(project.galleryKey)}>
                            <div className="project-img">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <span>View Gallery</span>
                                </div>
                            </div>
                            <div className="project-info">
                                <h3>{project.title}</h3>
                                <p className="tech-stack">{project.techStack}</p>
                                <p dangerouslySetInnerHTML={{ __html: project.description.replace(':', ':</strong>').replace('System:', '<strong>System:').replace('Platform:', '<strong>Platform:').replace('Website:', '<strong>Website:') }} />
                                <div className="project-actions">
                                    <a href={project.link} target="_blank" className="btn btn-live project-links" onClick={(e) => e.stopPropagation()}><i
                                        className="fas fa-external-link-alt"></i> Live Project</a>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* See More Button */}
                    <div className="see-more-container reveal reveal-up active" style={{ display: (projects.length > 4 && !showAll) ? 'block' : 'none' }}>
                        <button id="see-more-btn" className="btn btn-secondary" onClick={() => setShowAll(true)}>See More Projects</button>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <div id="lightbox" className={`lightbox ${lightboxOpen ? 'active' : ''}`} onClick={closeLightbox}>
                <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                    <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
                    {currentGallery.length > 0 && (
                        <>
                            <img id="lightbox-img" src={currentGallery[currentIndex].src} alt="Project View" />
                            <div className="lightbox-caption">{currentGallery[currentIndex].caption}</div>
                        </>
                    )}
                    <button id="prev-btn" style={{ position: 'absolute', left: '-50px', top: '50%', background: 'transparent', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }} onClick={prevImage}><i className="fas fa-chevron-left"></i></button>
                    <button id="next-btn" style={{ position: 'absolute', right: '-50px', top: '50%', background: 'transparent', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }} onClick={nextImage}><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
