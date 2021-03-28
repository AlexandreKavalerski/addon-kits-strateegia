const access_token = localStorage.getItem("strateegia_api_token");
console.log(localStorage);

let consolidated_data = {
    "nodes": [],
    "links": []
}

function addNode(id, title, group, created_at) {
    consolidated_data["nodes"].push(
        {
            "id": id,
            "title": title,
            "group": group,
            "created_at": created_at
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

let begin = 0;

getAllProjects(access_token).then(response => {
    let projectId = response[0].projects[0].id;
    // console.log(projectId);
    getProjectById(access_token, projectId).then(response => {
        // console.log(response.missions[0]);
        let missionId = response.missions[0].id;
        let missionTitle = response.missions[0].title;
        let missionCreatedAt = response.missions[0].created_at;
        addNode(missionId, missionTitle, "mapas", missionCreatedAt);
        // console.log(missionId + " -> " + missionTitle);
        getAllContentsByMissionId(access_token, missionId).then(response => {
            // console.log(response);
            let arrayContents = response.content;
            for (let i = 0; i < arrayContents.length; i++) {
                const contentId = arrayContents[i].id;
                const missionId = arrayContents[i].mission_id;
                const kitId = arrayContents[i].kit.id;
                const kitTitle = arrayContents[i].kit.title;
                const kitCreatedAt = arrayContents[i].kit.created_at;
                addNode(kitId, kitTitle, "ferramentas", kitCreatedAt);
                addLink(missionId, kitId);
                const arrayQuestions = arrayContents[i].kit.questions;
                for (let j = 0; j < arrayQuestions.length; j++) {
                    const questionId = arrayQuestions[j].id;
                    const questionText = arrayQuestions[j].question;
                    const questionCreatedAt = arrayQuestions[j].created_at;
                    addNode(questionId, questionText, "questões", questionCreatedAt);
                    addLink(kitId, questionId);
                    getParentComments(access_token, contentId, questionId).then(response => {
                        // console.log(response);
                        let arrayComments = response.content;
                        for (let k = 0; k < arrayComments.length; k++) {
                            const questionId = arrayComments[k].question_id;
                            const commentId = arrayComments[k].id;
                            const commentText = arrayComments[k].text;
                            const commentCreatedAt = arrayComments[k].created_at;
                            // console.log(commentText);
                            addNode(commentId, commentText, "respostas", commentCreatedAt);
                            addLink(questionId, commentId);
                        }
                    }).then(d => {
                        buildGraph(consolidated_data);
                        initializeSimulation(consolidated_data);
                    });
                }
            }
        });
    });
});



function addMarkup(markup, projects) {
    const container = document.getElementById("listProjects");
    container.innerHTML = markup;
    // addListenerMakeAvailable(projects);
}