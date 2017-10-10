let fs = require('fs');

// function to encode file data to base64 encoded string
module.exports = function (file) {
    let bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
};