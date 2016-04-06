var assert = require('assert');

var superagent = require("superagent");



describe("test",function  () {
  // body...
  describe("test register",function(){
        var testuser={
          username: "test",
          password:"test",
          email:"test@gmail.com"
        };
        it("should add a user successfully", function (done) {
          superagent.post('http://localhost:3000/user/add').send(testuser).end(function (err, res) {
          assert.equal(res.statusCode, 200);
          assert.equal(err, null);
          done();
          });
        });

        it("should not add the same username twice", function (done) {
        superagent.post('http://localhost:3000/user/add').send(formData).end(function (err, res) {
        assert.equal(res.statusCode, 400);
        var expectedMsg = "Name already exists!";
        assert.equal(res.text, expectedMsg);
        done();
        });
    });

  });

  describe("Testing  login", function() {
    var login = {
      username : "wrong",
      password :"bad",
    }

    it("should not login", function (done) {
      superagent.post('http://localhost:3000/user/find').send(login).end(function (err, res) {
        assert.equal(res.statusCode, 400);
        done();
      });
    });

   
    var login1 = {
      username : "test",
      password :"test",
    };
  
    it("should be able to login ", function (done) {
      superagent.post('http://localhost:3000/user/find').send(loginDataGood).end(function (err, res) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });


});