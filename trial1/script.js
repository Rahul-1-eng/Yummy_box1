/* --- 1. VIDEO INTRO LOGIC --- */
const video = document.getElementById('intro-video');
const videoOverlay = document.getElementById('video-overlay');
const mainStage = document.getElementById('main-stage');

// Function to handle transition from Video -> UI
function endIntro() {
    videoOverlay.classList.add('hidden');
    mainStage.classList.add('visible');
    
    // Stop video to save resources
    setTimeout(() => {
        video.pause();
    }, 1000);
}

// Event Listener: When video finishes, switch to UI
video.addEventListener('ended', endIntro);

// Fallback: In case video fails to autoplay
setTimeout(() => {
    // Check if video is playing, if not, force intro end
    if (video.paused && !videoOverlay.classList.contains('hidden')) {
       // endIntro(); // Optional: uncomment if you want auto-skip on error
    }
}, 5000);


/* --- 2. MOUSE TRACKING FOR SPOTLIGHT EFFECT --- */
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Update Body Background Spotlight
    const xPct = (x / window.innerWidth) * 100;
    const yPct = (y / window.innerHeight) * 100;

    document.body.style.setProperty('--x', `${xPct}%`);
    document.body.style.setProperty('--y', `${yPct}%`);

    // Update Internal Card Spotlight
    const card = document.getElementById('glass-card');
    const rect = card.getBoundingClientRect();
    const cardX = x - rect.left;
    const cardY = y - rect.top;

    card.style.setProperty('--x', `${cardX}px`);
    card.style.setProperty('--y', `${cardY}px`);
});


/* --- 3. FORM SWITCHING LOGIC --- */
function switchForm(target) {
    const login = document.getElementById('login-box');
    const signup = document.getElementById('signup-box');

    if(target === 'signup') {
        login.classList.remove('active');
        setTimeout(() => signup.classList.add('active'), 200);
    } else {
        signup.classList.remove('active');
        setTimeout(() => login.classList.add('active'), 200);
    }
}


/* --- 4. CONFETTI (Celebration) --- */
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function triggerConfetti() {
    for(let i=0; i<80; i++) {
        particles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.5) * 15,
            size: Math.random() * 6 + 4,
            color: `hsl(${Math.random() * 50 + 10}, 100%, 50%)`, // Oranges/Reds
            life: 100,
            grav: 0.3
        });
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.grav;
        p.life--;
        
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        
        if(p.life <= 0 || p.y > canvas.height) {
            particles.splice(i, 1);
        }
    }
    
    if(particles.length > 0) requestAnimationFrame(animateConfetti);
}