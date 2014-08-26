communicatorApp.controller('basicRegistryCtrl', function($scope, receiverDbService, currentReceiverService, registryService) {

	var basicScoreValues = { true: 'withHelp', false: 'withoutHelp'};
	var basicScores = { 'withHelp': true, 'withoutHelp': false};
	
	$scope.registry = {
		receiver: currentReceiverService.receiver,
		pick: false,
		reach: false,
		drop: false
	};

	registryService.getLastRegistry().then(function(results) {
		convertToBasicScores(results);
		angular.extend($scope.registry, results);
	});

	$scope.saveRegistry = function() {
		$scope.registry.pick = basicScoreValues[$scope.registry.pick];
		$scope.registry.reach = basicScoreValues[$scope.registry.reach];
		$scope.registry.drop = basicScoreValues[$scope.registry.drop];
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

	function convertToBasicScores (scores) {
		scores.pick = basicScores[scores.pick];
		scores.reach = basicScores[scores.reach];
		scores.drop = basicScores[scores.drop];
	}
});