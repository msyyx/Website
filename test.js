var assert = require('assert');

var server = require('./server');
var fs = require('fs');
var request = require('request');
var ajax = require('ajax-request');
var $ = require('jquery');
var assert = require('assert');
var http = require('http');
var server = require('./server');
var fs = require('fs');
var request = require('request');
var ajax = require('ajax-request');
var $ = require('jquery');
var http = express();
describe("test",function  () {
  // body...
  describe("test register",function(){
        var testuser={
          username: "test",
          password:"test",
          email:"test@gmail.com"
        };
        it("should add a user successfully", function (done) {
          http.post('http://localhost:3000/user/add', testuser,function(response){
        assert.equal(response.end, "Submission completed");
       
        });
        });

        it("should not add the same username twice", function (done) {
        http.post('http://localhost:3000/user/add' ,testuser,function (err, res) {
        assert.notEqual(err, null));
        });
    });

  });

  describe("Testing  login", function() {
    var login = {
      username : "wrong",
      password :"bad",
    }

    it("should not login", function (done) {
      http.post('http://localhost:3000/user/find' ,login ,function (err, res) {
        assert.notEqual(err, null);
      });
    });

   
    var login1 = {
      username : "test",
      password :"test",
    };
  
    it("should be able to login ", function (done) {
        http.post('http://localhost:3000/user/find',login1,function (err, res) {
        assert.equal(res.end, "Information found");
        done();
      });
    });
  });


});