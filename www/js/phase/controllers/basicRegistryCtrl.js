communicatorApp.controller('basicRegistryCtrl', function($scope, currentReceptorService) {
	$scope.registry = {

	};

	$scope.users = [
		{
			name: "Juan",
			lastName: "Perez",
			advanced: false
		},
		{
			name: "Pedro",
			lastName: "Troglio",
			advanced: true
		}
	];

	// get users
	// select current user?

	$scope.changeUser = function() {
		currentReceptorService.change($scope)
	};

	$scope.saveRegistry = function() {

	};

	$scope.goBack = function() {
		// this is to force a double "back"
	  	var backView = $scope.$viewHistory.views[$scope.$viewHistory.backView.backViewId];
	    $scope.$viewHistory.forcedNav = {
	        viewId:     backView.viewId,
	        navAction: 'moveBack',
	        navDirection: 'back'
	    };
	    backView.go();
	};
});