// Obtiene el botón
const chat = document.querySelector('#chat');
        
// Establece una variable booleana para controlar el estado de la ventana
let isOpen = false;

// Agrega un evento click al botón
chat.addEventListener('click', () => {
  // Obtiene la ventana
  const window = document.querySelector('.floating-window');
  
  // Si la ventana está abierta
  if (isOpen) {
    // Oculta la ventana
    window.style.display = 'none';
    // Actualiza el estado de la ventana
    isOpen = false;
  } else { // Si la ventana está cerrada
    // Muestra la ventana
    window.style.display = 'block';
    // Actualiza el estado de la ventana
    isOpen = true;
  }
});