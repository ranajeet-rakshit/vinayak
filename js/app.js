// var app = 
angular.module('myApp', ['ngRoute','ui.bootstrap']).controller('mainCtrl', mainCtrl);

	function mainCtrl($scope, dataService){
	// var vm = this;

	$scope.message = "Message defined in the controller";
	
}

angular.module('myApp').config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl:'/vinayak/app/partials/home.html',
			controller: 'HomeController',
			controllerAs: 'home'
		})
		.when('/about',{
			templateUrl:'/vinayak/app/partials/about.html',
			controller: 'AboutController',
			controllerAs: 'about'
		})
		.when('/carrer',{
			templateUrl:'/vinayak/app/partials/carrer.html',
			controller:'CarrerController',
			controllerAs: 'carrer'
		})
		.when('/newsletter',{
			templateUrl: '/vinayak/app/partials/newsletter.html',
			controller: 'NewsletterController',
			controllerAs: 'newsletter'
		})
		.when('/contactUs',{
			templateUrl: '/vinayak/app/partials/contact.html',
			controller: 'ContactController',
			controllerAs: 'contactUs'
		})//Added New
		.when('/consultants',{
			templateUrl: '/vinayak/app/partials/consultants.html',
			controller: 'ConsultantsController',
			controllerAs: 'consultants'
		})
		.when('/medicalServices',{
			templateUrl: '/vinayak/app/partials/medicalServices.html',
			controller: 'medicalServicesController',
			controllerAs: 'medicalServices'
		})
		.when('/facilities',{
			templateUrl: '/vinayak/app/partials/facilities.html',
			controller: 'facilitiesController',
			controllerAs: 'facilities'
		})
		.when('/opdSchedule',{
			templateUrl: '/vinayak/app/partials/opdSchedule.html',
			controller: 'opdScheduleController',
			controllerAs: 'opdSchedule'
		})
		.when('/departments',{
			templateUrl: '/vinayak/app/partials/departments.html',
			controller: 'departmentsController',
			controllerAs: 'departments'
		})
		.when('/rooms',{
			templateUrl: '/vinayak/app/partials/rooms.html',
			controller: 'roomsController',
			controllerAs: 'rooms'
		})
		.when('/trustee',{
			templateUrl: '/vinayak/app/partials/trustee.html',
			controller: 'trusteeController',
			controllerAs: 'trustee'
		})
		.when('/panel',{
			templateUrl: '/vinayak/app/partials/panel.html',
			controller: 'panelController',
			controllerAs: 'panel'
		})
		.otherwise('/');
}])