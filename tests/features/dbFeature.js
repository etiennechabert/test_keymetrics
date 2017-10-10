/**
 * Created by chaber_e on 09/10/2017.
 */
let config = require('config');
let MongoClient = require('mongodb').MongoClient;

module.exports.dbReset = function(cb) {
    MongoClient.connect(config.get('mongo_uri'), function(err, db) {
        if (err)
            throw err;
        db.listCollections({}, {}, (listCollections) => {
            let lol = true;
        });
    });
};
