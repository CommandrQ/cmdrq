document.addEventListener('DOMContentLoaded', () => {
    const btnWrapper = document.getElementById('btn-wrapper');
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
            btnWrapper.style.display = "inline-block";
            btnWrapper.style.animation = "fadeIn 0.5s forwards";
        }
    }, 700);

    // Slice Animation & Redirect
    initBtn.addEventListener('click', () => {
        // Log the visit so they skip this next time
        localStorage.setItem('musubi_access_granted', 'true');
        
        statusText.innerText = "ACCESS GRANTED. REDIRECTING...";

        // 1. Create top half, bottom half, and laser flash
        const topClone = initBtn.cloneNode(true);
        const btmClone = initBtn.cloneNode(true);
        const flashLine = document.createElement('div');

        // 2. Assign animation classes
        topClone.className = 'neon-btn slice-top';
        btmClone.className = 'neon-btn slice-bottom';
        flashLine.className = 'slice-flash';

        // 3. Strip IDs from clones to prevent HTML duplication issues
        topClone.removeAttribute('id');
        btmClone.removeAttribute('id');

        // 4. Hide original button and append clones
        initBtn.style.opacity = '0';
        btnWrapper.appendChild(topClone);
        btnWrapper.appendChild(btmClone);
        btnWrapper.appendChild(flashLine);

        // 5. Warp to menu.html after the slice animation finishes
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1200); 
    });
});
