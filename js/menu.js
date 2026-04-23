    // --- CUSTOM CURSOR LOGIC (SINGLE POINTER) ---
    const cursorDot = document.querySelector('.musubi-cursor-dot');

    if (matchMedia('(pointer: fine)').matches) {
        
        // Track mouse movement instantly
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        const observer = new MutationObserver(() => {
            document.querySelectorAll('.node-link').forEach(link => {
                link.addEventListener('mouseenter', () => {
                    cursorDot.classList.add('locked');
                });
                link.addEventListener('mouseleave', () => {
                    cursorDot.classList.remove('locked');
                });
            });
        });

        // Watch the matrix container
        const leftMatrix = document.getElementById('node-matrix-left');
        const rightMatrix = document.getElementById('node-matrix-right');
        if(leftMatrix && rightMatrix) {
            observer.observe(leftMatrix, { childList: true });
            observer.observe(rightMatrix, { childList: true });
        }
    }
