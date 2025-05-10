
  document.addEventListener("DOMContentLoaded", async () => {
    const baseURL = location.hostname.includes('blog.')
      ? 'https://blog.sustainatrip.tur.br/partials/'
      : 'https://sustainatrip.tur.br/partials/';

    // Função para carregar e injetar um partial
    async function injectPartial(url, position) {
      try {
        const res = await fetch(url);
        const html = await res.text();
        document.body.insertAdjacentHTML(position, html);
      } catch (err) {
        console.error(`Erro ao carregar ${url}:`, err);
      }
    }

    // Carrega header e footer antes de prosseguir
    await injectPartial(baseURL + "header.html", "afterbegin");
    await injectPartial(baseURL + "footer.html", "beforeend");

    // Agora sim, inicia o resto do script

    // Botão de voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
      window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
      });
      backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Animações suaves ao entrar na tela
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
  });

