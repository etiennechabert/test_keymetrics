let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let expect = chai.expect;

let UserSchema = require('../models/schemas/userSchema');
let ModuleSchema = require('../models/schemas/moduleSchema');

chai.use(chaiHttp);

// These variable are necessary to chain tests
let userJson = {
    email: 'test@test.com',
    password: 'passwd'
};
let userId;

describe('User prepare', function() {
    it("Truncate the base", function(done) {
        UserSchema.remove({}, done);
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
        ModuleSchema.remove({}, done);
    });
});

describe("done", function() {
    it("Exit", () => {
        process.exit(0);
    })
});