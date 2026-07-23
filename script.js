// Mobile Navigation Drawer Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li a");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
}

// Bilingual Language Switcher (English <-> Telugu)
let currentLang = 'en';
const langToggleBtn = document.getElementById('lang-toggle-btn');
const langTextSpan = document.getElementById('lang-text');

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'te' : 'en';
        langTextSpan.textContent = currentLang === 'en' ? 'తెలుగు' : 'English';

        document.querySelectorAll('[data-en][data-te]').forEach(el => {
            const newText = el.getAttribute(`data-${currentLang}`);
            if (newText) {
                el.textContent = newText;
            }
        });
    });
}

// Guaranteed Instant Audio Autoplay & Mute/Unmute Control
const musicBtn = document.getElementById('music-toggle-btn');
const musicIcon = document.getElementById('music-icon');
const audioEl = document.getElementById('wedding-audio');

if (musicBtn && audioEl) {
    audioEl.volume = 0.9;
    audioEl.muted = false;

    function playAudioNow() {
        if (!audioEl) return;
        audioEl.muted = false;
        const playPromise = audioEl.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (musicIcon) musicIcon.textContent = '🔊';
            }).catch(() => {
                // If browser strict autoplay policy blocked unmuted sound initially, icon shows mute until gesture
                if (musicIcon) musicIcon.textContent = '🔇';
            });
        }
    }

    // Try playing unmuted instantly on load
    playAudioNow();
    window.addEventListener('DOMContentLoaded', playAudioNow);
    window.addEventListener('load', playAudioNow);

    // Force play unmuted on ANY user gesture (touch, scroll, click, mousemove, keydown)
    const enableAudioOnGesture = () => {
        if (audioEl.paused || audioEl.muted) {
            audioEl.muted = false;
            audioEl.play().then(() => {
                if (musicIcon) musicIcon.textContent = '🔊';
            }).catch(() => {});
        }
    };

    ['click', 'pointerdown', 'touchstart', 'touchend', 'scroll', 'mousemove', 'keydown'].forEach(evt => {
        window.addEventListener(evt, enableAudioOnGesture, { passive: true });
    });

    // Mute / Unmute Toggle Button
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audioEl.paused || audioEl.muted) {
            audioEl.muted = false;
            audioEl.play().then(() => {
                if (musicIcon) musicIcon.textContent = '🔊';
            }).catch(err => console.log("Playback error:", err));
        } else {
            audioEl.muted = true;
            audioEl.pause();
            if (musicIcon) musicIcon.textContent = '🔇';
        }
    });
}

// Countdown Timer for Aug 28, 2026 22:08:00
const countdownDate = new Date("Aug 28, 2026 22:08:00").getTime();

const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerHTML = days < 10 ? "0" + days : days;
    if (hoursEl) hoursEl.innerHTML = hours < 10 ? "0" + hours : hours;
    if (minutesEl) minutesEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    if (secondsEl) secondsEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(timerInterval);
        const countEl = document.getElementById("countdown");
        if (countEl) {
            countEl.innerHTML = "The Auspicious Moment is Here!";
            countEl.style.fontSize = "1.8rem";
            countEl.style.color = "var(--text-gold)";
        }
    }
}, 1000);

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 8px 25px rgba(0,0,0,0.5)';
        } else {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        }
    }
});

// Particle Background Animation
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 20;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = -Math.random() * 0.7 - 0.2;
            this.radius = Math.random() * 2.5 + 0.5;
            this.alpha = Math.random() * 0.6 + 0.2;
            this.decay = Math.random() * 0.003 + 0.001;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
            if (this.alpha <= 0 || this.y < -10) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = '#e6b366';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < 35; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}
