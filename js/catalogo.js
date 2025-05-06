const viagens = [
  { nome: "Chapada dos Veadeiros", categoria: "natureza", descricao: "Imersão em cachoeiras e trilhas energéticas." },
  { nome: "São João no Nordeste", categoria: "cultural", descricao: "Celebre a cultura nordestina com muito forró!" },
  { nome: "Sabores de Minas", categoria: "gastronomia", descricao: "Uma rota cheia de queijos, doces e afeto." },
  { nome: "Pantanal Selvagem", categoria: "natureza", descricao: "Explore a fauna e flora pantaneira." },
  { nome: "Raízes Afro em Salvador", categoria: "cultural", descricao: "Uma viagem profunda nas tradições afro-brasileiras." },
];

const catalogo = document.getElementById("catalogo");
const buscaInput = document.getElementById("busca");
const categoriaSelect = document.getElementById("categoria");
const ordenarBtn = document.getElementById("ordenar");

let ordenado = false;

function renderizarViagens(filtro = "") {
  let filtradas = viagens
    .filter(v => v.nome.toLowerCase().includes(filtro.toLowerCase()))
    .filter(v => !categoriaSelect.value || v.categoria === categoriaSelect.value);

  if (ordenado) {
    filtradas.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  catalogo.innerHTML = filtradas.map(v => `
    <div class="card">
      <h3>${v.nome}</h3>
      <p>${v.descricao}</p>
      <small><strong>Categoria:</strong> ${v.categoria}</small>
    </div>
  `).join("");
}

buscaInput.addEventListener("input", () => renderizarViagens(buscaInput.value));
categoriaSelect.addEventListener("change", () => renderizarViagens(buscaInput.value));
ordenarBtn.addEventListener("click", () => {
  ordenado = !ordenado;
  ordenarBtn.textContent = ordenado ? "Desordenar" : "Ordenar A-Z";
  renderizarViagens(buscaInput.value);
});

renderizarViagens();