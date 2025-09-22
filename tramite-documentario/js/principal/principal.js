// Funcionalidad para el menú móvil para celulares
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  let isMenuOpen = false;

  function toggleMobileMenu() {
    if (isMenuOpen) {
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
      hamburgerMenu.classList.remove("active");
    } else {
      navMenu.classList.add("active");
      document.body.style.overflow = "hidden";
      hamburgerMenu.classList.add("active");
    }
    isMenuOpen = !isMenuOpen;
  }

  // Añadir event listeners
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (isMenuOpen) {
        toggleMobileMenu();
      }
    });
  });

  // Cerrar menú al hacer clic fuera de él
  document.addEventListener("click", function (event) {
    if (
      isMenuOpen &&
      !navMenu.contains(event.target) &&
      event.target !== hamburgerMenu
    ) {
      toggleMobileMenu();
    }
  });

  // Cambiar estilo de navbar al hacer scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Cerrar menú al redimensionar la ventana si es grande
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && isMenuOpen) {
      toggleMobileMenu();
    }
  });
});