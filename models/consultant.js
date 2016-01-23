var mongoose = require('mongoose');

var consultantSchema = mongoose.Schema({
	department_id:Number,
	name: String
});


module.exports = mongoose.model('Consultant', consultantSchema);