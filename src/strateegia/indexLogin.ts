import { auth } from "../config/api_strateegia/auth";

async function login(username: string, password: string){    
    return await auth(username, password);
}

export { login }