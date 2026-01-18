// HLRP Gorebox Project - Улучшенный скрипт с частицами

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎮 HLRP Gorebox RP Проект', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
    console.log('%cСайт успешно загружен с анимированными частицами!', 'color: #10b981;');
    
    // ===== ПЕРЕМЕННЫЕ =====
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    // ===== СОЗДАНИЕ АНИМИРОВАННЫХ ЧАСТИЦ =====
    function createParticles() {
        // Количество частиц в зависимости от размера экрана
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Случайный размер частицы (2-6px)
            const size = Math.random() * 4 + 2;
            
            // Случайное начальное положение
            const left = Math.random() * 100;
            
            // Случайная анимация
            const duration = Math.random() * 20 + 10; // 10-30 секунд
            const delay = Math.random() * 5; // Задержка до 5 секунд
            
            // Случайное смещение по X
            const moveX = (Math.random() - 0.5) * 100;
            
            // Цвет частицы (синие оттенки)
            const hue = 210 + Math.random() * 30; // 210-240 (синие)
            const saturation = 70 + Math.random() * 30; // 70-100%
            const lightness = 50 + Math.random() * 20; // 50-70%
            
            // Применяем стили
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                background: radial-gradient(circle, 
                    hsla(${hue}, ${saturation}%, ${lightness}%, 0.8),
                    hsla(${hue}, ${saturation}%, ${lightness}%, 0) 70%);
                animation: particle-float ${duration}s linear ${delay}s infinite;
                --move-x: ${moveX}px;
                box-shadow: 0 0 ${size * 2}px hsla(${hue}, ${saturation}%, ${lightness}%, 0.5);
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    }
    
    // ===== ИНИЦИАЛИЗАЦИЯ ЧАСТИЦ =====
    createParticles();
    
    // Пересоздание частиц при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            particlesContainer.innerHTML = '';
            createParticles();
        }, 250);
    });
    
    // ===== МОБИЛЬНОЕ МЕНЮ =====
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuToggle.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // ===== ПЛАВНАЯ НАВИГАЦИЯ И АКТИВНЫЕ ССЫЛКИ =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем active у всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            // Добавляем active текущей ссылке
            this.classList.add('active');
            
            // Прокрутка к секции
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Обновление активной ссылки при скролле
    function updateActiveLink() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== ПАРАЛЛАКС ЭФФЕКТ ДЛЯ ЧАСТИЦ =====
    function updateParticlesParallax() {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            particle.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // ===== АНИМАЦИЯ РЕЖИМОВ ПРИ СКРОЛЛЕ =====
    function animateOnScroll() {
        const modeCards = document.querySelectorAll('.mode-card');
        const scrollPosition = window.scrollY + window.innerHeight;
        
        modeCards.forEach((card, index) => {
            const cardPosition = card.offsetTop;
            
            if (scrollPosition > cardPosition + 100) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }
    
    // ===== АНИМАЦИЯ ПРИ НАВЕДЕНИИ НА КАРТОЧКИ =====
    const modeCards = document.querySelectorAll('.mode-card');
    modeCards.forEach(card => {
        // Добавляем эффект волны
        card.classList.add('wave-effect');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
            
            // Добавляем свечение
            const bgType = this.getAttribute('data-mode');
            let glowColor;
            
            switch(bgType) {
                case 'stalker':
                    glowColor = 'rgba(245, 158, 11, 0.3)';
                    break;
                case 'scp':
                    glowColor = 'rgba(239, 68, 68, 0.3)';
                    break;
                case 'metro':
                    glowColor = 'rgba(139, 92, 246, 0.3)';
                    break;
                default:
                    glowColor = 'rgba(59, 130, 246, 0.3)';
            }
            
            this.style.boxShadow += `, 0 0 30px ${glowColor}`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });
    });
    
    // ===== АНИМАЦИЯ КНОПОК =====
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-play');
    buttons.forEach(btn => {
        btn.classList.add('btn-glow');
        
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Эффект клика
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
        });
    });
    
    // ===== АНИМАЦИЯ ЗАГРУЗКИ =====
    function initializeAnimations() {
        // Инициализация режимов (скрыты в начале)
        modeCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
        });
        
        // Анимация заголовка
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.classList.add('pulse-text');
        }
        
        // Анимация логотипа
        const logoGlow = document.querySelector('.logo-glow');
        if (logoGlow) {
            setInterval(() => {
                const intensity = 0.3 + Math.random() * 0.2;
                logoGlow.style.opacity = intensity;
                logoGlow.style.transform = `scale(${0.9 + Math.random() * 0.2})`;
            }, 2000);
        }
    }
    
    // ===== ОБРАБОТЧИКИ СОБЫТИЙ СКРОЛЛА =====
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Обновление активной ссылки
        updateActiveLink();
        
        // Параллакс для частиц
        updateParticlesParallax();
        
        // Анимация карточек
        animateOnScroll();
        
        // Эффект скролла для шапки
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Отложенная анимация для производительности
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(animateOnScroll, 100);
    });
    
    // ===== ДОПОЛНИТЕЛЬНЫЕ АНИМАЦИИ =====
    
    // Анимация плавающих кубов
    const floatingCubes = document.querySelectorAll('.floating-cube');
    floatingCubes.forEach((cube, index) => {
        // Случайная задержка и скорость
        const delay = index * 0.5;
        const duration = 6 + Math.random() * 2;
        
        cube.style.animationDelay = `${delay}s`;
        cube.style.animationDuration = `${duration}s`;
        
        // Добавляем мерцание
        setInterval(() => {
            const opacity = 0.7 + Math.random() * 0.3;
            cube.style.opacity = opacity;
        }, 2000 + Math.random() * 3000);
    });
    
    // Анимация центрального свечения
    const centralGlow = document.querySelector('.central-glow');
    if (centralGlow) {
        setInterval(() => {
            const size = 180 + Math.random() * 40;
            centralGlow.style.width = `${size}px`;
            centralGlow.style.height = `${size}px`;
        }, 3000);
    }
    
    // ===== ИНИЦИАЛИЗАЦИЯ =====
    initializeAnimations();
    
    // Первоначальная анимация карточек
    setTimeout(() => {
        animateOnScroll();
    }, 500);
    
    // ===== ДЕМОНСТРАЦИОННЫЕ ЭФФЕКТЫ =====
    
    // Случайные вспышки частиц
    setInterval(() => {
        const particles = document.querySelectorAll('.particle');
        if (particles.length > 0) {
            const randomParticle = particles[Math.floor(Math.random() * particles.length)];
            
            // Вспышка
            randomParticle.style.transform = 'scale(2)';
            randomParticle.style.opacity = '1';
            
            // Возврат к нормальному состоянию
            setTimeout(() => {
                randomParticle.style.transform = '';
                randomParticle.style.opacity = '';
            }, 300);
        }
    }, 3000);
    
    // Консольное приветствие
    console.log('%c✨ Анимированные частицы созданы!', 'color: #60a5fa;');
    console.log('%c🎯 Режимы: Сталкер RP | SCP RP | Метро 2033 RP', 'color: #8b5cf6;');
    console.log('%c📱 Telegram: @HLRPproject', 'color: #25d366;');
});

