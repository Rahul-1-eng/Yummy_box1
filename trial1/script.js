/* --- 1. INTRO VIDEO LOGIC WITH FASTER TIMERS --- */
const video = document.getElementById('intro-video');
const introLayer = document.getElementById('intro-layer');
const authLayer = document.getElementById('auth-layer');
const cssFallback = document.getElementById('css-fallback');
const loaderStatus = document.getElementById('loader-status');

function endIntro() {
    if(introLayer.style.opacity === '0') return; // Already triggered
    introLayer.style.opacity = '0';
    introLayer.style.visibility = 'hidden';
    setTimeout(() => {
        introLayer.style.display = 'none';
        authLayer.style.display = 'flex'; // Show Auth
    }, 500); // Faster transition (0.5s)
    if(video) video.pause();
}

function triggerCssAnimation() {
    console.log("Video failed. Using CSS fallback.");
    loaderStatus.style.display = 'none';
    if(video) video.style.display = 'none';
    cssFallback.style.display = 'block';

    // Create CSS Particles
    const box = cssFallback.querySelector('.box-3d');
    for(let i=0; i<30; i++) {
        let fry = document.createElement('div');
        fry.className = 'fry-particle';
        let angle = Math.random() * Math.PI * 2;
        let velocity = Math.random() * 200 + 100;
        let tx = Math.cos(angle) * velocity;
        let ty = Math.sin(angle) * velocity;
        fry.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random()*360}deg)`;
        fry.style.transition = 'all 1s ease-out 0.8s';
        box.appendChild(fry);
        
        setTimeout(() => {
            fry.style.opacity = '1';
            fry.style.transform = `translate(${tx * 1.5}px, ${ty * 1.5}px) rotate(${Math.random()*360}deg)`;
        }, 100);
    }
    // End intro after CSS anim finishes (Faster: 1.5s)
    setTimeout(endIntro, 1500);
}

// --- Video Event Listeners ---
if(video) {
    video.addEventListener('canplay', () => {
        video.classList.add('active');
        video.play().catch(e => {
            // Autoplay blocked -> Fallback
            triggerCssAnimation();
        });
    });

    video.addEventListener('ended', endIntro);
    
    video.addEventListener('error', triggerCssAnimation);

    // Faster Stall Check: If not playing after 2.5s -> Fallback
    setTimeout(() => {
        if(video.currentTime < 0.1) triggerCssAnimation();
    }, 2500);
} else {
    triggerCssAnimation();
}


/* --- 2. MOUSE TRACKING & DYNAMIC HUE --- */
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Percentage for Spotlight
    const xPct = (x / window.innerWidth) * 100;
    const yPct = (y / window.innerHeight) * 100;

    // Dynamic Hue Calculation (0 to 360) based on X position
    const hue = Math.floor((x / window.innerWidth) * 360);

    // Update Global Vars
    document.documentElement.style.setProperty('--x', `${xPct}%`);
    document.documentElement.style.setProperty('--y', `${yPct}%`);
    document.documentElement.style.setProperty('--hue', hue);

    const card = document.getElementById('auth-card');
    if(card && authLayer.style.display === 'flex') {
        const rect = card.getBoundingClientRect();
        const cardX = x - rect.left;
        const cardY = y - rect.top;
        card.style.setProperty('--x', `${cardX}px`);
        card.style.setProperty('--y', `${cardY}px`);
    }
});

/* --- 3. AUTH LOGIC --- */
function toggleAuth(target) {
    const login = document.getElementById('login-form');
    const signup = document.getElementById('signup-form');
    if(target === 'signup') {
        login.classList.remove('active');
        setTimeout(() => signup.classList.add('active'), 100);
    } else {
        signup.classList.remove('active');
        setTimeout(() => login.classList.add('active'), 100);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const auth = document.getElementById('auth-layer');
    const app = document.getElementById('app-layer');
    const deliveryContainer = document.getElementById('delivery-celebration');
    const scooter = document.getElementById('scooter');
    
    const btn = e.target.querySelector('.chef-btn');
    btn.innerText = "Authenticating...";
    
    // Trigger Delivery Animation
    if(deliveryContainer && scooter) {
        deliveryContainer.style.display = 'block';
        // Force reflow
        void scooter.offsetWidth; 
        scooter.classList.add('drive');
    }

    setTimeout(() => {
        auth.style.opacity = '0';
        setTimeout(() => {
            auth.style.display = 'none';
            app.style.display = 'block';
        }, 500);
    }, 1500);
}

/* --- 4. APP DATA & LOGIC --- */
const menuData = [
    { id: 1, name: "Truffle Burger", category: "burger", price: 18.00, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000" },
    { id: 2, name: "Spicy Pepperoni", category: "pizza", price: 22.50, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000" },
    { id: 3, name: "Dragon Roll", category: "asian", price: 16.00, img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000" },
    { id: 4, name: "Double Cheeseburger", category: "burger", price: 15.00, img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000" },
    { id: 5, name: "Molten Cake", category: "dessert", price: 12.00, img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000" },
    { id: 6, name: "Pad Thai", category: "asian", price: 14.50, img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1000" },
];

const cart = [];

function renderMenu(items) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = items.map(item => `
        <div class="food-card">
            <img src="${item.img}" class="card-img" alt="${item.name}">
            <div class="card-info">
                <div class="card-header">
                    <span class="card-title">${item.name}</span>
                    <span class="card-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="card-desc">Premium ingredients, freshly prepared to order.</p>
                <button class="add-btn" onclick="addToCart(${item.id})">
                    <i class="fas fa-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function filterMenu(cat, element) {
    document.querySelectorAll('.cat-pill').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    if(cat === 'all') { renderMenu(menuData); } 
    else { renderMenu(menuData.filter(item => item.category === cat)); }
}

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('open');
}

function addToCart(id) {
    const item = menuData.find(i => i.id === id);
    cart.push(item);
    updateCartUI();
    toggleCart();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const countBadge = document.getElementById('cart-count');
    const totalDisplay = document.getElementById('cart-total');
    
    countBadge.innerText = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = `$${total.toFixed(2)}`;
    
    if(cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#555; margin-top:50px;">Your cart is empty.</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" class="item-img">
            <div class="item-details">
                <h4>${item.name}</h4>
                <span class="item-price">$${item.price.toFixed(2)}</span>
            </div>
        </div>
    `).join('');
}

/* --- 5. CONFETTI --- */
const canvas = document.getElementById('confetti-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.triggerConfetti = function() {
        for(let i=0; i<80; i++) {
            particles.push({
                x: window.innerWidth / 2, y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 0.5) * 15,
                size: Math.random() * 6 + 4, color: `hsl(${Math.random() * 50 + 10}, 100%, 50%)`,
                life: 100, grav: 0.3
            });
        }
        animateConfetti();
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.x += p.vx; p.y += p.vy; p.vy += p.grav; p.life--;
            ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size);
            if(p.life <= 0 || p.y > canvas.height) particles.splice(i, 1);
        }
        if(particles.length > 0) requestAnimationFrame(animateConfetti);
    }
}

window.addEventListener('load', () => { renderMenu(menuData); });