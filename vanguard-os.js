/**
 * VANGUARD_OS SYSTEM ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
    initWarpStars();
    startSystemClock();
});

function initWarpStars() {
    const container = document.getElementById('star-field');
    if (!container) return;
    
    const starCount = 160;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let size = Math.random() * 2 + 0.5;
        let duration = Math.random() * 4 + 2;
        let delay = Math.random() * 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 0 },
            { transform: `translate(${(x - 50) * 8}px, ${(y - 50) * 8}px) scale(1)`, opacity: 1, offset: 0.4 },
            { transform: `translate(${(x - 50) * 20}px, ${(y - 50) * 20}px) scale(2.5)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            delay: delay * 1000,
            easing: 'ease-in'
        });

        container.appendChild(star);
    }
}

function startSystemClock() {
    const clockElement = document.getElementById('system-clock');
    const dateElement = document.getElementById('system-date');

    const updateHUD = () => {
        const now = new Date();
        
        if (clockElement) {
            clockElement.innerText = now.toLocaleTimeString([], { 
                hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
            });
        }

        if (dateElement) {
            dateElement.innerText = now.toLocaleDateString([], { 
                weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
            }).toUpperCase();
        }
    };

    setInterval(updateHUD, 1000);
    updateHUD();
}
