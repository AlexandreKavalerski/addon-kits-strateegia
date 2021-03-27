const API_URL = 'https://api.strateegia.digital/projects/v1/';

async function getAllProjects(token: string){

    const response = await fetch(`${API_URL}project?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;    
}

async function getProjectById(token: string, project_id: string){

    const response = await fetch(`${API_URL}project/${project_id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;    
}

async function getAllContentsByMissionId(token: string, map_id: string){

    const response = await fetch(`${API_URL}mission/${map_id}/content?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;    
}

async function getMapById(token: string, map_id: string){

    const response = await fetch(`${API_URL}map/${map_id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;    
}

async function getParentComments(token: string, content_id: string, question_id: string){

    const response = await fetch(`${API_URL}content/${content_id}/question/${question_id}/comment?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;    
}

// async function addKitToUser(token:string, kit: any) {
//     const JSONkit = JSON.stringify(kit);

//     const response = await fetch(`${API_URL}`, {
//         method: 'post',
//         headers:{
//             'Content-Type': 'application/json', 
//             'Authorization': `Bearer ${token}`
//         },
//         body: `${JSONkit}`
//     });

//     return await response.json();
// }


export { getAllProjects, getProjectById , getAllContentsByMissionId , getMapById , getParentComments}