const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);

// sanity check route 
server.get('/', (req, res) => {
      res.send(`<h2>nailed it!</h2>`)
      
});

module.exports = server;
