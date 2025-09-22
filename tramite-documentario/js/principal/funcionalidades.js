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

// ===== Funciones para el chatbot SIAMSoft =====
// Objeto que contiene todas las respuestas predefinidas del chatbot
// Está organizado por temas/claves para fácil acceso
const botResponses = {
  hola: `¡Hola! 👋 Soy el asistente de SIAMSoft. ¿En qué puedo ayudarte hoy? Puedes preguntar sobre: 

• Funcionalidades del sistema
• Beneficios
• Solicitar una demo
• Precios`, // Respuesta inicial con emoji y estructura clara

  funcionalidades: `📋 Nuestro sistema incluye:

1. Ubicación virtual de documentos
2. Historial documentario completo
3. Estadísticas y reportes
4. Mejora continua de procesos

¿Te gustaría más detalles sobre alguna en particular?`,

  beneficios: `✨ Beneficios clave:

• Mayor transparencia
• Ahorro de tiempo
• Control documental
• Automatización
• Mejora en atención al ciudadano
• Reducción de costos
• Acceso remoto
• Cumplimiento normativo`,

  demo: `¡Claro! Para solicitar una demostración personalizada:

1. Completa el formulario de contacto
2. Escríbenos a rs.siamsoft@gmail.com
3. Llámanos al +51 996 909 051

¿Quieres que te redirija al formulario ahora?`,

  precio: `💲 Nuestros precios varían según:

• Tamaño de tu organización
• Módulos requeridos
• Personalización

Contáctanos para una cotización exacta adaptada a tus necesidades.`,

  gracias: `¡Gracias por tu interés en SIAMSoft! 😊 ¿Hay algo más en lo que pueda ayudarte?`,

  //  respuestas para preguntas específicas
  ubicacion: `📍 La ubicación virtual de documentos te permite:
  
• Saber exactamente dónde está cada documento en tiempo real
• Reducir tiempos de búsqueda
• Evitar pérdida de documentos
• Acceder desde cualquier lugar

¿Necesitas más información sobre esta funcionalidad?`,

  historial: `🕒 El historial documentario completo incluye:

• Todos los movimientos de cada documento
• Fechas y responsables de cada acción
• Cambios realizados
• Rutas seguidas por el documento

Esto garantiza total trazabilidad y transparencia.`,

  estadisticas: `📊 Nuestro módulo de estadísticas ofrece:

• Reportes personalizados
• Gráficos de gestión documental
• Tiempos promedio de trámite
• Indicadores de eficiencia
• Detección de cuellos de botella

Perfecto para la toma de decisiones estratégicas.`,

  mejora: `🔄 La mejora continua se logra mediante:

• Análisis de procesos documentarios
• Identificación de oportunidades
• Optimización de flujos de trabajo
• Reducción de pasos innecesarios
• Automatización de tareas repetitivas

Todo basado en datos reales del sistema.`,

  contacto: `📩 Puedes contactarnos por:

✉️ Email: rs.siamsoft@gmail.com
📞 Teléfono: +51 996 909 051
📍 Dirección: Pasaje Washington Nº107 Urb. Amauta
🌐 Web: www.siamsoft.net`,

  implementacion: `⏱️ El tiempo de implementación depende de:

• Tamaño de la organización
• Complejidad de los procesos
• Cantidad de usuarios
• Personalizaciones requeridas

Normalmente entre 2 a 4 semanas.`,

  seguridad: `🔒 Nuestro sistema garantiza:

• Encriptación de datos
• Acceso por roles y permisos
• Backup automático
• Auditoría de acciones
• Cumplimiento de normativas de protección de datos`,

  // Respuesta por defecto para consultas no reconocidas
  default: `No entendí tu consulta. Por favor intenta con:

• 'Funcionalidades'
• 'Beneficios'
• 'Demo'
• 'Precio'
• 'Ubicación de documentos'
• 'Historial documentario'
• 'Estadísticas'
• 'Mejora continua'
• 'Contacto'
• 'Implementación'
• 'Seguridad'`,
};

// Función para mostrar/ocultar el chatbox
function toggleSiamsoftChat() {
  const chatBox = document.getElementById("siamsoftChatBox");
  chatBox.style.display =
    chatBox.style.display === "flex" ? "none" : "flex";

  // Mensaje inicial solo la primera vez usando un dataset flag
  if (chatBox.dataset.initialized !== "true") {
    setTimeout(() => {
      addSiamsoftMessage(
        "¡Hola! Soy el asistente de SIAMSoft. Puedes preguntarme sobre nuestro sistema. 😊",
        false
      );
    }, 500); // Retraso para mejor experiencia de usuario
    chatBox.dataset.initialized = "true"; // Marcar como inicializado
  }
}

