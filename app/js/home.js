const token = localStorage.getItem("strateegia_api_token");
console.log(token);

const btnMinhas = document.getElementById("btnMinhas");
const btnSair = document.getElementById("btnSair");

btnMinhas?.addEventListener("click", (e) => {
  if (token) {
    compartilhador.getMyKits(token).then((customKits) => {
      console.log(customKits);
      localStorage.setItem(
        "strateegia_api_custom_kits",
        JSON.stringify(customKits)
      );
      location.href = "./mykits.html";
    });
  }
});

btnSair?.addEventListener("click", (e) => {
  if (token) {
    localStorage.removeItem("strateegia_api_custom_kits");
    location.href = "./";
  }
});
