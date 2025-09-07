// Language switching functionality
let currentLanguage = 'pt'; // Default language

function switchLanguage() {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    
    // Update all elements with language attributes
    const elementsWithLang = document.querySelectorAll('[data-pt][data-en]');
    elementsWithLang.forEach(element => {
        const newText = element.getAttribute(`data-${currentLanguage}`);
        if (newText) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = newText;
            } else {
                element.innerHTML = newText;
            }
        }
    });
    
    // Update language button
    const langBtn = document.getElementById('lang-toggle');
    const langFlag = langBtn.querySelector('.lang-flag');
    const langText = langBtn.querySelector('.lang-text');
    
    if (currentLanguage === 'en') {
        langFlag.textContent = '🇧🇷';
        langText.textContent = 'PT';
        document.documentElement.lang = 'en';
    } else {
        langFlag.textContent = '🇺🇸';
        langText.textContent = 'EN';
        document.documentElement.lang = 'pt-BR';
    }
    
    // Save language preference
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        switchLanguage();
    }
    
    // Language toggle functionality
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', switchLanguage);
    }
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                bar.style.transform = navMenu.classList.contains('active') 
                    ? `rotate(${index === 0 ? '45deg' : index === 1 ? '0deg' : '-45deg'})`
                    : 'rotate(0deg)';
                if (index === 1) {
                    bar.style.opacity = navMenu.classList.contains('active') ? '0' : '1';
                }
            });
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                // Reset hamburger animation
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    bar.style.transform = 'rotate(0deg)';
                    if (index === 1) bar.style.opacity = '1';
                });
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero buttons smooth scroll
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (index === 0) {
                // Projects button
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    const offsetTop = projectsSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Contact button
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.display = 'block';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Show success message (in a real app, you'd send this to a server)
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Animate statistics when in view
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });
    
    // Add scroll-based navbar background
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class based on scroll position
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.geometric-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Add entrance animations for sections
    const animatedSections = document.querySelectorAll('.about, .portfolio, .skills, .contact');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Add hover effects for portfolio items
    const portfolioItemsAll = document.querySelectorAll('.portfolio-item');
    portfolioItemsAll.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add subtle rotation and scale
            this.style.transform = 'translateY(-10px) rotate(1deg) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });
    
    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Add smooth reveal animation for form inputs
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateX(-30px)';
        group.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // Add custom cursor effect
    // const cursor = document.createElement('div');
    // cursor.className = 'custom-cursor';
    // cursor.style.cssText = `
    //     position: fixed;
    //     width: 20px;
    //     height: 20px;
    //     background: rgba(139, 69, 19, 0.3);
    //     border-radius: 50%;
    //     pointer-events: none;
    //     z-index: 9999;
    //     transition: transform 0.1s ease;
    //     display: none;
    // `;
    // document.body.appendChild(cursor);
    
    // document.addEventListener('mousemove', (e) => {
    //     cursor.style.left = e.clientX - 10 + 'px';
    //     cursor.style.top = e.clientY - 10 + 'px';
    //     cursor.style.display = 'block';
    // });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, .nav-link, .social-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(218, 165, 32, 0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(139, 69, 19, 0.3)';
        });
    });
    
    // Preloader (optional)
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #FAF9F6;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid #CD853F;
        border-top: 3px solid #8B4513;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .scrolled {
            background: rgba(250, 249, 246, 0.98) !important;
            box-shadow: 0 2px 20px rgba(139, 69, 19, 0.1) !important;
        }
    `;
    document.head.appendChild(style);
    
    preloader.appendChild(spinner);
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
});

// Toggle expand/collapse functionality
function toggleContent(section) {
    const content = document.getElementById(section + '-content');
    const button = content.previousElementSibling;
    const arrow = button.querySelector('.expand-arrow');
    const text = button.querySelector('.expand-text');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        button.classList.remove('expanded');
        if (section === 'literatura') {
            text.textContent = currentLanguage === 'pt' ? 'Ver Instagram' : 'View Instagram';
        } else {
            text.textContent = currentLanguage === 'pt' ? 'Ver Fotos' : 'View Photos';
        }
    } else {
        content.classList.add('expanded');
        button.classList.add('expanded');
        if (section === 'literatura') {
            text.textContent = currentLanguage === 'pt' ? 'Ocultar Instagram' : 'Hide Instagram';
        } else {
            text.textContent = currentLanguage === 'pt' ? 'Ocultar Fotos' : 'Hide Photos';
        }
    }
}

// Service worker registration for better performance
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}