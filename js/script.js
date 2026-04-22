document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const mainUI = document.getElementById('main-ui');
    const fadeOverlay = document.getElementById('fade-overlay');

    startBtn.addEventListener('click', () => {
        // Discipline: Execute the sequence precisely
        
        // 1. Add shake to the window and slice to the button
        mainUI.classList.add('shaking');
        startBtn.classList.add('slicing');

        // 2. Physical Feedback: Brief delay before the void consumes the screen
        setTimeout(() => {
            fadeOverlay.classList.add('active');
        }, 400);

        // 3. System Redirect
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1400);
    });
});
