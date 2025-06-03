const container = document.querySelector("main");

fetch("https://blog.sustainatrip.tur.br/wp-json/wp/v2/posts")
  .then((res) => res.json())
  .then((posts) => {
    posts.forEach((post) => {
      const article = document.createElement("article");
      article.className =
        "bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col";

      article.innerHTML = `
        <div class="p-4 flex flex-col justify-between h-full">
          <h2 class="text-xl font-serif text-green-900 mb-3">${post.title.rendered}</h2>
          <p class="text-gray-600 text-sm line-clamp-3 mb-4">${stripHTML(post.excerpt.rendered)}</p>
          <a href="post.html?id=${post.id}" class="mt-auto text-green-700 font-medium hover:underline">Ler mais →</a>
        </div>
      `;
      container.appendChild(article);
    });
  });

function stripHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// aqui va o menu
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = menuBtn.querySelector(".hamburger");

  let isOpen = false;

  menuBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    mobileMenu.classList.toggle("hidden");

    // Animação do hambúrguer para X
    hamburger.children[0].classList.toggle("rotate-45", isOpen);
    hamburger.children[1].classList.toggle("opacity-0", isOpen);
    hamburger.children[2].classList.toggle("-rotate-45", isOpen);
  });
});