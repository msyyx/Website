'use strict';

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var hostSchema = new Schema({
    name: {type:String , default: '', trim: true},
    ownerName: {type:String , default: ''},
    owner:{ type : Schema.ObjectId, ref : 'User' },
    description: { type : String, default : '', trim : true },
    comments: [{
        body: { type : String, default : '' },
        user: { type : Schema.ObjectId, ref : 'User' },
        createdAt: { type : Date, default : Date.now }
    }],
});

module.exports = mongoose.model( 'Host', hostSchema );
