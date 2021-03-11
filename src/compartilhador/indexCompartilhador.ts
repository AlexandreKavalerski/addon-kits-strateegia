import { addKit, getAll } from "../config/api_firebase/kits";

async function makeKitPublic(element: HTMLElement, kits: any){        
    
    const customKits = JSON.parse(kits);
    
    const arraySelecionado = customKits.filter((kit: any) => {
        return kit.id == element.id;
    });
    
    const kitSelecionado = JSON.parse(JSON.stringify(arraySelecionado[0]));
    
    const result = await addKit(kitSelecionado);    
    
    return {result, kitSelecionado};
}

async function getAllPublicKits(){
    const response = await getAll();
    return Object.keys(response).map(key => response[key]);
}


export {makeKitPublic, getAllPublicKits}