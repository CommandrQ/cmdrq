document.addEventListener('DOMContentLoaded', () => {
    const intelBtn = document.getElementById('intel-trigger');
    const aboutModal = document.getElementById('about-modal');
    const closeBtn = document.getElementById('close-modal');

    // Open Intel Window
    intelBtn.addEventListener('click', () => {
        aboutModal.classList.add('open');
    });

    // Close Intel Window
    closeBtn.addEventListener('click', () => {
        aboutModal.classList.remove('open');
    });

    // Close if clicking outside the glass
    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.classList.remove('open');
        }
    });
});
