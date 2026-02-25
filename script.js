document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars-staggered');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-xmark');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars-staggered');
                icon.classList.remove('fa-xmark');
            });
        });
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Matrix-style Background Animation for Hero
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;
        const maxDistance = 150;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 210, 255, 0.5)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 210, 255, ${1 - distance / maxDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        });
    }

    // Typing Effect for Hero Subtitle
    const typingText = document.querySelector('.hero-content h2');
    if (typingText) {
        const textToType = "Node.js Developer | Backend Enthusiast";
        typingText.textContent = '';
        let charIndex = 0;

        function type() {
            if (charIndex < textToType.length) {
                typingText.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            }
        }

        setTimeout(type, 1000);
    }

    // Form submission handling
    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            const successMsg = document.getElementById('contact-success');

            // Set loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate form submission
            setTimeout(() => {
                contactForm.reset();
                successMsg.textContent = "Message sent successfully! I'll get back to you soon.";
                successMsg.classList.add('visible');

                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                // Hide success message after 5 seconds
                setTimeout(() => successMsg.classList.remove('visible'), 5000);
            }, 1000);
        });
    }

    // Project Gallery and "See More" Logic
    const projectsGrid = document.getElementById('projects-grid');
    const seeMoreBtn = document.getElementById('see-more-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const initialProjects = 4;

    if (projectsGrid && seeMoreBtn) {
        // Initially hide projects beyond the first 4
        projectCards.forEach((card, index) => {
            if (index >= initialProjects) {
                card.classList.add('reveal-hidden');
            }
        });

        // Toggle "See More" button visibility
        if (projectCards.length <= initialProjects) {
            seeMoreBtn.parentElement.style.display = 'none';
        }

        seeMoreBtn.addEventListener('click', () => {
            projectCards.forEach(card => card.classList.remove('reveal-hidden'));
            seeMoreBtn.parentElement.style.display = 'none';
            // Trigger scroll reveal for newly shown items
            revealOnScroll();
        });
    }

    // Lightbox Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const projectGalleries = {
        ecommerce: [
            { src: 'assets/Nexa/project1.jpg', caption: 'Full System Architecture' },
            { src: 'assets/Nexa/project2.jpg', caption: 'Login Form' },
            { src: 'assets/Nexa/Admin Panel.jpg', caption: 'Admin panel' },
            { src: 'assets/Nexa/Team Management.jpg', caption: 'Team Management' },
            { src: 'assets/Nexa/update profile.jpg', caption: 'update profile' }
        ],
        taskmanager: [
            { src: 'assets/smarnika/5.jfif', caption: 'Dashboard' },
            { src: 'assets/smarnika/4.jfif', caption: 'All Posts' },
            { src: 'assets/smarnika/3.jfif', caption: 'Admin Login Panel ' },
            { src: 'assets/smarnika/2.jfif', caption: 'New Post uploading....' },
            { src: 'assets/smarnika/1.jfif', caption: 'Post submitted....' }
        ],
        pithadiya: [
            { src: 'assets/Pithadiya/1.png', caption: 'Loader With Animation' },
            { src: 'assets/Pithadiya/2.png', caption: 'Main Page' },
            { src: 'assets/Pithadiya/3.png', caption: 'Collection with options' },
            { src: 'assets/Pithadiya/4.png', caption: 'Mobile Friendly' },
        ]
    };

    let currentGallery = [];
    let currentIndex = 0;
    let slideshowInterval = null;

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if links are clicked
            if (e.target.closest('.project-links')) return;

            const galleryKey = card.getAttribute('data-gallery');
            if (galleryKey && projectGalleries[galleryKey]) {
                currentGallery = projectGalleries[galleryKey];
                currentIndex = 0;
                showImage(currentIndex);
                lightbox.classList.add('active');
                startSlideshow(); // Start automatic slideshow
            }
        });
    });

    function startSlideshow() {
        if (slideshowInterval) clearInterval(slideshowInterval);
        slideshowInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % currentGallery.length;
            showImage(currentIndex);
        }, 2000);
    }

    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
    }

    function showImage(index) {
        if (currentGallery[index]) {
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = currentGallery[index].src;
                lightboxCaption.textContent = currentGallery[index].caption;
                lightboxImg.style.opacity = '1';
            }, 200);
        }
    }

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        stopSlideshow(); // Stop slideshow when closing
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            stopSlideshow(); // Stop slideshow when closing
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentGallery.length;
        showImage(currentIndex);
        startSlideshow(); // Restart slideshow from new position
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        showImage(currentIndex);
        startSlideshow(); // Restart slideshow from new position
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                stopSlideshow();
            }
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'ArrowLeft') prevBtn.click();
        }
    });

    // Custom Developer Cursor
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');

    if (cursor && cursorDot) {
        let mouseX = -100;
        let mouseY = -100;
        let cursorX = -100;
        let cursorY = -100;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Immediate position for the dot
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth follow for the outer cursor
        const animateCursor = () => {
            let dx = mouseX - cursorX;
            let dy = mouseY - cursorY;

            cursorX += dx * 0.15;
            cursorY += dy * 0.15;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects for all interactive elements
        function updateHovers() {
            const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .mobile-menu-btn, .btn-link, .lightbox-close');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                    cursorDot.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                    cursorDot.classList.remove('hover');
                });
            });
        }
        updateHovers();

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.visibility = 'hidden';
            cursorDot.style.visibility = 'hidden';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.visibility = 'visible';
            cursorDot.style.visibility = 'visible';
        });
    }

});
