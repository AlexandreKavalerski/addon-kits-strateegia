const APIurl = 'https://api.strateegia.digital/users/v1/auth/signin';

async function auth(username: string, password: string){
    const base64Login = btoa(`${username}:${password}`);    

    const response = await fetch(APIurl, {
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