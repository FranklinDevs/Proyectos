 // Función para inicializar el carrusel
        function initCarousel() {
            const carousel = document.querySelector(".carousel");
            const inner = carousel.querySelector(".carousel-inner");
            const items = carousel.querySelectorAll(".carousel-item");
            const prevBtn = carousel.querySelector(".prev");
            const nextBtn = carousel.querySelector(".next");
            const indicators = carousel.querySelectorAll(".indicator");

            let currentIndex = 0;
            let intervalId = null;
            const intervalDuration = 5000;

            function showSlide(index) {
                items.forEach((item) => {
                    item.classList.remove("active");
                    item.setAttribute("aria-hidden", "true");
                });

                indicators.forEach((indicator) => {
                    indicator.classList.remove("active");
                });

                items[index].classList.add("active");
                items[index].setAttribute("aria-hidden", "false");
                indicators[index].classList.add("active");
                currentIndex = index;
                resetInterval();
            }

            function nextSlide() {
                const newIndex = (currentIndex + 1) % items.length;
                showSlide(newIndex);
            }

            function prevSlide() {
                const newIndex = (currentIndex - 1 + items.length) % items.length;
                showSlide(newIndex);
            }

            function startInterval() {
                intervalId = setInterval(nextSlide, intervalDuration);
            }

            function resetInterval() {
                clearInterval(intervalId);
                startInterval();
            }

            nextBtn.addEventListener("click", () => {
                nextSlide();
            });

            prevBtn.addEventListener("click", () => {
                prevSlide();
            });

            indicators.forEach((indicator, index) => {
                indicator.addEventListener("click", () => {
                    showSlide(index);
                });
            });

            carousel.addEventListener("keydown", (e) => {
                if (e.key === "ArrowRight") {
                    nextSlide();
                } else if (e.key === "ArrowLeft") {
                    prevSlide();
                }
            });

            carousel.addEventListener("mouseenter", () => {
                clearInterval(intervalId);
            });

            carousel.addEventListener("mouseleave", () => {
                startInterval();
            });

            showSlide(0);
            startInterval();
        }

        // Función para animar los pasos del proceso
        function animateProcessSteps() {
            const steps = document.querySelectorAll(".process-steps li");

            steps.forEach((step, index) => {
                step.style.opacity = "0";
                step.style.transform = "translateX(-20px)";
                step.style.transition = `opacity 0.5s ease ${
                    index * 0.2
                }s, transform 0.5s ease ${index * 0.2}s`;

                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                entry.target.style.opacity = "1";
                                entry.target.style.transform = "translateX(0)";
                            }
                        });
                    },
                    { threshold: 0.1 }
                );

                observer.observe(step);
            });
        }

        // Función para manejar el menú hamburguesa
        function setupMobileMenu() {
            const hamburgerMenu = document.querySelector(".hamburger-menu");
            const navMenu = document.querySelector(".nav-links");
            
            hamburgerMenu.addEventListener("click", () => {
                navMenu.classList.toggle("active");
                hamburgerMenu.classList.toggle("active");
            });
        }

        // Función para cambiar el navbar al hacer scroll
        function setupNavbarScroll() {
            const navbar = document.querySelector(".navbar");
            
            window.addEventListener("scroll", () => {
                if (window.scrollY > 50) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            });
        }

        // Inicialización cuando el DOM está listo
        document.addEventListener("DOMContentLoaded", function () {
            initCarousel();
            animateProcessSteps();
            setupMobileMenu();
            setupNavbarScroll();
        });