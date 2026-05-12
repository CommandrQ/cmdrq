/**
 * VANGUARD_OS SYSTEM LOGIC
 * Corrected Scoping & Pathing
 */
const VanguardOS = (() => {
    const supabaseUrl = 'https://dvyjupytbwbrcoyouxpf.supabase.co';
    const supabaseKey = 'sb_publishable_wjgbPekKmodd5mSDXIeUeg_Wq73GzOk';
    let supabase = null;
    if (window.supabase) supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    // PERSISTENT STATE
    let currentPostId = null;

    // --- STARFIELD ENGINE ---
    const setupStarfield = () => {
        const container = document.getElementById('star-field');
        if (!container) return;
        container.innerHTML = ''; 
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 50 + 50; 
            const duration = (Math.random() * 8 + 4) * 1000;
            star.style.left = `50%`; star.style.top = `50%`;
            star.style.width = `2px`; star.style.height = `2px`;
            star.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { opacity: 1, offset: 0.2 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}vw), calc(-50% + ${Math.sin(angle) * velocity}vh)) scale(2.5)`, opacity: 0 }
            ], { duration: duration, iterations: Infinity, easing: 'linear', delay: -Math.random() * duration });
            container.appendChild(star);
        }
    };

    // --- HUD RENDERER ---
    const renderApps = () => {
        const dashboard = document.getElementById('app-dashboard');
        if (!dashboard) return;
        dashboard.innerHTML = '';
        // Note: Using absolute paths (/) to ensure icons work from any subfolder
        const apps = [
            { name: "About", path: "/about.html", glyph: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
            { name: "Dreamscape", path: "/dreamscape.html", glyph: "M11.1,12.08C8.77,7.57,10.6,3.6,11.63,2.01C6.27,2.2,1.98,6.59,1.98,12c0,0.14,0.02,0.28,0.02,0.42 C2.62,12.15,3.29,12,4,12c1.66,0,3.18,0.83,4.1,2.15C9.77,14.63,11,16.17,11,18c0,1.52-0.87,2.83-2.12,3.51 c0.98,0.32,2.03,0.5,3.11,0.5c5.52,0,10-4.48,10-10C22,7.92,17.27,4.44,11.1,12.08z" },
            { name: "Music", path: "/music.html", glyph: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" },
            { name: "Journal", path: "/journal/index.html", glyph: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" },
            { name: "Profile", path: "/profile.html", glyph: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
            { name: "TikTok", path: "https://www.tiktok.com/@commandr_q", glyph: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" }
        ];

        apps.forEach(app => {
            const btn = document.createElement('a');
            btn.className = 'app-icon';
            btn.href = app.path.startsWith('http') ? "#" : app.path;
            if (app.path.startsWith('http')) {
                btn.onclick = (e) => { 
                    e.preventDefault(); 
                    const modal = document.getElementById('social-modal');
                    if(modal) {
                        modal.style.display = 'flex';
                        document.getElementById('modal-link').href = app.path;
                    }
                };
            }
            btn.innerHTML = `
                <div class="icon-box">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="var(--color-blue)">
                        <path d="${app.glyph}"/>
                    </svg>
                </div>
                <span>${app.name}</span>
            `;
            dashboard.appendChild(btn);
        });
    };

    // --- MODAL & DATA FUNCTIONS ---
    const openBlogModal = (title, content, id) => {
        currentPostId = id;
        document.getElementById('blog-modal-title').textContent = title;
        document.getElementById('blog-modal-content').innerHTML = content;
        document.getElementById('blog-modal').style.display = 'flex';
    };

    const closeModals = () => document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        closeModals();
        const shareModal = document.getElementById('share-confirm-modal');
        if(shareModal) shareModal.style.display = 'flex';
    };

    const handleReplyClick = async () => {
        if (!supabase) return;
        const { data: { session } } = await supabase.auth.getSession();
        closeModals();
        if (session) {
            document.getElementById('reply-name').value = session.user.user_metadata.full_name || '';
            document.getElementById('reply-email').value = session.user.email || '';
            document.getElementById('reply-modal').style.display = 'flex';
        } else {
            document.getElementById('auth-modal').style.display = 'flex';
        }
    };

    const submitAuth = async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const pass = document.getElementById('auth-pass').value;
        const name = document.getElementById('auth-name').value;
        const isLogin = document.getElementById('auth-submit-btn').textContent === "Login";
        let res = isLogin ? await supabase.auth.signInWithPassword({ email, password: pass }) : await supabase.auth.signUp({ email, password: pass, options: { data: { full_name: name } } });
        if (res.error) alert(res.error.message); 
        else handleReplyClick(); 
    };

    const submitReply = async (e) => {
        e.preventDefault();
        const { data: { session } } = await supabase.auth.getSession();
        if(!session) return;
        const { error } = await supabase.from('Blogreplies').insert([{
            post_id: currentPostId,
            uuid: session.user.id,
            full_name: document.getElementById('reply-name').value,
            email: document.getElementById('reply-email').value,
            message: document.getElementById('reply-text').value
        }]);
        if (error) alert(error.message);
        else { alert("Signal Transmitted."); closeModals(); }
    };

    const toggleAuthMode = () => {
        const btn = document.getElementById('auth-submit-btn');
        const nameGrp = document.getElementById('name-group');
        if (btn.textContent === "Register") { btn.textContent = "Login"; nameGrp.style.display = 'none'; }
        else { btn.textContent = "Register"; nameGrp.style.display = 'block'; }
    };

    // EXPOSE TO GLOBAL
    return {
        init: () => { setupStarfield(); renderApps(); },
        openBlogModal,
        closeModals,
        handleShare,
        handleReplyClick,
        submitAuth,
        submitReply,
        toggleAuthMode
    };
})();

document.addEventListener('DOMContentLoaded', VanguardOS.init);
