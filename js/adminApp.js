var app = angular.module('adminApp', ['ngMaterial','ngRoute','ngAnimate','ngFileUpload']).
		config(function($mdThemingProvider){
			
		});

app.controller('appCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav,backend){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
  
 
}]);

app.factory('backend', ['$q','$http', function($q,$http){
	return{
		getData: getData,
		updateRecord: updateRecord,
		addRecord: addRecord,
		deleteRecord: deleteRecord
	};
	

	function getData(tables){
		return $http({
			method:'GET',
			url:'getTables.php?tables='+tables,
		})
		.then(respondData)
		.catch(respondDataError);
	}

	function respondData(response){
		return response.data;
	}

	function respondDataError(err){
		return $q.reject("Error retrieving Departments. (HTTP Status: "+err.status+")");
	}

	function updateRecord(dataSet){
		// CODE TO POST DATA TO DATABASE

		return $http({
			url:'updateRecords.php',
			method:'POST',
			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			data: dataSet
		})
		.then(respondSuccess)
		.catch(respondError);
	}

	function respondSuccess(response){
		return response;
	}

	function respondError(err){
		return $q.reject("Error retrieving Departments. (HTTP Status: "+err.status+")");
	}


	function addRecord(dataSet){
		// CODE TO POST DATA TO DATABASE

		return $http({
			url:'addRecord.php',
			method:'POST',
			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			data: dataSet
		})
		.then(addSuccess)
		.catch(addError);
	}

	function addSuccess(response){
		return response;
	}

	function addError(err){
		return $q.reject("Error retrieving Departments. (HTTP Status: "+err.status+")");
	}



	function deleteRecord(dataSet){
		// CODE TO POST DATA TO DATABASE

		return $http({
			url:'deleteRecord.php',
			method:'POST',
			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			data: dataSet
		})
		.then(deleteSuccess)
		.catch(deleteError);
	}

	function deleteSuccess(response){
		return response;
	}
	function deleteError(err){
		return $q.reject("Error retrieving Departments. (HTTP Status: "+err+")");
	}
}])

