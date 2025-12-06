// config.js

const Config = {
    // API Endpoints
    API_BASE_URL: 'https://api.webpronu.com/v1',
    
    // Site Settings
    SITE_NAME: 'WebpronU',
    SITE_DESCRIPTION: 'Premium Adult Entertainment',
    SITE_KEYWORDS: 'adult, entertainment, premium, hd, videos',
    
    // Features
    FEATURES: {
        ageVerification: true,
        lazyLoading: true,
        offlineSupport: false,
        pushNotifications: false,
        darkMode: true,
        multiLanguage: true
    },
    
    // Content Categories
    CATEGORIES: [
        { id: 'hd', name: 'HD Videos', icon: 'fas fa-hd' },
        { id: '4k', name: '4K Ultra HD', icon: 'fas fa-film' },
        { id: 'live', name: 'Live Shows', icon: 'fas fa-broadcast-tower' },
        { id: 'photos', name: 'Photo Galleries', icon: 'fas fa-images' },
        { id: 'premium', name: 'Premium Content', icon: 'fas fa-crown' },
        { id: 'trending', name: 'Trending Now', icon: 'fas fa-fire' }
    ],
    
    // Pricing Plans
    PLANS: [
        { id: 'basic', name: 'Basic', price: 9.99, features: ['SD Quality', 'Limited Access'] },
        { id: 'premium', name: 'Premium', price: 19.99, features: ['HD Quality', 'Unlimited Access'] },
        { id: 'vip', name: 'VIP', price: 49.99, features: ['4K Quality', 'Priority Support'] }
    ],
    
    // Models Data (Sample)
    MODELS: [
        {
            id: 1,
            name: 'JOJO KISS',
            category: 'HD Videos • Photos',
            price: 15.99,
            originalPrice: 20.99,
            rating: 4.5,
            image: 'image/JOJO KISS.webp',
            tags: ['new', 'featured', 'hd']
        },
        // Add more models here
    ],
    
    // Search Suggestions
    SEARCH_SUGGESTIONS: [
        'HD Videos',
        '4K Content',
        'Live Shows',
        'Premium Models',
        'New Arrivals',
        'Trending Now',
        'Exclusive Content'
    ],
    
    // Localization
    LANGUAGES: {
        en: { name: 'English', flag: '🇺🇸' },
        es: { name: 'Español', flag: '🇪🇸' },
        fr: { name: 'Français', flag: '🇫🇷' }
    },
    
    // Social Links
    SOCIAL: {
        twitter: '#',
        instagram: '#',
        telegram: '#',
        email: 'support@webpronu.com'
    },
    
    // Legal
    LEGAL: {
        terms: 'terms.html',
        privacy: 'privacy.html',
        disclaimer: 'disclaimer.html',
        ageVerification: 'age-verification.html'
    },
    
    // Performance
    PERFORMANCE: {
        lazyLoadThreshold: 300,
        debounceDelay: 150,
        throttleDelay: 100
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Config;
}