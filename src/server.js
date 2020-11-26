const express = require('express');
const cors = require('cors');
const { serverConfig } = require('./config');
const api = require('./routes/api');

const server = express();

//  Settings
server.set('port', serverConfig.port);

//  Middlewares

/*
    CORS origin:
        - Production: https://sharedops.herokuapp.com
        - Development: http://localhost:3000
*/
// server.use(cors({
//     credentials: true,
//     origin: [
//         'http://localhost:3000'
//     ]
// }));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


//  Routes 
server.get('/', (req, res) => res.send('Welcome to Sharedops API'));
server.use('/api', api);

module.exports = server;