document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on page load
    animateElementsOnLoad();
    
    // Add hover effects to stars
    setupStarInteraction();
    
    // Add click animation to buttons
    setupButtonAnimation();
    
    // Track QR code interactions
    trackQRInteractions();
});

function animateElementsOnLoad() {
    // Animate header
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = 0;
        setTimeout(() => {
            header.style.transition = 'opacity 0.8s ease';
            header.style.opacity = 1;
        }, 100);
    }
    
    // Animate cards with staggered delay
    const cards = document.querySelectorAll('.review-card');
    cards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
}

function setupStarInteraction() {
    const starContainers = document.querySelectorAll('.stars');
    
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            // Add hover effect
            star.addEventListener('mouseover', () => {
                for (let i = 0; i <= index; i++) {
                    stars[i].style.transform = 'scale(1.2)';
                    stars[i].style.color = '#FFC107';
                }
            });
            
            star.addEventListener('mouseout', () => {
                stars.forEach(s => {
                    s.style.transform = 'scale(1)';
                    s.style.color = '#FFD700';
                });
            });
        });
    });
}

function setupButtonAnimation() {
    const buttons = document.querySelectorAll('.review-button, .platform-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

function trackQRInteractions() {
    const qrCodes = document.querySelectorAll('.qr-code');
    
    qrCodes.forEach(qr => {
        qr.addEventListener('click', function() {
            const platform = this.closest('.review-card').classList.contains('google') ? 'Google' : 'Justdial';
            console.log(`QR code clicked for ${platform}`);
            
            // If you want to implement analytics tracking later
            if (typeof gtag !== 'undefined') {
                gtag('event', 'qr_code_click', {
                    'platform': platform
                });
            }
        });
    });
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add responsive features
function checkResponsive() {
    const width = window.innerWidth;
    const cards = document.querySelectorAll('.review-card');
    
    if (width <= 768) {
        cards.forEach(card => {
            // Adjust card styling for mobile
            card.classList.add('mobile-view');
        });
    } else {
        cards.forEach(card => {
            card.classList.remove('mobile-view');
        });
    }
}

// Run on load and resize
window.addEventListener('load', checkResponsive);
window.addEventListener('resize', checkResponsive);