'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- SUB-COMPONENTS (Defined locally to ensure single-file compilation) ---

// 1. LOGIN FORM COMPONENT
interface LoginFormProps {
  onLogin: (e: React.FormEvent) => void;
  onSwitchToSignup: () => void;
  onSwitchToForgot: () => void;
}

const LoginForm = ({ onLogin, onSwitchToSignup, onSwitchToForgot }: LoginFormProps) => {
  return (
    <div className="auth-form-box active">
      <div className="brand-header">
        <div className="logo-wrapper">
          <h3><i className="fas fa-box-open"></i> Yummy Box.</h3>
          <div className="scooter-orbit-track">
            <div className="scooter-mini">🛵💨</div>
          </div>
        </div>
        <div className="sensory-lick">
          <div className="tongue-shape"></div>
          <div className="drool-drop"></div>
        </div>
      </div>

      <div className="social-buttons">
        <button className="social-btn google-btn" type="button"><i className="fab fa-google"></i> Google</button>
        <button className="social-btn apple-btn" type="button"><i className="fab fa-apple"></i> Apple</button>
      </div>

      <div className="divider">OR</div>

      <form onSubmit={onLogin}>
        <div className="input-wrap">
          <input type="email" required placeholder=" " />
          <label>Email</label>
        </div>
        <div className="input-wrap">
          <input type="password" required placeholder=" " />
          <label>Password</label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-10px', marginBottom: '20px' }}>
          <span
            onClick={onSwitchToForgot}
            style={{ color: '#888', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'none' }}
          >
            Forgot Password?
          </span>
        </div>

        <button className="chef-btn" type="submit">Log In</button>
      </form>
      <div className="footer-link">
        Not a member? <span onClick={onSwitchToSignup}>Sign Up Now</span>
      </div>
    </div>
  );
};

// 2. SIGNUP FORM COMPONENT
interface SignupFormProps {
  onSignup: (e: React.FormEvent) => void;
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onSignup, onSwitchToLogin }: SignupFormProps) => {
  return (
    <div className="auth-form-box active">
      <div className="brand-header">
        <h3>Join Us.</h3>
      </div>
      <form onSubmit={onSignup}>
        <div className="input-wrap">
          <input type="text" required placeholder=" " />
          <label>Name</label>
        </div>
        <div className="input-wrap">
          <input type="email" required placeholder=" " />
          <label>Email</label>
        </div>
        <div className="input-wrap">
          <input type="password" required placeholder=" " />
          <label>Create Password</label>
        </div>
        <button className="chef-btn" type="submit">Get Started</button>
      </form>
      <div className="footer-link">
        Have an account? <span onClick={onSwitchToLogin}>Log In</span>
      </div>
    </div>
  );
};

// 3. FORGOT PASSWORD FORM COMPONENT
interface ForgotPasswordFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToLogin: () => void;
}

