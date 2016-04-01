var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var ProfileSchema = new Schema({
    username: {type:String },
    dateofbirth:{ type : Date },
    contactemail: { type : String },
    recentlyvisit: [{
        hostname: { type : String},
        comments: { type : String,default:''},
    }],
    host:[{
    	hostname:{type:String ,default:''},
    }]
});

module.exports = mongoose.model( 'profile', ProfileSchema );