import { addKit, getAll } from "../config/api_jsonbin/kits";

async function makeKitPublic(element: HTMLElement, kits: any){        
    const customKits = JSON.parse(kits);

    const arraySelecionado = customKits.filter((kit: any) => {
        return kit.id == element.id;
    });

    const kitSelecionado = JSON.parse(JSON.stringify(arraySelecionado[0]));
    console.log(kitSelecionado);
    
    return await addKit(kitSelecionado);    
}

function getAllPublicKits(){
    getAll().then((kits) =>{
        return kits;
    });
}

export {makeKitPublic, getAllPublicKits}