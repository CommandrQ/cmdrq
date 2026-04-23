document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('intro-overlay');
    const initBtn = document.getElementById('initiate-btn');
    const statusText = document.querySelector('.status-text');
    const hideout = document.getElementById('hideout-ui');

    // Start boot sequence
    const statuses = [
        "ESTABLISHING SECURE PROTOCOL...",
        "DECRYPTING MUSUBI_CORES...",
        "NEURAL LINK: READY."
    ];

    let i = 0;
    const interval = setInterval(() => {
        statusText.innerText = statuses[i];
        i++;
        if(i >= statuses.length) {
            clearInterval(interval);
            initBtn.style.display = "block";
        }
    }, 800);

    // Initialize Hideout
    initBtn.addEventListener('click', () => {
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
            hideout.classList.remove('hidden');
        }, 1200);
    });
});
