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

function drawProject(projectId) {
    console.log(projectId);
    consolidated_data = {
        "nodes": [],
        "links": []
    }
    getProjectById(access_token, projectId).then(project => {
        console.log(project);
        if(project.missions.length > 1){
            addNode(project.id, project.title, "projetos",project.created_at);
        }
        for (let a = 0; a < project.missions.length; a++) {
            const currentMission = project.missions[a];
            let missionId = project.missions[a].id;
            let missionTitle = project.missions[a].title;
            let missionCreatedAt = project.missions[a].created_at;
            addNode(missionId, missionTitle, "mapas", missionCreatedAt);
            if(project.missions.length > 1){
                addLink(project.id, missionId);
            }
            // console.log(missionId + " -> " + missionTitle);
            getAllContentsByMissionId(access_token, missionId).then(response => {
                console.log(response);
                let arrayContents = response.content;
                for (let i = 0; i < arrayContents.length; i++) {
                    const contentId = arrayContents[i].id;
                    const missionId = arrayContents[i].mission_id;
                    const kitId = arrayContents[i].kit.id;
                    const kitTitle = arrayContents[i].kit.title;
                    const kitCreatedAt = arrayContents[i].kit.created_at;
                    addNode(contentId, kitTitle, "ferramentas", kitCreatedAt);
                    addLink(missionId, contentId);
                    const arrayQuestions = arrayContents[i].kit.questions;
                    for (let j = 0; j < arrayQuestions.length; j++) {
                        const questionId = arrayQuestions[j].id;
                        const questionId_graph = `${arrayQuestions[j].id}.${contentId}`;
                        const questionText = arrayQuestions[j].question;
                        const questionCreatedAt = arrayQuestions[j].created_at;
                        addNode(questionId_graph, questionText, "questões", questionCreatedAt);
                        addLink(contentId, questionId_graph);
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
                                addLink(questionId_graph, commentId);
                            }
                        }).then(d => {
                            buildGraph(consolidated_data);
                            initializeSimulation(consolidated_data);
                        });
                    }
                }
            });
        }
    });
}

getAllProjects(access_token).then(labs => {
    console.log(labs);
    // Initial project
    drawProject(labs[0].projects[0].id)
    let listProjects = [];
    for (let i = 0; i < labs.length; i++) {
        let currentLab = labs[i];
        if (currentLab.lab.name == null) {
            currentLab.lab.name = "Personal";
        }
        for (let j = 0; j < currentLab.projects.length; j++) {
            const project = currentLab.projects[j];
            console.log(`${currentLab.lab.name} -> ${project.title}`);
            listProjects.push({
                "id": project.id,
                "title": project.title,
                "lab_id": currentLab.lab.id,
                "lab_title": currentLab.lab.name
            });
        }
    }
    let options = d3.select("#projects-list")
        .on("change", () => {
            let selected_project = d3.select("#projects-list").property('value');
            drawProject(selected_project);
        })
        .selectAll("option")
        .data(listProjects);

    options.enter()
        .append("option")
        .attr("value", (d) => { return d.id })
        .text((d) => { return `${d.lab_title} -> ${d.title}` });
});

// document.addEventListener("DOMContentLoaded", function () {
//     let selected_project = d3.select("#projects-list").property('value');
//     drawProject(selected_project);
// });

function addMarkup(markup, projects) {
    const container = document.getElementById("listProjects");
    container.innerHTML = markup;
    // addListenerMakeAvailable(projects);
}