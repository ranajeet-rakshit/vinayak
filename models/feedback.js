var mongoose = require('mongoose');

var feedbackSchema = mongoose.Schema({
	fullname: String,
	email: String,
	phone: Number,
	message: String,
	response: String,
	msg_date: String,
	response_date: String
});


module.exports = mongoose.model('Feedback', feedbackSchema);