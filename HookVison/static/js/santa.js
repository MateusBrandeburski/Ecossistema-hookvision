

// Verifica se a data está no intervalo permitido
function isInAllowedDateRange() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 10, 15); // 15 de novembro
    const end = new Date(now.getFullYear(), 11, 26);  // 26 de dezembro
    return now >= start && now <= end;
  }
  
  // Exibe o GIF com animação
  function showSanta() {
    const santa = document.getElementById('santa');
    if (!santa) return;
  
    // Verifica se está no intervalo de datas permitido
    if (isInAllowedDateRange()) {
      santa.style.display = 'block'; // Mostra o GIF
      santa.style.animation = 'none'; // Reseta a animação
      void santa.offsetWidth; // Força o reflow para reiniciar a animação
      santa.style.animation = 'fly-reverse 8s linear'; // Aplica novamente
      setTimeout(() => {
        santa.style.display = 'none'; // Esconde após a animação
      }, 8000); // Duração da animação
    }
  }
  
  // Configura a exibição a cada 20 segundos
  if (isInAllowedDateRange()) {
    showSanta(); // Mostra a primeira vez
    setInterval(showSanta, 60000); // Repete a cada 20 segundos
  }
  