// script.js - Modern Version

class App {
    static init() {
        // Initialize all components
        this.initAgeVerification();
        this.initLoader();
        this.initNavigation();
        this.initSearch();
        this.initModals();
        this.initSliders();
        this.initTabs();
        this.initCountdown();
        this.initModelCards();
        this.initScrollEffects();
        this.initForms();
        this.initNotifications();
        
        console.log('WebpronU loaded successfully');
    }

    static initAgeVerification() {
        const ageModal = document.getElementById('age-verification');
        const enterBtn = document.getElementById('enter-site');
        const exitBtn = document.getElementById('exit-site');

        if (!localStorage.getItem('ageVerified')) {
            ageModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        enterBtn.addEventListener('click', () => {
            localStorage.setItem('ageVerified', 'true');
            ageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        exitBtn.addEventListener('click', () => {
            window.location.href = 'https://www.google.com';
        });
    }

    static initLoader() {
        const loader = document.querySelector('.loader-container');
        const progressBar = document.querySelector('.progress-bar');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }, 500);
            }
        }, 100);
    }

    static initNavigation() {
        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        menuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Active nav item
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                navItems.forEach(i => i.parentElement.classList.remove('active'));
                e.currentTarget.parentElement.classList.add('active');
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    static initSearch() {
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.getElementById('search-box');
        const searchBtn = document.getElementById('mobile-search-btn');
        const suggestions = document.getElementById('search-suggestions');

        // Mobile search toggle
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const searchContainer = document.querySelector('.search-container');
                searchContainer.classList.toggle('active');
                if (searchContainer.classList.contains('active')) {
                    searchInput.focus();
                }
            });
        }

        // Search suggestions
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 2) {
                    this.showSearchSuggestions(query);
                } else {
                    suggestions.innerHTML = '';
                }
            });

            // Close suggestions on click outside
            document.addEventListener('click', (e) => {
                if (!searchForm.contains(e.target)) {
                    suggestions.innerHTML = '';
                }
            });
        }
    }

    static async showSearchSuggestions(query) {
        const suggestions = document.getElementById('search-suggestions');
        const mockData = [
            'HD Videos',
            '4K Content',
            'Live Shows',
            'Premium Models',
            'New Arrivals',
            'Trending Now',
            'Exclusive Content'
        ];

        const filtered = mockData.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        );

        suggestions.innerHTML = filtered.map(item => `
            <div class="suggestion-item">
                <i class="fas fa-search"></i>
                <span>${item}</span>
            </div>
        `).join('');
    }

    static initModals() {
        const loginBtn = document.getElementById('login-btn');
        const loginModal = document.getElementById('login-modal');
        const closeBtns = document.querySelectorAll('.modal-close');

        // Login modal
        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', () => {
                loginModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        // Close modals
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close modal on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }
        });
    }

    static initSliders() {
        // Hero Slider
        const heroSwiper = new Swiper('.heroSwiper', {
            effect: 'fade',
            fadeEffect: { crossFade: true },
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Arrivals Slider
        const arrivalsSwiper = new Swiper('.arrivalsSwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }
        });

        // Pause on hover
        [heroSwiper, arrivalsSwiper].forEach(swiper => {
            swiper.el.addEventListener('mouseenter', () => {
                swiper.autoplay.stop();
            });
            swiper.el.addEventListener('mouseleave', () => {
                swiper.autoplay.start();
            });
        });
    }

    static initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Filter content based on data-filter
                const filter = btn.dataset.filter;
                this.filterContent(filter);
            });
        });
    }

    static filterContent(filter) {
        const items = document.querySelectorAll('.arrivals-slider .swiper-slide');
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    static initCountdown() {
        const hoursEl = document.getElementById('offer-hours');
        const minutesEl = document.getElementById('offer-minutes');
        const secondsEl = document.getElementById('offer-seconds');

        if (!hoursEl || !minutesEl || !secondsEl) return;

        // Set end time (48 hours from now)
        const endTime = new Date().getTime() + (48 * 60 * 60 * 1000);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const timeLeft = endTime - now;

            if (timeLeft < 0) {
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');

            // Add pulse animation every second
            secondsEl.classList.add('pulse');
            setTimeout(() => secondsEl.classList.remove('pulse'), 500);
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    static initModelCards() {
        const modelCards = document.querySelectorAll('.model-card');
        
        modelCards.forEach(card => {
            // Hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = 'var(--shadow-xl)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });

            // Like button
            const likeBtn = card.querySelector('.fa-heart');
            if (likeBtn) {
                likeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (likeBtn.classList.contains('fas')) {
                        likeBtn.classList.remove('fas');
                        likeBtn.classList.add('far');
                        this.showNotification('Removed from favorites');
                    } else {
                        likeBtn.classList.remove('far');
                        likeBtn.classList.add('fas');
                        likeBtn.style.animation = 'heartBeat 0.6s ease';
                        this.showNotification('Added to favorites');
                        
                        setTimeout(() => {
                            likeBtn.style.animation = '';
                        }, 600);
                    }
                });
            }
        });
    }

    static initScrollEffects() {
        // Header scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.background = 'rgba(18, 18, 18, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(18, 18, 18, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }

            // Hide/show header on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });

        // Lazy load images
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    static initForms() {
        // Login form
        const loginForm = document.querySelector('.auth-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Add your login logic here
                this.showNotification('Login successful!');
            });
        }

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]');
                if (email.value) {
                    this.showNotification('Thank you for subscribing!');
                    email.value = '';
                }
            });
        }

        // Show/hide password
        const showPasswordBtns = document.querySelectorAll('.show-password');
        showPasswordBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.previousElementSibling;
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                btn.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            });
        });
    }

    static initNotifications() {
        // Notification bell click
        const notificationBtn = document.querySelector('.notification-btn');
        const notificationDropdown = document.querySelector('.notification-dropdown-content');

        if (notificationBtn && notificationDropdown) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationDropdown.classList.toggle('show');
            });

            // Close on click outside
            document.addEventListener('click', () => {
                notificationDropdown.classList.remove('show');
            });
        }
    }

    static showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--dark-light);
            color: var(--light);
            padding: var(--space-md) var(--space-lg);
            border-radius: var(--radius-md);
            border-left: 4px solid var(--success);
            box-shadow: var(--shadow-xl);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes heartBeat {
        0% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(1); }
        75% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .notification-dropdown-content {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        background: var(--dark-light);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-xl);
        min-width: 300px;
        z-index: 1000;
    }
    
    .notification-dropdown-content.show {
        display: block;
        animation: fadeIn 0.3s ease;
    }
    
    .notification-item {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-sm);
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .notification-item:hover {
        background: rgba(255,255,255,0.05);
    }
`;
document.head.appendChild(style);