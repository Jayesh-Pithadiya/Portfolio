import React, { useEffect, useRef } from 'react';

const Hero = () => {
    const canvasRef = useRef(null);
    const typingTextRef = useRef(null);

    useEffect(() => {
        let timeoutId;
        const textToType = "Node.js Developer | Backend Enthusiast";
        let charIndex = 0;

        // Typing Effect
        if (typingTextRef.current) {
            // Clear initially to prevent accumulation from re-renders
            typingTextRef.current.textContent = '';

            const type = () => {
                if (charIndex < textToType.length) {
                    if (typingTextRef.current) {
                        typingTextRef.current.textContent += textToType.charAt(charIndex);
                        charIndex++;
                        timeoutId = setTimeout(type, 100);
                    }
                }
            };
            // Start typing after 1s delay
            timeoutId = setTimeout(type, 1000);
        }

        // Cleanup function specifically for typing effect timeouts
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        // Canvas Effect
        const canvas = canvasRef.current;
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

            let animationFrameId;
            const animate = () => {
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
                animationFrameId = requestAnimationFrame(animate);
            };
            animate();

            const handleResize = () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
                particles.length = 0;
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            };
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                cancelAnimationFrame(animationFrameId);
            };
        }
    }, []);

    return (
        <section id="hero" className="hero-section">
            <div className="container">
                <div className="hero-content">
                    <h1 className="reveal active">Architecting <span>Robust Backend</span> Systems</h1>
                    <h2 className="reveal active" ref={typingTextRef}></h2>
                    <p className="reveal active">High-performance server-side architectures.<br />
                        Scalable database design. Seamless API integrations.<br />
                        Turning complex requirements into elegant, efficient code.</p>
                    <div className="hero-btns reveal reveal-up active">
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="#contact" className="btn btn-secondary">Contact Me</a>
                    </div>
                </div>
            </div>
            <div className="hero-bg-animation">
                <canvas id="hero-canvas" ref={canvasRef}></canvas>
            </div>
        </section>
    );
};

export default Hero;