// ===== ТЕЛЕГРАМ ВИДЖЕТ =====
function initTelegramWidget() {
    const telegramLinks = document.querySelectorAll('.channel-join, .btn-telegram');
    
    telegramLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // В зависимости от кнопки открываем разные ссылки
            let url = 'https://t.me/HLRPproject';
            
            if (this.textContent.includes('чат') || this.getAttribute('href')?.includes('chat')) {
                url = 'https://t.me/HLRP_chat';
            } else if (this.textContent.includes('поддерж') || this.getAttribute('href')?.includes('support')) {
                url = 'https://t.me/HLRP_support';
            }
            
            // Открываем ссылку
            window.open(url, '_blank');
            
            // Показываем уведомление
            showTelegramNotification(this);
        });
    });
    
    // Анимация статистики
    animateTelegramStats();
}

function showTelegramNotification(button) {
    const messages = [
        "Отлично! Вы переходите в наш Telegram",
        "Там вам обязательно помогут!",
        "Присоединяйтесь к сообществу!",
        "Техподдержка ответит на все вопросы",
        "Добро пожаловать в наш чат!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const notification = document.createElement('div');
    notification.className = 'telegram-notification';
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fab fa-telegram"></i>
        </div>
        <div class="notification-content">
            <h4>Переходим в Telegram!</h4>
            <p>${randomMessage}</p>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #25d366, #128C7E);
        color: white;
        border-radius: var(--border-radius);
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideDown 0.3s ease-out;
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Закрытие уведомления
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Автозакрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideUp 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Анимации для уведомлений
    const style = document.createElement('style');
    if (!document.querySelector('#telegram-animations')) {
        style.id = 'telegram-animations';
        style.textContent = `
            @keyframes slideDown {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-100%);
                    opacity: 0;
                }
            }
            
            .notification-icon {
                font-size: 2rem;
            }
            
            .notification-content h4 {
                margin: 0 0 5px 0;
                font-size: 1.1rem;
            }
            
            .notification-content p {
                margin: 0;
                opacity: 0.9;
                font-size: 0.9rem;
            }
            
            .notification-close {
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
                margin-left: auto;
                padding: 5px;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
}

function animateTelegramStats() {
    const stats = document.querySelectorAll('.stat span');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const number = parseInt(originalText);
        
        if (!isNaN(number)) {
            // Анимация числа
            let current = 0;
            const increment = Math.ceil(number / 50);
            const interval = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(interval);
                }
                stat.textContent = current + '+ участников';
            }, 30);
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // ... остальной код ...
    
    // Инициализируем Telegram виджет
    initTelegramWidget();
    
    console.log('%c📱 Telegram виджет загружен!', 'color: #25d366; font-weight: bold;');
});