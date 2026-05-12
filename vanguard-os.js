/**
 * VANGUARD_OS SYSTEM ENGINE
 * 
 * Features:
 * - 3D Warp Starfield (Pocket Universe movement)
 * - Real-time Localized Date (Top-Left) & Clock (Top-Right)
 * - Interactive Module Hooks
 */

document.addEventListener('DOMContentLoaded', () => {
    initWarpStars();
    startSystemClock();
    initModuleListeners();
});

/**
 * 1. POCKET UNIVERSE WARP ENGINE
 * Generates stars that radiate from the center toward the viewer.
 */
function initWarpStars() {
    const container = document.getElementById('star-field');
    const starCount = 150; // Balanced for performance and density

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random starting positions (0 to 100% of viewport)
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let size = Math.random() * 2 + 0.5; // Random star sizes
        let duration = Math.random() * 3 + 2; // Speed of travel
        let delay = Math.random() * 5; // Staggered entry

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        /**
         * Keyframe Logic:
         * 0%   - Center/Deep space, nearly invisible
         * 50%  - Moving toward edges, becoming brighter
         * 100% - Flying past the "camera", large and transparent
         */
        star.animate([
            { transform: 'translate(0, 0) scale(0.5)', opacity: 0 },
            { transform: `translate(${(x - 50) * 0.5}px, ${(y - 50) * 0.5}px) scale(1.2)`, opacity: 0.8, offset: 0.5 },
            { transform: `translate(${(x - 50) * 2}px, ${(y - 50) * 2}px) scale(2.5)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            delay: delay * 1000,
            easing: 'ease-in'
        });

        container.appendChild(star);
    }
}

/**
 * 2. HUD TIME & DATE ENGINE
 * Syncs with the user's browser locale and time zone.
 */
function startSystemClock() {
    const clockElement = document.getElementById('system-clock');
    const dateElement = document.getElementById('system-date');

    const updateHUD = () => {
        const now = new Date();
        
        // Time format: HH:MM:SS (24-hour tactical display)
        if (clockElement) {
            clockElement.innerText = now.toLocaleTimeString([], { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
        }

        // Date format: WEEKDAY, MON DD, YYYY
        if (dateElement) {
            dateElement.innerText = now.toLocaleDateString([], { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            }).toUpperCase();
        }
    };

    // Update every second
    setInterval(updateHUD, 1000);
    
    // Run immediately so HUD isn't blank on load
    updateHUD();
}

/**
 * 3. MODULE NAVIGATION
 * Standard event listeners for the dashboard icons.
 */
function initModuleListeners() {
    const icons = document.querySelectorAll('.app-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const moduleName = icon.dataset.label;
            
            // Visual feedback on click
            icon.style.transform = 'scale(0.9)';
            setTimeout(() => icon.style.transform = '', 100);
            
            console.log(`[SYSTEM]: Accessing ${moduleName} module...`);
            
            /** 
             * NARRATIVE GATEWAY: 
             * You can add logic here to open modals or redirect to specific pages:
             * if(moduleName === 'WarRoom') window.location.href = 'warroom.html';
             */
        });
    });
}
