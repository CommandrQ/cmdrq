const btn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');

btn.addEventListener('click', () => {
    // 1. Trigger the slice animation
    btn.classList.add('sliced');
    
    // 2. Short delay for the "slice" to be seen
    setTimeout(() => {
        overlay.classList.add('fade-out');
    }, 300);

    // 3. Redirect to menu.html after the screen is black
    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 1100);
});
