const API_URL = 'https://api.strateegia.digital/users/v1/auth/signin';

async function auth(username: string, password: string){
    const base64Login = btoa(`${username}:${password}`);    

    const response = await fetch(API_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Basic ${base64Login}`
        }
    });

    const data = await response.json();

    return data.access_token;    
}


export { auth }