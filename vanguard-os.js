/* vanguard-os.js */
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initAppLogic();
});

function initStars() {
    const container = document.getElementById('star-field');
    const count = 150;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random drift animation
        star.animate([
            { transform: 'translateY(0)' },
            { transform: `translateY(${Math.random() * -50 - 20}px)` }
        ], {
            duration: Math.random() * 5000 + 5000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
        
        container.appendChild(star);
    }
}

function initAppLogic() {
    const icons = document.querySelectorAll('.app-icon');
    const dock = document.querySelector('.vanguard-dock');
    const desktop = document.querySelector('.desktop-grid');

    icons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            // Logic to move icon
            if (icon.parentElement.classList.contains('desktop-grid')) {
                dock.appendChild(icon);
            } else {
                desktop.appendChild(icon);
            }
            // Flash effect on move
            icon.animate([{ opacity: 0.5 }, { opacity: 1 }], { duration: 300 });
        });

        // Click to "Open" (Placeholder)
        icon.addEventListener('click', (e) => {
            if (e.detail === 1) {
                console.log(`Accessing ${icon.dataset.label} module...`);
                // Add your window opening logic here
            }
        });
    });
}
