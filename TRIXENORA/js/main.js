/**
 * TRIXENORA - Main Application Controller
 * Cyberpunk Gaming Platform
 */

class TrixenoraApp {
    constructor() {
        this.currentPage = 'home';
        this.isLoaded = false;
        this.audioContext = null;
        this.sounds = {};
        
        this.init();
    }

    async init() {
        // Initialize all modules
        this.initCursor();
        this.initLoading();
        this.initNavigation();
        this.initAudio();
        this.initScrollEffects();
        
        // Wait for load
        await this.waitForLoad();
        this.isLoaded = true;
        this.showContent();
    }

    initCursor() {
        const cursor = document.getElementById('cursor');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Hover effects
        document.querySelectorAll('a, button, .cta-button, .feature-card, .emotion-btn').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
        });
    }

    initLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progress = document.querySelector('.loading-progress');
        
        // Simulate loading
        let progressValue = 0;
        const loadingInterval = setInterval(() => {
            progressValue += Math.random() * 15;
            if (progressValue >= 100) {
                progressValue = 100;
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => loadingScreen.style.display = 'none', 1000);
                }, 500);
            }
            progress.style.width = progressValue + '%';
        }, 50);
    }

    initNavigation() {
        // Smooth page transitions
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.dataset.page || link.getAttribute('href').replace('#', '');
                this.navigateTo(targetPage);
            });
        });

        // Mobile hamburger
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            hamburger.classList.toggle('active');
        });
    }

    async initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const assetBase = window.location.pathname.includes('/pages/') ? '../' : '';
            // Load sounds
            this.sounds.click = await this.loadSound(`${assetBase}assets/sounds/click.mp3`);
            this.sounds.ambient = await this.loadSound(`${assetBase}assets/sounds/ambient.mp3`);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    loadSound(url) {
        return fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                return () => {
                    const source = this.audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(this.audioContext.destination);
                    source.start(0);
                };
            });
    }

    playSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }

    initScrollEffects() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-canvas');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    navigateTo(page) {
        this.playSound('click');
        
        // Update active nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
        
        // Page transition
        document.body.classList.add('page-transition');
        
        setTimeout(() => {
            let targetUrl = '';
            const isInPages = window.location.pathname.includes('/pages/');
            if (page === 'home') {
                targetUrl = isInPages ? '../index.html' : 'index.html';
            } else {
                targetUrl = isInPages ? `${page}.html` : `pages/${page}.html`;
            }
            window.location.href = targetUrl;
        }, 300);
    }

    waitForLoad() {
        return new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
    }

    showContent() {
        document.body.classList.add('loaded');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.trixenoraApp = new TrixenoraApp();
});

// Global utilities
window.playTriSound = () => {
    if (window.trixenoraApp) {
        window.trixenoraApp.playSound('click');
    }
};