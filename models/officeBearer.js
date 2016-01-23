var mongoose = require('mongoose');

var officeBearerSchema = mongoose.Schema({
	fname: String,
	lname: String,
	post: String,
	img_url: String
});


module.exports = mongoose.model('officebearer', officeBearerSchema);