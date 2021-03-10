import { getAll } from "./api/kits.js";

console.log(`home`);

const token = localStorage.getItem('strateegia_api_token');
console.log(token);


const btnMinhas = document.getElementById("btnMinhas");
btnMinhas?.addEventListener("click", (e: Event) => {    
    if (token){
        buscarMinhasFerramentas(token);
    }
})


async function buscarMinhasFerramentas(token: string){
    const kits = await getAll(token);

    
    
    const isCustom = (kit: any) => kit.tier === 'CUSTOM';
    
    const customKits = kits.content.filter(isCustom);
    
    localStorage.setItem('strateegia_api_custom_kits', JSON.stringify(customKits));
    location.href = '../front/mykits.html';
    

}

