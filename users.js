var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to MongoDB');
});

var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

var Users = mongoose.model('Users', UserSchema);

router.get('/', function(req, res) {
  //lists users
});

// This should use POST but we use GET for brevity.
router.get('/new', function(req, res) {
  //creates new user
});

// This should use POST but we use GET for brevity.
router.get('/delete/:id', function(req, res) {
  //deletes user from id
});

router.get('/:id', function(req, res) {
  //returns info for user by id
});

module.exports = router;
