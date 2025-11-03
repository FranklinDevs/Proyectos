// Funciones para el modal de video
document.addEventListener("DOMContentLoaded", function () {
  const videoTrigger = document.getElementById("videoTrigger");
  const videoModal = document.getElementById("videoModal");
  const closeModal = document.getElementById("closeModal");
  const modalVideoIframe = document.getElementById("modalVideoIframe");
  const originalIframe = document.querySelector(".video-container iframe");

  // Obtener la URL del video original
  const originalSrc = originalIframe.src;

  // Abrir modal al hacer clic en el video
  videoTrigger.addEventListener("click", function () {
    videoModal.classList.add("active");
    // Cargar el video con autoplay en el modal
    modalVideoIframe.src = originalSrc + "&autoplay=1";
    document.body.style.overflow = "hidden"; // Prevenir scroll
  });

  // Cerrar modal
  function closeVideoModal() {
    videoModal.classList.remove("active");
    // Detener el video al cerrar el modal
    modalVideoIframe.src = "about:blank";
    document.body.style.overflow = "auto"; // Permitir scroll nuevamente
  }

  closeModal.addEventListener("click", closeVideoModal);

  // Cerrar modal al hacer clic fuera del video
  videoModal.addEventListener("click", function (e) {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  // Cerrar modal con la tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && videoModal.classList.contains("active")) {
      closeVideoModal();
    }
  });
});

// Funciones para el modal de imágenes (MODAL)
let currentImageIndex = 0;
const images = Array.from(document.querySelectorAll(".miniatura"));

function abrirModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("imgModal");
  const loading = document.createElement("div");
  loading.className = "modal-loading";

  modal.appendChild(loading);
  modal.style.display = "block";

  // Forzar reflow para activar la transición
  void modal.offsetWidth;

  modal.classList.add("show");

  // Simular carga de imagen
  modalImg.onload = function () {
    modal.removeChild(loading);
  };

  modalImg.src = img.src;
  currentImageIndex = images.indexOf(img);
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");

  // Esperar a que termine la animación antes de ocultar
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Navegación entre imágenes (opcional)
function navigateImages(direction) {
  currentImageIndex += direction;

  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }

  abrirModal(images[currentImageIndex]);
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    cerrarModal();
  }
};

// Eventos de teclado
document.onkeydown = function (e) {
  const modal = document.getElementById("modal");
  if (modal.style.display === "block") {
    if (e.key === "Escape") {
      cerrarModal();
    } else if (e.key === "ArrowRight") {
      navigateImages(1);
    } else if (e.key === "ArrowLeft") {
      navigateImages(-1);
    }
  }
};



// ENVIARAGMAIL (FORMULARIO GMAIL)
// Función para enviar formulario a Gmail
function enviarAGmail(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("telefono").value;
  const mensaje = document.getElementById("mensaje").value;

  const asunto = "Consulta sobre software";
  const cuerpo = `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nMensaje:\n${mensaje}`;
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=rs.siamsoft@gmail.com&su=${encodeURIComponent(
    asunto
  )}&body=${encodeURIComponent(cuerpo)}`;

  window.open(gmailLink, "_blank");
  document.querySelector(".formulario-gmail").reset();
}
