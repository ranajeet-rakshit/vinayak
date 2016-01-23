angular.module("myApp").factory('dataService', ['$q', '$http',dataService]);

function dataService($q,$http){
	return{
		getAppData: getAppData
	};
var collections=[];
	function getAppData(collection){
		
		if(collection.length>1){
			for(var i=0;i<collection.length;i++){
				$http({
					method:'GET',
					url:'/'+collection[i],
					headers:{

					}
				}).then(storeResponse)
			}
		}
		return $http({
			method:'GET',
			url:'/'+collection,
			headers:{

			}
		})
		.then(respondAppData)
		.catch(respondAppDataError);
	}

	function respondAppData(response){
		return response.data;
	}

	function respondAppDataError(err){
		return $q.reject("Error retrieving Departments. (HTTP Status: "+err.status+")");
	}
}