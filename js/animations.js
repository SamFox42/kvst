/**
 * Сайт.КМВ - Animations JavaScript File
 * iOS 19 Inspired Web Development Services Website
 */

// DOM Elements for animations
const heroContent = document.querySelector('.hero-content');
const scrollIndicator = document.querySelector('.scroll-indicator');

// On page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize custom cursor for desktop
    if (window.innerWidth > 768) {
        initCustomCursor();
    }
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize hover animations
    initHoverAnimations();
});

// Initialize hero animations
function initHeroAnimations() {
    // Add fade-in class to hero elements if they don't already have it
    if (heroContent) {
        const heroElements = heroContent.children;
        for (let i = 0; i < heroElements.length; i++) {
            if (!heroElements[i].classList.contains('fade-in')) {
                heroElements[i].classList.add('fade-in');
                heroElements[i].classList.add(`delay-${i}`);
            }
        }
    }
    
    // Add floating animation to scroll indicator
    if (scrollIndicator) {
        scrollIndicator.classList.add('floating');
    }
}

// Initialize parallax effect
function initParallax() {
    const heroBackdrop = document.querySelector('.hero-backdrop');
    
    if (heroBackdrop) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroBackdrop.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }
}

// Initialize custom cursor
function initCustomCursor() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
    
    // Add hover effect for links and buttons
    const links = document.querySelectorAll('a, button, .service-card, .portfolio-item, .faq-question');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height with a small buffer
                const headerHeight = document.querySelector('.header').offsetHeight + 20;
                
                // Calculate target position
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize hover animations
function initHoverAnimations() {
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-active');
        });
    });
    
    // Portfolio items hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        const info = item.querySelector('.portfolio-info');
        
        item.addEventListener('mouseenter', () => {
            if (overlay) overlay.style.opacity = '1';
            if (info) info.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (overlay) overlay.style.opacity = '0';
            if (info) info.style.transform = 'translateY(20px)';
        });
    });
    
    // Button hover effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('btn-hover');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('btn-hover');
        });
    });
}

// Add iOS 19 style page transitions
function addPageTransitions() {
    // Create page transition overlay
    const overlay = document.createElement('div');
    overlay.classList.add('page-transition-overlay');
    document.body.appendChild(overlay);
    
    // Add transition effect when clicking on navigation links
    const navigationLinks = document.querySelectorAll('a[href^="#"]');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only if it's a page section, not external link
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Show overlay
                    overlay.classList.add('active');
                    
                    // After animation completes, scroll to target and hide overlay
                    setTimeout(() => {
                        const headerHeight = document.querySelector('.header').offsetHeight + 20;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'instant'
                        });
                        
                        // Hide overlay
                        setTimeout(() => {
                            overlay.classList.remove('active');
                        }, 300);
                    }, 400);
                }
            }
        });
    });
}

// Add text fade-in animation
function addTextAnimations() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    
    textElements.forEach(element => {
        // Skip elements that already have animation classes
        if (element.classList.contains('fade-in') || 
            element.parentElement.classList.contains('fade-in')) {
            return;
        }
        
        // Add fade-in animation when element comes into view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.classList.add('text-reveal');
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(element);
    });
}

// Add animation to service icons
function animateServiceIcons() {
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('icon-bounce');
        });
        
        icon.addEventListener('animationend', () => {
            icon.classList.remove('icon-bounce');
        });
    });
}

// Add scroll-triggered animations
window.addEventListener('scroll', () => {
    // Calculate scroll position as percentage of page height
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
    
    // Apply scale effect to hero section based on scroll
    const hero = document.querySelector('.hero-backdrop');
    if (hero && scrollPosition < windowHeight) {
        const scale = 1 + (scrollPosition * 0.0005);
        const blur = scrollPosition * 0.02;
        hero.style.transform = `scale(${scale})`;
        hero.style.filter = `brightness(${1 - scrollPosition/1000}) blur(${blur}px)`;
    }
    
    // Animate elements based on scroll percentage
    if (scrollPercentage > 20) {
        document.querySelectorAll('.about-content').forEach(el => {
            el.classList.add('reveal-active');
        });
    }
    
    if (scrollPercentage > 40) {
        document.querySelectorAll('.services-container').forEach(el => {
            el.classList.add('reveal-active');
        });
    }
    
    if (scrollPercentage > 60) {
        document.querySelectorAll('.testimonial-slider').forEach(el => {
            el.classList.add('reveal-active');
        });
    }
});

// Add glassmorphism effect to elements
function addGlassmorphismEffect() {
    const glassElements = document.querySelectorAll('.header.scrolled, .service-card, .contact-form-container');
    
    glassElements.forEach(element => {
        element.classList.add('glassmorphism');
    });
}

// Initialize additional animations
window.addEventListener('load', () => {
    addTextAnimations();
    animateServiceIcons();
    addGlassmorphismEffect();
    
    // Add page transitions only if not on mobile
    if (window.innerWidth > 768) {
        addPageTransitions();
    }
});
