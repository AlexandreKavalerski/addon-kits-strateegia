const svg = d3.select("svg");
let width = 1000; //+svg.node().getBoundingClientRect().width;
let height = 600; //+svg.node().getBoundingClientRect().height;

// svg objects
// let link;
// let node;
// let data;

// values for all forces
forceProperties = {
    center: {
        x: 0.5,
        y: 0.5
    },
    charge: {
        enabled: true,
        strength: -30,
        distanceMin: 1,
        distanceMax: 387.8
    },
    collide: {
        enabled: false,
        strength: .7,
        iterations: 10,
        radius: 10
    },
    forceX: {
        enabled: false,
        strength: .1,
        x: .5
    },
    forceY: {
        enabled: false,
        strength: .1,
        y: .5
    },
    link: {
        enabled: true,
        distance: 35,
        iterations: 5
    }
}

//////////// FORCE SIMULATION ////////////

// force simulator
const simulation = d3.forceSimulation();

// set up the simulation and event to update locations after each tick
function initializeSimulation(data_nodes, data_links) {
    simulation.nodes(data_nodes);
    initializeForces(data_nodes, data_links);
    simulation.alpha(2).restart();
    simulation.on("tick", ticked);
}

// add forces to the simulation
function initializeForces(data_nodes, data_links) {
    // add forces and associate each with a name
    simulation
        .force("center", d3.forceCenter())
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("collide", d3.forceCollide())
        .force("forceX", d3.forceX())
        .force("forceY", d3.forceY());
    // apply properties to each of the forces
    updateForces(data_links);
}

// apply new force properties
function updateForces(data_links) {
    // get each force by name and update the properties
    simulation.force("center")
        .x(width * forceProperties.center.x)
        .y(height * forceProperties.center.y);
    simulation.force("charge")
        .strength(forceProperties.charge.strength * forceProperties.charge.enabled)
        .distanceMin(forceProperties.charge.distanceMin)
        .distanceMax(forceProperties.charge.distanceMax);
    simulation.force("collide")
        .strength(forceProperties.collide.strength * forceProperties.collide.enabled)
        .radius(forceProperties.collide.radius)
        .iterations(forceProperties.collide.iterations);
    simulation.force("forceX")
        .strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
        .x(width * forceProperties.forceX.x);
    simulation.force("forceY")
        .strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
        .y(height * forceProperties.forceY.y);
    simulation.force("link")
        .id(function (d) { return d.id; })
        .distance(forceProperties.link.distance)
        .iterations(forceProperties.link.iterations)
        .links(forceProperties.link.enabled ? data_links : []);

    // updates ignored until this is run
    // restarts the simulation (important if simulation has already slowed down)
    // simulation.alpha(2).restart();
    simulation.alpha(0.2).restart();
}

//////////// DISPLAY ////////////

// color = d3.scaleOrdinal(d3.schemeCategory10);

// generate the svg objects and force simulation
function buildGraph(data_nodes, data_links) {
    simulation.stop();
    d3.select("svg")
        .style("width", width + 'px')
        .style("height", height + 'px')
        .attr("viewBox", [0, 0, width, height]);

    const color = d3.scaleOrdinal()
        .domain(["projetos", "mapas", "ferramentas", "questões", "comentários", "respostas", "deacordo"])
        // .domain(["deacordo", "respostas", "comentários", "questões", "ferramentas", "mapas", "projetos"])
        // .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);
        // .range(["#7f0000", "#b30000", "#d7301f", "#ef6548", "#fc8d59", "#fdbb84", "#fdd49e", "#fee8c8", "#fff7ec"]);
        // .range(["#081d58", "#253494", "#225ea8", "#1d91c0", "#41b6c4", "#7fcdbb", "#c7e9b4", "#edf8b1", "#ffffd9"]);
        // .range(["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"] );
        // .range(["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6"]);
        // .range(d3.schemeCategory10);
        // .range(d3.schemePaired);
        // .range(d3.schemeTableau10);
        .range(d3.schemeSet1);
    // .range(["#0d0887","#5c01a6","#9c179e","#cc4778","#ed7953","#fdb42f","#f0f921"]);
    // .range(["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"]);

    const node_size = d3.scaleOrdinal()
        .domain(["projetos", "mapas", "ferramentas", "questões", "comentários", "respostas", "deacordo"])
        .range([10, 9, 8, 7, 5, 4, 3]);

    let nodes_selection = d3.select('svg')
        .selectAll("g.nodes")
        .data(data_nodes, d => d.id);

    let links_selection = d3.select('svg')
        .selectAll("line.links")
        .data(data_links);

    // set the data and properties of link lines
    links_selection
        .enter()
        .append("line")
        .attr("class", "links")
        .style("stroke", "#aaa");

    let node_group = nodes_selection
        .enter()
        .append("g")
        .attr("class", "nodes");

    let base_size = 3;

    let t = d3.transition()
        .duration(500)
        .ease(d3.easeLinear);

    let node_circle = node_group
        .append("circle")
        // .attr("stroke", "#fff")
        // .attr("stroke-width", 1.5)
        .attr("fill", "white")
        .attr("r", 0)
        .transition(t)
        .attr("r", function (d) { return node_size(d.group); })
        .attr("fill", function (d) { return color(d.group); });

    node_group
        .append("text")
        .text(function (d) {
            return d.title;
        })
        .attr('x', 6)
        .attr('y', 3)
        .style("display", "none");

    node_group
        .attr("cursor", "grab");

    // node tooltip
    node_group.append("title")
        .text(function (d) { return d.title; });

    const drag = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    node_group.call(drag)
        .on("mouseover", focus)
        .on("mouseout", unfocus);

    links_selection.exit().remove();
    nodes_selection.exit().remove();

    // visualize the data
    updateDisplay();
}

