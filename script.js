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
            } else if (element.tagName === 'LABEL') {
                // Para labels, não altera o innerHTML para evitar interferência com inputs
                return;
            } else if (element.id === 'download-cv') {
                // Para o botão de download do CV, não altera o innerHTML para preservar ícones
                return;
            } else {
                element.innerHTML = newText;
            }
        }
    });
    
    // Atualiza os placeholders do formulário de contato
    const nameInput = document.getElementById('name');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.placeholder = currentLanguage === 'pt' ? 'Digite seu nome' : 'Enter your name';
    }
    if (subjectInput) {
        subjectInput.placeholder = currentLanguage === 'pt' ? 'Digite o assunto da sua mensagem' : 'Enter the subject of your message';
    }
    if (messageInput) {
        messageInput.placeholder = currentLanguage === 'pt' ? 'Digite sua mensagem' : 'Enter your message';
    }
    
    // Atualiza o botão de download do CV especificamente
    const downloadCvBtn = document.getElementById('download-cv');
    if (downloadCvBtn) {
        const newText = downloadCvBtn.getAttribute(`data-${currentLanguage}`);
        if (newText) {
            // Preserva o ícone e atualiza apenas o texto
            const btnText = downloadCvBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = newText;
            }
        }
    }
    
    // Atualiza o texto do trabalho
    const workText = document.querySelector('.work-text');
    if (workText) {
        const newText = workText.getAttribute(`data-${currentLanguage}`);
        if (newText) {
            // Preserva o link da Aptiv existente
            const existingLink = workText.querySelector('.company-link');
            if (existingLink) {
                // Mantém o link existente e apenas atualiza o texto
                workText.innerHTML = newText + '&nbsp;' + existingLink.outerHTML;
            } else {
                // Se não há link, cria um novo
                workText.innerHTML = newText + '&nbsp;<a href="https://www.linkedin.com/company/aptiv/" target="_blank" class="company-link">Aptiv</a>';
            }
        }
    }
    
    // Atualiza o texto do botão de envio do formulário
    const submitBtn = document.querySelector('.contact-form .btn-primary');
    if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) {
            const newText = submitBtn.getAttribute(`data-${currentLanguage}`);
            if (newText) {
                btnText.textContent = newText;
            }
        }
    }
    
    // Atualiza botões com ícones preservando os ícones
    const buttonsWithIcons = document.querySelectorAll('.btn-secondary, .btn-primary[class*="whatsapp"], .btn-primary[class*="download"]');
    buttonsWithIcons.forEach(button => {
        const btnText = button.querySelector('.btn-text');
        if (btnText) {
            const newText = button.getAttribute(`data-${currentLanguage}`);
            if (newText) {
                btnText.textContent = newText;
            }
        }
    });
    
    // Atualiza botões simples (sem ícones) normalmente
    const simpleButtons = document.querySelectorAll('.btn-primary:not([id="download-cv"]):not([class*="whatsapp"]):not([class*="download"])');
    simpleButtons.forEach(button => {
        const newText = button.getAttribute(`data-${currentLanguage}`);
        if (newText) {
            button.innerHTML = newText;
        }
    });
    
    // Preserva ícones de contato que podem estar sendo afetados pela tradução
    const contactIcons = document.querySelectorAll('.contact-icon, .whatsapp-icon, .download-icon');
    contactIcons.forEach(icon => {
        // Garante que os ícones permaneçam visíveis
        icon.style.display = 'inline-block';
        icon.style.visibility = 'visible';
    });
    
    // Atualiza o botão de idioma
    const langBtn = document.getElementById('lang-toggle');
    const langFlag = langBtn.querySelector('.lang-flag');
    const langText = langBtn.querySelector('.lang-text');
    
    if (currentLanguage === 'en') {
        langFlag.src = 'img/brasil.png';
        langFlag.alt = 'Brasil';
        langText.textContent = 'PT';
        document.documentElement.lang = 'en';
    } else {
        langFlag.src = 'img/estados-unidos.png';
        langFlag.alt = 'Estados Unidos';
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
            navToggle.classList.toggle('active');
        });
    }
    
    // Fecha o menu mobile ao clicar nos links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
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
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validação simples
            if (!name || !subject || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Gera a mensagem para o WhatsApp
            const whatsappMessage = `Oi, me chamo ${name}, vim falar sobre ${subject} e essa é a proposta: ${message}`;
            
            // Codifica a mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Número do WhatsApp
            const phoneNumber = '5535984771404';
            
            // Cria o link do WhatsApp
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Abre o WhatsApp em uma nova aba
            window.open(whatsappLink, '_blank');
            
            // Exibe mensagem de sucesso
            alert('Redirecionando para o WhatsApp!');
            
            // Reseta o formulário
            this.reset();
        });
    }
    
    
    // Funcionalidade de copiar e-mail
    const emailCopyElement = document.getElementById('email-copy');
    if (emailCopyElement) {
        emailCopyElement.addEventListener('click', async function() {
            const email = this.textContent;
            
            try {
                // Tenta usar a API de clipboard
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    // Fallback para navegadores mais antigos
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                
                // Feedback visual
                this.classList.add('copied');
                const originalText = this.textContent;
                this.textContent = currentLanguage === 'pt' ? 'E-mail copiado!' : 'Email copied!';
                
                // Restaura o texto original após 2 segundos
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.textContent = originalText;
                }, 2000);
                
            } catch (err) {
                console.error('Erro ao copiar e-mail:', err);
                // Fallback: mostra o e-mail em um prompt
                alert(currentLanguage === 'pt' 
                    ? `E-mail: ${email}\n\nCopie o e-mail acima.` 
                    : `Email: ${email}\n\nCopy the email above.`);
            }
        });
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
    
    // Funcionalidade do carrossel de projetos
    initCarousel();
    
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
            // Efeito hover será implementado via CSS
        });
        
        element.addEventListener('mouseleave', () => {
            // Efeito hover será implementado via CSS
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

// Funcionalidade do carrossel de projetos
function initCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const cards = track.querySelectorAll('.project-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    
    // Criar dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    function updateCarousel() {
        // Detectar se é mobile
        const isMobile = window.innerWidth <= 768;
        
        // Calcular a largura de um card
        let cardWidth;
        if (isMobile) {
            cardWidth = 100 / totalCards; // Porcentagem baseada no número de cards
        } else {
            cardWidth = 500; // 500px no desktop (largura fixa)
        }
        
        const translateX = -currentIndex * cardWidth;
        if (isMobile) {
            track.style.transform = `translateX(${translateX}%)`;
        } else {
            track.style.transform = `translateX(${translateX}px)`;
        }
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Botões sempre habilitados (loop infinito)
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta para o primeiro
        }
        updateCarousel();
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalCards - 1; // Vai para o último
        }
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Ajustar carrossel quando a janela for redimensionada
    window.addEventListener('resize', () => {
        // Ajustar índice se necessário ao redimensionar
        const maxIndex = totalCards - 1;
        
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
            updateCarousel();
        }
    });
    
    // Inicializar
    updateCarousel();
}

// Função para atualizar automaticamente o ano no rodapé
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Atualizar o ano quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentYear();
});

// Atualizar o ano a cada minuto (para casos onde a página fica aberta por muito tempo)
setInterval(updateCurrentYear, 60000);

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