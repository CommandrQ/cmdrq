/* VANGUARD_OS // WARP ENGINE V2.1 */
const canvas = document.getElementById('starfield-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 400;
    const speed = 4;

    function initStarfield() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width - canvas.width / 2,
                y: Math.random() * canvas.height - canvas.height / 2,
                z: Math.random() * canvas.width
            });
        }
    }

    function animateStarfield() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);

        for (let i = 0; i < numStars; i++) {
            let s = stars[i];
            let x = s.x / (s.z / canvas.width);
            let y = s.y / (s.z / canvas.width);
            let size = (1 - s.z / canvas.width) * 2.5;

            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();

            s.z -= speed;
            if (s.z <= 0) s.z = canvas.width;
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        requestAnimationFrame(animateStarfield);
    }

    window.addEventListener('resize', initStarfield);
    initStarfield();
    animateStarfield();
}
