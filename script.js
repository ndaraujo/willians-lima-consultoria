// 1. Controle do Menu Mobile
const initMobileMenu = () => {
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    const body = document.body;

    if (!menuIcon || !navLinks) return;

    const closeMenu = () => {
        navLinks.classList.remove('nav-active');
        menuIcon.classList.remove('toggle');
        body.classList.remove('nav-open');
    };

    const toggleMenu = () => {
        navLinks.classList.toggle('nav-active');
        menuIcon.classList.toggle('toggle');
        body.classList.toggle('nav-open');
    };

    menuIcon.addEventListener('click', toggleMenu);

    navLinksItems.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
};

// 2. Efeito Spotlight nos Cards (Luz seguindo o mouse)
const initSpotlightEffect = () => {
    const cards = document.querySelectorAll('.spotlight-card');

    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
};

// 3. Funcionalidade do Slider de Depoimentos (Desktop)
const initTestimonialSlider = () => {
    const slider = document.querySelector(".testimonials-slider");
    if (!slider) return;

    const slides = document.querySelectorAll(".testimonial-slide");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");

    if (!prevButton || !nextButton || slides.length === 0) return;

    let currentIndex = 0;
    let slideWidth = slides[0].clientWidth;

    const goToSlide = (index) => {
        if (slides[0].clientWidth !== slideWidth) {
             slideWidth = slides[0].clientWidth;
        }
        slider.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
    };

    nextButton.addEventListener("click", () => {
        let nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    });

    prevButton.addEventListener("click", () => {
        let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
             if (slides[0].clientWidth !== slideWidth) {
                 goToSlide(currentIndex);
             }
        }, 250);
    });

    goToSlide(currentIndex);
};

// Inicialização de todas as funções ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSpotlightEffect();
    initTestimonialSlider();
});