var mongoose = require('mongoose');

var doctorSchema = mongoose.Schema({
	name: String
});


module.exports = mongoose.model('Doctor', doctorSchema);