import { getAll, addKitToUser } from "../config/api_strateegia/kits";

async function getMyKits(token: string){
    const kits = await getAll(token);
    
    const isCustom = (kit: any) => kit.tier === 'CUSTOM';
    
    const customKits = kits.content.filter(isCustom);
    
    return await customKits;
}

async function importKitToStrateegia(token: string, element: HTMLElement, kits: any) {
    const kitToImport = kits.filter((kit: any) => {
        return kit.id == element.id;
    })[0];

    return await addKitToUser(token, kitToImport);
}

export { getMyKits, importKitToStrateegia }