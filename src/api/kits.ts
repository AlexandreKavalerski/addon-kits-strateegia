const APIurl = 'https://api.strateegia.digital/kits/v1/kit?size=5000';

async function getAll(token: string){

    const response = await fetch(APIurl, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;    
}

export { getAll }