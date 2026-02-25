import React, { useEffect } from 'react';

const Cursor = () => {
    useEffect(() => {
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursor-dot');

        if (!cursor || !cursorDot) return;

        let mouseX = -100;
        let mouseY = -100;
        let cursorX = -100;
        let cursorY = -100;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        };

        document.addEventListener('mousemove', onMouseMove);

        const animateCursor = () => {
            let dx = mouseX - cursorX;
            let dy = mouseY - cursorY;
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        };
        const animationId = requestAnimationFrame(animateCursor);

        const onMouseEnter = () => {
            cursor.style.visibility = 'visible';
            cursorDot.style.visibility = 'visible';
        };
        const onMouseLeave = () => {
            cursor.style.visibility = 'hidden';
            cursorDot.style.visibility = 'hidden';
        };

        const updateHovers = () => {
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
        };

        // Re-run hover listener attachment periodically or on mutation
        // For simplicity in React, we might miss some dynamic elements, 
        // but let's attach to document for delegation or just run once + interval.
        updateHovers();
        const interval = setInterval(updateHovers, 2000);

        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            cancelAnimationFrame(animationId);
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <div className="custom-cursor" id="cursor"></div>
            <div className="cursor-dot" id="cursor-dot"></div>
        </>
    );
};

export default Cursor;
