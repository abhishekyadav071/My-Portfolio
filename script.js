// Interactive Features for Live Web Showcase

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // 2. Animated Number Counters
    const counters = document.querySelectorAll('.stat-num');
    let animated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger animation when stats section is scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // 3. Project Filter System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // 4. Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.innerHTML = '<span style="color: var(--primary-glow);"><i class="fas fa-spinner fa-spin"></i> Sending message...</span>';

            setTimeout(() => {
                formStatus.innerHTML = '<span style="color: #10b981;"><i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.</span>';
                contactForm.reset();
            }, 1200);
        });
    }

    // 5. Clickable Card Handler (opens project links on card click)
    const clickableCards = document.querySelectorAll('.clickable-card');
    clickableCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Avoid duplicate triggers if user clicked directly on an anchor or button inside the card
            if (e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            const url = card.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
});
