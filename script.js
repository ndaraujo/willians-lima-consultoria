// REFATORADO: Adiciona o "use strict" para melhores práticas
"use strict";

// REFATORADO: Envolve todo o código em DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {

    // Função para o menu mobile
    const mobileMenu = () => {
        // ... (código do menu que já fizemos)
        const menuIcon = document.querySelector('.mobile-menu-icon');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-links li');
        const body = document.querySelector('body');

        // Adiciona um 'null check' para segurança, caso os elementos não existam
        if (!menuIcon || !navLinks || !navLinksItems || !body) {
            console.warn("Elementos do menu mobile não encontrados.");
            return;
        }

        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuIcon.classList.toggle('toggle');
            body.classList.toggle('nav-open');

            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        navLinksItems.forEach((link) => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove("nav-active");
                    menuIcon.classList.remove("toggle");
                    body.classList.remove("nav-open");
                    navLinksItems.forEach((item) => {
                        item.style.animation = "";
                    });
                }
            });
        });
    };

    // Função para o slider de depoimentos
    const initTestimonialSlider = () => {
        const slider = document.querySelector(".testimonials-slider");
        
        // Esta verificação de 'slider' já é uma ótima prática
        if (!slider) return;

        const slides = document.querySelectorAll(".testimonial-slide");
        const prevButton = document.getElementById("prev-slide");
        const nextButton = document.getElementById("next-slide");

        // Mais 'null checks' para robustez
        if (!slides.length || !prevButton || !nextButton) {
            console.warn("Elementos do slider de depoimentos não encontrados.");
            return;
        }

        let currentIndex = 0;

        const goToSlide = (index) => {
            // Verifica se o slide[0] existe antes de tentar ler 'clientWidth'
            if (slides[0]) {
                const slideWidth = slides[0].clientWidth;
                slider.style.transform = `translateX(-${index * slideWidth}px)`;
                currentIndex = index;
            }
        };

        nextButton.addEventListener("click", () => {
            let nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
        });

        prevButton.addEventListener("click", () => {
            let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        });

        window.addEventListener('resize', () => {
            // Recalcula a posição no resize
            goToSlide(currentIndex);
        });

        // Inicia o slider na posição correta
        goToSlide(0);
    };

    // Inicia as funções
    mobileMenu();
    initTestimonialSlider();

}); // Fim do DOMContentLoaded