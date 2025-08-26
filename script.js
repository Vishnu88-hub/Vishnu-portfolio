// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Typing animation for hero section
    const typingElements = document.querySelectorAll('.typing-text');
    
    function startTypingAnimation() {
        typingElements.forEach((element, index) => {
            const text = element.getAttribute('data-text');
            element.textContent = '';
            element.style.opacity = '1';
            
            setTimeout(() => {
                typeText(element, text, 0);
            }, index * 1000);
        });
    }
    
    function typeText(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => {
                typeText(element, text, index + 1);
            }, 50);
        }
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for skills section
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            // Reset width to 0 before animating
            bar.style.width = '0';
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }, index * 200);
        });
    }
    
    // Always animate skill bars on DOMContentLoaded and on scroll
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const shapes = document.querySelectorAll('.shape');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Animate floating shapes
        shapes.forEach((shape, index) => {
            const rate = scrolled * (0.5 + index * 0.8);
            shape.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click handlers for buttons
    const resumeBtn = document.querySelector('.resume-btn');
    const projectBtns = document.querySelectorAll('.project-btn');
    const certificateBtns = document.querySelectorAll('.certificate-btn');
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function() {
            // Add your resume download logic here
            console.log('Download resume clicked');
            // Example: window.open('/path/to/resume.pdf', '_blank');
        });
    }
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add your project navigation logic here
            console.log('View project clicked');
            // Example: window.open('/project-page', '_blank');
        });
    });
    
    certificateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add your certificate viewing logic here
            console.log('View certificate clicked');
            // Example: window.open('/path/to/certificate.pdf', '_blank');
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add smooth reveal animation for elements
    const revealElements = document.querySelectorAll('.animate-text, .skill-item, .project-card, .experience-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
    
    // Add gradient animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.backgroundSize = '200% 200%';
            this.style.animation = 'gradient 2s ease infinite';
        });
    });
    
    // Add particle effect (optional)
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: particleFloat 3s linear forwards;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        /* Mouse Tracking Styles */
        .white-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            transition: transform 0.1s ease;
        }

        .cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--accent-primary);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        }

        .cursor-follower {
            position: fixed;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid var(--accent-primary);
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.3s ease;
        }

        .magnetic {
            transition: transform 0.3s ease;
        }

        .interactive-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .bg-shape {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 230, 230, 0.1) 0%, transparent 70%);
            transition: transform 0.1s ease;
        }

        .hero-bg .shape {
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(style);

    // ===== MOUSE TRACKING FEATURES =====

    // Small White Dot Follower
    const whiteDot = document.createElement('div');
    whiteDot.className = 'white-dot';
    whiteDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(whiteDot);

    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update cursor position immediately
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';

        // Update white dot with slight delay for trailing effect
        dotX = mouseX - 4;
        dotY = mouseY - 4;
    });

    // Smooth white dot animation
    function updateWhiteDot() {
        const currentX = parseFloat(whiteDot.style.left || '0');
        const currentY = parseFloat(whiteDot.style.top || '0');

        const newX = currentX + (dotX - currentX) * 0.15;
        const newY = currentY + (dotY - currentY) * 0.15;

        whiteDot.style.left = newX + 'px';
        whiteDot.style.top = newY + 'px';

        requestAnimationFrame(updateWhiteDot);
    }
    updateWhiteDot();

    // Smooth cursor follower animation
    function updateCursorFollower() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursorFollower.style.left = cursorX - 20 + 'px';
        cursorFollower.style.top = cursorY - 20 + 'px';

        requestAnimationFrame(updateCursorFollower);
    }
    updateCursorFollower();

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .social-link');

    magneticElements.forEach(element => {
        element.classList.add('magnetic');

        element.addEventListener('mouseenter', (e) => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
            whiteDot.style.transform = 'scale(1.5)';
        });

        element.addEventListener('mouseleave', (e) => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            whiteDot.style.transform = 'scale(1)';
        });

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;

            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });

    // Interactive background shapes
    const bgShapes = [];
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'bg-shape';
        shape.style.width = Math.random() * 200 + 100 + 'px';
        shape.style.height = shape.style.width;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.opacity = '0.3';

        document.body.appendChild(shape);
        bgShapes.push(shape);
    }

    // Mouse movement parallax for background shapes
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        bgShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Enhanced hero shapes interaction
        const shapes = document.querySelectorAll('.hero-bg .shape');
        shapes.forEach((shape, index) => {
            const rect = shape.getBoundingClientRect();
            const shapeCenterX = rect.left + rect.width / 2;
            const shapeCenterY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - shapeCenterX) * 0.02 * (index + 1);
            const deltaY = (e.clientY - shapeCenterY) * 0.02 * (index + 1);

            shape.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    });

    // Mouse click effects
    document.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9997;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            animation: ripple 0.6s ease-out forwards;
        `;

        document.body.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    });

    // Hide cursor on mouse leave
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
        whiteDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        whiteDot.style.opacity = '1';
    });

    // Performance optimization - throttle mouse events
    let throttleTimer;
    const throttleDelay = 16; // ~60fps

    function throttledMouseMove(e) {
        if (!throttleTimer) {
            throttleTimer = setTimeout(() => {
                // Update any heavy mouse-dependent calculations here
                throttleTimer = null;
            }, throttleDelay);
        }
    }

    // Add mouse tracking to existing particle system
    const originalCreateParticle = createParticle;
    function createParticle() {
        originalCreateParticle();

        // Add mouse-influenced particles occasionally
        if (Math.random() < 0.3) {
            const particle = document.createElement('div');
            particle.className = 'particle mouse-particle';
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--accent-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${mouseX}px;
                top: ${mouseY}px;
                animation: mouseParticleFloat 2s linear forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }

    // Add mouse particle animation
    const mouseParticleStyle = document.createElement('style');
    mouseParticleStyle.textContent = `
        @keyframes mouseParticleFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-50px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(mouseParticleStyle);
});