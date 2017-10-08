'use strict';
let express = require('express');
let server = express();

let port = process.env.PORT || 3000;

server.use(require('./routes/moduleRoutes'));
server.use(require('./routes/userRoutes'));

server.listen(port);

console.log('Server is now on listening on port : ' + port);

module.exports = server;