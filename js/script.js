
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
  