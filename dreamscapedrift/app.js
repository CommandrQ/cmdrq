document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('tapeGrid');
    const player = document.getElementById('videoPlayer');
    const placeholder = document.getElementById('placeholder');
    const deck = document.getElementById('mainDeck');

    // 1. Fetch the data from the JSON file
    fetch('videos.json')
        .then(response => {
            if (!response.ok) throw new Error("Signal Lost: Could not load JSON.");
            return response.json();
        })
        .then(data => {
            buildGrid(data);
        })
        .catch(error => {
            console.error(error);
            placeholder.innerHTML = `<h2 style="color: #ff6b6b;">SIGNAL LOST</h2><p>Unable to retrieve data cores.</p>`;
        });

    // 2. Build the Grid dynamically
    function buildGrid(videos) {
        videos.forEach((video, index) => {
            const card = document.createElement('div');
            card.className = 'tape';
            
            // Stagger the animation delay for a beautiful cascading load effect
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="tape-title">${video.title}</div>
                <div class="tape-dur">${video.duration}</div>
            `;
            
            card.onclick = () => loadVideo(video.id);
            grid.appendChild(card);
        });
    }

    // 3. Glitch & Load Logic
    function loadVideo(videoId) {
        // Trigger the glitch animation on the deck container
        deck.classList.remove('glitching'); // Reset if clicked rapidly
        void deck.offsetWidth; // Trigger DOM reflow
        deck.classList.add('glitching');

        // Hide iframe and show placeholder briefly during the "glitch"
        player.style.display = 'none';
        placeholder.style.display = 'block';
        placeholder.innerHTML = `<h2 style="color: var(--light-blue);">PHASING SIGNAL...</h2>`;

        // Wait for the glitch animation to hit its peak, then swap the video
        setTimeout(() => {
            player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
            player.style.display = 'block';
            placeholder.style.display = 'none';
            
            // Remove the glitch class so it can be re-triggered later
            setTimeout(() => {
                deck.classList.remove('glitching');
            }, 200); 

        }, 250); // Swaps at 250ms (mid-glitch)
    }
});
