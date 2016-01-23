var mongoose = require('mongoose');

var testimonialSchema = mongoose.Schema({
	name: String,
	status: String,
	description: String,
	date: String
});


module.exports = mongoose.model('testimonial', testimonialSchema);