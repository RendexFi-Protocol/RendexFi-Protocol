// NAVIGATION TOGGLE FÜR MOBILE
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navContainer = document.getElementById('navContainer');
    
    if (navToggle && navContainer) {
        // Mobile Menü ein-/ausblenden
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navContainer.classList.toggle('active');
        });
        
        // Menü schließen bei Klick außerhalb
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target) && !navToggle.contains(e.target)) {
                navContainer.classList.remove('active');
            }
        });
        
        // Menü schließen bei Link-Klick (für Single Page)
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navContainer.classList.remove('active');
            });
        });
    }
    
    // SCROLL-EFFEKT FÜR NAVBAR
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                document.body.classList.add('scrolled');
                navbar.style.background = 'rgba(10, 16, 36, 0.95)';
            } else {
                document.body.classList.remove('scrolled');
                navbar.style.background = 'rgba(10, 16, 36, 0.85)';
            }
        }
    });
    
    // GLATTE SCROLL-ANIMATION FÜR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Nur für interne Links (#...)
            if (href !== '#') {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Abstand für Navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // FEATURE CARDS HOVER-EFFEKT VERBESSERT
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // FAQ ACCORDION
    const faqItems = document.querySelectorAll('details');
    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Schließe andere geöffnete Items (optional)
                faqItems.forEach(otherItem => {
                    if (otherItem !== this && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });
    
    // STATS COUNTER ANIMATION (wenn sichtbar)
    function animateStats() {
        const stats = document.querySelector('.stats');
        if (stats && isElementInViewport(stats)) {
            const statNumbers = document.querySelectorAll('.stat strong');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, 50);
            });
            
            // Entferne Event Listener nach Ausführung
            window.removeEventListener('scroll', animateStatsOnScroll);
        }
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Statistik-Animation bei Scroll triggern
    function animateStatsOnScroll() {
        animateStats();
    }
    
    window.addEventListener('scroll', animateStatsOnScroll);
    // Auch beim Laden prüfen
    animateStats();
});