app.controller('UserController', ['$scope','backend','$mdDialog', function($scope, backend, $mdDialog){

	updateRecords();

	function updateRecords(){
		backend.getData('admins')
		.then(getDataSuccess, getDataError);
		function getDataSuccess(data){
			$scope.appData = data;
		}
		function getDataError(errMsg){
			alert('Something went wrong while fetching application data: '+errMsg);
		}

	}
	

	var userToEdit;

	$scope.editUser = function(n){
		userToEdit=n;
	}

	$scope.assignUser = function(){

		var user=[
			{
				id: userToEdit.id,
				username:$scope.userName,
				role:$scope.role
			}
		]

		user.push({tableName:'admins'});
		
		backend.updateRecord(user)
		.then(postDataSuccess, postDataError);
	}

	function postDataSuccess(data){
		//console.log("Success updating record: "+data);
		updateRecords();
		$scope.userName=undefined;
		$scope.role=undefined;
	}
	function postDataError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}

	$scope.addUser = function(){
		var dataSet=[
			{
				username: $scope.addUserName,
				password: $scope.password,
				role: $scope.addRole
			}
		]
		dataSet.push({tableName:'admins'});

		backend.addRecord(dataSet)
		.then(addDataSuccess, addDataError);
	}
	function addDataSuccess(data){
		updateRecords();
	}
	function addDataError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}
	
	function deleteRecord(user){
		var dataSet=[
			{
				id: user.id
			}
		]
		dataSet.push({tableName:'admins'});

		backend.deleteRecord(dataSet)
		.then(deleteSuccess, deleteError);
	}
	function deleteSuccess(data){
		updateRecords();
	}
	function deleteError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}

	$scope.showConfirm = function(ev, user) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Delete user: '+user.username+'?')
          .content('Please confirm.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      //console.log('You decided to get rid of your debt.');
      deleteRecord(user);
    }, function() {
      
    });
  };

}])
.controller('SettingsController', ['$scope','backend','$mdDialog', function($scope, backend, $mdDialog){
	updateData();
	function updateData(){
		backend.getData('admin_settings')
		.then(getDataSuccess, getDataError);
		function getDataSuccess(data){
			$scope.settings = data.admin_settings;
		}
		function getDataError(errMsg){
			console.log('Error retrieving records'+errMsg);
		}
	}


	var settingToEdit;
	$scope.passSetting=function(n){
		settingToEdit = n;
	}

	$scope.editSettings = function(){

		var setting=[
			{
				id: settingToEdit.id,
				admin_email:$scope.adminEmail,
				emergency_numbers:$scope.emergencyNumbers
			}
		]

		setting.push({tableName:'admin_settings'});
		
		backend.updateRecord(setting)
		.then(postDataSuccess, postDataError);
	}
	
	function postDataSuccess(data){
		//console.log("Success updating record: "+data);
		updateData();
		$scope.adminEmail=undefined;
		$scope.emergencyNumbers=undefined;
	}
	function postDataError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}
}])
.controller('BannersController', ['$scope','backend','Upload','$interval','$mdDialog', function($scope, backend, Upload, $interval, $mdDialog){
	updateBanners();

	function updateBanners(){
		backend.getData('carousel')
		.then(getDataSuccess, getDataError);
		function getDataSuccess(data){
			$scope.banners = data.carousel;
		}
		function getDataError(errMsg){
			alert("Error getiing banners: "+errMsg);
		}
	}
	$scope.imageToEdit="";
	$scope.editImage = function(img){
		$scope.imageToEdit = img;
	}

	$scope.uploadImageFile = function(){
		upload($scope.file);
	}

	var dataToSend;

	function upload(file) {
		
		if ($scope.imageToEdit!="") {
			dataToSend = {
				contacts: [
					{ title: $scope.imgTitle, description: $scope.imgDescription, table: 'carousel', oldImage: $scope.imageToEdit}
				]
			}
		}else{
			dataToSend = {
				contacts: [
					{ title: $scope.imgTitle, description: $scope.imgDescription, table: 'carousel'}
				]
			}
		}

		Upload.upload({
			url: 'file_upload.php',
			method: 'POST',
			file: file,
			sendFieldsAs: 'form',
			fields: dataToSend
        }).then(function (resp) {
        	updateBanners();
			$scope.imgTitle=undefined;
			$scope.imgDescription=undefined;
			$scope.file=undefined;
			$scope.imageToEdit = "";
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            if ($scope.progressPercentage==100) {
				$interval(function(){
					$scope.progressPercentage = undefined;
				},3000);
            };
        });
    };

	$scope.showConfirm = function(ev, img) {
    // Appending dialog to document.body to cover sidenav in docs app
    //console.log(img);
    var confirm = $mdDialog.confirm()
			.title('Delete Image: '+img.title+'?')
			.content('Please confirm.')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Delete')
			.cancel('Cancel');
	$mdDialog.show(confirm).then(function() {
		//console.log('You decided to get rid of your debt.');
		deleteImage(img);
	}, function() {

	});
  };

	function deleteImage(img){
		var dataSet=[
			{
				id: img.id,
				url: img.url
			}
		]
		dataSet.push({tableName:'carousel'});

		backend.deleteRecord(dataSet)
		.then(deleteSuccess, deleteError);
	}
	function deleteSuccess(data){
		updateBanners();
	}
	function deleteError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}
}])
.controller('DepartmentsController', ['$scope','backend','$mdDialog', function($scope, backend, $mdDialog){
	updateRecords();
	function updateRecords(){
		backend.getData('departments')
		.then(getDataSuccess, getDataError);
		function getDataSuccess(data){
			$scope.departments = data.departments;
		}
		function getDataError(errMsg){
			console.log('Error retrieving recoords: '+errMsg);
		}
	}

	var departmentToEdit;

	$scope.editDepartment = function(n){
		departmentToEdit=n;
	}

	$scope.updateDepartment = function(){

		var department=[
			{
				id: departmentToEdit.id,
				name:$scope.departmentName,
				description:$scope.departmentDescription
			}
		]

		department.push({tableName:'departments'});
		
		backend.updateRecord(department)
		.then(postDataSuccess, postDataError);
	}

	function postDataSuccess(data){
		updateRecords();
		$scope.departmentName=undefined;
		$scope.departmentDescription=undefined;
	}
	function postDataError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}

	$scope.uploadDepartment = function(){
		var dataSet=[
			{
				name: $scope.newDepartmentName,
				description: $scope.newDepartmentDescription
			}
		]
		dataSet.push({tableName:'departments'});

		backend.addRecord(dataSet)
		.then(addDataSuccess, addDataError);
	}
	function addDataSuccess(data){
		updateRecords();
	}
	function addDataError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}

	$scope.showConfirm = function(ev, dep) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
			.title('Delete department: '+dep.name+'?')
			.content('Please confirm.')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Delete')
			.cancel('Cancel');
	$mdDialog.show(confirm).then(function() {
		//console.log('You decided to get rid of your debt.');
		deleteDepartment(dep);
	}, function() {

	});
  };

  function deleteDepartment(dep){
		var dataSet=[
			{
				id: dep.id
			}
		]
		dataSet.push({tableName:'departments'});

		backend.deleteRecord(dataSet)
		.then(deleteSuccess, deleteError);
	}
	function deleteSuccess(data){
		updateRecords();
	}
	function deleteError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}

}])
.controller('DoctorsController', ['$scope', 'backend', 'Upload','$interval','$mdDialog', function($scope, backend, Upload, $interval, $mdDialog){
	updateDoctors();
	function updateDoctors(){
		backend.getData('doctors||departments')
		.then(getDataSuccess, getDataError);
		function getDataSuccess(data){
			$scope.doctors = data.doctors;
			$scope.departments = data.departments;

			for(var i=0; i<$scope.doctors.length; i++){
				for(var j=0; j<$scope.departments.length; j++){
					if($scope.doctors[i].department_id == $scope.departments[j].id){
						$scope.doctors[i].department=$scope.departments[j].name;
					}
				}
			}
		}
		function getDataError(errMsg){

		}
	}
	

	$scope.uploadDoctor = function(){
		$scope.doctorToEdit.url=$scope.doctorToEdit.img_url;

		upload($scope.file);
	}

	var dataToSend="";

	$scope.doctorToEdit="";

	$scope.editDoctor=function(doctor){
		$scope.doctorToEdit = doctor;
	}

	function upload(file) {

		if ($scope.doctorToEdit!="") {
			dataToSend = {
				contacts: [
					{ fname: $scope.docFirstName, lname: $scope.docLastName, qualification: $scope.docQualification, 
						department_id: $scope.docDepartment, designation: $scope.docDesignation,
						contact_no: $scope.docContact, email: $scope.docEmail, 
						table: 'doctors', oldImage: $scope.doctorToEdit}
				]
			}
		}else{
			dataToSend = {
				contacts: [
					{ fname: $scope.docFirstName, lname: $scope.docLastName, qualification: $scope.docQualification, 
						department_id: $scope.docDepartment, designation: $scope.docDesignation,
						contact_no: $scope.docContact, email: $scope.docEmail, 
						table: 'doctors' }
				]
			}
		}

		Upload.upload({
			url: 'file_upload.php',
			method: 'POST',
			file: file,
			sendFieldsAs: 'form',
			fields: dataToSend
        }).then(function (resp) {
        	updateDoctors();
			$scope.docFirstName=undefined;
			$scope.docLastName=undefined;
			$scope.file=undefined;
			$scope.docQualification=undefined;
			$scope.docDepartment=undefined;
			$scope.docDesignation=undefined;
			$scope.docContact=undefined;
			$scope.docEmail=undefined;
			$scope.doctorToEdit = "";
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
/*            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            if ($scope.progressPercentage==100) {
				$interval(function(){
					$scope.progressPercentage = undefined;
				},3000);
            };*/
        });
    };

    function deleteDoctor(doctor){
    	var dataSet=[
			{
				id: doctor.id,
				url: doctor.img_url
			}
		]
		dataSet.push({tableName:'doctors'});

		backend.deleteRecord(dataSet)
		.then(deleteSuccess, deleteError);
    }

	function deleteSuccess(data){
		updateDoctors();
	}
	function deleteError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}

    $scope.showConfirm = function(ev, doctor) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Delete doctor: '+doctor.fname+'?')
          .content('Please confirm.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      //console.log('You decided to get rid of your debt.');
      deleteDoctor(doctor);
    }, function() {
      
    });
  };
}])
.controller('ConsultantsController', ['$scope','backend','$mdDialog', function($scope, backend, $mdDialog){
	updatePage();
	function updatePage(){
		backend.getData('consultants||departments')
		.then(getDataSuccess, getDataError);
		function getDataSuccess(data){
			$scope.consultants=data.consultants;
			$scope.departments=data.departments;

			for(var i=0; i<$scope.consultants.length; i++){
				for(var j=0; j<$scope.departments.length; j++){
					if($scope.consultants[i].department_id == $scope.departments[j].id){
						$scope.consultants[i].department=$scope.departments[j].name;
					}
				}
			}
		}
		function getDataError(errMsg){
			alert("Error getting data: "+errMsg);
		}
	}

	var consultant;
	$scope.editConsultant = function(con){
		consultant = con;
	}

	$scope.updateConsultants = function(){
		var consultantToSend=[
			{
				id: consultant.id,
				name:$scope.oldConsultantName,
				department_id:$scope.oldConsultantDepartment
			}
		]

		consultantToSend.push({tableName:'consultants'});
		
		backend.updateRecord(consultantToSend)
		.then(postDataSuccess, postDataError);
	}
	function postDataSuccess(data){
		updatePage();
		$scope.oldConsultantName=undefined;
		$scope.oldConsultantDepartment=undefined;
	}
	function postDataError(errMsg){
		alert('Error posting data: '+errMsg);
	}


	$scope.addConsultant = function(){
		var dataSet=[
			{
				department_id: $scope.consultantDepartment,
				name: $scope.consultantName
			}
		]
		dataSet.push({tableName:'consultants'});

		backend.addRecord(dataSet)
		.then(addDataSuccess, addDataError);
	}
	function addDataSuccess(data){
		updatePage();
		console.log(data);
	}
	function addDataError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}

	$scope.showConfirm = function(ev, con) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
			.title('Delete consultant: '+con.name+'?')
			.content('Please confirm.')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Delete')
			.cancel('Cancel');
	$mdDialog.show(confirm).then(function() {
		//console.log('You decided to get rid of your debt.');
		deleteConsultant(con);
	}, function() {

	});
  };

  function deleteConsultant(con){
		var dataSet=[
			{
				id: con.id
			}
		]
		dataSet.push({tableName:'consultants'});

		backend.deleteRecord(dataSet)
		.then(deleteSuccess, deleteError);
	}
	function deleteSuccess(data){
		updatePage();
	}
	function deleteError(errMsg){
		alert('Something went wrong while fetching application data: '+errMsg);
	}

}])
.controller('OpdSchedulesController', ['$scope','backend','$mdDialog', function($scope, backend, $mdDialog){
	backend.getData('opd_schedules||departments||doctors')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){
		$scope.opds = data.opd_schedules;

		for(var i=0;i<$scope.opds.length;i++){
			for(var j=0;j<data.departments.length;j++){
				if($scope.opds[i].department_id==data.departments[j].id){
					$scope.opds[i].department = data.departments[j].name;
				}
			}

			for(var k=0;k<data.doctors.length;k++){
				if($scope.opds[i].doctor_id==data.doctors[k].id){
					$scope.opds[i].doctor = data.doctors[k].fname+' '+data.doctors[j].lname;
				}
			}
		}
	}
	function getDataError(errMsg){

	}
}])
.controller('RoomsController', ['$scope', function($scope){
	backend.getData('')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){

	}
	function getDataError(errMsg){

	}
}])
.controller('TestimonialsController', ['$scope', function($scope){
	backend.getData('')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){

	}
	function getDataError(errMsg){

	}
}])
.controller('TrusteesController', ['$scope', function($scope){
	backend.getData('')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){

	}
	function getDataError(errMsg){

	}
}])
.controller('OfficeBearersController', ['$scope', function($scope){
	backend.getData('')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){

	}
	function getDataError(errMsg){

	}
}])
.controller('FeedbacksController', ['$scope', function($scope){
	backend.getData('')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){

	}
	function getDataError(errMsg){

	}
}])
.controller('MenusController', ['$scope', function($scope){
	backend.getData('')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){

	}
	function getDataError(errMsg){

	}
}])
.controller('ServicesController', ['$scope', function($scope){
	backend.getData('')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){

	}
	function getDataError(errMsg){

	}
}])
.controller('ReportRequestsController', ['$scope', function($scope){
	backend.getData('')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){

	}
	function getDataError(errMsg){

	}
}])
.controller('GalleryController', ['$scope', function($scope){
	backend.getData('')
	.then(getDataSuccess, getDataError);
	function getDataSuccess(data){

	}
	function getDataError(errMsg){

	}
}]);


