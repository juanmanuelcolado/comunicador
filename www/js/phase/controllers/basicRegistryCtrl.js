communicatorApp.controller('basicRegistryCtrl', function($scope, receiverDbService, currentReceiverService, registryService) {

	var basicScores = { true: 'withHelp', false: 'withoutHelp'};
	
	$scope.registry = {
		receiverId: 0,
		pick: false,
		reach: false,
		drop: false
	};

	$scope.receivers = [];

	// get receivers
    receiverDbService.selectAll().then(function(results) {
        if (results.length) {
	        $scope.receivers = results;
			$scope.registry.receiverId = currentReceiverService.receiver.id;
        }
    });

	$scope.saveRegistry = function() {
		$scope.registry.pick = basicScores[$scope.registry.pick];
		$scope.registry.reach = basicScores[$scope.registry.reach];
		$scope.registry.drop = basicScores[$scope.registry.drop];
		registryService.saveBasicRegistry($scope.registry);
		$scope.goBack();
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