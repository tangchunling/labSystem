var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coursesSchema = new Schema({
	
	semester:{ type: String, default: '2015/2016学年 第2学期' },
	course:{type: String, default: '0'},
	software: {type: String,default: '0'},
	isOpenSourceCourse: {type: String,default: ''},
	courseType:{type: String, default: ''},
	classes: {type: String,default: ''},
	studentNum: {type: String, default: ''},
	hours: {type: String, default: '备注'},
	campus: {type: String, default: '0'},
	teacher: {type: Array, default: []}
});

module.exports = mongoose.model('courses',coursesSchema);