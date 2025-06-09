
document.addEventListener("DOMContentLoaded", () => {
  // BotÃ£o de voltar ao topo
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // AnimaÃ§Ãµes suaves ao entrar na tela
  const animatedSections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  animatedSections.forEach(section => observer.observe(section));

  // Banner de cookies
  const banner = document.getElementById('cookie-banner');
  const btn = document.getElementById('accept-cookies');
  if (!localStorage.getItem('cookiesAccepted')) banner?.style.setProperty('display', 'flex');
  btn?.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'yes');
    banner.style.display = 'none';
    initAnalyticsTool();
  });
  if (localStorage.getItem('cookiesAccepted')) initAnalyticsTool();

  // Popup inicial
  const popup = document.getElementById("sustaina-popup");
  if (!localStorage.getItem("popupVisto") && popup) popup.style.display = "flex";
  window.fecharPopup = function () {
    if (popup) popup.style.display = "none";
    localStorage.setItem("popupVisto", "true");
  };

  // Tema escuro/claro
  const toggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(`${currentTheme}-theme`);
  toggle?.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    document.body.classList.toggle("dark-theme", !isDark);
    document.body.classList.toggle("light-theme", isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  });

  // Scroll suave para Ã¢ncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Menu hamburguer toggle
  function toggleMenu(el) {
    el.classList.toggle("active");
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.classList.toggle("hidden");
  }
  window.toggleMenu = toggleMenu;
});