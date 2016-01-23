var mongoose = require('mongoose');

var tSchema = mongoose.Schema({
	fname: String,
	lname: String,
	post: String,
	img_url: String
});


module.exports = mongoose.model('trustee', tSchema);