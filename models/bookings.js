var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingsSchema = new Schema({
	
	semester:{ type: String, default: '2015/2016学年 第2学期' },
	week:{type: String, default: '0'},
	dayOfWeek: {type: String,default: '0'},
	classOfDay: {type: String,default: ''},
	lab:{type: String, default: ''},
	course: {type: String,default: ''},
	teacher: {type: String, default: ''},
	memo: {type: String, default: '备注'},
	status: {type: String, default: '0'}	
});

module.exports = mongoose.model('bookings',bookingsSchema);