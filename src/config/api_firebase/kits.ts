const API_URL = "https://compartilhador-strateegia-default-rtdb.firebaseio.com";
const COLLECTION_NAME = "kits";


async function getAll() {
    const response = await fetch(`${API_URL}/${COLLECTION_NAME}.json`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    });
  
    return await response.json();
}


async function addKit(kit: any) {
    const JSONkit = JSON.stringify(kit);

    const response = await fetch(`${API_URL}/${COLLECTION_NAME}.json`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: `${JSONkit}`,
    });
  
    return await response.json();
}

export { getAll, addKit }