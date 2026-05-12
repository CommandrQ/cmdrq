/* vanguard-os.js */
document.addEventListener('DOMContentLoaded', () => {
    initWarpStars();
    startSystemClock();
    
    // Simple Navigation Logic
    const icons = document.querySelectorAll('.app-icon');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const module = icon.dataset.label;
            console.log(`Accessing ${module}...`);
            // Add your specific redirection or modal logic here
        });
    });
});

// 1. ANIMATED WARP STARS (Pocket Universe Engine)
function initWarpStars() {
    const container = document.getElementById('star-field');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let size = Math.random() * 2 + 1;
        let duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.animate([
            { transform: 'translateZ(0) scale(1)', opacity: 0.3 },
            { transform: `translate(${(x-50)*0.5}px, ${(y-50)*0.5}px) scale(1.5)`, opacity: 1 },
            { transform: `translate(${(x-50)*1.2}px, ${(y-50)*1.2}px) scale(2)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            delay: Math.random() * 5000,
            easing: 'ease-in'
        });

        container.appendChild(star);
    }
}

// 2. REAL-TIME LOCAL CLOCK & DATE
function startSystemClock() {
    const clockElement = document.getElementById('system-clock');
    const dateElement = document.getElementById('system-date');

    const update = () => {
        const now = new Date();
        
        // Time format: HH:MM:SS
        clockElement.innerText = now.toLocaleTimeString([], { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });

        // Date format: DAY, MON DD, YYYY
        dateElement.innerText = now.toLocaleDateString([], { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }).toUpperCase();
    };

    setInterval(update, 1000);
    update();
}
