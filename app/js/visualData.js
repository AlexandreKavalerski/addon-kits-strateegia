const access_token = localStorage.getItem("strateegia_api_token");
console.log(localStorage);

let consolidated_data = {
    "nodes": [],
    "links": []
}

function addNode(id, title, group) {
    consolidated_data["nodes"].push(
        {
            "id": id,
            "title": title,
            "group": group
        }
    );
}

function addLink(source, target) {
    consolidated_data["links"].push(
        {
            "source": source,
            "target": target
        }
    );
}

let inter_data;

// async function getAllProjects(){
//     const projects = await getAllProjects(access_token);

//     return await projects;
// }

// getAllProjects(access_token).then(
//     labs => {
//         console.log(labs);
//         let markup = ``;
//         for (let i = 0; i < labs.length; i++) {
//             const currentLab = labs[i];
//             console.log(currentLab);
//             for (let j = 0; j < currentLab.projects.length; j++) {
//                 const project = currentLab.projects[j];
//                 console.log(`${currentLab.lab.name} -> ${project.title}`);
//                 markup += `<div class="card" style="width: 18rem;">
//           <div class="card-body">
//             <h5 class="card-title">${project.title}</h5>
//             <h6 class="card-subtitle mb-2 text-muted">${currentLab.lab.name}</h6>
//             <p class="card-text">${project.title}</p>
//             <a class="btn btn-primary btnAbrir" id="${project.id
//                     }" style="background-color: #5A5B9E;border-color: #5A5B9E;width: 100%;">Abrir</a>
//           </div>
//         </div>`;
//             }
//         }
//         addMarkup(markup, labs);
//     });

getAllProjects(access_token).then(response => {
    let projectId = response[0].projects[0].id;
    // console.log(projectId);
    getProjectById(access_token, projectId).then(response => {
        // console.log(response.missions[0]);
        let missionId = response.missions[0].id;
        let missionTitle = response.missions[0].title;
        addNode(missionId, missionTitle, "mapas");
        console.log(missionId + " -> " + missionTitle);
        getAllContentsByMissionId(access_token, missionId).then(response => {
            // console.log(response);
            let arrayContents = response.content;
            for (let i = 0; i < arrayContents.length; i++) {
                // const contentId = arrayContents[i].id;
                const missionId = arrayContents[i].mission_id;
                const kitId = arrayContents[i].kit.id;
                const kitTitle = arrayContents[i].kit.title;
                addNode(kitId, kitTitle, "ferramentas");
                addLink(missionId, kitId);
                const arrayQuestions = arrayContents[i].kit.questions;
                for (let j = 0; j < arrayQuestions.length; j++) {
                    const questionId = arrayQuestions[j].id;
                    const questionText = arrayQuestions[j].question;
                    addNode(questionId, questionText, "questões");
                    addLink(kitId, questionId);
                }
            }
        }).then(d => {
            buildGraph(consolidated_data);
            initializeSimulation(consolidated_data);
        });
    });
});



function addMarkup(markup, projects) {
    const container = document.getElementById("listProjects");
    container.innerHTML = markup;
    // addListenerMakeAvailable(projects);
}

// d3.json("https://api.strateegia.digital/projects/v1/project?lab=5ef6482b188f170b4d01e9b3", {
//     headers: new Headers(
//         { "Authorization": "Bearer " + access_token },
//     ),
// }).then(data => {

//     let projectId = data[0]["projects"][0]["id"];
//     let projectTitle = data[0]["projects"][0]["title"];

//     // console.log(projectId);
//     d3.json("https://api.strateegia.digital/projects/v1/project/" + projectId, {
//         headers: new Headers(
//             { "Authorization": "Bearer " + access_token },
//         ),
//     }).then(data => {

//         consolidated_data["nodes"].push(
//             {
//                 "id": projectId,
//                 "title": projectTitle,
//                 "group": "projetos"
//             }
//         );
//         for (let i = 0; i < data["missions"].length; i++) {
//             let missionId = data["missions"][i]["id"]
//             let missionTitle = data["missions"][i]["title"]
//             // console.log(projectTitle + " -> " + data["missions"][i]["title"]);
//             consolidated_data["nodes"].push(
//                 {
//                     "id": missionId,
//                     "title": missionTitle,
//                     "group": "mapas"
//                 }
//             );
//             consolidated_data["links"].push(
//                 {
//                     "source": projectId,
//                     "target": missionId
//                 }
//             );
//             d3.json("https://api.strateegia.digital/projects/v1/mission/" + missionId + "/content?size=500", {
//                 headers: new Headers(
//                     { "Authorization": "Bearer " + access_token },
//                 ),
//             }).then(contents => {
//                 // console.log(contents);
//                 for (let j = 0; j < contents["content"].length; j++) {
//                     let contentId = contents["content"][j]["id"];
//                     let kitId = contents["content"][j]["kit"]["id"];
//                     let kitTitle = contents["content"][j]["kit"]["title"];
//                     // console.log(missionTitle + " -> " + kitTitle);
//                     consolidated_data["nodes"].push(
//                         {
//                             "id": kitId,
//                             "title": kitTitle,
//                             "group": "ferramentas"
//                         }
//                     );
//                     consolidated_data["links"].push(
//                         {
//                             "source": missionId,
//                             "target": kitId
//                         }
//                     );
//                     d3.json("https://api.strateegia.digital/projects/v1/content/" + contentId, {
//                         headers: new Headers(
//                             { "Authorization": "Bearer " + access_token },
//                         ),
//                     }).then(contents => {
//                         let inter_data = contents;
//                         // console.log(contents.kit.questions);
//                         for (let x = 0; x < contents.kit.questions.length; x++) {
//                             let questionId = contents.kit.questions[x].id;
//                             let questionTitle = contents.kit.questions[x].question;
//                             let kitId = contents.kit.id;
//                             // console.log(kitId);
//                             // consolidated_data["nodes"].push(
//                             //     {
//                             //         "id": questionId,
//                             //         "title": questionTitle,
//                             //         "group": "questões"
//                             //     }
//                             // );
//                             // consolidated_data["links"].push(
//                             //     {
//                             //         "source": kitId,
//                             //         "target": questionId
//                             //     }
//                             // );
//                         }
//                     });
//                 }
//                 // console.log(consolidated_data);

//             }).then(d => {
//                 buildGraph(consolidated_data);
//                 initializeSimulation(consolidated_data);
//             });
//         }
//     });
// });