document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.musubi-cursor-dot');

    if (cursorDot && matchMedia('(pointer: fine)').matches) {
        
        // Track mouse movement instantly
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        // Global hover detection for ANY link or button on ANY page
        const addHoverEffects = () => {
            const interactables = document.querySelectorAll('a, button, select, .node-link');
            
            interactables.forEach(el => {
                el.removeEventListener('mouseenter', lockCursor);
                el.removeEventListener('mouseleave', unlockCursor);
                
                el.addEventListener('mouseenter', lockCursor);
                el.addEventListener('mouseleave', unlockCursor);
            });
        };

        const lockCursor = () => cursorDot.classList.add('locked');
        const unlockCursor = () => cursorDot.classList.remove('locked');

        // Run once on load
        addHoverEffects();

        // Watch the whole body for new buttons being generated (like JSON menus)
        const observer = new MutationObserver(() => {
            addHoverEffects();
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
});