app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl:'/vinayak/app/partials/admin/users.html',
			controller: 'UserController',
			controllerAs: 'userCtrl'
		})
		.when('/settings',{
			templateUrl:'/vinayak/app/partials/admin/settings.html',
			controller: 'SettingsController',
			controllerAs: 'settingsCtrl'
		})
		.when('/banners',{
			templateUrl:'/vinayak/app/partials/admin/banners.html',
			controller: 'BannersController',
			controllerAs: 'bannersCtrl'
		})
		.when('/departments',{
			templateUrl:'/vinayak/app/partials/admin/departments.html',
			controller: 'DepartmentsController',
			controllerAs: 'departmentsCtrl'
		})
		.when('/doctors',{
			templateUrl:'/vinayak/app/partials/admin/doctors.html',
			controller: 'DoctorsController',
			controllerAs: 'doctorsCtrl'
		})
		.when('/consultants',{
			templateUrl:'/vinayak/app/partials/admin/consultants.html',
			controller: 'ConsultantsController',
			controllerAs: 'consultantsCtrl'
		})
		.when('/opdSchedules',{
			templateUrl:'/vinayak/app/partials/admin/opdSchedules.html',
			controller: 'OpdSchedulesController',
			controllerAs: 'opdSchedulesCtrl'
		})
		.when('/rooms',{
			templateUrl:'/vinayak/app/partials/admin/rooms.html',
			controller: 'RoomsController',
			controllerAs: 'roomsCtrl'
		})
		.when('/testimonials',{
			templateUrl:'/vinayak/app/partials/admin/testimonials.html',
			controller: 'TestimonialsController',
			controllerAs: 'testimonialsCtrl'
		})
		.when('/trustees',{
			templateUrl:'/vinayak/app/partials/admin/trustees.html',
			controller: 'TrusteesController',
			controllerAs: 'trusteesCtrl'
		})
		.when('/officeBearers',{
			templateUrl:'/vinayak/app/partials/admin/officeBearers.html',
			controller: 'OfficeBearersController',
			controllerAs: 'officeBearersCtrl'
		})
		.when('/feedbacks',{
			templateUrl:'/vinayak/app/partials/admin/feedbacks.html',
			controller: 'FeedbacksController',
			controllerAs: 'feedbacksCtrl'
		})
		.when('/menus',{
			templateUrl:'/vinayak/app/partials/admin/menus.html',
			controller: 'MenusController',
			controllerAs: 'menusCtrl'
		})
		.when('/services',{
			templateUrl:'/vinayak/app/partials/admin/services.html',
			controller: 'ServicesController',
			controllerAs: 'servicesCtrl'
		})
		.when('/reportRequests',{
			templateUrl:'/vinayak/app/partials/admin/reportRequests.html',
			controller: 'ReportRequestsController',
			controllerAs: 'reportRequestsCtrl'
		})
		.when('/gallery',{
			templateUrl:'/vinayak/app/partials/admin/gallery.html',
			controller: 'GalleryController',
			controllerAs: 'galleryCtrl'
		})
		.otherwise('/');
}]);