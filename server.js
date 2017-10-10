'use strict';
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let config = require('config');
let server = express();

let port = process.env.PORT || 3000;

let modulesRoutes = require('./routes/modulesRoutes');
let usersRoutes = require('./routes/usersRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongo_uri'), {useMongoClient: true});

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

server.use('/modules', modulesRoutes);
server.use('/users', usersRoutes);

server.listen(port);
console.log('Server is now on listening on port : ' + port);

module.exports = server;