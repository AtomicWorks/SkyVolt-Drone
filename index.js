/* ============================================================
   SkyVolt Drones — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // Force Hero Video Playback (via Blob to bypass IDM)
    // =========================================================
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        fetch('assets/hero-bg.dat')
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const blob = new Blob([buffer], { type: 'video/mp4' });
                const blobUrl = URL.createObjectURL(blob);
                heroVideo.src = blobUrl;
                heroVideo.muted = true;
                heroVideo.play().catch(() => {
                    document.addEventListener('click', () => heroVideo.play(), { once: true });
                });
            })
            .catch(err => console.warn('Hero video load failed:', err));
    }

    // =========================================================
    // Fleet Video — Phantom X1 (via Blob to bypass IDM)
    // =========================================================
    const phantomVideo = document.getElementById('phantomVideo');
    if (phantomVideo) {
        fetch('assets/phantom-x1.dat')
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const blob = new Blob([buffer], { type: 'video/mp4' });
                const blobUrl = URL.createObjectURL(blob);
                phantomVideo.src = blobUrl;
                phantomVideo.muted = true;
                phantomVideo.play().catch(() => {
                    document.addEventListener('click', () => phantomVideo.play(), { once: true });
                });
            })
            .catch(err => console.warn('Phantom video load failed:', err));
    }

    // =========================================================
    // Fleet Video — Spectre S4 (via Blob to bypass IDM)
    // =========================================================
    const spectreVideo = document.getElementById('spectreVideo');
    if (spectreVideo) {
        fetch('assets/spectre-s4.dat')
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const blob = new Blob([buffer], { type: 'video/mp4' });
                const blobUrl = URL.createObjectURL(blob);
                spectreVideo.src = blobUrl;
                spectreVideo.muted = true;
                spectreVideo.play().catch(() => {
                    document.addEventListener('click', () => spectreVideo.play(), { once: true });
                });
            })
            .catch(err => console.warn('Spectre video load failed:', err));
    }

    // =========================================================
    // Fleet Video — Vortex V2 (via Blob to bypass IDM)
    // =========================================================
    const vortexVideo = document.getElementById('vortexVideo');
    if (vortexVideo) {
        fetch('assets/vortex-v2.dat')
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const blob = new Blob([buffer], { type: 'video/mp4' });
                const blobUrl = URL.createObjectURL(blob);
                vortexVideo.src = blobUrl;
                vortexVideo.muted = true;
                vortexVideo.play().catch(() => {
                    document.addEventListener('click', () => vortexVideo.play(), { once: true });
                });
            })
            .catch(err => console.warn('Vortex video load failed:', err));
    }


    // =========================================================
    // Cursor Glow
    // =========================================================
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // =========================================================
    // Particle System
    // =========================================================
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.hue = Math.random() > 0.5 ? 190 : 270; // cyan or purple
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawLines();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // =========================================================
    // Navigation
    // =========================================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    allNavLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // =========================================================
    // Scroll Reveal Animations
    // =========================================================
    const animElements = document.querySelectorAll('.anim-fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    animElements.forEach(el => observer.observe(el));

    // =========================================================
    // Counter Animation
    // =========================================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounters() {
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4); // ease out quart
                num.textContent = Math.floor(target * eased);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    num.textContent = target;
                }
            }
            requestAnimationFrame(update);
        });
    }


    // =========================================================
    // Service Cards Tilt
    // =========================================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // =========================================================
    // Contact Form
    // =========================================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            // Animate button
            submitBtn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="45" stroke-linecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="0.8s" repeatCount="indefinite"/>
                    </circle>
                </svg>
                Sending...
            `;
            submitBtn.disabled = true;

            // Simulate send
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Message Sent!
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = `
                        Send Message
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    `;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2500);
            }, 1500);
        });
    }

    // =========================================================
    // Smooth scroll for anchor links
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
