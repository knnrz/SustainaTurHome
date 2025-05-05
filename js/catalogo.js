document.addEventListener("DOMContentLoaded", () => {
  const viagens = [
    {
      titulo: "Chapada dos Veadeiros",
      descricao: "Natureza, cachoeiras e misticismo em um só lugar.",
      imagem: "img/chapada.jpg"
    },
    {
      titulo: "Serra da Canastra",
      descricao: "A terra do queijo mais famoso do Brasil e paisagens incríveis.",
      imagem: "img/canastra.jpg"
    },
    {
      titulo: "Península de Maraú",
      descricao: "Praias desertas, águas claras e estilo de vida slow travel.",
      imagem: "img/marau.jpg"
    }
  ];

  const app = document.getElementById("app");
  const container = document.createElement("div");
  container.className = "catalogo-container fade-in";

  const titulo = document.createElement("h1");
  titulo.textContent = "Escolha sua próxima viagem consciente";
  container.appendChild(titulo);

  viagens.forEach(viagem => {
    const card = document.createElement("div");
    card.className = "card-viagem";

    card.innerHTML = `
      <img src="${viagem.imagem}" alt="${viagem.titulo}" />
      <h2>${viagem.titulo}</h2>
      <p>${viagem.descricao}</p>
      <button class="btn">Ver Detalhes</button>
    `;

    container.appendChild(card);
  });

  app.appendChild(container);
});