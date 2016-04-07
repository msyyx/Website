var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var hostRoute = require('./controllers/routeHost.js');
var orderRoute = require('./controllers/routeOrder.js');
var userRoute = require('./controllers/routeUser.js');
var profileRoute = require('./controllers/routeProfile.js');
var app = express();
var port = 3000;

app.listen(port);
var router = express.Router();

describe("test",function  () {
  // body...
  describe("test register",function(){
        var testuser={
          username: "test",
          password:"test",
          email:"test@gmail.com"
        };
        it("should add a user successfully", function (done) {
          router.post('http://localhost:3000/user/add', testuser,function(response){
        assert.equal(response.end, "Submission completed");
       
        });
        });

        it("should not add the same username twice", function (done) {
        router.post('http://localhost:3000/user/add' ,testuser,function (err, res) {
        assert.notEqual(err, null);
        });
    });

  });

  describe("Testing  login", function() {
    var login = {
      username : "wrong",
      password :"bad",
    }

    it("should not login", function (done) {
      router.post('http://localhost:3000/user/find' ,login ,function (err, res) {
        assert.notEqual(err, null);
      });
    });

   
    var login1 = {
      username : "test",
      password :"test",
    };
  
    it("should be able to login ", function (done) {
        router.post('http://localhost:3000/user/find',login1,function (err, res) {
        assert.equal(res.end, "Information found");
        done();
      });
    });
  });


});