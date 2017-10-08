'use strict';
let Express = require('express');

let app = Express();
let port = process.env.PORT || 3000;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

