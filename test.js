var assert = require('assert');
var mongoose = require('mongoose');
var server = require('./server');
var request =require('supertest');

describe("test",function  () {
  before(function(done){
    mongoose.connect('mongodb://localhost/db', function(err) {
    if(err) {
        throw err;
      }
    });
  });

  describe("test register",function(){
    it("should register ",function(done){
      request(server)
        .post('http://localhost:3000/user/add')
        .send({username:"test",password:"test",email:"test@gmail.com"})
        .end(function(err,res){
          assert.equal (res.end,"Submission completed");
        })
    });

  });

  
});


 