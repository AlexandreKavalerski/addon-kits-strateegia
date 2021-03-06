const API_URL = 'https://api.strateegia.digital/kits/v1/kit';

async function getAll(token: string){

    const response = await fetch(`${API_URL}?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;    
}

async function getById(token: string, kit_id: string){

    const response = await fetch(`${API_URL}/${kit_id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;    
}

async function addKitToUser(token:string, kit: any) {
    const JSONkit = JSON.stringify(kit);

    const response = await fetch(`${API_URL}`, {
        method: 'post',
        headers:{
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
        body: `${JSONkit}`
    });

    return await response.json();
}


export { getAll, getById, addKitToUser }