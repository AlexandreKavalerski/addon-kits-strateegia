import { auth } from "./api/auth.js";

const btnLogin = document.getElementById("btnLogin");

btnLogin?.addEventListener("click", (e: Event) => {    
    const usernameElement = document.getElementById("username") as HTMLInputElement;
    const passwordElement = document.getElementById("password") as HTMLInputElement;
    
    const username: string = usernameElement.value;
    const password: string = passwordElement.value;
    
    login(username, password);
    
})


async function login(username: string, password: string){    
    const token = await auth(username, password);
    localStorage.setItem('strateegia_api_token', token);
    location.href = '../front/home.html';
}