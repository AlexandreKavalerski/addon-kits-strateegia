
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
    addListenerMakeAvailable();
}

function addListenerMakeAvailable(){
    Array.from(document.getElementsByClassName("btnDisponibilizar") as HTMLCollectionBase).forEach(function (element) {
        element.addEventListener('click', (event)=>{makeKitPublic(event.target as HTMLElement)});
    })
}

function makeKitPublic(element: HTMLElement){
    if(kits){
        
        const customKits = JSON.parse(kits);


        const arraySelecionado = customKits.filter((kit: any) => {
            return kit.id == element.id;
        });

        const kitSelecionado = JSON.parse(JSON.stringify(arraySelecionado[0]));
        console.log(kitSelecionado);
        alert(`o kit '${kitSelecionado.title}' criado por você agora está disponível para tds!`)
    }  
    
}

function renderType(type: string){
    return type == 'METHOD' ? 'Método de Trabalho' : (type == 'LEARNING' ? 'Tópico de aprendizagem': (type == 'SYSTEM' ? 'Sistema de Tecnologia' : (type == 'MODEL' ? 'Modelo de negócio':'Indicadores de Performance')))
}