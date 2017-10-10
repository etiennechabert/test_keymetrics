'use strict';

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let config = require('config');
let server = express();

// Basic Auth engine -- Passport
let authenticate = require("./middlewares/authenticate");

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongo_uri'), {useMongoClient: true});

// Middle definition
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(authenticate.initialize());

// Router section
server.use('/modules', require('./routes/modulesRoutes'));
server.use('/users', require('./routes/usersRoutes'));

// Starting server
server.listen(config.get('application_port'));
console.log('Server is now on listening on port : ' + config.get('application_port'));

// Export server for CHAI-HTTP testing
module.exports = server;
