import { addKit, getAll, getKitById } from "../config/api_jsonbin/kits";

async function makeKitPublic(element: HTMLElement, kits: any){        
    const customKits = JSON.parse(kits);

    const arraySelecionado = customKits.filter((kit: any) => {
        return kit.id == element.id;
    });

    const kitSelecionado = JSON.parse(JSON.stringify(arraySelecionado[0]));
    
    return await addKit(kitSelecionado);    
}

async function getAllPublicKits(){
    const kitIds = await getAll();
    let kits: any[] = [];
    for (let id of kitIds) {
        const kit = await getKitById(id.record);
        kits.push(kit.record);
    }
    return kits;
}

export {makeKitPublic, getAllPublicKits}