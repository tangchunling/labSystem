var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teachersSchema = new Schema({
	
	facultyId:{ type: String, default: '1203001' },
	teacherName:{type: String, default: '张三'},
	dept: {type: String,default: '软件工程系'},
	email: {type: String,default: ''},
	password:{type: String, default: ''},
	salt: {type: String,default: ''},
	memo: {type: String, default: ''},
	status: {type: String, default: '0'}	
});

module.exports = mongoose.model('teachers',teachersSchema);