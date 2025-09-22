// ========== MÓDULO PRINCIPAL DE INICIALIZACIÓN ==========
const App = {
    // Inicialización cuando el DOM está listo
    init: function() {
        this.initCarousel();
        this.animateProcessSteps();
        this.setupMobileMenu();
        this.setupNavbarScroll();
        this.initCardHoverEffects();
        
        // Inicializar gráficos después de que se carguen todos los recursos
        window.addEventListener('load', () => {
            // Pequeño retraso para asegurar que los canvas estén listos
            setTimeout(this.initCharts.bind(this), 100);
        });
    },
    
    // ========== MÓDULO DEL CARRUSEL ==========
    initCarousel: function() {
        const carousel = document.querySelector(".carousel");
        if (!carousel) return; // Salir si no existe el carrusel
        
        const inner = carousel.querySelector(".carousel-inner");
        const items = carousel.querySelectorAll(".carousel-item");
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");
        const indicators = carousel.querySelectorAll(".indicator");

        let currentIndex = 0;
        let intervalId = null;
        const intervalDuration = 5000;

        const showSlide = (index) => {
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
        };

        const nextSlide = () => {
            const newIndex = (currentIndex + 1) % items.length;
            showSlide(newIndex);
        };

        const prevSlide = () => {
            const newIndex = (currentIndex - 1 + items.length) % items.length;
            showSlide(newIndex);
        };

        const startInterval = () => {
            intervalId = setInterval(nextSlide, intervalDuration);
        };

        const resetInterval = () => {
            clearInterval(intervalId);
            startInterval();
        };

        // Event listeners
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

        // Iniciar carrusel
        showSlide(0);
        startInterval();
    },
    
    // ========== MÓDULO DE ANIMACIONES ==========
    animateProcessSteps: function() {
        const steps = document.querySelectorAll(".process-steps li");
        if (!steps.length) return; // Salir si no hay elementos

        steps.forEach((step, index) => {
            step.style.opacity = "0";
            step.style.transform = "translateX(-20px)";
            step.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;

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
    },
    
    // ========== MÓDULO DE NAVEGACIÓN MÓVIL ==========
    setupMobileMenu: function() {
        const hamburgerMenu = document.querySelector(".hamburger-menu");
        const navMenu = document.querySelector(".nav-links");
        
        if (!hamburgerMenu || !navMenu) return; // Salir si no existen elementos
        
        hamburgerMenu.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburgerMenu.classList.toggle("active");
            hamburgerMenu.setAttribute('aria-expanded', 
                hamburgerMenu.classList.contains('active') ? 'true' : 'false');
        });
        
        // Cerrar menú al hacer clic en un enlace (útil en móviles)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove("active");
                hamburgerMenu.classList.remove("active");
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            });
        });
    },
    
    // ========== MÓDULO DE SCROLL ==========
    setupNavbarScroll: function() {
        const navbar = document.querySelector(".navbar");
        if (!navbar) return; // Salir si no existe la navbar
        
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    },
    
    // ========== MÓDULO DE GRÁFICOS ==========
    initCharts: function() {
        // Verificar si Chart.js está disponible
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js no está cargado. Los gráficos no se inicializarán.');
            return;
        }
        
        this.initProcessingTimeChart();
        this.initMonthlyTrendChart();
    },
    
    initProcessingTimeChart: function() {
        const ctx = document.getElementById("processingTimeChart");
        if (!ctx) return; // Salir si no existe el canvas
        
        new Chart(ctx.getContext("2d"), {
            type: "bar",
            data: {
                labels: [
                    "Registro Civil",
                    "Tributación",
                    "Licencias",
                    "Obras Públicas",
                    "Atención Ciudadana"
                ],
                datasets: [{
                    label: "Tiempo promedio (horas)",
                    data: [2.8, 4.2, 3.5, 5.1, 2.3],
                    backgroundColor: [
                        "rgba(0, 179, 110, 0.7)",
                        "rgba(0, 61, 130, 0.7)",
                        "rgba(255, 107, 0, 0.7)",
                        "rgba(51, 51, 51, 0.7)",
                        "rgba(108, 117, 125, 0.7)",
                    ],
                    borderColor: [
                        "rgba(0, 179, 110, 1)",
                        "rgba(0, 61, 130, 1)",
                        "rgba(255, 107, 0, 1)",
                        "rgba(51, 51, 51, 1)",
                        "rgba(108, 117, 125, 1)",
                    ],
                    borderWidth: 1,
                }],
            },
            options: this.getBarChartOptions()
        });
    },
    
    initMonthlyTrendChart: function() {
        const ctx = document.getElementById("monthlyTrendChart");
        if (!ctx) return; // Salir si no existe el canvas
        
        new Chart(ctx.getContext("2d"), {
            type: "line",
            data: {
                labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                datasets: [{
                    label: "Trámites procesados",
                    data: [850, 1200, 1100, 1400, 1600, 1500, 1800, 1750, 2000, 2200, 2400, 2800],
                    fill: false,
                    backgroundColor: "rgba(0, 179, 110, 0.2)",
                    borderColor: "rgba(0, 179, 110, 1)",
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: "rgba(0, 61, 130, 1)",
                    pointRadius: 5,
                    pointHoverRadius: 7,
                }],
            },
            options: this.getLineChartOptions()
        });
    },
    
    getBarChartOptions: function() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { 
                        display: true, 
                        text: "Horas",
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1) + 'h';
                        }
                    }
                },
                x: {
                    ticks: {
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: { 
                    position: "top",
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y.toFixed(1) + " horas";
                        },
                    },
                },
            },
        };
    },
    
    getLineChartOptions: function() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: { 
                        display: true, 
                        text: "Documentos",
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
            },
            plugins: {
                legend: { 
                    position: "top",
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y.toLocaleString() + " documentos";
                        },
                    },
                },
            },
        };
    },
    
    // ========== MÓDULO DE EFECTOS HOVER ==========
    initCardHoverEffects: function() {
        const cards = document.querySelectorAll(".metric-card, .report-card");
        if (!cards.length) return; // Salir si no hay tarjetas
        
        cards.forEach((card) => {
            // Establecer transición inicial
            card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
            
            card.addEventListener("mouseenter", () => {
                card.style.transform = "translateY(-5px)";
                card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 3px 15px rgba(0, 0, 0, 0.08)";
            });
            
            // Soporte para dispositivos táctiles
            card.addEventListener("touchstart", () => {
                card.style.transform = "translateY(-5px)";
                card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
            }, { passive: true });
            
            card.addEventListener("touchend", () => {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 3px 15px rgba(0, 0, 0, 0.08)";
            }, { passive: true });
        });
    }
};

// ========== POLYFILLS Y COMPATIBILIDAD ==========
// Asegurar compatibilidad con navegadores más antiguos
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    App.init();
});