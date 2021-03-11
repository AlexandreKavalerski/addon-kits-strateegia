import { getAll, addKitToUser, getById } from "../config/api_strateegia/kits";


async function getMyKits(token: string){
    const kits = await getAll(token);
    
    
    const isCustom = (kit: any) => kit.tier === 'CUSTOM';
    
    const customKits = kits.content.filter(isCustom);
    
    return await customKits;
}

async function importKitToStrateegia(token: string, element: HTMLElement) {
    const kit = await getById(token, element.id);
    console.log('kit...');
    console.log(kit);
    
    return await addKitToUser(token, kit);
}

export { getMyKits, importKitToStrateegia }