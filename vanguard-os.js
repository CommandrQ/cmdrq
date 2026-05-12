/* vanguard-os.js */
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initDraggableIcons();
});

function initStars() {
    const container = document.getElementById('star-field');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        container.appendChild(star);
    }
}

function initDraggableIcons() {
    const icons = document.querySelectorAll('.app-icon');
    const dock = document.querySelector('.vanguard-dock');
    const desktop = document.querySelector('.desktop-grid');

    let activeItem = null;
    let offset = { x: 0, y: 0 };

    icons.forEach(icon => {
        // Start Dragging (Mouse & Touch)
        const startDrag = (e) => {
            activeItem = icon;
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

            const rect = icon.getBoundingClientRect();
            offset.x = clientX - rect.left;
            offset.y = clientY - rect.top;

            // Visual feedback
            icon.style.position = 'fixed';
            icon.style.zIndex = '1000';
            icon.style.width = rect.width + 'px';
            icon.style.pointerEvents = 'none'; // Allow detection of elements underneath
            icon.classList.add('dragging');
            
            updatePosition(clientX, clientY);
        };

        const updatePosition = (x, y) => {
            if (!activeItem) return;
            activeItem.style.left = (x - offset.x) + 'px';
            activeItem.style.top = (y - offset.y) + 'px';
        };

        const onMove = (e) => {
            if (!activeItem) return;
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            updatePosition(clientX, clientY);
        };

        const endDrag = (e) => {
            if (!activeItem) return;

            const clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
            const clientY = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;

            // Check if dropped on dock
            const dockRect = dock.getBoundingClientRect();
            const isOverDock = (
                clientX > dockRect.left &&
                clientX < dockRect.right &&
                clientY > dockRect.top &&
                clientY < dockRect.bottom
            );

            // Reset styles
            activeItem.style.position = '';
            activeItem.style.left = '';
            activeItem.style.top = '';
            activeItem.style.width = '';
            activeItem.style.zIndex = '';
            activeItem.style.pointerEvents = 'auto';
            activeItem.classList.remove('dragging');

            if (isOverDock) {
                dock.appendChild(activeItem);
            } else {
                desktop.appendChild(activeItem);
            }

            activeItem = null;
        };

        // Desktop Events
        icon.addEventListener('mousedown', startDrag);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', endDrag);

        // Mobile Events
        icon.addEventListener('touchstart', startDrag, { passive: false });
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', endDrag);
    });
}
