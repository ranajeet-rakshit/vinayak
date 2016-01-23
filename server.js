var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Doctor = require('./models/doctor');
var Consultant = require('./models/consultant');
var Department = require('./models/department');
var Feedback = require('./models/feedback');
var MedicalService = require('./models/medicalService');
var NewsletterSignup = require('./models/newsletterSignup');
var OfficeBearer = require('./models/officeBearer');
var OPDSchedule = require('./models/opdSchedule');
var ReportRequest = require('./models/reportRequest');
var Testimonial = require('./models/testimonial');
var Trustee = require('./models/trustee');

var app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname+'/uploads'));
console.log(__dirname);
var router = express.Router();

var url = 'mongodb://localhost:27017/vinayak_new';

mongoose.connect(url);

router.get('/trustees',function(req,res){

	Trustee.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('/testimonials',function(req,res){

	Testimonial.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('/reportRequests',function(req,res){

	ReportRequest.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('/opdSchedules',function(req,res){

	OPDSchedule.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('/officeBearers',function(req,res){

	OfficeBearer.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('/newsletterSignups',function(req,res){

	NewsletterSignup.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('/medicalServices',function(req,res){

	MedicalService.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('/feedbacks',function(req,res){

	Feedback.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('/departments',function(req,res){

	Department.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('/doctors',function(req,res){

	Doctor.find(function(err, doctors){
		if(err)
			res.send(err);
		res.json(doctors);
	});
});

router.get('/consultants',function(req,res){

	Consultant.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

router.get('*',function(req, res){
	res.sendfile('index.html');
});

app.use('/',router);

app.listen(8080);
console.log("App listening on port 8080");