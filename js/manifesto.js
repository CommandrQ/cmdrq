document.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the 'fade-in' class
    const faders = document.querySelectorAll('.fade-in');

    // Trigger the visibility class after a tiny delay for a boot-up feel
    setTimeout(() => {
        faders.forEach(fader => {
            fader.classList.add('visible');
        });
    }, 100);

    // Optional: Add a subtle parallax effect to the floating window based on mouse movement
    const windowEl = document.getElementById('manifesto-window');
    
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        windowEl.style.transform = `translateY(0px) perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset transform when mouse leaves to keep the float animation smooth
    document.addEventListener('mouseleave', () => {
        windowEl.style.transform = `translateY(0px) perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    });
});
