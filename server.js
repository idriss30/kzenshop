// importing dependencies 
const http = require('http');
const app = require('./app');

require('dotenv').config()


// assigning a port for now
const port = 4000;
//creating the server
const server = http.createServer(app);
server.listen(port)