// update the display based on the forces (but not positions)
function updateDisplay() {
    d3.selectAll("line.links")
        .attr("stroke-width", forceProperties.link.enabled ? 1 : .5)
        .attr("opacity", forceProperties.link.enabled ? 1 : 0)
        .lower();
}

// update the display positions after each simulation tick
function ticked() {
    d3.selectAll("line.links")
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    d3.selectAll("g.nodes")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    // .attr("cx", function(d) { return d.x; })
    // .attr("cy", function(d) { return d.y; });

    d3.select('#alpha_value').style('flex-basis', (simulation.alpha() * 100) + '%');
}

//////////// UI EVENTS ////////////

function dragstarted(event, d) {
    if (!event.active) {
        simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
    d3.selectAll("g.nodes").attr("cursor", "grabbing");
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0.0001);
    d.fx = null;
    d.fy = null;
    d3.selectAll("g.nodes").attr("cursor", "grab");
}

function focus(event, d) {
    d3.selectAll("g.nodes")
        .selectAll("text")
        .style("display",
            function (o) {
                return o.id == d.id ? "block" : "none";
            });
}

function unfocus(d) {
    d3.selectAll("g.nodes")
        .selectAll("text")
        .style("display", "none");
}

// update size-related forces
d3.select(window).on("resize", function () {
    width = +svg.node().getBoundingClientRect().width;
    height = +svg.node().getBoundingClientRect().height;
    updateForces(consolidated_data.links);
});

d3.select(window).on("load", function () {

});

function updateAll(data_links) {
    updateForces(data_links);
    updateDisplay();
}

function myCheckBox(checked) {
    // forceProperties.link.enabled = checked;
    let filteredNodes = consolidated_data.nodes;
    if (checked) {
        filteredNodes = consolidated_data.nodes.filter((d) => { return d.group == "mapas" });
    }
    let filteredLinks = consolidated_data.links;
    buildGraph(filteredNodes, filteredLinks);
    updateAll(consolidated_data.links);
    console.log(consolidated_data);
}

// function debug() {
//     const created_at = new Date("2021-03-10T10:54:18.225");
//     const created_at2 = new Date("2021-03-10T10:54:18.225");
//     let parsedTime = d3.timeFormat("%Y-%m-%dT%H:%M:%S.%L");
//     console.log(parsedTime(created_at) == parsedTime(created_at2));
//     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(consolidated_data));
//     var dlAnchorElem = document.getElementById('downloadAnchorElem');
//     dlAnchorElem.setAttribute("href", dataStr);
//     dlAnchorElem.setAttribute("download", "scene.json");
//     dlAnchorElem.click();
// }

function debug(value) {
    // console.log(d3.select("#time_ticks").value());
    // console.log(value);

    let parseTime = d3.timeFormat("%d/%m/%Y - %H:%M:%S");

    // let arrayDates = [];

    // consolidated_data.nodes.forEach(element => {
    //     if(element.created_at != undefined){
    //         arrayDates.push(element.created_at);
    //     }
    // });

    // console.log(arrayDates);

    let times = d3.scaleTime().domain([0, 50])
        //   .range(new Set(arrayDates.sort()));
        .range([d3.min(consolidated_data.nodes, d => d.created_at), d3.max(consolidated_data.nodes, d => d.created_at)]);
    console.log(times(value));
    let date_limit = times(value);
    let filteredNodes = consolidated_data.nodes.filter((d) => { return d.created_at <= date_limit });
    let filteredLinks = consolidated_data.links.filter((d) => { return nodes_contains(d, filteredNodes) });
    d3.select("#choose_date").text(parseTime(date_limit))
    buildGraph(filteredNodes, filteredLinks);
    updateAll(filteredLinks);

    function nodes_contains(link, nodes) {
        let source = link.source.id;
        let target = link.target.id;
        for (let index = 0; index < nodes.length; index++) {
            const node_id = nodes[index].id;
            if (node_id == target) {
                return true;
            }
        }
        return false;
    }
}

//   .filter(time => data.nodes.some(d => contains(d, time)))