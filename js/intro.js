document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const btnText = document.getElementById('btn-text');
    const animeWindow = document.getElementById('anime-window');

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    enterBtn.addEventListener('click', async () => {
        // Log access
        localStorage.setItem('musubi_access_granted', 'true');
        
        // Lock button
        enterBtn.style.pointerEvents = 'none';
        enterBtn.style.background = 'transparent';
        enterBtn.style.borderColor = 'transparent';
        enterBtn.style.boxShadow = 'none';

        // Get text and split into letters
        const textContent = btnText.innerText;
        btnText.innerHTML = ''; 

        // Apply rising animation to each letter
        textContent.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char; 
            span.className = 'glitching-letter';
            span.style.animationDelay = `${i * 0.05}s`; // Stagger effect
            btnText.appendChild(span);
        });

        // Wait for letters to rise
        await delay(1000);

        // Dissolve the anime window
        animeWindow.style.opacity = '0';
        animeWindow.style.transform = 'scale(1.1)';
        animeWindow.style.filter = 'blur(20px)';

        // Warp to menu
        await delay(1000);
        window.location.href = 'menu.html';
    });
});
