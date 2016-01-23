var mongoose = require('mongoose');

var medicalServicesSchema = mongoose.Schema({
	name: String,
	description: String
});


module.exports = mongoose.model('medicalservice', medicalServicesSchema);