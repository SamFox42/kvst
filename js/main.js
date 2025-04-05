/**
 * Сайт.КМВ - Main JavaScript File
 * iOS 19 Inspired Web Development Services Website
 */

// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const serviceTabs = document.querySelectorAll('.category-toggle');
const servicesContainers = document.querySelectorAll('.services-container');
const faqItems = document.querySelectorAll('.faq-item');
const sliderTrack = document.querySelector('.testimonial-track');
const sliderDots = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const statNumbers = document.querySelectorAll('.stat-number');

// On page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize statistics counter
    initStatCounter();
    
    // Add scroll event listener for revealing elements
    window.addEventListener('scroll', scrollCheck);
    
    // Trigger initial scroll check
    scrollCheck();
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Back to top button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Service tabs
serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        
        // Toggle active class on tabs
        serviceTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding services container
        servicesContainers.forEach(container => {
            container.classList.remove('active');
            if (container.classList.contains(`${category}-services`)) {
                container.classList.add('active');
            }
        });
    });
});

// FAQ accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Portfolio filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Toggle active class on filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission (would be replaced with actual API call)
        setTimeout(() => {
            contactForm.reset();
            formSuccess.classList.add('active');
            
            // Reset form success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('active');
            }, 5000);
        }, 1000);
    });
}

// Initialize testimonial slider
function initTestimonialSlider() {
    // Get all testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // Create slider dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    // Dot elements (created above)
    const dots = document.querySelectorAll('.slider-dot');
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        updateSlider();
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateSlider();
    });
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Update slider position and active dot
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Auto slide change every 5 seconds
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateSlider();
    }, 5000);
    
    // Pause auto slide on mouse enter
    sliderTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Resume auto slide on mouse leave
    sliderTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            updateSlider();
        }, 5000);
    });
}

// Initialize statistics counter
function initStatCounter() {
    let hasStarted = false;
    
    function startCounting() {
        if (hasStarted) return;
        
        statNumbers.forEach(stat => {
            const targetValue = parseInt(stat.getAttribute('data-count'));
            let currentValue = 0;
            const increment = Math.ceil(targetValue / 50); // Adjust speed
            const duration = 1500; // Animation duration in ms
            const interval = Math.floor(duration / (targetValue / increment));
            
            const counter = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= targetValue) {
                    stat.textContent = targetValue;
                    clearInterval(counter);
                } else {
                    stat.textContent = currentValue;
                }
            }, interval);
        });
        
        hasStarted = true;
    }
    
    // Start counting when statistics section is in view
    function checkStatisticsVisibility() {
        const statistics = document.querySelector('.statistics');
        if (!statistics) return;
        
        const rect = statistics.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.75) {
            startCounting();
        }
    }
    
    // Check visibility on scroll
    window.addEventListener('scroll', checkStatisticsVisibility);
    
    // Initial check
    checkStatisticsVisibility();
}

// Scroll check for revealing elements
function scrollCheck() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .focus-in');
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initialize animations
function initAnimations() {
    // Add reveal classes to elements for scroll animations
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('reveal');
    });
    
    document.querySelectorAll('.service-card').forEach(el => {
        el.classList.add('reveal');
    });
    
    document.querySelectorAll('.portfolio-item').forEach(el => {
        el.classList.add('reveal');
    });
    
    document.querySelectorAll('.process-step').forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.about-image').forEach(el => {
        el.classList.add('reveal-left');
    });
    
    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('reveal-right');
    });
    
    document.querySelectorAll('.faq-item').forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.contact-info, .contact-form-container').forEach(el => {
        el.classList.add('reveal');
    });
}
