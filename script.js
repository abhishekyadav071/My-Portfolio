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

    // 5. Interactive Live Project Modal Controller
    const modalOverlay = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalIframe = document.getElementById('modal-iframe');
    const previewUrlText = document.getElementById('preview-url-text');
    const modalLiveBtn = document.getElementById('modal-live-btn');
    const modalRepoBtn = document.getElementById('modal-repo-btn');

    const openProjectModal = (card) => {
        const title = card.getAttribute('data-title') || card.querySelector('.project-title')?.innerText || 'Project Showcase';
        const desc = card.getAttribute('data-desc') || card.querySelector('.project-desc')?.innerText || '';
        const tagsStr = card.getAttribute('data-tags') || '';
        const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
        const liveUrl = card.getAttribute('data-live') || card.getAttribute('data-url') || 'https://abhishekyadav071.github.io/My-Portfolio/';
        const repoUrl = card.getAttribute('data-repo') || 'https://github.com/abhishekyadav071/My-Portfolio';

        if (modalTitle) modalTitle.innerText = title;
        if (modalDesc) modalDesc.innerText = desc;
        if (previewUrlText) previewUrlText.innerText = liveUrl;

        if (modalTags) {
            modalTags.innerHTML = tags.map(t => `<span class="tag">${t}</span>`).join('');
        }

        if (modalLiveBtn) modalLiveBtn.href = liveUrl;
        if (modalRepoBtn) modalRepoBtn.href = repoUrl;

        if (modalIframe) {
            modalIframe.src = liveUrl;
        }

        if (modalOverlay) {
            modalOverlay.classList.add('active');
        }
    };

    const closeProjectModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
        if (modalIframe) {
            modalIframe.src = 'about:blank';
        }
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeProjectModal();
            }
        });
    }

    // Attach click listeners to all clickable cards
    const clickableCards = document.querySelectorAll('.clickable-card');
    clickableCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.open-live-btn')) {
                const targetUrl = e.target.closest('a').href;
                window.open(targetUrl, '_blank');
                return;
            }

            openProjectModal(card);
        });
    });
});
