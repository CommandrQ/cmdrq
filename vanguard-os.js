/**
 * VANGUARD_OS SYSTEM LOGIC
 * Powered by Supabase
 */

const VanguardOS = (() => {
    // --- SUPABASE INIT (With Safety Net) ---
    const supabaseUrl = 'https://dvyjupytbwbrcoyouxpf.supabase.co';
    const supabaseKey = 'sb_publishable_wjgbPekKmodd5mSDXIeUeg_Wq73GzOk';
    let supabase = null;
    
    if (window.supabase) {
        supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    } else {
        console.error("Vanguard_OS Error: Supabase connection missing. Visuals will load, but data transfer is offline.");
    }

    const appsConfig = [
        { name: "About Me", path: "about.html", glyph: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
        { name: "Dreamscape", path: "dreamscape.html", glyph: "M11.1,12.08C8.77,7.57,10.6,3.6,11.63,2.01C6.27,2.2,1.98,6.59,1.98,12c0,0.14,0.02,0.28,0.02,0.42 C2.62,12.15,3.29,12,4,12c1.66,0,3.18,0.83,4.1,2.15C9.77,14.63,11,16.17,11,18c0,1.52-0.87,2.83-2.12,3.51 c0.98,0.32,2.03,0.5,3.11,0.5c5.52,0,10-4.48,10-10C22,7.92,17.27,4.44,11.1,12.08z" },
        { name: "Music", path: "music.html", glyph: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" },
        { name: "Journal", path: "blog.html", glyph: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" },
        { name: "Profile", path: "profile.html", glyph: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }, 
        { name: "TikTok", path: "https://www.tiktok.com/@commandr_q", glyph: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" }
    ];

    const init = () => {
        renderApps();
        setupStarfield();
        if (supabase) checkProfileStatus();
    };

    const renderApps = () => {
        const dashboard = document.getElementById('app-dashboard');
        if (!dashboard) return;
        appsConfig.forEach(app => {
            const appElement = document.createElement('a');
            appElement.className = 'app-icon';
            if (app.path.startsWith('http')) {
                appElement.addEventListener('click', (e) => { 
                    e.preventDefault(); 
                    document.getElementById('social-modal').style.display = 'flex'; 
                    document.getElementById('modal-link').href = app.path;
                });
            } else {
                appElement.href = app.path;
            }
            appElement.innerHTML = `<div class="icon-box"><svg class="glyph" viewBox="0 0 24 24"><path d="${app.glyph}"/></svg></div><span>${app.name}</span>`;
            dashboard.appendChild(appElement);
        });
    };

    const setupStarfield = () => {
        const container = document.getElementById('star-field');
        if (!container) return;
        const starCount = 200;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 50 + 50; 
            const duration = (Math.random() * 8 + 4) * 1000;
            star.style.left = `50%`; star.style.top = `50%`;
            star.style.width = star.style.height = `2px`;
            star.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { opacity: 1, offset: 0.2 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}vw), calc(-50% + ${Math.sin(angle) * velocity}vh)) scale(2.5)`, opacity: 0 }
            ], { duration: duration, iterations: Infinity, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', delay: -Math.random() * duration });
            container.appendChild(star);
        }
    };

    let currentPostId = null;

    const openBlogModal = (title, content, id) => {
        currentPostId = id;
        document.getElementById('blog-modal-title').textContent = title;
        document.getElementById('blog-modal-content').innerHTML = content;
        document.getElementById('blog-modal').style.display = 'flex';
    };

    const closeModals = () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
    };

    const handleShare = () => {
        alert("Link copied to clipboard! (In production, this copies the URL)");
    };

    const handleReplyClick = async () => {
        if (!supabase) return alert("Database connection offline.");
        const { data: { session } } = await supabase.auth.getSession();
        closeModals();
        if (session) {
            document.getElementById('reply-modal').style.display = 'flex';
        } else {
            document.getElementById('auth-modal').style.display = 'flex';
        }
    };

    const submitAuth = async (e) => {
        e.preventDefault();
        if (!supabase) return;
        const email = document.getElementById('auth-email').value;
        const pass = document.getElementById('auth-pass').value;
        const name = document.getElementById('auth-name') ? document.getElementById('auth-name').value : '';
        const isLogin = document.getElementById('auth-submit-btn').textContent === "Login";

        let error;
        if (isLogin) {
            const res = await supabase.auth.signInWithPassword({ email, password: pass });
            error = res.error;
        } else {
            const res = await supabase.auth.signUp({ email, password: pass, options: { data: { full_name: name } } });
            error = res.error;
        }

        if (error) {
            alert(error.message);
        } else {
            closeModals();
            document.getElementById('reply-modal').style.display = 'flex'; 
        }
    };

    const submitReply = async (e) => {
        e.preventDefault();
        if (!supabase) return;
        const msg = document.getElementById('reply-text').value;
        const { data: { session } } = await supabase.auth.getSession();
        
        if(!session) return;

        const { error } = await supabase.from('Blogreplies').insert([{
            post_id: currentPostId, 
            uuid: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata.full_name || 'Citizen',
            message: msg 
        }]);

        if (error) {
            alert("Comm-Link Error: " + error.message);
            console.error(error); 
        } else {
            alert("Signal received. Your reply has been logged.");
            document.getElementById('reply-text').value = '';
            closeModals();
        }
    };

    const toggleAuthMode = () => {
        const nameGroup = document.getElementById('name-group');
        const btn = document.getElementById('auth-submit-btn');
        const toggleText = document.getElementById('auth-toggle-text');
        
        if (btn.textContent === "Register") {
            if(nameGroup) nameGroup.style.display = 'none';
            btn.textContent = "Login";
            toggleText.innerHTML = `Need clearance? <a href="#" onclick="VanguardOS.toggleAuthMode()">Register here</a>`;
        } else {
            if(nameGroup) nameGroup.style.display = 'block';
            btn.textContent = "Register";
            toggleText.innerHTML = `Already registered? <a href="#" onclick="VanguardOS.toggleAuthMode()">Login here</a>`;
        }
    };

    const checkProfileStatus = async () => {
        if (!supabase) return;
        const profileStatus = document.getElementById('profile-status');
        if(!profileStatus) return;

        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            profileStatus.innerHTML = `Welcome, <strong>${session.user.user_metadata.full_name || 'Citizen'}</strong>.<br>Comms are active.<br><span style="font-size:0.8rem; opacity:0.7;">${session.user.email}</span>`;
            document.getElementById('profile-login-form').style.display = 'none';
            document.getElementById('profile-logout-btn').style.display = 'block';
        } else {
            profileStatus.innerHTML = "No active signal. Please identify yourself.";
            document.getElementById('profile-login-form').style.display = 'block';
            document.getElementById('profile-logout-btn').style.display = 'none';
        }
    };

    const wipeCache = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        alert("Cache wiped. Cookies cleared. Signal terminated.");
        window.location.reload();
    };

    return { 
        init, closeModals, openBlogModal, handleShare, handleReplyClick, 
        submitAuth, toggleAuthMode, submitReply, checkProfileStatus, wipeCache, supabase 
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => VanguardOS.init(), 100); 
});
