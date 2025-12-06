// utils.js

class Utils {
    // Debounce function
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Format price
    static formatPrice(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    // Format date
    static formatDate(date, format = 'medium') {
        const dateObj = new Date(date);
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: format
        }).format(dateObj);
    }

    // Generate random ID
    static generateId(length = 8) {
        return Math.random().toString(36).substring(2, 2 + length);
    }

    // Validate email
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validate password strength
    static validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);

        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
            strength: [
                password.length >= minLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers,
                hasSpecial
            ].filter(Boolean).length
        };
    }

    // Local storage helpers
    static setLocal(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    static getLocal(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    static removeLocal(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }

    // Session storage helpers
    static setSession(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to sessionStorage:', error);
        }
    }

    static getSession(key) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from sessionStorage:', error);
            return null;
        }
    }

    // Cookie helpers
    static setCookie(name, value, days = 7) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Strict";
    }

    static getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    static deleteCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

    // Device detection
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isTablet() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    }

    static isDesktop() {
        return !this.isMobile() && !this.isTablet();
    }

    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Browser detection
    static getBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox')) return 'firefox';
        if (ua.includes('Chrome')) return 'chrome';
        if (ua.includes('Safari')) return 'safari';
        if (ua.includes('Edge')) return 'edge';
        return 'unknown';
    }

    // Copy to clipboard
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Failed to copy:', error);
            return false;
        }
    }

    // Share content
    static shareContent(title, text, url) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: url
            });
        } else {
            // Fallback: copy URL
            this.copyToClipboard(url);
            App.showNotification('URL copied to clipboard');
        }
    }

    // Load script dynamically
    static loadScript(src, async = true, defer = true) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = async;
            script.defer = defer;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Load stylesheet dynamically
    static loadStylesheet(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    // Create element with attributes
    static createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else if (key === 'style') {
                Object.assign(element.style, value);
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Append children
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });
        
        return element;
    }

    // Smooth scroll to element
    static scrollTo(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Detect element in viewport
    static isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        const vertInView = (rect.top <= windowHeight - threshold) && 
                          (rect.top + rect.height >= threshold);
        const horInView = (rect.left <= windowWidth - threshold) && 
                         (rect.left + rect.width >= threshold);

        return vertInView && horInView;
    }

    // Create intersection observer
    static createObserver(callback, options = {}) {
        const defaultOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        return new IntersectionObserver(callback, { ...defaultOptions, ...options });
    }

    // Parse query parameters
    static getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }

    // Set query parameters
    static setQueryParams(params) {
        const url = new URL(window.location);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        window.history.pushState({}, '', url);
    }

    // Remove query parameters
    static removeQueryParams(...keys) {
        const url = new URL(window.location);
        keys.forEach(key => url.searchParams.delete(key));
        window.history.pushState({}, '', url);
    }

    // Generate random number in range
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Capitalize string
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    // Truncate text
    static truncate(text, length = 100) {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    }

    // Delay function
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Retry function
    static async retry(fn, retries = 3, delayMs = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn();
            } catch (error) {
                if (i === retries - 1) throw error;
                await this.delay(delayMs * Math.pow(2, i)); // Exponential backoff
            }
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}