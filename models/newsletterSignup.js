var mongoose = require('mongoose');

var newsletterSignupSchema = mongoose.Schema({
	signup_email: String,
	signup_date: String
});


module.exports = mongoose.model('newslettersignup', newsletterSignupSchema);