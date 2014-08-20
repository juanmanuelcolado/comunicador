communicatorApp.controller('basicRegistryCtrl', function($scope, receiverDbService, currentReceiverService) {
	$scope.registry = {
	};

	$scope.receivers = [];

	// get receivers
    receiverDbService.selectAll().then(function(results) {
        if (results.length) {
	        $scope.receivers = results;
			$scope.selectedReceiver = $scope.receivers[0].id;
        }
    });

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