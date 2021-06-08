const express = require('express');
const cors = require('cors');
const { serverConfig } = require('./config');
const api = require('./routes/api');

const server = express();

//  Settings
server.set('port', serverConfig.port);

//  Last element of whiteList is the front-end development origin.
const whiteList = [
    'https://sharedops.netlify.app',
    'http://sharedops.netlify.app',
    'http://localhost:3000'
];
server.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


//  Routes 
server.get('/', (req, res) => res.send('Welcome to Sharedops API'));
server.use('/api', api);

module.exports = server;