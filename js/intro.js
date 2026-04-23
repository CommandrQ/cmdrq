document.addEventListener('DOMContentLoaded', () => {
    const initBtn = document.getElementById('initiate-btn');
    const statusText = document.querySelector('.status-text');

    const statuses = [
        "BOOTING MUSUBI_OS...",
        "DECRYPTING NEURAL PROTOCOLS...",
        "MAPPING HIDEOUT COORDINATES...",
        "NEURAL LINK: ESTABLISHED."
    ];

    let i = 0;
    const interval = setInterval(() => {
        statusText.innerText = statuses[i];
        i++;
        if(i >= statuses.length) {
            clearInterval(interval);
            initBtn.style.display = "flex";
            // Add a subtle entrance animation to the button
            initBtn.style.animation = "fadeIn 0.5s forwards";
        }
    }, 700);

    // Initialize & Set LocalStorage
    initBtn.addEventListener('click', () => {
        // Log the visit so they skip this next time
        localStorage.setItem('musubi_access_granted', 'true');
        
        // Visual feedback
        statusText.innerText = "ACCESS GRANTED. REDIRECTING...";
        initBtn.style.opacity = "0.5";
        initBtn.disabled = true;

        // Warp to menu.html
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 800);
    });
});
