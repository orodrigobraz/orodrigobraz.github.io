// Funcionalidade de troca de idioma
let currentLanguage = 'pt'; // Idioma padrão

function switchLanguage() {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    
    // Atualiza todos os elementos com atributos de idioma
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
    
    // Atualiza o botão de download do CV especificamente
    const downloadCvBtn = document.getElementById('download-cv');
    if (downloadCvBtn) {
        const newText = downloadCvBtn.getAttribute(`data-${currentLanguage}`);
        if (newText) {
            downloadCvBtn.innerHTML = newText;
        }
    }
    
    // Atualiza o botão de idioma
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
    
    // Salva a preferência de idioma
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// Rolagem suave para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Carrega a preferência de idioma salva
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        switchLanguage();
    }
    
    // Funcionalidade de troca de idioma
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', switchLanguage);
    }
    // Alternância do menu de navegação mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animação do menu hambúrguer
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
    
    // Fecha o menu mobile ao clicar nos links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                // Reseta a animação do hambúrguer
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    bar.style.transform = 'rotate(0deg)';
                    if (index === 1) bar.style.opacity = '1';
                });
            }
        });
    });
    
    // Rolagem suave para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Compensa a navbar fixa
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Rolagem suave para botões da seção hero
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (index === 0) {
                // Botão de projetos
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    const offsetTop = projectsSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else if (index === 1) {
                // Botão de contato
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else if (index === 2) {
                // Botão de download do CV
                downloadCV();
            }
        });
    });
    
    // Funcionalidade de filtro do portfólio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe ativa ao botão clicado
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
    
    // Manipulação do formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtém os valores do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validação simples
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Exibe mensagem de sucesso (em um app real, enviaria para o servidor)
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Reseta o formulário
            this.reset();
        });
    }
    
    // Função de validação de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Contador animado para estatísticas
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
    
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Anima estatísticas quando visíveis
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
    
    // Anima barras de habilidades quando visíveis
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
    
    // Adiciona fundo à navbar ao rolar a página
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adiciona/remove classe scrolled conforme a rolagem
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Esconde/mostra navbar ao rolar
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Rolando para baixo
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Rolando para cima
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Indicador de progresso de rolagem
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    if (scrollProgressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            scrollProgressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Efeito parallax na seção hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.geometric-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Animação de entrada para seções
    const animatedSections = document.querySelectorAll('.about, .experience, .projects, .skills, .contact, .beyond-resume');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Anima cards dentro da seção
                const cards = entry.target.querySelectorAll('.experience-item, .project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Adiciona efeito hover aos itens do portfólio
    const portfolioItemsAll = document.querySelectorAll('.portfolio-item');
    portfolioItemsAll.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Adiciona rotação e escala sutis
            this.style.transform = 'translateY(-10px) rotate(1deg) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });
    
    // Efeito de digitação no título da seção hero
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
    
    // Animação suave de revelação para inputs do formulário
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
    
    // Adiciona efeito hover para elementos interativos
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
    
    // Preloader (opcional)
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
    
    // Adiciona animação de rotação
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
    
    // Esconde o preloader após o carregamento da página
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
});

// Funcionalidade de expandir/recolher
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

// Função para download do CV
function downloadCV() {
    const fileName = currentLanguage === 'pt' 
        ? 'Rodrigo Braz de Oliveira-cv.pdf' 
        : 'Rodrigo Braz de Oliveira-cv-en.pdf';
    
    const filePath = `CV-PDF/${fileName}`;
    
    // Criar um link temporário para download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.target = '_blank';
    
    // Adicionar ao DOM, clicar e remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Registro do service worker para melhor desempenho
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado: ', registration);
            })
            .catch(registrationError => {
                console.log('Falha ao registrar SW: ', registrationError);
            });
    });
}