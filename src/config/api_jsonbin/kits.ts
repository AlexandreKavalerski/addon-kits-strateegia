const API_URL = "https://api.jsonbin.io/v3";
const API_KEY = "$2b$10$2./HmBJ7uiLYgqD2cym/zeLh3XZ3qFjYFD7WH5I12nyGToK8K6tLa";
const COLLECTION_ID = "60496eda7ffeba41c075536a";


async function addKit(kit: any) {
  const JSONkit = JSON.stringify(kit);
  const response = await fetch(`${API_URL}/b`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": `${API_KEY}`,
      "X-Collection-Id": `${COLLECTION_ID}`,
    },
    body: `${JSONkit}`,
  });

  return await response.json();
}

async function getAll() {
  const response = await fetch(`${API_URL}/c/${COLLECTION_ID}/bins/1`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": `${API_KEY}`,
    },
  });

  return await response.json();
}

async function getKitById(kitId: string){
  const response = await fetch(`${API_URL}/b/${kitId}/`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": `${API_KEY}`,
    },
  });

  return await response.json();
}

export { addKit, getAll, getKitById };
