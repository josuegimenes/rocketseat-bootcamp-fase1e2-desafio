# Bootcamp Rocketseat - Fase 1 e 2 - Desafio

Código do projeto para o desafio da fase 1 e 2 do bootcamp Rocketseat.

### Criando Projeto

- Method: `POST`
- URL: http://localhost:3002/projects
- Body:

```
{
	"id": "1",
	"title": "Projeto 1"
}
```

### Editando Nome do Projeto

- Method: `PUT`
- URL: http://localhost:3002/projects/:id
- Body:

```
{
	"title": "Alterando Título do Projeto"
}
```

### Deletando Projeto

- Method: `DELETE`
- URL: http://localhost:3002/projects/:id
- Body:

```
no body
```

### Criando Tasks

- Method: `POST`
- URL: http://localhost:3002/projects/:id/tasks
- Body:

```
{
	"title": "Tarefa 1"
}
```

### Listando Todos os Projetos

- Method: `GET`
- URL: http://localhost:3002/projects
- Body:

```
no body
```

### Listando apenas um Projeto

- Method: `GET`
- URL: http://localhost:3002/projects/:id
- Body:

```
no body
```
