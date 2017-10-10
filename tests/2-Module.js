let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let md5 = require('md5');
let fs = require('fs');
let stripJsonComments = require('strip-json-comments');
let expect = chai.expect;

let fileToBase64 = require('./features/fileToBase64');
let UserModel = require('../models/userModel');
let ModuleModel = require('../models/moduleModels');

chai.use(chaiHttp);

// These variable are necessary to chain tests
let userJson = {
    email: 'test@test.com',
    password: 'passwd'
};
let module1;
let module2;

let userId;

describe('User prepare', function() {
    it("Truncate the base", function(done) {
        UserModel.remove({}, done);
    });
    it("Create a user", (done) => {
        chai.request(server)
            .post('/users')
            .send(userJson)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                userId = res.body.user._id;
                done();
            });
    });
});
describe('Module prepare', function() {
    it("Truncate the module", function(done) {
        ModuleModel.remove({}, done);
    });
});

describe("Module basic", function() {
    it("Empty list of modules", (done) => {
        chai.request(server)
            .get('/modules')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.modules).to.be.empty;
                done();
            });
    });
    it("Create of module", (done) => {
        let moduleJson = {};
        moduleJson.base64Content = fileToBase64('./tests/misc/archive21.tgz');
        moduleJson.checkSum = md5(moduleJson.base64Content);
        moduleJson.package = JSON.parse(stripJsonComments(fs.readFileSync('./tests/misc/package1_1.json', 'utf-8')));
        chai.request(server)
            .post('/modules')
            .auth(userJson.email, userJson.password)
            .send(moduleJson)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.module).to.be.not.empty;
                module1 = res.body.module;
                done();
            });
    });
    it("Get details about a module", (done) => {
        chai.request(server)
            .get('/modules/' + module1.name)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.module).to.be.not.empty;
                expect(res.body.module.precedent_versions.length).to.be.equal(0);
                done();
            });
    });
    it("Download a module", (done) => {
        chai.request(server)
            .get('/modules/' + module1.name + '/download')
            .auth(userJson.email, userJson.password)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.base64).to.be.not.empty;
                expect(res.body.checkSum).to.be.not.empty;
                expect(res.body.checkSum).to.be.equals(md5(res.body.base64));
                done();
            })
    });
    it("Upload a new version", (done) => {
        let moduleJson = {};
        moduleJson.base64Content = fileToBase64('./tests/misc/archive42.tgz');
        moduleJson.checkSum = md5(moduleJson.base64Content);
        moduleJson.package = JSON.parse(stripJsonComments(fs.readFileSync('./tests/misc/package1_2.json', 'utf8')));
        chai.request(server)
            .post('/modules')
            .auth(userJson.email, userJson.password)
            .send(moduleJson)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.module).to.be.not.empty;
                expect(res.body.module.precedent_versions.length).to.be.equal(1);
                done();
            });
    });
    it("Get details with the list of versions", (done) => {
        chai.request(server)
            .get('/modules/' + module1.name)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            })
    });
    it("Download the new version", (done) => {
        chai.request(server)
            .get('/modules/' + module1.name + '/download')
            .auth(userJson.email, userJson.password)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.checkSum).to.be.equals(md5(res.body.base64));
                done();
            })
    });
    it("Download the precedent version", (done) => {
        chai.request(server)
            .get('/modules/' + module1.name + '/download/2.5.0')
            .auth(userJson.email, userJson.password)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.checkSum).to.be.equals(md5(res.body.base64));
                expect(res.body.version).to.be.equals('2.5.0');
                done();
            })
    });
});

describe("Module errors case", function() {
    it("Should handle a get on a module 404", (done) => {
        chai.request(server)
            .get('/modules/404')
            .auth(userJson.email, userJson.password)
            .end((err, res) => {
                expect(res.status).to.be.equal(404);
                done();
            });
    });
    it("Should handle a download on a module 404", (done) => {
        chai.request(server)
            .get('/modules/404/download')
            .auth(userJson.email, userJson.password)
            .end((err, res) => {
                expect(res.status).to.be.equal(404);
                done();
            });
    });
    it("Download the precedent version", (done) => {
        chai.request(server)
            .get('/modules/' + module1.name + '/download/404')
            .auth(userJson.email, userJson.password)
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