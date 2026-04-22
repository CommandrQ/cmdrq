document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const fadeOverlay = document.getElementById('fade-overlay');

    startBtn.addEventListener('click', () => {
        // 1. Trigger the Slice Animation
        startBtn.classList.add('slicing');

        // 2. Short delay before the screen fades
        setTimeout(() => {
            fadeOverlay.classList.add('active');
        }, 300);

        // 3. Logic to redirect to menu.html after animations
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1200);
    });
});
