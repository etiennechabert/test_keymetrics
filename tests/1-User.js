let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('User basic story', function() {
    it("Get a list of users empty", (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("Create a user");
    it("Get a user");
    it("Get a list of users not empty");
});

describe('User error test', function() {
    it("Refuse a bad user register");
    it("Create a duplicate user");
    it("Get a user 404");
});

