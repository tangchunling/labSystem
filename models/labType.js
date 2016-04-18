var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var labSchema = new Schema({
	
	labTypeName:{ type: String, default: '' },
	labs:{type: Array, default: []}
	
	
});

module.exports = mongoose.model('labType',labSchema);