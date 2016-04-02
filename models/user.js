var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  dateofbirth: {type: String, default: ''},
  name: {type :String, default:''},
  recentlyvisit:{type :String, default:''},
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
