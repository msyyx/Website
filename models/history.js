/*to do list:
 *EAT!
 *Write the db, connect the db
 *work on tokens
 */

 'use strict';

 var mongoose = require( 'mongoose' );
 var Schema   = mongoose.Schema;

 var historySchema = new Schema ({
   hostName: {type: String, default: ''},
   userName: {type: String, default: ''},
   date: {type: String, default: ''},
   orderDetail: {type: String, default: ''},
   comment: {type: String, default: ''},
   hostID: {type: String, default: ''},
   rate: {type: String, default: ''}
 });

 module.exports = mongoose.model('History', historySchema );
