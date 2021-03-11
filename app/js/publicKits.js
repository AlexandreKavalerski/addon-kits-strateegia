(function () {
  setTimeout(getPublicKits, 1000);
})();

function getPublicKits() {
  const kits = compartilhador.getAllPublicKits();
  kits.then((kits) => {
    generateMarkupPublicKits(kits);
  });
}

function generateMarkupPublicKits(publicKits) {
  let markup = ``;
  for (const kit of publicKits) {
    markup += `<div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${kit.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${renderType(
              kit.type
            )}</h6>
            <p class="card-text">${kit.description}</p>
            <a class="btn btn-primary btnDisponibilizar" id="${
              kit.id
            }" style="background-color: #5A5B9E;border-color: #5A5B9E;width: 100%;">Importar</a>
          </div>
        </div>`;
  }

  addMarkup(markup, publicKits);
}

function addMarkup(markup, publicKits) {
  const container = document.getElementById("listKits");
  container.innerHTML = markup;
  addListenerMakeAvailable(publicKits);
}

function addListenerMakeAvailable(publicKits) {
  const token = localStorage.getItem("strateegia_api_token");

  Array.from(document.getElementsByClassName("btnDisponibilizar")).forEach(
    function (element) {
      element.addEventListener("click", (event) => {
        compartilhador
          .importKitToStrateegia(token, event.target, publicKits)
          .then((kitSelecionado) => {
            alert(
              `o kit '${kitSelecionado.title}' foi adicionado à sua conta em strateegia`
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
