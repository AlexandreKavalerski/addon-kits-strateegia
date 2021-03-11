import { getAll } from "../config/api_strateegia/kits";


async function getMyKits(token: string){
    const kits = await getAll(token);
    
    
    const isCustom = (kit: any) => kit.tier === 'CUSTOM';
    
    const customKits = kits.content.filter(isCustom);
    
    return await customKits;
}

export { getMyKits }