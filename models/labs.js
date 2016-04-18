var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var labSchema = new Schema({
	
	labName:{ type: String, default: '微生物实验室' },
	roomNum:{type: String, default: '202'},
	seats: {type: String,default: ''},
	software: {type: String,default: ''},
	hardware:{type: String, default: ''},
	intro: {type: String,default: ''},
	labType: {type: String, ref : 'labType' ,default: ''}	
});

module.exports = mongoose.model('labs',labSchema);