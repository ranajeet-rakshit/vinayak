angular.module('myApp').directive('myBanner', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '<div>{{message}}</div>',
		 templateUrl: 'partials/banner.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$scope.message = 'This is the Banner directive';
			$scope.images = [
			{title: 'image 1', url: '../img/banner1.jpg'},
			{title: 'image 2', url: '../img/banner2.jpg'},
			{title: 'image 3', url: '../img/banner3.jpg'}
			];
			var css = 'width:50%;position:absolute;zIndex:0';
			var cssActive = 'width:50%;position:absolute;zIndex:1';

			for (var i = $scope.images.length - 1; i >= 0; i--) {
				$scope.images[i].style = css;
			};
			setInterval(function(){
				$scope.images[0].style=cssActive;
			}, 1000);
		}
	};
});