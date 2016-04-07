var assert = require('assert');
var http = require('http');
var server = require('../server.js');
=var express = require('express');
var request = require('supertest')
var Route = express.Route;
var mongoose = require('mongoose');

/*
Important:
Make sure datebase is empty before starting the test
npm install mocha
npm install supertest
bash: Mocha

This unit test is designed only to test basic functionalities of the website, as higher level functionalities are under protection
of tokens than make it diffucult to test here.

*/

 request = request('http://localhost:11000');



describe('HTTP Server Test', function() {
  before(function() {
    server.listen(11000);
  });
  after(function() {
    server.close();
  });
  describe('/', function(){


    it('Load Host Test', function(done) {
      var postData = {
        'username' : '1231fdsgfdg23',
        'email' : '123@123',
        'password' : '1234'
      };
      request.get('/host/HostPage.html')
      //.send(postData)
      .expect(200)
      .end(function(err,res) {
        if(err) {
          return done(err);
        }
        done();
      });
    });

    it('Register test', function(done) {
      var postData = {
        'username' : '1231fdsgfdg23',
        'email' : '123@123',
        'password' : '1234'
      };
      request.post('/user/add')
      .send(postData)
      .expect(200)
      .end(function(err,res) {
        if(err) {
          return done(err);
        }
        done();
      });
    });

      it('Duplicate Register test', function(done) {
        var postData = {
          'username' : '1231fdsgfdg23',
          'email' : '123@123',
          'password' : '1234'
        };
        request.post('/user/add')
        .send(postData)
        .expect(400)
        .end(function(err,res) {
          if(err) {
            return done();
          }
          done(err);
        });
      });

        it('Login test', function(done) {
          var postData = {
            'username' : '1231fdsgfdg23',
            'password' : '1234'
          };
          request.post('/user/find')
          .send(postData)
          .expect(200)
          .end(function(err,res) {
            if (err) return done(err);
            done();
          });
        });

        it('wrong password trial', function(done) {
          var postData = {
            'username' : '1231fdsgfdg23',
            'password' : '12f34'
          };
          request.post('/user/find')
          .send(postData)
          .expect(400)
          .end(function(err,res) {
            if(err) return done();
            done(err);
          });
        });
    });
  });