// Función para añadir mensajes al chat
function addSiamsoftMessage(text, isUser) {
  const chatBody = document.getElementById("siamsoftChatBody");
  const messageDiv = document.createElement("div");
  // Aplica clases CSS diferentes para mensajes de usuario y bot
  messageDiv.className = `chat-message ${isUser ? "user" : "bot"}`;
  messageDiv.textContent = text;
  chatBody.appendChild(messageDiv);

  // Scroll al final del chat
  // Auto-scroll para mantener visible el último mensaje
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Función principal de procesamiento de mensajes
function getBotResponse(message) {
  message = message.toLowerCase(); // Normalizar a minúsculas para comparación
  // Sistema de detección de intención por palabras clave
  // Usa includes() para mayor flexibilidad en lugar de comparación exacta
  if (
    message.includes("hola") ||
    message.includes("buenos días") ||
    message.includes("buenas tardes")
  ) {
    return botResponses["hola"];
  } else if (
    message.includes("funcionalidad") ||
    message.includes("característica") ||
    message.includes("qué hace") ||
    message.includes("que hace")
  ) {
    return botResponses["funcionalidades"];
  } else if (
    message.includes("beneficio") ||
    message.includes("ventaja") ||
    message.includes("por qué") ||
    message.includes("porque")
  ) {
    return botResponses["beneficios"];
  } else if (
    message.includes("demo") ||
    message.includes("demostración") ||
    message.includes("demostracion") ||
    message.includes("probar")
  ) {
    return botResponses["demo"];
  } else if (
    message.includes("precio") ||
    message.includes("costo") ||
    message.includes("cuánto cuesta") ||
    message.includes("cuanto cuesta")
  ) {
    return botResponses["precio"];
  } else if (
    message.includes("gracias") ||
    message.includes("agradecido")
  ) {
    return botResponses["gracias"];
  } else if (
    message.includes("ubicación") ||
    message.includes("ubicacion") ||
    message.includes("localizar") ||
    message.includes("donde está") ||
    message.includes("donde esta")
  ) {
    return botResponses["ubicacion"];
  } else if (
    message.includes("historial") ||
    message.includes("recorrido") ||
    message.includes("movimientos") ||
    message.includes("trazabilidad")
  ) {
    return botResponses["historial"];
  } else if (
    message.includes("estadística") ||
    message.includes("estadistica") ||
    message.includes("reporte") ||
    message.includes("indicador") ||
    message.includes("métrica") ||
    message.includes("metrica")
  ) {
    return botResponses["estadisticas"];
  } else if (
    message.includes("mejora") ||
    message.includes("optimización") ||
    message.includes("optimizacion") ||
    message.includes("eficiencia")
  ) {
    return botResponses["mejora"];
  } else if (
    message.includes("contacto") ||
    message.includes("correo") ||
    message.includes("email") ||
    message.includes("teléfono") ||
    message.includes("telefono") ||
    message.includes("dirección") ||
    message.includes("direccion")
  ) {
    return botResponses["contacto"];
  } else if (
    message.includes("implementación") ||
    message.includes("implementacion") ||
    message.includes("instalación") ||
    message.includes("instalacion") ||
    message.includes("tiempo de configuración") ||
    message.includes("tiempo de configuracion")
  ) {
    return botResponses["implementacion"];
  } else if (
    message.includes("seguridad") ||
    message.includes("protección") ||
    message.includes("proteccion") ||
    message.includes("backup") ||
    message.includes("respaldo") ||
    message.includes("encriptación") ||
    message.includes("encriptacion")
  ) {
    return botResponses["seguridad"];
  } else if (message === "sí" || message === "si") {
    window.location.href = "#contacto";
    return "Perfecto, te he llevado al formulario de contacto. ¡Estamos para ayudarte!";
  } else if (message === "no") {
    return "Entendido. Si cambias de opinión, dime 'demo' y con gusto te ayudo.";
  } else {
    return botResponses["default"]; // Respuesta por defecto
  }
}

// Función que maneja el envío de mensajes
function processSiamsoftMessage() {
  const userMessage = document.getElementById("siamsoftUserMessage");
  const message = userMessage.value.trim(); // Limpiar espacios en blanco

  if (!message) return; // Validación de mensaje vacío

  // Mostrar mensaje del usuario inmediatamente
  addSiamsoftMessage(message, true);
  userMessage.value = ""; // Limpiar el input

  // Simular tiempo de procesamiento con setTimeout
  setTimeout(() => {
    const botResponse = getBotResponse(message);
    addSiamsoftMessage(botResponse, false);

    // Lógica especial para redirección a formulario
    if (
      message.toLowerCase().includes("demo") ||
      message.toLowerCase().includes("demostración") ||
      message.toLowerCase().includes("demostracion")
    ) {
      setTimeout(() => {
        addSiamsoftMessage(
          "¿Quieres que te lleve al formulario de contacto ahora? (Responde 'sí' o 'no')",
          false
        );
      }, 800); // Retraso adicional para mensaje de seguimiento
    }
  }, 800); // Retraso simulado de "escribiendo"
}

// Manejo de tecla Enter para enviar mensaje
function handleSiamsoftKeyPress(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Prevenir comportamiento por defecto
    processSiamsoftMessage();
  }
}

// Cerrar los chats al hacer clic fuera
document.addEventListener("click", function (event) {
  const siamsoftChat = document.getElementById("siamsoftChatBox");
  const siamsoftButton = document.querySelector(".chatbot-float");
  // Cierra solo si se hace clic fuera del chat y no en el botón de toggle
  if (
    !siamsoftChat.contains(event.target) &&
    event.target !== siamsoftButton
  ) {
    siamsoftChat.style.display = "none";
  }
});

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