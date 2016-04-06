var assert = require('assert');
var http = require('http');
var server = require('./server.js');
var routeUser = require('./controllers/routeUser.js');
var fs = require('fs');
var request = require('request');
var ajax = require('ajax-request');
var $ = require('jquery');
var querystring = require('querystring');

var MONGODB_URL = 'mongodb://localhost/db';

//read the main page file
var indexHtml = null;
fs.readFile('./view/main.html', function(err, data){
	if(err){
		indexHtml = 'error reading main page:' + JSON.stringify(err, null, 4);
	}
	else{
		indexHtml = data;
	}
	return;
});

cookie = '';
header = {};

describe('HTTP Server Test', function(){
  after(function(){
    server.close();
  });

  describe('test home page', function(){
    it('should return main page', function(done){
      http.get('http://localhost:3000', function(response){
        //assert the status code
        assert.equal(response.statusCode, 200);
        var body = '';
        response.on('data', function(d){
          body += d;
        });
        response.on('end', function(){
          assert.equal(body, indexHtml);
          //console.log(body);
          done();
        });
      });
    });
  });
  describe('Test login', function(){
    it('should successfully login', function (done){
      userInfo = {username:test, password:test, email:test@gmail.com};
      var postData = querystring.stringify({'json': JSON.stringify(userInfo)});
      var postOptions = {
        host: 'localhost',
        port: '3000',
        path: '/login.html',
        cookie: cookie,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
          };
          var postReq = http.request(postOptions, function (res) {
            cookie = res.headers['set-cookie'];
            header = res.headers;
            res.setEncoding('utf8');
            res.on('done', function (chunk){
            });
            res.on('end', function(){
                var getOptions = {
                  host: 'localhost',
                  port: '3000',
                  path: '/user/show',
                  method: 'GET',
                  headers: header
                };
                var req = http.request(getOptions, function (response){
                  var body = '';
                  response.on('data', function(data){
                      body += data;
                  });
                  response.on('end', function(){
                      done();
                  });
                });
                req.end();
            }); 
        });
        post_req.write(postData);
        post_req.end();
    });
    
    it('should fail when username is wrong', function (done){
      userInfo = {username:wrongtest, password:test, email:test@gmail.com};
      var postData = querystring.stringify('json': JSON.stringify(userInfo));
      var postOptions = {
        host: 'localhost',
        port: '3000',
        path: '/login.html',
        cookie: cookie,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
          };
          var postReq = http.request(postOptions, function (res) {
            cookie = res.headers['set-cookie'];
            header = res.headers;
            var body = '';
            res.setEncoding('utf8');
            res.on('done', function (chunk){
              body += chunk;
            });
            res.on('end', function(){
              assert.equal("Username or password incorrect", body);
              done();
            });
          });
          post_req.write(postData);
          post_req.end();
    });

    it ('should fail when password is wrong', function (done){
      userInfo = {username:test, password:wrongtest, email:test@gmail.com};
      var postData = querystring.stringify('json': JSON.stringify(userInfo));
      var postOptions = {
        host: 'localost',
        port: '3000',
        path: '/login.html',
        cookie: cookie,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
        }
      };
      var postReq = http.request(postOptions, function (res) {
        cookie = res.headers['set-cookie'];
        header = res.headers;
        var body = '';
        res.setEncoding('utf8');
        res.on('done', function (chunk){
          body += chunk;
        });
        res.on('end', function(){
          assert.equal("Username or password incorrect", body);
          done();
        });
      });
      post_req.write(postData);
      post_req.end();
    });
  });
});