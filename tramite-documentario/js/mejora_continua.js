// ========== MÓDULO PRINCIPAL ==========
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar todos los componentes
  Carousel.init();
  CycleSteps.animate();
  CaseStudies.initHoverEffects();
  Metrics.animate();
  MobileMenu.setup();
  NavbarScroll.setup();
});

// ========== MÓDULO DEL CARRUSEL ==========
const Carousel = {
  // Propiedades
  carousel: null,
  items: [],
  prevBtn: null,
  nextBtn: null,
  indicators: [],
  currentIndex: 0,
  intervalId: null,
  intervalDuration: 5000,

  // Inicializar el carrusel
  init: function() {
    this.carousel = document.querySelector(".carousel");
    if (!this.carousel) return;
    
    this.items = this.carousel.querySelectorAll(".carousel-item");
    this.prevBtn = this.carousel.querySelector(".prev");
    this.nextBtn = this.carousel.querySelector(".next");
    this.indicators = this.carousel.querySelectorAll(".indicator");

    this.setupEventListeners();
    this.showSlide(0);
    this.startInterval();
  },

  // Mostrar slide específico
  showSlide: function(index) {
    this.items.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-hidden", "true");
    });

    this.indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    this.items[index].classList.add("active");
    this.items[index].setAttribute("aria-hidden", "false");
    this.indicators[index].classList.add("active");
    this.currentIndex = index;
    this.resetInterval();
  },

  // Slide siguiente
  nextSlide: function() {
    const newIndex = (this.currentIndex + 1) % this.items.length;
    this.showSlide(newIndex);
  },

  // Slide anterior
  prevSlide: function() {
    const newIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.showSlide(newIndex);
  },

  // Iniciar intervalo automático
  startInterval: function() {
    this.intervalId = setInterval(() => this.nextSlide(), this.intervalDuration);
  },

  // Reiniciar intervalo
  resetInterval: function() {
    clearInterval(this.intervalId);
    this.startInterval();
  },

  // Configurar event listeners
  setupEventListeners: function() {
    this.nextBtn.addEventListener("click", () => this.nextSlide());
    this.prevBtn.addEventListener("click", () => this.prevSlide());

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.showSlide(index));
    });

    this.carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") this.nextSlide();
      else if (e.key === "ArrowLeft") this.prevSlide();
    });

    this.carousel.addEventListener("mouseenter", () => clearInterval(this.intervalId));
    this.carousel.addEventListener("mouseleave", () => this.startInterval());
  }
};

// ========== MÓDULO DE PASOS DEL CICLO ==========
const CycleSteps = {
  // Animar pasos del ciclo
  animate: function() {
    const steps = document.querySelectorAll(".cycle-step");
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    steps.forEach((step, index) => {
      step.style.opacity = "0";
      step.style.transform = "translateY(20px)";
      step.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
      observer.observe(step);
    });
  }
};

// ========== MÓDULO DE CASOS DE ESTUDIO ==========
const CaseStudies = {
  // Inicializar efectos hover
  initHoverEffects: function() {
    const caseStudies = document.querySelectorAll(".case-study");
    
    caseStudies.forEach((study) => {
      study.addEventListener("mouseenter", () => {
        study.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      });

      study.addEventListener("mouseleave", () => {
        study.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      });
    });
  }
};

// ========== MÓDULO DE MÉTRICAS ==========
const Metrics = {
  // Animar métricas
  animate: function() {
    const metrics = document.querySelectorAll(".metric-value");
    if (!metrics.length) return;

    metrics.forEach((metric) => {
      const originalValue = metric.textContent;

      if (originalValue.includes("%")) {
        const targetValue = parseInt(originalValue);
        let currentValue = 0;
        const duration = 1000;
        const increment = targetValue / (duration / 16);

        const animate = () => {
          currentValue += increment;
          if (currentValue < targetValue) {
            metric.textContent = Math.round(currentValue) + "%";
            requestAnimationFrame(animate);
          } else {
            metric.textContent = originalValue;
          }
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate();
              observer.unobserve(entry.target);
            }
          });
        });

        observer.observe(metric);
      }
    });
  }
};

// ========== MÓDULO DE MENÚ MÓVIL ==========
const MobileMenu = {
  // Configurar menú móvil
  setup: function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav-links");
    
    if (!hamburgerMenu || !navMenu) return;
    
    hamburgerMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburgerMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    });
  }
};

// ========== MÓDULO DE NAVEGACIÓN CON SCROLL ==========
const NavbarScroll = {
  // Configurar efecto de scroll en navbar
  setup: function() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
};