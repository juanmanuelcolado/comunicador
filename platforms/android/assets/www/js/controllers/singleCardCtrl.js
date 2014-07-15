communicatorApp.controller('singleCardCtrl', function($scope, $stateParams, $ionicNavBarDelegate, dbService) {
	$scope.creating = !$stateParams.id;
	
	$scope.card = {
		Title: ''
	};

	if (!$scope.creating) {
		dbService.getSingleCard($stateParams.id).then(function(results) {
			$scope.card = results[0];
		});
	}

	$scope.goBack = function() {
    	$ionicNavBarDelegate.back();
  	};

	$scope.save = function() {
		if ($scope.creating) {
			dbService.addCard($scope.card);
		} else {
			dbService.editCard($scope.card);
		}

    	$scope.goBack();
  	};

});