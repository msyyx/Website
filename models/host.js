'use strict';

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var hostSchema = new Schema({
    name: {type:String , default: '', trim: true},
    ownerName: {type:String , default: ''},
    owner:{ type : Schema.ObjectId, ref : 'User' },
    items:{type :[String]},
    hours:{type :[String]},
    prices: {type :[Number]},
    description: { type : String, default : '', trim : true },
    contact:{type : String},
    comments: [{
        body: { type : String, default : '' },
        user: { type : Schema.ObjectId, ref : 'User' },
        createdAt: { type : Date, default : Date.now }
    }],
});

module.exports = mongoose.model( 'Host', hostSchema );
