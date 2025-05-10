
    // Botão de voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animações suaves ao entrar na tela
    const animatedSections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    animatedSections.forEach(section => {
      observer.observe(section);
    });
  


  const banner = document.getElementById('cookie-banner');
  const btn = document.getElementById('accept-cookies');

  if (!localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'flex';
  }

  btn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'yes');
    banner.style.display = 'none';
    initAnalyticsTool(); // aqui entra o script do Matomo ou Plausible
  });

  // Se já aceitou, ativa direto
  if (localStorage.getItem('cookiesAccepted')) {
    initAnalyticsTool();
  }
document.addEventListener("DOMContentLoaded", function () {
 

 document.addEventListener("DOMContentLoaded", () => {
      const toggleBtn = document.querySelector('.menu-toggle');
      const menu = document.querySelector('.menu');

      if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
          menu.classList.toggle('show');
        });
      } else {
        console.warn("Botão ou menu não encontrado");
      }
    });
