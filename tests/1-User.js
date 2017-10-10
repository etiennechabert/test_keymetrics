let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let expect = chai.expect;
let UserModel = require('../models/userModel');

chai.use(chaiHttp);

// These variable are necessary to chain tests
let userJson = {
    email: 'test@test.com',
    password: 'passwd'
};
let userId;

describe('User prepare', function() {
   it("Truncate the base", function(done) {
       UserModel.remove({}, done);
   })
});

describe('User basic story', function() {
    it("Get a list of users empty", (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.users).to.be.empty;
                done();
            });
    });
    it("Create a user", (done) => {
        chai.request(server)
            .post('/users')
            .send(userJson)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.user.email).to.be.equal(userJson.email);
                expect(res.body.user.password).to.not.exist;
                userId = res.body.user._id;
                done();
            });
    });

    it("Get a user", (done) => {
        chai.request(server)
            .get('/users/' + userId)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("Get a list of users not empty", (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.users).to.not.be.empty;
                done();
            });
    });
});

describe('User error test', function() {
    it("Refuse a bad user register", (done) => {
        let badUserJson = JSON.parse(JSON.stringify(userJson));
        delete badUserJson.password;
        chai.request(server)
            .post('/users')
            .send(badUserJson)
            .end((err) => {
                expect(err.response.status).to.be.equal(400);
                done();
            });
    });
    it("Create a duplicate user", (done) => {
        chai.request(server)
            .post('/users')
            .send(userJson)
            .end((err) => {
                expect(err.response.status).to.be.equal(400);
                done();
            });
    });

    it("Get a user bad format id", (done) => {
        chai.request(server)
            .get('/users/' + 42)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                done();
            })
    });

    it("Get a user 404", (done) => {
        chai.request(server)
            .get('/users/' + userId.split('').reverse().join(''))
            .end((err, res) => {
                expect(res.status).to.be.equal(404);
                done();
            })
    });
});

describe("done", function() {
   it("Exit", () => {
       process.exit(0);
   })
});