const ForgotPasswordForm = ({ onSubmit, onSwitchToLogin }: ForgotPasswordFormProps) => {
  return (
    <div className="auth-form-box active">
      <div className="brand-header">
        <div className="logo-wrapper">
          <h3>Recover.</h3>
        </div>
      </div>
      <p style={{ color: '#aaa', marginBottom: '25px', fontSize: '0.9rem', textAlign: 'center' }}>
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form onSubmit={onSubmit}>
        <div className="input-wrap">
          <input type="email" required placeholder=" " />
          <label>Email Address</label>
        </div>
        <button className="chef-btn" type="submit">Send Reset Link</button>
      </form>
      <div className="footer-link">
        Remembered it? <span onClick={onSwitchToLogin}>Back to Log In</span>
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---
export default function YummyBox() {
  // --- STATE MANAGEMENT ---
  const [stage, setStage] = useState<'intro' | 'auth' | 'app'>('intro');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hue, setHue] = useState(0);

  // --- REFS ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  // --- MENU DATA ---
  const menuData = [
    { id: 1, name: "Truffle Burger", category: "burger", price: 18.00, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000" },
    { id: 2, name: "Spicy Pepperoni", category: "pizza", price: 22.50, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000" },
    { id: 3, name: "Dragon Roll", category: "asian", price: 16.00, img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000" },
    { id: 4, name: "Double Cheeseburger", category: "burger", price: 15.00, img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000" },
    { id: 5, name: "Molten Cake", category: "dessert", price: 12.00, img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000" },
    { id: 6, name: "Pad Thai", category: "asian", price: 14.50, img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1000" },
  ];

  // --- EFFECTS ---

  // 1. Inject FontAwesome & Google Fonts
  useEffect(() => {
    const linkFA = document.createElement('link');
    linkFA.rel = 'stylesheet';
    linkFA.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(linkFA);

    const linkFonts = document.createElement('link');
    linkFonts.rel = 'stylesheet';
    linkFonts.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(linkFonts);
  }, []);

  // 2. Mouse Tracking for Spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth) * 100;
      const yPct = (e.clientY / window.innerHeight) * 100;
      const newHue = Math.floor((e.clientX / window.innerWidth) * 360);
      
      setHue(newHue);
      document.documentElement.style.setProperty('--x', `${xPct}%`);
      document.documentElement.style.setProperty('--y', `${yPct}%`);
      document.documentElement.style.setProperty('--hue', newHue.toString());
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Intro Video Logic
  useEffect(() => {
    if (stage === 'intro') {
      const vid = videoRef.current;
      const timer = setTimeout(() => {
        // Fallback if video doesn't play or end fast enough
        handleIntroEnd();
      }, 3500); 

      if (vid) {
        vid.onended = () => handleIntroEnd();
        vid.play().catch(() => {
          // Autoplay failed, likely browser policy, just skip to CSS anim
        });
      }
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // --- HANDLERS ---
  const handleIntroEnd = () => {
    setStage('auth');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const btn = (e.target as HTMLFormElement).querySelector('button');
    if(btn) btn.innerText = "Authenticating...";
    
    setTimeout(() => {
      setStage('app');
      triggerConfetti();
    }, 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = (e.target as HTMLFormElement).querySelector('button');
    if(btn) btn.innerText = "Sending...";
    
    // Simulate email sending
    setTimeout(() => {
        alert("If an account matches, a reset link has been sent!");
        setAuthMode('login');
    }, 1500);
  };

  const addToCart = (item: any) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };

  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles: any[] = [];
    for(let i=0; i<80; i++) {
      particles.push({
        x: window.innerWidth / 2, y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 0.5) * 15,
        size: Math.random() * 6 + 4, color: `hsl(${Math.random() * 50 + 10}, 100%, 50%)`,
        life: 100, grav: 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += p.grav; p.life--;
        ctx.fillStyle = p.color; 
        ctx.fillRect(p.x, p.y, p.size, p.size);
        if(p.life <= 0 || p.y > canvas.height) particles.splice(i, 1);
      }
      if(particles.length > 0) requestAnimationFrame(animate);
    }
    animate();
  };

  // --- RENDER HELPERS ---
  const filteredMenu = activeCategory === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="main-wrapper">
      {/* 1. INTRO LAYER */}
      {stage === 'intro' && (
        <div id="intro-layer">
          <video 
            ref={videoRef} 
            id="intro-video" 
            muted 
            playsInline 
            className="active"
          >
            {/* Note: In Next.js, put static assets in the 'public' folder */}
            <source src="/French_Fries_Box_Animation_Logo.mp4" type="video/mp4" />
          </video>
          
          <div id="css-fallback">
             <div className="box-3d">
                <div className="face front">Y</div>
                <div className="face back"></div>
                <div className="face left"></div>
                <div className="face right"></div>
                <div className="face bottom"></div>
             </div>
          </div>
          <div className="loader-text">Loading Experience...</div>
        </div>
      )}

      {/* 2. AUTH LAYER */}
      {stage === 'auth' && (
        <div id="auth-layer">
          <div className="auth-card" id="auth-card">
            <div className="spotlight-layer"></div>
            
            <div className="auth-visual">
              <div className="visual-text">
                <h2>Pure.<br/><span>Crave.</span></h2>
              </div>
            </div>

            <div className="auth-form-container">
              {authMode === 'login' && (
                <LoginForm 
                    onLogin={handleAuthSubmit} 
                    onSwitchToSignup={() => setAuthMode('signup')}
                    onSwitchToForgot={() => setAuthMode('forgot')}
                />
              )}
              
              {authMode === 'signup' && (
                <SignupForm 
                    onSignup={handleAuthSubmit} 
                    onSwitchToLogin={() => setAuthMode('login')} 
                />
              )}

              {authMode === 'forgot' && (
                <ForgotPasswordForm 
                    onSubmit={handleForgotSubmit} 
                    onSwitchToLogin={() => setAuthMode('login')} 
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN APP LAYER */}
      {stage === 'app' && (
        <div id="app-layer">
           <nav>
              <div className="logo"><i className="fas fa-box-open"></i> Yummy Box</div>
              <ul className="nav-links">
                 <li><a href="#" className="active">Home</a></li>
                 <li><a href="#">Menu</a></li>
                 <li><a href="#">Offers</a></li>
              </ul>
              <div className="nav-actions">
                 <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cart.length}</span>
                 </div>
                 <div className="user-avatar">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="User" />
                 </div>
              </div>
           </nav>

           <section className="hero">
              <div className="hero-content">
                 <h1>Hungry?<br/><span>We got you.</span></h1>
                 <p>Premium meals from top-tier chefs delivered to your doorstep in minutes.</p>
                 <button className="chef-btn" style={{width: 'auto', padding: '15px 40px'}}>Explore Menu</button>
              </div>
           </section>

           <div className="categories">
              {['all', 'burger', 'pizza', 'asian', 'dessert'].map(cat => (
                <span 
                  key={cat} 
                  className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
              ))}
           </div>

           <div className="menu-grid">
              {filteredMenu.map(item => (
                 <div className="food-card" key={item.id}>
                    <img src={item.img} className="card-img" alt={item.name} />
                    <div className="card-info">
                       <div className="card-header">
                          <span className="card-title">{item.name}</span>
                          <span className="card-price">${item.price.toFixed(2)}</span>
                       </div>
                       <button className="add-btn" onClick={() => addToCart(item)}>
                          <i className="fas fa-plus"></i> Add
                       </button>
                    </div>
                 </div>
              ))}
           </div>

           {/* Cart Drawer */}
           <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
              <div className="cart-header">
                 <h3>Your Order</h3>
                 <i className="fas fa-times" style={{cursor:'pointer'}} onClick={() => setIsCartOpen(false)}></i>
              </div>
              <div className="cart-items">
                 {cart.length === 0 ? (
                    <p style={{textAlign:'center', color:'#555', marginTop:'50px'}}>Your cart is empty.</p>
                 ) : (
                    cart.map((item, idx) => (
                       <div className="cart-item" key={idx}>
                          <img src={item.img} className="item-img" />
                          <div className="item-details">
                             <h4>{item.name}</h4>
                             <span className="item-price">${item.price.toFixed(2)}</span>
                          </div>
                       </div>
                    ))
                 )}
              </div>
              <div className="cart-total">
                 <div className="total-row">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                 </div>
                 <button className="chef-btn">Checkout</button>
              </div>
           </div>

           <canvas ref={confettiCanvasRef} id="confetti-canvas" style={{pointerEvents:'none', position:'fixed', top:0, left:0, zIndex:9999}}></canvas>
        </div>
      )}

      {/* --- GLOBAL CSS --- */}
      <style>{`
        :root {
          --primary: #ff4757;
          --primary-dark: #d32f2f;
          --accent: #ffa502;
          --dark: #1e1e1e;
          --black: #000000;
          --white: #ffffff;
          --x: 50%;
          --y: 50%;
          --hue: 0;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Poppins', sans-serif;
          background-color: var(--black);
          color: var(--white);
          overflow-x: hidden;
          background-image: radial-gradient(circle at var(--x) var(--y), hsl(var(--hue), 60%, 15%) 0%, #000000 60%);
          transition: background-image 0.1s ease;
        }

        /* --- INTRO --- */
        #intro-layer {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: #000; z-index: 9999;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
        }
        #intro-video {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          object-fit: cover; z-index: 1;
        }
        .loader-text {
          position: relative; z-index: 10; color: #fff; letter-spacing: 4px;
          text-transform: uppercase; margin-top: 20px; animation: pulse 0.8s infinite;
        }
        @keyframes pulse { 50% { opacity: 0.5; } }

        /* --- AUTH --- */
        #auth-layer {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 5000;
          display: flex; align-items: center; justify-content: center;
          background: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070') no-repeat center center;
          background-size: cover;
          animation: fadeIn 0.8s ease-out;
        }
        #auth-layer::before {
          content: ''; position: absolute; top:0; left:0; width:100%; height:100%;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
        }
        .auth-card {
          position: relative; width: 1000px; height: 650px;
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          display: flex; overflow: hidden;
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.9);
        }
        .spotlight-layer {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(800px circle at var(--x) var(--y), hsla(var(--hue), 80%, 60%, 0.15), transparent 40%);
          pointer-events: none; z-index: 1;
        }
        .auth-visual {
          flex: 0.9;
          background: url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069') center/cover;
          position: relative; display: flex; align-items: flex-end; padding: 40px;
        }
        .auth-visual::after {
          content: ''; position: absolute; top:0; left:0; width:100%; height:100%;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent 60%);
        }
        .visual-text { position: relative; z-index: 2; transform: translateY(-20px); }
        .visual-text h2 { font-family: 'Playfair Display', serif; font-size: 3.5rem; line-height: 1; text-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .visual-text span { color: var(--primary); font-style: italic; }

        .auth-form-container { flex: 1.1; padding: 40px 60px; position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; }
        .auth-form-box { width: 100%; max-width: 380px; display: flex; flex-direction: column; animation: slideIn 0.5s; }
        
        .brand-header h3 { 
          font-family: 'Playfair Display', serif; font-size: 2.8rem; 
          background: linear-gradient(to right, #fff, var(--primary), var(--accent));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        
        .social-buttons { display: flex; gap: 10px; margin-bottom: 20px; }
        .social-btn { flex:1; padding: 12px; border-radius: 12px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 500; }
        .google-btn { background: #fff; color: #333; }
        .apple-btn { background: #000; color: #fff; border: 1px solid #333; }
        
        .divider { display: flex; align-items: center; gap: 10px; color: #666; margin: 20px 0; font-size: 0.8rem; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }

        .input-wrap { position: relative; margin-bottom: 20px; }
        .input-wrap input {
          width: 100%; padding: 14px 20px; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          outline: none; color: #fff; transition: 0.3s;
        }
        .input-wrap input:focus { border-color: hsl(var(--hue), 80%, 60%); }
        .input-wrap label { position: absolute; left: 20px; top: 14px; color: #888; pointer-events: none; transition: 0.3s; font-size: 0.95rem; }
        .input-wrap input:focus ~ label, .input-wrap input:not(:placeholder-shown) ~ label { 
          top: -10px; left: 10px; font-size: 0.75rem; color: hsl(var(--hue), 80%, 60%); background: #111; padding: 0 5px;
        }
        
        .chef-btn {
          width: 100%; padding: 16px; background: var(--primary); color: #fff;
          border: none; border-radius: 12px; font-size: 1.05rem; font-weight: 600;
          cursor: pointer; transition: 0.3s; box-shadow: 0 10px 30px rgba(255, 71, 87, 0.3);
        }
        .chef-btn:hover { background: var(--primary-dark); transform: translateY(-2px); }
        .footer-link { margin-top: 25px; text-align: center; color: #666; font-size: 0.9rem; }
        .footer-link span { color: #fff; cursor: pointer; text-decoration: underline; }

        /* --- APP --- */
        #app-layer { animation: fadeIn 0.8s ease-out; }
        nav {
          position: fixed; top: 0; left: 0; width: 100%; padding: 20px 50px;
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 1000;
        }
        .nav-links { display: flex; gap: 30px; list-style: none; }
        .nav-links a { color: #fff; text-decoration: none; }
        .nav-links a.active { color: var(--primary); }
        .nav-actions { display: flex; gap: 20px; align-items: center; }
        .cart-icon { position: relative; cursor: pointer; font-size: 1.2rem; }
        .badge { position: absolute; top: -8px; right: -8px; background: var(--primary); width: 18px; height: 18px; border-radius: 50%; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; }
        .user-avatar { width: 35px; height: 35px; background: #333; border-radius: 50%; overflow: hidden; }
        .user-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .hero {
          height: 80vh; display: flex; align-items: center; padding: 0 50px;
          background: linear-gradient(90deg, #000 30%, transparent), url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981') center/cover fixed;
        }
        .hero h1 { font-family: 'Playfair Display'; font-size: 4.5rem; line-height: 1.1; margin-bottom: 20px; }
        .hero span { color: var(--primary); }
        
        .categories { padding: 50px; overflow-x: auto; white-space: nowrap; }
        .cat-pill {
          display: inline-block; padding: 10px 25px; margin-right: 15px;
          background: #222; border-radius: 30px; cursor: pointer; transition: 0.3s;
        }
        .cat-pill.active { background: var(--primary); }

        .menu-grid {
          padding: 0 50px 100px 50px; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;
        }
        .food-card {
          background: #151515; border-radius: 20px; overflow: hidden; transition: 0.3s; border: 1px solid rgba(255,255,255,0.05);
        }
        .food-card:hover { transform: translateY(-10px); border-color: var(--primary); }
        .card-img { height: 200px; width: 100%; object-fit: cover; }
        .card-info { padding: 20px; }
        .card-header { display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: 600; }
        .card-price { color: var(--primary); }
        .add-btn { width: 100%; padding: 12px; background: #222; color: white; border: none; border-radius: 10px; cursor: pointer; transition: 0.2s; }
        .add-btn:hover { background: var(--primary); }

        .cart-drawer {
          position: fixed; top: 0; right: -400px; width: 380px; height: 100%;
          background: #1a1a1a; z-index: 2000; padding: 30px; box-shadow: -10px 0 30px rgba(0,0,0,0.8);
          transition: 0.4s cubic-bezier(0.77, 0, 0.175, 1); display: flex; flex-direction: column;
        }
        .cart-drawer.open { right: 0; }
        .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px solid #333; padding-bottom: 20px; }
        .cart-items { flex: 1; overflow-y: auto; }
        .cart-item { display: flex; gap: 15px; margin-bottom: 20px; }
        .item-img { width: 60px; height: 60px; border-radius: 10px; object-fit: cover; }
        .cart-total { padding-top: 20px; border-top: 1px solid #333; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 1.2rem; font-weight: 700; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        @media (max-width: 900px) {
          .auth-card { width: 95%; flex-direction: column; height: auto; }
          .auth-visual { height: 200px; flex: none; }
          .auth-form-container { padding: 40px 20px; }
          .hero h1 { font-size: 3rem; }
          .menu-grid { padding: 20px; }
          .cart-drawer { width: 100%; right: -100%; }
        }
      `}</style>
    </div>
  );
}
