(function () {
  setTimeout(getPublicKits, 1000);
})();

function getPublicKits() {
  const kits = compartilhador.getAllPublicKits();
  kits.then((kits) => {
    generateMarkupCustomKits(kits);
  });
}

function generateMarkupCustomKits(customKits) {
  let markup = ``;
  for (const kit of customKits) {
    markup += `<div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${kit.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${renderType(
              kit.type
            )}</h6>
            <p class="card-text">${kit.description}</p>
            <a class="btn btn-primary btnDisponibilizar" id="${
              kit.id
            }">Importar</a>
          </div>
        </div>`;
  }

  addMarkup(markup);
}

function addMarkup(markup) {
  const container = document.getElementById("listKits");
  container.innerHTML = markup;
  addListenerMakeAvailable();
}

function addListenerMakeAvailable() {
  const token = localStorage.getItem("strateegia_api_token");

  Array.from(document.getElementsByClassName("btnDisponibilizar")).forEach(
    function (element) {
      element.addEventListener("click", (event) => {
        compartilhador
          .importKitToStrateegia(token, event.target)
          .then((kitSelecionado) => {
            alert(
              `o kit '${kitSelecionado.title}' criado por você agora está disponível para tds!`
            );
          });
      });
    }
  );
}

function renderType(type) {
  return type == "METHOD"
    ? "Método de Trabalho"
    : type == "LEARNING"
    ? "Tópico de aprendizagem"
    : type == "SYSTEM"
    ? "Sistema de Tecnologia"
    : type == "MODEL"
    ? "Modelo de negócio"
    : "Indicadores de Performance";
}
