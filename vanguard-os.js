/* vanguard-os.js */
document.addEventListener('DOMContentLoaded', () => {
    initWarpStars();
    startSystemClock();
});

// Warp Speed Starfield Engine
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
            { transform: 'translateZ(0) scale(1)', opacity: 0.2 },
            { transform: `translate(${(x-50)*0.5}px, ${(y-50)*0.5}px) scale(1.5)`, opacity: 0.8 },
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

// System Time & Date Management
function startSystemClock() {
    const clockElement = document.getElementById('system-clock');
    const dateElement = document.getElementById('system-date');

    const update = () => {
        const now = new Date();
        
        clockElement.innerText = now.toLocaleTimeString([], { 
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
        });

        dateElement.innerText = now.toLocaleDateString([], { 
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
        }).toUpperCase();
    };

    setInterval(update, 1000);
    update();
}
