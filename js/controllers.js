angular.module('myApp')
	.controller('HomeController', ['dataService','$scope',function(dataService, $scope){
		$scope.message = "Hello! From dataService";

		$scope.carouselImages = {};
		$scope.myInterval = 3000;
		$scope.limitImg = 6;

		var tables="carousel||departments||medical_services||doctors||testimonials||office_bearers"

		dataService.getAppData(tables)
		.then(getDataSuccess, getDataError);

		function getDataSuccess(data){
			$scope.appData = data;
			for(var i=0;i<$scope.appData.doctors.length;i++){
				for(var j=0;j<$scope.appData.departments.length;j++){
					if($scope.appData.doctors[i].department_id == $scope.appData.departments[j].id){
						$scope.appData.doctors[i].department = $scope.appData.departments[j].name;
					}
				}
			}
		}



		function getDataError(errMsg){
			console.log('Something went wrong while fetching application data: '+errMsg);
		}

	}])
	.controller('AboutController', ['dataService','$scope',function(dataService, $scope){
		$scope.message = 'It freakin works!!';
		console.log('AboutController: ',dataService);
	}])
	.controller('CarrerController',['dataService','$scope', function(){
		
	}])
	.controller('NewsletterController',['dataService','$scope', function(){
		
	}])
	.controller('ContactController',['dataService','$scope', function(dataService, $scope){
		$scope.user = {};

		$scope.showInput = function(){
			console.log($scope.user.firstname);
			console.log($scope.user.lastname);
			console.log($scope.user.email);
			console.log($scope.user.address);
			console.log($scope.user.message);
		}

		$scope.clearUser = function(){
			$scope.user = {};
		}

	}])
	.controller('ConsultantsController',['dataService','$scope', function(dataService, $scope){
		var tables="consultants||departments";
		dataService.getAppData(tables)
		.then(getDataSuccess, getDataError);

		function getDataSuccess(data){
			$scope.appData = data;
			for(var i=0;i<$scope.appData.consultants.length;i++){
				for(var j=0;j<$scope.appData.departments.length;j++){
					if($scope.appData.consultants[i].department_id == $scope.appData.departments[j].id){
						$scope.appData.consultants[i].department = $scope.appData.departments[j].name;
					}
				}
			}
		}

		function getDataError(errMsg){
			console.log('Something went wrong while fetching application data: '+errMsg);
		}

	}])
	.controller('medicalServicesController',['dataService','$scope', function(dataService, $scope){
		var tables="medical_services";
		dataService.getAppData(tables)
		.then(getDataSuccess, getDataError);

		function getDataSuccess(data){
			$scope.appData = data;
		}

		function getDataError(errMsg){
			console.log('Something went wrong while fetching application data: '+errMsg);
		}
	}])
	.controller('facilitiesController',['dataService','$scope', function(){
		
	}])
	.controller('opdScheduleController',['dataService','$scope', function(dataService, $scope){
		var tables="opd_schedules||departments||doctors";
		dataService.getAppData(tables)
		.then(getDataSuccess, getDataError);

		function getDataSuccess(data){
			$scope.appData = data;
			for(var i=0;i<$scope.appData.opd_schedules.length;i++){
				for(var j=0;j<$scope.appData.departments.length;j++){
					if($scope.appData.opd_schedules[i].department_id == $scope.appData.departments[j].id){
						$scope.appData.opd_schedules[i].department = $scope.appData.departments[j].name;
					}
				}
			}

			for(var i=0;i<$scope.appData.opd_schedules.length;i++){
				for(var j=0;j<$scope.appData.doctors.length;j++){
					if($scope.appData.opd_schedules[i].doctor_id == $scope.appData.doctors[j].id){
						$scope.appData.opd_schedules[i].doctor = $scope.appData.doctors[j].fname+" "+
						$scope.appData.doctors[j].lname;
					}
				}
			}
		}

		function getDataError(errMsg){
			console.log('Something went wrong while fetching application data: '+errMsg);
		}
	}])
	.controller('departmentsController',['dataService','$scope', function(dataService, $scope){
		var tables="departments";
		dataService.getAppData(tables)
		.then(getDataSuccess, getDataError);

		function getDataSuccess(data){
			$scope.appData = data;
		}

		function getDataError(errMsg){
			console.log('Something went wrong while fetching application data: '+errMsg);
		}
	}])
	.controller('roomsController',['dataService','$scope', function(){
		
	}])
	.controller('trusteeController',['dataService','$scope', function(){
		
	}])
	.controller('panelController',['dataService','$scope', function(){
		
	}]);