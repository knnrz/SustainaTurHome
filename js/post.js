// js/post.js

document.addEventListener('DOMContentLoaded', async () => {
  const postId = new URLSearchParams(window.location.search).get('id');

  const titleEl = document.getElementById('post-title');
  const dateEl = document.getElementById('post-date');
  const readTimeEl = document.getElementById('read-time');
  const bodyEl = document.getElementById('post-body');

  if (!postId) {
    bodyEl.innerHTML = '<p class="text-red-600">Erro: nenhum ID informado.</p>';
    return;
  }

  try {
    const res = await fetch(`https://blog.sustainatrip.tur.br/wp-json/wp/v2/posts/${postId}`);
    if (!res.ok) throw new Error('Post não encontrado');

    const post = await res.json();

    // Preenche título, data e conteúdo
    titleEl.innerHTML = post.title.rendered;
    dateEl.textContent = `Publicado em ${new Date(post.date).toLocaleDateString('pt-BR')}`;
    bodyEl.innerHTML = post.content.rendered;

    // Tempo de leitura
    setTimeout(() => {
      const texto = bodyEl.innerText || '';
      const palavras = texto.trim().split(/\s+/).length;
      const minutos = Math.max(1, Math.ceil(palavras / 200));
      readTimeEl.textContent = `⏳ ${minutos} min de leitura`;
    }, 100);

    // Links de compartilhamento dinâmicos
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title.rendered);
    document.getElementById('whatsapp-share').href = `https://wa.me/?text=${title}%20${url}`;
    document.getElementById('twitter-share').href = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;

    // Relacionados via categoria
    const categorias = post.categories;
    const postAtualId = post.id;

    if (categorias.length > 0) {
      const catId = categorias[0];
      const relatedRes = await fetch(`https://blog.sustainatrip.tur.br/wp-json/wp/v2/posts?categories=${catId}&per_page=3`);
      const relatedPosts = await relatedRes.json();

      const relatedContainer = document.getElementById('related-posts');
      relatedContainer.innerHTML = '';

      relatedPosts.forEach(p => {
        if (p.id !== postAtualId) {
          const card = document.createElement('a');
          card.href = `post.html?id=${p.id}`;
          card.className = "block bg-white rounded-xl p-4 shadow hover:shadow-lg transition border border-gray-100 mb-4";
          card.innerHTML = `
            <h3 class="text-lg font-bold text-emerald-800 mb-1">${p.title.rendered}</h3>
            <p class="text-sm text-gray-600">${stripHTML(p.excerpt.rendered)}</p>
          `;
          relatedContainer.appendChild(card);
        }
      });
    }

  } catch (error) {
    console.error(error);
    bodyEl.innerHTML = '<p class="text-red-600">Erro ao carregar o post.</p>';
  }
});

// Menu mobile (hambúrguer)
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = menuBtn?.querySelector(".hamburger");

  if (!menuBtn || !mobileMenu || !hamburger) return;

  let isOpen = false;

  menuBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    mobileMenu.classList.toggle("hidden");
    hamburger.children[0].classList.toggle("rotate-45", isOpen);
    hamburger.children[1].classList.toggle("opacity-0", isOpen);
    hamburger.children[2].classList.toggle("-rotate-45", isOpen);
  });
});

// Barra de leitura no topo
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = `${scrolled}%`;
});

// Animação dos blocos
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('#post-body p, #post-body ul, #post-body blockquote, #post-body img, #post-body h2, #post-body h3')
  .forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });

// Botão de copiar link com feedback
function shareLink() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    }).catch(() => showToast("❌ Erro ao compartilhar."));
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast("🔗 Link copiado com sucesso!");
    }).catch(() => {
      showToast("❌ Não foi possível copiar o link.");
    });
  } else {
    showToast("⚠️ Navegador não suporta compartilhamento.");
  }
}

// Toast flutuante para feedback
function showToast(message) {
  let toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 text-sm animate-toast";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
  }, 2000);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

// Limpar HTML dos trechos automáticos
function stripHTML(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}