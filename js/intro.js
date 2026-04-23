document.addEventListener('DOMContentLoaded', () => {
    const initBtn = document.getElementById('initiate-btn');
    const statusText = document.querySelector('.status-text');
    const lockIcon = document.getElementById('lock-icon');
    const purpleBurst = document.querySelector('.purple-burst');
    const bootContainer = document.querySelector('.boot-container');

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
            initBtn.style.animation = "fadeIn 0.5s forwards";
        }
    }, 700);

    // Initialize & Trigger Animations
    initBtn.addEventListener('click', () => {
        // Log the visit so they skip this next time
        localStorage.setItem('musubi_access_granted', 'true');
        
        // 1. Swap icon to UNLOCKED padlock
        if (lockIcon) {
            lockIcon.innerHTML = '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>';
        }

        // 2. Animate Button and Text
        initBtn.classList.add('unlocking');
        statusText.innerText = "ACCESS GRANTED. NEURAL LINK OPEN.";

        // 3. Trigger the Purple Shockwave
        purpleBurst.classList.add('active');

        // 4. Fade out the glass container as the light overtakes it
        setTimeout(() => {
            bootContainer.classList.add('vanishing');
        }, 300);

        // 5. Warp to menu.html after the animation completes
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1400); // 1.4 seconds gives the explosion time to cover the screen
    });
});
