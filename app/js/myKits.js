console.log("kits");
const kits = localStorage.getItem("strateegia_api_custom_kits");

if (kits) {
  const customKits = JSON.parse(kits);
  generateMarkupCustomKits(customKits);
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
            }">Disponibilizar</a>
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
  Array.from(document.getElementsByClassName("btnDisponibilizar")).forEach(
    function (element) {
      element.addEventListener("click", (event) => {
        compartilhador
          .makeKitPublic(event.target, kits)
          .then(({ metadata, record }) => {
            console.log(record);
            alert(
              `o kit '${record.title}' criado por você agora está disponível para tds`
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
