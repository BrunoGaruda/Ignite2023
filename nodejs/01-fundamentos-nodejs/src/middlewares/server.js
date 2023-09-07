// CommonJS => require
// ESmodules => import/export (nova forma de importar)

import http from 'node:http'
import { json } from './json.js';
import { routes } from './routes.js';
import { extractQueryParams } from '../utils/extract-query-params.js';

// const http = require('http');

// req consegue obter todas as requisições do servidor
// res seria a resposta do servidor

// ### Métodos
// - Criação de usuários
// - Listagem de usuários
// - Edição de usuários
// - Remoção de usuários

// ### HTTP
// - Métodos
// - URL

// GET, POST, PUT, PATCH, DELETE

// GET => buscar recurso no back-end
// POST => criar uma recurso no back-end
// PUT => Atualizar uma recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar uma recurso no back-end

// Stateful - Stateless

// JSON = Javascript Object Notation

// Cabeçalhos (Requisição/Resposta) => Metadados

// HTTP Status Code

// ----------------------------------------------------------------

// ### Enviando informações para o front end.

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
  // ex: http://localhost:3333/users?userId=1&name=John&password=12345

// Route Parameters: URL Stateful => Identificação de recurso(GET,POST,PUT,DELETE)
  // ex: GET http://localhost:3333/users/1

// Request Body: Envio de informações de um formulário (HTTPs) => informações importantes
  //ex : http://localhost:3333/users


const server = http.createServer(async (req, res) => {
  const { method, url} = req;

  // Middleware
  await json(req, res)
 
  const route = routes.find(route => { 
    return route.method === method && route.path.test(url);
  })

  // console.log(route);

  if (route) {
    const routeParams = req.url.match(route.path)

    const {query, ...params} = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}
   
    return route.handler(req, res);
  }

  return res.writeHead('404').end('not found')
})

server.listen(3333) 