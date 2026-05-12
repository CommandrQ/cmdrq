/**
 * VANGUARD_OS SYSTEM LOGIC
 */
const VanguardOS = (() => {
    const supabaseUrl = 'https://dvyjupytbwbrcoyouxpf.supabase.co';
    const supabaseKey = 'sb_publishable_wjgbPekKmodd5mSDXIeUeg_Wq73GzOk';
    let supabase = null;
    if (window.supabase) supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    let currentPostId = null;

    // --- STARFIELD ENGINE (Persistent & Radiating) ---
    const setupStarfield = () => {
        const container = document.getElementById('star-field');
        if (!container) return;
        container.innerHTML = ''; // Clear for fresh load
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
            ], { 
                duration: duration, 
                iterations: Infinity, 
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
                delay: -Math.random() * duration // Continuous movement fix
            });
            container.appendChild(star);
        }
    };

    const openBlogModal = (title, content, id) => {
        currentPostId = id;
        const titleEl = document.getElementById('blog-modal-title');
        const contentEl = document.getElementById('blog-modal-content');
        if (titleEl) titleEl.textContent = title;
        if (contentEl) contentEl.innerHTML = content;
        document.getElementById('blog-modal').style.display = 'flex';
    };

    const closeModals = () => document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        closeModals();
        document.getElementById('share-confirm-modal').style.display = 'flex';
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

    return { 
        openBlogModal, closeModals, handleShare, handleReplyClick, submitAuth, submitReply, toggleAuthMode,
        init: () => { setupStarfield(); } 
    };
})();

document.addEventListener('DOMContentLoaded', VanguardOS.init);
