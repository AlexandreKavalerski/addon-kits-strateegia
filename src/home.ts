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

    console.log(kits);
    

    const isCustom = (kit: any) => kit.tier === 'CUSTOM';

    const custom = kits.content.filter(isCustom);

    console.log(custom);
}

