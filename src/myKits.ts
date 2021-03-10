
const kits = localStorage.getItem('strateegia_api_custom_kits');

if(kits){
 
    const customKits = JSON.parse(kits);
    loadCustomKits(customKits);
}


function loadCustomKits(customKits: any[]){
    let markup = ``;
    for (const kit of customKits) {
        console.log(kit);
        markup += `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${kit.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${renderType(kit.type)}</h6>
          <p class="card-text">${kit.description}</p>
          <a class="btn btn-primary btnDisponibilizar" id="${kit.id}">Disponibilizar</a>
        </div>
      </div>`;
    }

    addMarkup(markup);
}

function addMarkup(markup: string){
    const container = document.getElementById("listKits") as HTMLElement;
    container.innerHTML = markup;
}

function renderType(type: string){
    return type == 'METHOD' ? 'Método de Trabalho' : (type == 'LEARNING' ? 'Tópico de aprendizagem': (type == 'SYSTEM' ? 'Sistema de Tecnologia' : (type == 'MODEL' ? 'Modelo de negócio':'Indicadores de Performance')))
}