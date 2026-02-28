import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

  :root {
    --green-deep:   #1a2e1e;
    --green-mid:    #2d4a34;
    --green-light:  #4a7c59;
    --green-pale:   #8fbc8f;
    --cream:        #f5f0e8;
    --cream-dark:   #e8e0d0;
    --gold:         #c8a96e;
    --gold-light:   #e8c98e;
    --text-dark:    #1a2e1e;
    --text-mid:     #4a5a4e;
    --text-light:   #8a9a8e;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-dark); overflow-x: hidden; cursor: none; }

  .cursor {
    position: fixed; width: 12px; height: 12px; background: var(--green-deep);
    border-radius: 50%; pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease, background 0.3s ease;
  }
  .cursor-ring {
    position: fixed; width: 40px; height: 40px; border: 1.5px solid var(--green-mid);
    border-radius: 50%; pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease;
  }

  body::before {
    content: ''; position: fixed; inset: 0; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9997;
  }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.5rem 3rem;
    background: rgba(245, 240, 232, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(26, 46, 30, 0.08);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 900;
    letter-spacing: 0.25em; color: var(--green-deep); text-decoration: none;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
    text-decoration: none; color: var(--text-mid); font-weight: 500; transition: color 0.3s; cursor: none;
  }
  .nav-links a:hover { color: var(--green-deep); }
  .cart-btn {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--green-deep); color: var(--cream);
    padding: 0.6rem 1.4rem; border: none;
    font-family: 'DM Sans', sans-serif; font-size: 0.78rem;
    letter-spacing: 0.1em; text-transform: uppercase; cursor: none;
    transition: background 0.3s, transform 0.2s;
  }
  .cart-btn:hover { background: var(--green-light); transform: translateY(-1px); }
  .cart-count {
    background: var(--gold); color: var(--green-deep); font-size: 0.65rem;
    font-weight: 700; width: 18px; height: 18px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
  }

  .hero {
    min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
    padding-top: 80px; position: relative; overflow: hidden;
  }
  .hero-left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 8rem 4rem 8rem 5rem; position: relative; z-index: 2;
  }
  .hero-tag {
    font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem;
    opacity: 0; animation: fadeUp 0.8s 0.2s forwards;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.5rem, 6vw, 6rem); line-height: 0.95;
    font-weight: 900; color: var(--green-deep); margin-bottom: 2rem;
    opacity: 0; animation: fadeUp 0.8s 0.4s forwards;
  }
  .hero-title em { font-style: italic; color: var(--green-light); }
  .hero-desc {
    font-size: 1rem; line-height: 1.7; color: var(--text-mid);
    max-width: 380px; margin-bottom: 2.5rem;
    opacity: 0; animation: fadeUp 0.8s 0.6s forwards;
  }
  .hero-actions {
    display: flex; gap: 1rem; align-items: center;
    opacity: 0; animation: fadeUp 0.8s 0.8s forwards;
  }
  .btn-primary {
    background: var(--green-deep); color: var(--cream);
    padding: 0.9rem 2.2rem; border: none;
    font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
    letter-spacing: 0.1em; text-transform: uppercase; cursor: none;
    text-decoration: none; display: inline-block;
    transition: background 0.3s, transform 0.2s, color 0.3s;
    position: relative; overflow: hidden;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0; background: var(--gold);
    transform: translateX(-101%); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); z-index: -1;
  }
  .btn-primary:hover::after { transform: translateX(0); }
  .btn-primary:hover { color: var(--green-deep); transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: var(--green-deep);
    padding: 0.9rem 2.2rem; border: 1.5px solid var(--green-deep);
    font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
    letter-spacing: 0.1em; text-transform: uppercase; cursor: none;
    text-decoration: none; transition: background 0.3s, color 0.3s, transform 0.2s;
  }
  .btn-outline:hover { background: var(--green-deep); color: var(--cream); transform: translateY(-2px); }

  .hero-right { position: relative; overflow: hidden; }
  .hero-plant-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 70% 30%, rgba(74,124,89,0.4) 0%, transparent 60%),
      radial-gradient(ellipse at 30% 80%, rgba(45,74,52,0.5) 0%, transparent 50%),
      linear-gradient(160deg, #2d4a34 0%, #1a2e1e 100%);
  }
  .hero-leaves { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
  .hero-leaves svg { width: 100%; height: 100%; opacity: 0; animation: fadeIn 1.2s 0.5s forwards; }
  .hero-badge {
    position: absolute; bottom: 3rem; left: 3rem;
    background: var(--cream); padding: 1.2rem 1.5rem;
    font-size: 0.72rem; letter-spacing: 0.08em; color: var(--text-mid);
    border-left: 3px solid var(--gold);
    opacity: 0; animation: fadeUp 0.8s 1s forwards;
  }
  .hero-badge strong {
    display: block; font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-weight: 700; color: var(--green-deep); letter-spacing: 0;
  }

  .marquee-strip { background: var(--green-deep); color: var(--cream); padding: 1rem 0; overflow: hidden; white-space: nowrap; }
  .marquee-inner { display: inline-flex; animation: marquee 28s linear infinite; }
  .marquee-item { font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0 2.5rem; color: var(--cream); opacity: 0.7; }
  .marquee-dot { color: var(--gold); opacity: 1 !important; }

  section { padding: 7rem 5rem; }
  .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 4rem; }
  .section-label { font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.6rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 700; line-height: 1.1; color: var(--green-deep); }
  .section-title em { font-style: italic; color: var(--green-light); }

  .categories { background: var(--cream); }
  .cat-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1.5rem; }
  .cat-card { position: relative; overflow: hidden; cursor: none; }
  .cat-card-inner { aspect-ratio: 4/5; position: relative; overflow: hidden; }
  .cat-card:first-child .cat-card-inner { aspect-ratio: 4/6; }
  .cat-bg { position: absolute; inset: 0; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
  .cat-card:hover .cat-bg { transform: scale(1.06); }
  .cat-bg-1 { background: radial-gradient(ellipse at 50% 80%, #4a7c59 0%, #2d4a34 40%, #1a2e1e 100%); }
  .cat-bg-2 { background: radial-gradient(ellipse at 50% 60%, #6b9e5e 0%, #3d6b45 40%, #2d4a34 100%); }
  .cat-bg-3 { background: radial-gradient(ellipse at 50% 50%, #8fbc8f 0%, #5a8a62 40%, #2d4a34 100%); }
  .cat-plant-svg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
  .cat-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,46,30,0.9) 0%, transparent 50%); }
  .cat-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; z-index: 2; }
  .cat-name { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: var(--cream); margin-bottom: 0.3rem; }
  .cat-count { font-size: 0.72rem; letter-spacing: 0.1em; color: var(--gold-light); text-transform: uppercase; }

  .products { background: var(--cream-dark); }
  .product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  .product-card { background: var(--cream); position: relative; cursor: none; transition: transform 0.3s ease; }
  .product-card:hover { transform: translateY(-6px); }
  .product-card:nth-child(2) { margin-top: 3rem; }
  .product-card:nth-child(4) { margin-top: 1.5rem; }
  .product-img { aspect-ratio: 3/4; position: relative; overflow: hidden; }
  .product-img-bg { position: absolute; inset: 0; transition: transform 0.6s ease; }
  .product-card:hover .product-img-bg { transform: scale(1.05); }
  .p-bg-1 { background: linear-gradient(145deg, #c8e6c9 0%, #81c784 30%, #4a7c59 100%); }
  .p-bg-2 { background: linear-gradient(145deg, #a5d6a7 0%, #388e3c 40%, #1b5e20 100%); }
  .p-bg-3 { background: linear-gradient(145deg, #dcedc8 0%, #8bc34a 40%, #558b2f 100%); }
  .p-bg-4 { background: linear-gradient(145deg, #e8f5e9 0%, #66bb6a 40%, #2e7d32 100%); }
  .product-tag {
    position: absolute; top: 1rem; left: 1rem;
    background: var(--gold); color: var(--green-deep);
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.3rem 0.7rem;
  }
  .product-wishlist {
    position: absolute; top: 1rem; right: 1rem;
    width: 34px; height: 34px; background: var(--cream); border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: none; opacity: 0; transform: translateY(-4px);
    transition: opacity 0.3s, transform 0.3s, background 0.2s;
  }
  .product-card:hover .product-wishlist { opacity: 1; transform: translateY(0); }
  .product-wishlist:hover { background: var(--gold); }
  .product-quick {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: var(--green-deep); color: var(--cream);
    padding: 0.75rem; text-align: center; font-size: 0.72rem;
    letter-spacing: 0.12em; text-transform: uppercase; border: none; cursor: none;
    transform: translateY(100%); transition: transform 0.3s ease, background 0.2s;
  }
  .product-card:hover .product-quick { transform: translateY(0); }
  .product-quick:hover { background: var(--green-light); }
  .product-info { padding: 1.2rem; }
  .product-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: var(--green-deep); margin-bottom: 0.25rem; }
  .product-latin { font-size: 0.72rem; color: var(--text-light); font-style: italic; margin-bottom: 0.8rem; }
  .product-meta { display: flex; align-items: center; justify-content: space-between; }
  .product-price { font-size: 1.1rem; font-weight: 500; color: var(--green-mid); }
  .product-price .old { font-size: 0.8rem; text-decoration: line-through; color: var(--text-light); margin-right: 0.5rem; }
  .product-stars { color: var(--gold); font-size: 0.7rem; letter-spacing: 0.05em; }
  .product-care { display: flex; gap: 0.5rem; margin-top: 0.8rem; }
  .care-pill { font-size: 0.6rem; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.2rem 0.6rem; border: 1px solid var(--cream-dark); color: var(--text-light); }

  .feature-banner { padding: 0; display: grid; grid-template-columns: 1fr 1fr; min-height: 60vh; }
  .feature-img { background: radial-gradient(ellipse at 40% 60%, #4a7c59 0%, #2d4a34 50%, #0d1a10 100%); position: relative; overflow: hidden; }
  .feature-img svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .feature-content { background: var(--green-deep); padding: 6rem 5rem; display: flex; flex-direction: column; justify-content: center; }
  .feature-content .section-label { color: var(--gold-light); opacity: 0.8; }
  .feature-content .section-title { color: var(--cream); }
  .feature-content p { color: rgba(245,240,232,0.65); line-height: 1.7; margin: 1.5rem 0 2.5rem; max-width: 400px; font-size: 0.95rem; }
  .feature-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3rem; }
  .feature-list li { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: rgba(245,240,232,0.8); }
  .feature-list li::before { content: ''; width: 24px; height: 1px; background: var(--gold); flex-shrink: 0; }

  .testimonials { background: var(--cream); }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
  .testi-card { padding: 2.5rem; border: 1px solid rgba(26,46,30,0.1); position: relative; transition: border-color 0.3s, transform 0.3s; }
  .testi-card:hover { border-color: var(--gold); transform: translateY(-4px); }
  .testi-card:nth-child(2) { margin-top: 2.5rem; }
  .testi-quote { font-family: 'Playfair Display', serif; font-size: 3rem; color: var(--gold); line-height: 0.5; margin-bottom: 1rem; }
  .testi-text { font-size: 0.9rem; line-height: 1.75; color: var(--text-mid); font-style: italic; margin-bottom: 1.5rem; }
  .testi-author { display: flex; align-items: center; gap: 0.75rem; }
  .testi-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--green-pale); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 0.9rem; font-weight: 700; color: var(--green-deep); }
  .testi-name { font-weight: 500; font-size: 0.85rem; color: var(--green-deep); }
  .testi-loc { font-size: 0.72rem; color: var(--text-light); }

  .newsletter { background: var(--green-deep); padding: 6rem 5rem; text-align: center; position: relative; overflow: hidden; }
  .newsletter::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, rgba(74,124,89,0.3) 0%, transparent 70%); }
  .newsletter-content { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
  .newsletter .section-label { color: var(--gold); display: block; margin-bottom: 0.6rem; }
  .newsletter-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 700; color: var(--cream); margin-bottom: 1rem; }
  .newsletter p { color: rgba(245,240,232,0.6); margin-bottom: 2.5rem; font-size: 0.9rem; line-height: 1.7; }
  .newsletter-form { display: flex; max-width: 460px; margin: 0 auto; }
  .newsletter-form input { flex: 1; background: rgba(245,240,232,0.08); border: 1px solid rgba(245,240,232,0.2); color: var(--cream); padding: 0.9rem 1.2rem; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; outline: none; transition: border-color 0.3s; }
  .newsletter-form input::placeholder { color: rgba(245,240,232,0.4); }
  .newsletter-form input:focus { border-color: var(--gold); }
  .newsletter-form button { background: var(--gold); color: var(--green-deep); padding: 0.9rem 1.8rem; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: none; white-space: nowrap; transition: background 0.3s; }
  .newsletter-form button:hover { background: var(--gold-light); }

  footer { background: #0f1a11; padding: 5rem 5rem 2rem; color: rgba(245,240,232,0.5); }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; padding-bottom: 4rem; border-bottom: 1px solid rgba(245,240,232,0.08); }
  .footer-brand .nav-logo { display: block; margin-bottom: 1rem; color: var(--cream); }
  .footer-brand p { font-size: 0.85rem; line-height: 1.7; max-width: 260px; margin-bottom: 1.5rem; }
  .footer-socials { display: flex; gap: 0.75rem; }
  .social-btn { width: 36px; height: 36px; border: 1px solid rgba(245,240,232,0.15); display: flex; align-items: center; justify-content: center; color: rgba(245,240,232,0.5); font-size: 0.8rem; text-decoration: none; transition: border-color 0.3s, color 0.3s, background 0.3s; cursor: none; }
  .social-btn:hover { border-color: var(--gold); color: var(--gold); background: rgba(200,169,110,0.1); }
  .footer-col h4 { font-family: 'Playfair Display', serif; font-size: 0.9rem; font-weight: 700; color: var(--cream); margin-bottom: 1.5rem; letter-spacing: 0.05em; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
  .footer-col a { font-size: 0.82rem; color: rgba(245,240,232,0.45); text-decoration: none; transition: color 0.3s; cursor: none; }
  .footer-col a:hover { color: var(--gold); }
  .footer-bottom { display: flex; align-items: center; justify-content: space-between; font-size: 0.72rem; letter-spacing: 0.05em; }
  .footer-bottom a { color: rgba(245,240,232,0.3); text-decoration: none; }
  .footer-bottom a:hover { color: var(--gold); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }

  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
`;

const products = [
  {
    bg: "p-bg-1", tag: "New", name: "Monstera Albo",
    latin: "Monstera deliciosa 'Albo Variegata'", price: "$148.00", stars: "★★★★★",
    care: ["Low Light", "Weekly Water"],
    svg: (
      <svg viewBox="0 0 160 200" width="75%" height="75%" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 180 C80 180 40 140 30 100 C20 60 50 40 80 55 C110 40 140 60 130 100 C120 140 80 180 80 180Z" fill="#2d5a3a" opacity="0.85"/>
        <path d="M80 55 L80 180" stroke="#8fbc8f" strokeWidth="1.5" opacity="0.5"/>
        <ellipse cx="55" cy="110" rx="12" ry="8" fill="#1a2e1e" opacity="0.5"/>
        <ellipse cx="105" cy="110" rx="12" ry="8" fill="#1a2e1e" opacity="0.5"/>
      </svg>
    )
  },
  {
    bg: "p-bg-2", tag: "Rare", name: "Thai Constellation",
    latin: "Monstera deliciosa 'Thai Constellation'", price: "$175.00", oldPrice: "$210.00", stars: "★★★★☆",
    care: ["Bright Indirect", "High Humidity"],
    svg: (
      <svg viewBox="0 0 160 200" width="65%" height="65%" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 180 L80 120" stroke="#8fbc8f" strokeWidth="2"/>
        <ellipse cx="80" cy="90" rx="50" ry="60" fill="#1b5e20" opacity="0.8" transform="rotate(5 80 90)"/>
        <line x1="80" y1="55" x2="80" y2="125" stroke="#a5d6a7" strokeWidth="1.5" opacity="0.6"/>
        <line x1="80" y1="70" x2="50" y2="80" stroke="#a5d6a7" strokeWidth="1" opacity="0.5"/>
        <line x1="80" y1="70" x2="110" y2="80" stroke="#a5d6a7" strokeWidth="1" opacity="0.5"/>
        <line x1="80" y1="90" x2="45" y2="100" stroke="#a5d6a7" strokeWidth="1" opacity="0.5"/>
        <line x1="80" y1="90" x2="115" y2="100" stroke="#a5d6a7" strokeWidth="1" opacity="0.5"/>
      </svg>
    )
  },
  {
    bg: "p-bg-3", tag: null, name: "Calathea Orbifolia",
    latin: "Goeppertia orbifolia", price: "$62.00", stars: "★★★★★",
    care: ["Medium Light", "Moist Soil"],
    svg: (
      <svg viewBox="0 0 160 200" width="70%" height="70%" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 180 L80 90" stroke="#c5e1a5" strokeWidth="2"/>
        <path d="M80 90 C60 60 30 70 35 95 C40 120 80 90 80 90Z" fill="#558b2f" opacity="0.9"/>
        <path d="M80 90 C100 60 130 70 125 95 C120 120 80 90 80 90Z" fill="#7cb342" opacity="0.9"/>
        <path d="M80 120 C55 95 25 105 30 130 C35 155 80 120 80 120Z" fill="#689f38" opacity="0.8"/>
        <path d="M80 120 C105 95 135 105 130 130 C125 155 80 120 80 120Z" fill="#558b2f" opacity="0.8"/>
        <path d="M80 150 C50 130 22 145 28 165 C34 185 80 150 80 150Z" fill="#4caf50" opacity="0.7"/>
        <path d="M80 150 C110 130 138 145 132 165 C126 185 80 150 80 150Z" fill="#388e3c" opacity="0.7"/>
      </svg>
    )
  },
  {
    bg: "p-bg-4", tag: "Best Seller", name: "Fiddle Leaf Fig",
    latin: "Ficus lyrata 'Bambino'", price: "$89.00", stars: "★★★★☆",
    care: ["Bright Light", "Dry Between"],
    svg: (
      <svg viewBox="0 0 160 200" width="65%" height="65%" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 180 L80 80" stroke="#a5d6a7" strokeWidth="2"/>
        <path d="M80 80 C80 80 70 40 50 30 C30 20 20 50 40 70 C60 90 80 80 80 80Z" fill="#2e7d32" opacity="0.9"/>
        <path d="M80 80 C80 80 90 40 110 30 C130 20 140 50 120 70 C100 90 80 80 80 80Z" fill="#388e3c" opacity="0.9"/>
        <path d="M80 110 C80 110 65 80 44 70 C24 60 18 90 38 105 C58 120 80 110 80 110Z" fill="#43a047" opacity="0.8"/>
        <path d="M80 110 C80 110 95 80 116 70 C136 60 142 90 122 105 C102 120 80 110 80 110Z" fill="#2e7d32" opacity="0.8"/>
      </svg>
    )
  }
];

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const ProductCard = ({ product, index, onAddToCart }) => {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const delayClass = index > 0 ? `reveal-delay-${index}` : "";

  const handleAdd = () => {
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={`product-card reveal ${delayClass}`}>
      <div className="product-img">
        <div className={`product-img-bg ${product.bg}`}></div>
        <div className="cat-plant-svg" style={{ position: "absolute", inset: 0 }}>{product.svg}</div>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className="product-wishlist"
          onClick={() => setWished(!wished)}
          style={wished ? { background: "var(--gold)", opacity: 1, transform: "translateY(0)" } : {}}
        >
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill={wished ? "#c8a96e" : "none"}
            stroke={wished ? "#c8a96e" : "currentColor"}
            strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
        <button
          className="product-quick"
          onClick={handleAdd}
          style={added ? { background: "var(--gold)", color: "var(--green-deep)" } : {}}
        >
          {added ? "✓ Added!" : "+ Add to Bag"}
        </button>
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-latin">{product.latin}</div>
        <div className="product-meta">
          <div className="product-price">
            {product.oldPrice && <span className="old">{product.oldPrice}</span>}
            {product.price}
          </div>
          <div className="product-stars">{product.stars}</div>
        </div>
        <div className="product-care">
          {product.care.map(c => <span key={c} className="care-pill">{c}</span>)}
        </div>
      </div>
    </div>
  );
};

export default function VerdureSite() {
  const [cartCount, setCartCount] = useState(3);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + "px";
        ringRef.current.style.top = ringPos.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleHoverEnter = () => {
    if (!cursorRef.current || !ringRef.current) return;
    cursorRef.current.style.width = "20px";
    cursorRef.current.style.height = "20px";
    cursorRef.current.style.background = "var(--gold)";
    ringRef.current.style.width = "55px";
    ringRef.current.style.height = "55px";
  };
  const handleHoverLeave = () => {
    if (!cursorRef.current || !ringRef.current) return;
    cursorRef.current.style.width = "12px";
    cursorRef.current.style.height = "12px";
    cursorRef.current.style.background = "var(--green-deep)";
    ringRef.current.style.width = "40px";
    ringRef.current.style.height = "40px";
  };
  const hoverProps = { onMouseEnter: handleHoverEnter, onMouseLeave: handleHoverLeave };

  const marqueeItems = [
    "Free Shipping on Orders Over $75", "✦", "Certified Pest-Free Guarantee", "✦",
    "Ethically Sourced & Sustainably Grown", "✦", "30-Day Plant Health Warranty", "✦",
    "Expert Care Support Included", "✦",
    "Free Shipping on Orders Over $75", "✦", "Certified Pest-Free Guarantee", "✦",
    "Ethically Sourced & Sustainably Grown", "✦", "30-Day Plant Health Warranty", "✦",
    "Expert Care Support Included", "✦",
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo" {...hoverProps}>VERD<span>U</span>RE</a>
        <ul className="nav-links">
          {["Shop", "Collections", "Care Guides", "About"].map(l => (
            <li key={l}><a href="#" {...hoverProps}>{l}</a></li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <button className="cart-btn" {...hoverProps}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Bag <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-tag">— New Arrivals 2025</p>
          <h1 className="hero-title">Bring the<br /><em>Forest</em><br />Indoors.</h1>
          <p className="hero-desc">Rare and curated indoor plants, ethically sourced from boutique nurseries worldwide. Each specimen arrives soil-ready, with a personalized care guide.</p>
          <div className="hero-actions">
            <a href="#products" className="btn-primary" {...hoverProps}>Explore Plants</a>
            <a href="#" className="btn-outline" {...hoverProps}>Our Story</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-plant-bg"></div>
          <div className="hero-leaves">
            <svg viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.9" style={{ animation: "float 6s ease-in-out infinite" }}>
                <path d="M300 600 C300 600 180 500 150 380 C120 260 200 180 300 200 C400 180 480 260 450 380 C420 500 300 600 300 600Z" fill="#2d5a3a" opacity="0.8"/>
                <path d="M300 200 L300 600" stroke="#4a7c59" strokeWidth="3" opacity="0.6"/>
                <path d="M300 350 C260 320 190 330 170 360" stroke="#4a7c59" strokeWidth="2" fill="none" opacity="0.5"/>
                <path d="M300 350 C340 320 410 330 430 360" stroke="#4a7c59" strokeWidth="2" fill="none" opacity="0.5"/>
                <path d="M300 450 C250 430 190 440 175 465" stroke="#4a7c59" strokeWidth="2" fill="none" opacity="0.5"/>
                <path d="M300 450 C350 430 410 440 425 465" stroke="#4a7c59" strokeWidth="2" fill="none" opacity="0.5"/>
                <ellipse cx="240" cy="360" rx="20" ry="14" fill="#1a2e1e" opacity="0.7"/>
                <ellipse cx="360" cy="360" rx="20" ry="14" fill="#1a2e1e" opacity="0.7"/>
              </g>
              <g opacity="0.7" style={{ animation: "float 8s ease-in-out infinite 1s" }}>
                <path d="M80 450 C80 450 60 360 100 300 C140 240 200 260 200 320 C200 380 120 430 80 450Z" fill="#4a7c59" opacity="0.6"/>
                <path d="M80 450 C130 390 180 330 200 320" stroke="#8fbc8f" strokeWidth="2" fill="none" opacity="0.4"/>
              </g>
              <g opacity="0.7" style={{ animation: "float 7s ease-in-out infinite 0.5s" }}>
                <path d="M520 480 C520 480 540 390 500 330 C460 270 400 290 400 350 C400 410 480 460 520 480Z" fill="#3d6b45" opacity="0.6"/>
                <path d="M520 480 C470 420 420 360 400 350" stroke="#8fbc8f" strokeWidth="2" fill="none" opacity="0.4"/>
              </g>
              <g style={{ animation: "float 5s ease-in-out infinite 2s" }}>
                <ellipse cx="150" cy="200" rx="45" ry="25" fill="#8fbc8f" opacity="0.4" transform="rotate(-30 150 200)"/>
                <ellipse cx="450" cy="250" rx="40" ry="22" fill="#8fbc8f" opacity="0.3" transform="rotate(25 450 250)"/>
              </g>
              <rect x="260" y="595" width="80" height="60" rx="4" fill="#c8a96e" opacity="0.9"/>
              <rect x="250" y="590" width="100" height="12" rx="3" fill="#b8996e" opacity="0.9"/>
            </svg>
          </div>
          <div className="hero-badge"><strong>240+</strong>Rare species in stock</div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {marqueeItems.map((item, i) => (
            <span key={i} className={item === "✦" ? "marquee-item marquee-dot" : "marquee-item"}>{item}</span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="section-header reveal">
          <div>
            <div className="section-label">Browse by Type</div>
            <h2 className="section-title">Shop by <em>Category</em></h2>
          </div>
          <a href="#" className="btn-outline" {...hoverProps}>View All</a>
        </div>
        <div className="cat-grid">
          {[
            { bg: "cat-bg-1", name: "Monsteras", count: "48 Varieties", delay: "" },
            { bg: "cat-bg-2", name: "Calatheas", count: "32 Varieties", delay: "reveal-delay-1" },
            { bg: "cat-bg-3", name: "Succulents", count: "60 Varieties", delay: "reveal-delay-2" },
          ].map((cat) => (
            <div key={cat.name} className={`cat-card reveal ${cat.delay}`} {...hoverProps}>
              <div className="cat-card-inner">
                <div className={`cat-bg ${cat.bg}`}></div>
                <div className="cat-plant-svg">
                  <svg viewBox="0 0 200 280" width="70%" height="70%" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 260 L100 160" stroke="#8fbc8f" strokeWidth="3"/>
                    <ellipse cx="100" cy="120" rx="60" ry="70" fill="#3d6b45" opacity="0.8" transform="rotate(-10 100 120)"/>
                  </svg>
                </div>
                <div className="cat-overlay"></div>
                <div className="cat-info">
                  <div className="cat-name">{cat.name}</div>
                  <div className="cat-count">{cat.count}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products" id="products">
        <div className="section-header reveal">
          <div>
            <div className="section-label">Handpicked Selection</div>
            <h2 className="section-title">New <em>Arrivals</em></h2>
          </div>
          <a href="#" className="btn-outline" {...hoverProps}>View All Plants</a>
        </div>
        <div className="product-grid">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} onAddToCart={() => setCartCount(c => c + 1)} />
          ))}
        </div>
      </section>

      {/* FEATURE BANNER */}
      <div className="feature-banner">
        <div className="feature-img">
          <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4a7c59" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
            </defs>
            <rect width="600" height="500" fill="url(#glow)"/>
            <g style={{ animation: "float 7s ease-in-out infinite" }}>
              <path d="M300 450 L300 200" stroke="#8fbc8f" strokeWidth="4" opacity="0.7"/>
              <path d="M300 200 C300 200 240 100 180 80 C120 60 100 120 140 160 C180 200 300 200 300 200Z" fill="#2d5a3a" opacity="0.9"/>
              <path d="M300 200 C300 200 360 100 420 80 C480 60 500 120 460 160 C420 200 300 200 300 200Z" fill="#3d6b45" opacity="0.9"/>
              <path d="M300 280 C300 280 230 200 165 185 C100 170 90 235 135 265 C180 295 300 280 300 280Z" fill="#4a7c59" opacity="0.85"/>
              <path d="M300 280 C300 280 370 200 435 185 C500 170 510 235 465 265 C420 295 300 280 300 280Z" fill="#2d5a3a" opacity="0.85"/>
              <path d="M300 360 C300 360 220 295 155 285 C90 275 85 340 130 365 C175 390 300 360 300 360Z" fill="#6b9e5e" opacity="0.7"/>
              <path d="M300 360 C300 360 380 295 445 285 C510 275 515 340 470 365 C425 390 300 360 300 360Z" fill="#4a7c59" opacity="0.7"/>
            </g>
            <rect x="260" y="448" width="80" height="50" rx="5" fill="#c8a96e" opacity="0.85"/>
            <rect x="248" y="442" width="104" height="14" rx="4" fill="#b8996e"/>
          </svg>
        </div>
        <div className="feature-content">
          <div className="section-label">The Verdure Promise</div>
          <h2 className="section-title">Every Plant,<br /><em>Guaranteed.</em></h2>
          <p>We believe every plant lover deserves confidence in their purchase. That's why every specimen we ship comes with our industry-leading 30-day health guarantee.</p>
          <ul className="feature-list">
            {["Certified pest and disease-free shipping","Expert-written care guides included","Climate-controlled packaging year-round","Live plant specialist support via chat","Free replacement within 30 days"].map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href="#" className="btn-primary" style={{ alignSelf: "flex-start" }} {...hoverProps}>Learn More</a>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-header reveal">
          <div>
            <div className="section-label">Real Reviews</div>
            <h2 className="section-title">What Our <em>Growers</em> Say</h2>
          </div>
        </div>
        <div className="testi-grid">
          {[
            { initials: "SM", name: "Sophia M.", loc: "Portland, OR", text: "My Monstera Albo arrived absolutely perfectly. The roots were healthy, the soil was moist, and it came with this beautiful handwritten note. Verdure truly feels like a premium experience from start to finish.", delay: "" },
            { initials: "JK", name: "James K.", loc: "Austin, TX", text: "I was skeptical about ordering plants online — until Verdure. The packaging was extraordinary. My Thai Constellation looked better in person than in the photos. Already ordered three more!", delay: "reveal-delay-1" },
            { initials: "RL", name: "Rachel L.", loc: "Brooklyn, NY", text: "The care guide that came with my Calathea was worth the purchase alone. It's so detailed and specific. Six months later my plant is absolutely thriving. This is the gold standard for plant shops.", delay: "reveal-delay-2" },
          ].map((t) => (
            <div key={t.name} className={`testi-card reveal ${t.delay}`}>
              <div className="testi-quote">"</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-loc">{t.loc}</div>
                </div>
                <div className="product-stars" style={{ marginLeft: "auto" }}>★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-content">
          <span className="section-label">Stay in the Loop</span>
          <h2 className="newsletter-title">Rare Drops & Plant Care, Delivered.</h2>
          <p>Join 24,000+ plant lovers getting weekly new arrivals, care tips, and exclusive member-only offers. Unsubscribe any time.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="your@email.com" />
            <button {...hoverProps}>Subscribe</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="nav-logo" {...hoverProps}>VERD<span>U</span>RE</a>
            <p>Rare and curated indoor plants, ethically sourced from boutique nurseries around the world. Planted with purpose.</p>
            <div className="footer-socials">
              {["ig","pi","tt","fb"].map(s => <a key={s} href="#" className="social-btn" {...hoverProps}>{s}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>{["All Plants","New Arrivals","Rare Finds","Starter Plants","Planters & Pots","Gift Cards"].map(l => <li key={l}><a href="#" {...hoverProps}>{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Learn</h4>
            <ul>{["Care Guides","Plant Journal","Propagation","Pest & Disease","Community"].map(l => <li key={l}><a href="#" {...hoverProps}>{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>{["About Us","Sustainability","Our Nurseries","Careers","Press","Contact"].map(l => <li key={l}><a href="#" {...hoverProps}>{l}</a></li>)}</ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Verdure Inc. All rights reserved.</span>
          <span>
            <a href="#" {...hoverProps}>Privacy Policy</a> &nbsp;·&nbsp;
            <a href="#" {...hoverProps}>Terms of Service</a> &nbsp;·&nbsp;
            <a href="#" {...hoverProps}>Accessibility</a>
          </span>
        </div>
      </footer>
    </>
  );
}