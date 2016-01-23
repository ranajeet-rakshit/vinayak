var mongoose = require('mongoose');

var opdScheduleSchema = mongoose.Schema({
	days: String,
	time_from: String,
	time_to: String,
	department_id: Number,
	doctor_id: Number
});


module.exports = mongoose.model('opdschedule', opdScheduleSchema);