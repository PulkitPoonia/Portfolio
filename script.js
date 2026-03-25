document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Custom Cursor Glow
    const cursor = document.querySelector('.cursor-glow');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.opacity = '1';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    heroTl
        .from('.badge', { y: 20, opacity: 0, duration: 0.6 })
        .from('.hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
        .from('.hero-roles', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-description', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.hero-socials', { y: 10, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.hero-code-block', { x: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8');

    // Typing effect for roles
    const roles = ['Full Stack Developer', 'React.js Developer', 'Node.js Engineer', 'Problem Solver'];
    let roleIndex = 0;
    const roleText = document.getElementById('roleText');
    if (roleText) {
        setInterval(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            gsap.to(roleText, {
                opacity: 0, y: -10, duration: 0.3,
                onComplete: () => {
                    roleText.textContent = roles[roleIndex];
                    gsap.fromTo(roleText, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
                }
            });
        }, 2500);
    }

    // Section Headers Reveal
    document.querySelectorAll('.section').forEach(section => {
        const header = section.querySelector('.section-header');
        if (header) {
            gsap.from(header, {
                scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
                y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
            });
        }
    });

    // About Highlights
    gsap.utils.toArray('.highlight-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 90%' },
            x: 40, opacity: 0, duration: 0.5, delay: i * 0.1
        });
    });

    // Stats Counter Animation
    document.querySelectorAll('.stat-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 90%' },
            y: 30, opacity: 0, duration: 0.6, ease: 'power2.out'
        });
    });

    // Services Cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: '.services-grid', start: 'top 85%' },
            y: 40, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
        });
    });

    // Timeline Items
    document.querySelectorAll('.timeline-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
            x: -30, opacity: 0, duration: 0.6, ease: 'power2.out'
        });
    });

    // Project Cards — use fromTo to guarantee end state is visible
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        gsap.fromTo(projectCards,
            { y: 40, opacity: 0 },
            {
                scrollTrigger: { trigger: '.projects-grid', start: 'top 90%', toggleActions: 'play none none none' },
                y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out'
            }
        );
    }

    // Skill Pills — use fromTo
    const skillPills = document.querySelectorAll('.skill-pill');
    if (skillPills.length > 0) {
        gsap.fromTo(skillPills,
            { scale: 0.7, opacity: 0 },
            {
                scrollTrigger: { trigger: '.skills-wrapper', start: 'top 90%', toggleActions: 'play none none none' },
                scale: 1, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(1.7)'
            }
        );
    }

    // Safety fallback: ensure all animated elements become visible after 3s
    setTimeout(() => {
        document.querySelectorAll('.project-card, .skill-pill, .service-card, .timeline-item, .highlight-card, .stat-item, .achievement-card').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }, 3000);

    // Achievement Cards
    gsap.utils.toArray('.achievement-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 90%' },
            x: 30, opacity: 0, duration: 0.5, delay: i * 0.1
        });
    });

    // Contact Section
    gsap.from('.contact-left', {
        scrollTrigger: { trigger: '.contact-wrapper', start: 'top 85%' },
        x: -40, opacity: 0, duration: 0.8
    });
    gsap.from('.contact-right', {
        scrollTrigger: { trigger: '.contact-wrapper', start: 'top 85%' },
        x: 40, opacity: 0, duration: 0.8
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Nav Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--primary)';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    });
});
