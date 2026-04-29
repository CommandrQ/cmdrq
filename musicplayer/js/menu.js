function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-engine', {
        height: '100%',
        width: '100%',
        playerVars: { 
            'listType': 'playlist', 
            'autoplay': 1,
            'controls': 1, // Set to 1 so you can adjust volume on mobile
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': (event) => {
                console.log("HUD Engine: Online");
                // On mobile, autoplay is often blocked until first interaction
            }
        }
    });
}
