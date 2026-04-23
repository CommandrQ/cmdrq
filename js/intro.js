document.addEventListener('DOMContentLoaded', () => {
    const initiateBtn = document.getElementById('initiate-btn');
    const btnText = document.getElementById('btn-text');
    const glassWindow = document.getElementById('glass-window');

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    initiateBtn.addEventListener('click', async () => {
        // Log the visit to bypass next time
        localStorage.setItem('musubi_access_granted', 'true');
        
        // 1. Lock the button so it can't be clicked twice
        initiateBtn.style.pointerEvents = 'none';

        // 2. Extract text and split into individual letters
        const textContent = btnText.innerText;
        btnText.innerHTML = ''; // Clear the button

        // 3. Rebuild the text with individual animation spans
        textContent.split('').forEach((char, i) => {
            const span = document.createElement('span');
            // Preserve spaces
            span.innerText = char === ' ' ? '\u00A0' : char; 
            span.className = 'glitching-letter';
            // Stagger the animation so they rise in a wave
            span.style.animationDelay = `${i * 0.05}s`;
            btnText.appendChild(span);
        });

        // 4. Wait for the letters to finish floating away (approx 1.2s)
        await delay(1200);

        // 5. Smoothly dissolve the dark glass window
        glassWindow.style.opacity = '0';
        glassWindow.style.filter = 'blur(10px)';
        glassWindow.style.transform = 'scale(1.05)';

        // 6. Warp to the menu after the glass fades
        await delay(1200);
        window.location.href = 'menu.html';
    });
});
