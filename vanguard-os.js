/* vanguard-os.js */
document.addEventListener('DOMContentLoaded', () => {
    initWarpStars();
    initVanguardTouch();
});

// 1. ANIMATED WARP STARS
function initWarpStars() {
    const container = document.getElementById('star-field');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random positions
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let size = Math.random() * 2 + 1;
        let duration = Math.random() * 3 + 2;
        let delay = Math.random() * 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Custom animation for drifting movement
        star.animate([
            { transform: 'translateZ(0) scale(1)', opacity: 0.3 },
            { transform: `translate(${(x-50)*0.5}px, ${(y-50)*0.5}px) scale(1.5)`, opacity: 1 },
            { transform: `translate(${(x-50)*1.2}px, ${(y-50)*1.2}px) scale(2)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            delay: delay * 1000,
            easing: 'ease-in'
        });

        container.appendChild(star);
    }
}

// 2. LONG-PRESS DRAG & CLICK NAVIGATION
function initVanguardTouch() {
    const icons = document.querySelectorAll('.app-icon');
    const dock = document.querySelector('.vanguard-dock');
    const desktop = document.querySelector('.desktop-grid');

    let pressTimer;
    let activeItem = null;
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    icons.forEach(icon => {
        const start = (e) => {
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            // Start a 1-second timer for Drag Mode
            pressTimer = window.setTimeout(() => {
                activateDrag(icon, clientX, clientY);
            }, 1000); 
        };

        const activateDrag = (target, x, y) => {
            isDragging = true;
            activeItem = target;
            const rect = target.getBoundingClientRect();
            offset.x = x - rect.left;
            offset.y = y - rect.top;

            target.classList.add('dragging');
            target.style.position = 'fixed';
            target.style.width = rect.width + 'px';
            target.style.zIndex = '9999';
            target.style.pointerEvents = 'none';
            moveAt(x, y);
        };

        const moveAt = (x, y) => {
            if (!activeItem) return;
            activeItem.style.left = (x - offset.x) + 'px';
            activeItem.style.top = (y - offset.y) + 'px';
        };

        const onMove = (e) => {
            if (!isDragging) {
                clearTimeout(pressTimer); // Cancel drag if finger moves before 1s
                return;
            }
            const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const y = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            moveAt(x, y);
        };

        const end = (e) => {
            clearTimeout(pressTimer);
            if (!isDragging) {
                // If they released before 1s, it's a NAV CLICK
                if (e.type === 'mouseup' || e.type === 'touchend') {
                    handleNavigation(icon.dataset.label);
                }
                return;
            }

            const x = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
            const y = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;

            finalizeDrop(x, y);
        };

        const finalizeDrop = (x, y) => {
            const dockRect = dock.getBoundingClientRect();
            const isOverDock = (x > dockRect.left && x < dockRect.right && y > dockRect.top && y < dockRect.bottom);

            activeItem.classList.remove('dragging');
            activeItem.style.position = '';
            activeItem.style.left = '';
            activeItem.style.top = '';
            activeItem.style.width = '';
            activeItem.style.pointerEvents = 'auto';

            if (isOverDock) dock.appendChild(activeItem);
            else desktop.appendChild(activeItem);

            isDragging = false;
            activeItem = null;
        };

        const handleNavigation = (label) => {
            console.log(`Navigating to: ${label}`);
            // Logic for opening windows or redirection
            alert(`Opening ${label} Module...`);
        };

        icon.addEventListener('mousedown', start);
        icon.addEventListener('touchstart', start, {passive: false});
    });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, {passive: false});
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);
}
