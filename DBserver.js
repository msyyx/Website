var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

//To connect to MongoDB's  database
mongoose.connect('mongodb://localhost/db');

//check the status of this connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to MongoDB');
});

// Creates the model for Books.
var Users = mongoose.model('Users', UserSchema);

//To create an instance from a model, we can simply call new on the model.
// Instantiates a new Book. It's still not in the DB.
var insUser = new Users({
  title: 'Introduction to Algorithms',
  authors: [
    {
      first: 'Thomas',
      middle: 'H.',
      last: 'Cormen'
    },
    {
      first: 'Charles',
      middle: 'E.',
      last: 'Leiserson'
    },
    {
      first: 'Ronald',
      middle: 'L.',
      last: 'Rivest'
    },
    {
      first: 'Clifford',
      last: 'Stein'
    }
  ],
  year: 1990
})

//The instnace is not saved in the DB yet. Let's try to save it using `save`:
// Tries to save the book in the DB.
insBook.save(function (err) {
	  if (err) {
	    console.log(err);
	    return;
	  }

	  // Now it's saved!
	  console.log('Registered user: ' + insUser);

	  Users.findById(insUser._id, function(err, user) {
	    if (err) {
	      console.log(err);
	      return;
	    }

	    console.log('\n\n Found user: ' + user);
	   });
 });
