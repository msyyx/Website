var assert = require('assert');
var http = require('http');
var server = require('./server.js');
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
  });