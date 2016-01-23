var mongoose = require('mongoose');

var reportRequestSchema = mongoose.Schema({
	report_id: String,
	patient_email: String,
	patient_mobile: Number,
	request_date: String
});


module.exports = mongoose.model('reportrequest', reportRequestSchema);