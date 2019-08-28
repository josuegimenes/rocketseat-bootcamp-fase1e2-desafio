const express = require("express");

const server = express();

server.use(express.json());

let numberOfRequests = 0;

const projects = [];

//Middleware - Log para recuperar o método, url e tempo de execução.
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

//Middleware que só cria projeto se possuir um id no body.
function checkRequestBodyId(req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({ error: "Request Body Id is required." });
  }
  return next();
}

//Middleware que verifica se o projeto existe.
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    //Retorna o erro 400 - Bad Request - não existe o projeto.
    return res.status(400).json({ error: "Project does not exists!" });
  }
  return next();
}

//Middleware que conta quantas vezes foi realizado as requisições.
function logRequest(req, res, next) {
  numberOfRequests++;
  console.log(`Número de requisições: ${numberOfRequests}`);
  return next();
}

//Lista todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Lista apenas 1 projeto
server.get("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  return res.json(project);
});

//Cria um projeto
server.post("/projects", checkRequestBodyId, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.json(project);
});

//Cria uma tarefa ao projeto
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(tasks);
  return res.json(project);
});

//Edita nome do projeto
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;
  return res.json(project);
});

//Deleta o projeto todo
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);
  return res.send();
});

server.listen(3002);
